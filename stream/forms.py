from datetimewidget.widgets import DateTimeWidget, DateWidget
from django.core.exceptions import ValidationError
from django.db import models
from django.forms import ModelForm, Textarea, forms, NullBooleanSelect
from django.forms import widgets
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from editor.widgets import EditorWidget
from cat_game.forms import group_games
from .api import twitch, cybergame, smashcast
from .models import StreamProfile, StreamPreview, PROVIDERS, StreamManage, StreamArchive
from group.utils import get_all_user_groups


class DateTimeWidgetRequire(DateTimeWidget):
    def _media(self):
        js = []
        js.append("https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js")
        js.append("js/bootstrap-datetimepicker.js")

        language = self.options.get('language', 'en')
        if language != 'en':
            js.append("js/locales/bootstrap-datetimepicker.%s.js" % language)

        return widgets.Media(
            css={
                'all': ('css/datetimepicker.css',)
            },
            js=js
        )

    media = property(_media)


def validate_start_ts(value):
    now = timezone.now()
    if now > value:
        raise ValidationError(_("Запрещено создавать и редактировать анонс задним числом!"))


class StreamProfileForm(ModelForm):
    class Meta:
        model = StreamProfile
        fields = ['provider', 'sid', 'auto_broadcasting']
        help_texts = {
            'sid': _('Может быть проверен на сервере стрим провайдера.'),
            'auto_broadcasting': _('Задержка может составлять 5 мин.'),
        }

    def clean_sid(self):
        provider = self.cleaned_data.get('provider')
        sid = self.cleaned_data.get('sid')
        err_msg = _("Идентификатор {0} не найден на сервере {1}!")
        if not sid and provider != 1:
            raise forms.ValidationError(_("Необходимо ввести идентификатор!"))
        if provider == 0:  # Twitch
            if not twitch.check_id(sid):
                raise forms.ValidationError(err_msg.format(sid, PROVIDERS[provider][1]))
        if provider == 1:  # Youtube
            pass
        if provider == 2:
            if not cybergame.check_id(sid):
                raise forms.ValidationError(err_msg.format(sid, PROVIDERS[provider][1]))
        if provider == 3:
            if not smashcast.check_id(sid):
                raise forms.ValidationError(err_msg.format(sid, PROVIDERS[provider][1]))
        return sid


class StreamRemoveForm(forms.Form):
    pass


class StreamPreviewForm(ModelForm):
    game = models.CharField()

    def __init__(self, user=None, *args, **kwargs):
        super(StreamPreviewForm, self).__init__(*args, **kwargs)
        if user:
            self.fields['group'].queryset = get_all_user_groups(user)
        # self.fields['game'].choices = group_games()

    class Meta:
        model = StreamPreview
        fields = ['provider', 'sid', 'name', 'game', 'game_user', 'start_ts', 'end_ts', 'is_postpone', 'group', 'description']
        widgets = {
            'description': Textarea(
                attrs={'rows': 5, 'placeholder': _('Дайте небольшое описание предстоящей трансляции...')}),
        }
        help_texts = {
            'description': _('Максимальный число символов: {}, минимальное - {}').format(300, 10),
            'name': _('Максимальный число символов: %s') % 100,
            'game_user': _('Заполняется в случае если игры нет в списке'),
            'game': _('Игра из списка имеет приоритет отображения над пользовательской игрой'),
            'provider': _('Заполняется из стрим профиля, если оставить пустым'),
            'sid': _('Заполняется из стрим профиля, если оставить пустым'),
            'group': _('От имени выбранной группы будет вестись трансляция')
        }

    def clean(self):
        super(StreamPreviewForm, self).clean()
        game = self.cleaned_data.get('game')
        game_user = self.cleaned_data.get('game_user')
        sid = self.cleaned_data.get('sid')
        provider = self.cleaned_data.get('provider')
        if not game and not game_user:
            err_msg = forms.ValidationError(_("Необходимо выбрать игру из списка или указать ее наименование!"))
            self.add_error('game', err_msg)
            self.add_error('game_user', err_msg)
        if sid and not isinstance(provider, int):
            err_msg = forms.ValidationError(_("Необходимо ввести идентификатор и выбрать провайдера или оставить поля пустыми!"))
            self.add_error('sid', err_msg)
            self.add_error('provider', err_msg)
        if not sid and isinstance(provider, int):
            err_msg = forms.ValidationError(_("Необходимо ввести идентификатор и выбрать провайдера или оставить поля пустыми!"))
            self.add_error('sid', err_msg)
            self.add_error('provider', err_msg)

    def clean_sid(self):
        provider = self.cleaned_data.get('provider')
        sid = self.cleaned_data.get('sid')
        err_msg = _("Идентификатор {0} не найден на сервере {1}!")
        if provider == 0:  # Twitch
            if not twitch.check_id(sid):
                raise forms.ValidationError(err_msg.format(sid, PROVIDERS[provider][1]))
        if provider == 1:  # Youtube
            pass
        if provider == 2:
            if not cybergame.check_id(sid):
                raise forms.ValidationError(err_msg.format(sid, PROVIDERS[provider][1]))
        if provider == 3:
            if not smashcast.check_id(sid):
                raise forms.ValidationError(err_msg.format(sid, PROVIDERS[provider][1]))
        return sid

    def clean_end_ts(self):
        end = self.cleaned_data.get('end_ts')
        start = self.cleaned_data.get('start_ts')
        if start and end and start >= end:
            raise forms.ValidationError(_("Дата окончания трансляции раньше или равна дате начала!"))
        return end

    # def clean_start_ts(self):
    #     now = timezone.now()
    #     start = self.cleaned_data.get('start_ts')
    #     if start < now:
    #         raise ValidationError(_("Запрещено создавать и редактировать анонс задним числом!"))
    #     return start


class StreamArchiveForm(ModelForm):
    provider_cache = None
    game = models.CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['game'].choices = group_games()

    class Meta:
        model = StreamArchive
        fields = ['name', 'rec_url', 'game', 'rec_ts', 'description']
        widgets = {
            'description': Textarea(attrs={'rows': 10}),
            'rec_ts': DateWidget(bootstrap_version=3, usel10n=True),
        }
        help_texts = {
            'description': _('Максимальный число символов: %s') % 300,
        }

    def clean_rec_ts(self):
        rec_ts = self.cleaned_data.get('rec_ts')
        if rec_ts > timezone.now().date():
            raise forms.ValidationError(_("Запись не можеть быть из будущего!"))
        return rec_ts

    def clean_rec_url(self):
        url = self.cleaned_data.get('rec_url')
        self.valid_url(url)
        return url

    def valid_url(self, url):
        self.provider_cache = [p[0] for p in PROVIDERS if p[1].lower() in url]
        if not self.provider_cache:
            raise forms.ValidationError(_('Провайдер не поддерживается!'))

    def save(self, commit=True):
        self.instance.provider = self.provider_cache[0]
        return super().save(commit=False)


class NewNullBooleanSelect(NullBooleanSelect):
    def __init__(self, attrs=None):
        choices = (('2', _('Трасляция активна')),
                   ('3', _('Трасляция отключена')))
        super(NullBooleanSelect, self).__init__(attrs, choices)


class StreamManageForm(ModelForm):
    class Meta:
        model = StreamManage
        fields = ['progress', 'chat', 'counter']


class CtrlStreamForm(ModelForm):
    class Meta:
        model = StreamPreview
        fields = ['status']
