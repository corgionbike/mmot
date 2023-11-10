from django import forms
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from django.core import validators
from django.db import models
from django.forms import ModelForm, Textarea
from django.utils.translation import ugettext_lazy as _
from editor.widgets import EditorWidget
from group.models import GroupModerator
from django.forms import widgets

from .models import GroupProfile, GroupMember

User = get_user_model()

MAX_LOAD_IMG_SIZE = getattr(settings, 'MAX_LOAD_IMG_SIZE', {'size': 500000, 'hsize': '500 kb'})


class GroupProfileForm(ModelForm):

    name = forms.CharField(label=_('Наименование'),
           help_text=_('Обязательное поле c ограничением 4-15 латинских символов, '
                       'которыми могут быть буквы и цифры, первый символ обязательно буква.'),
           validators=[
                validators.RegexValidator(r'^[a-zA-Z][a-zA-Z0-9-_\.]{3,15}$',
                  _('Введите правильное имя группы.'), 'invalid')],
           error_messages={
                'unique': _("Группа с таким именем уже существует!"),
           })

    game = models.CharField()
    # description = forms.CharField(widget=EditorWidget())

    def __init__(self,  *args, **kwargs):
        super(GroupProfileForm, self).__init__(*args, **kwargs)
        # self.fields['game'].choices = group_games()

    def clean(self):
        super(GroupProfileForm, self).clean()
        game = self.cleaned_data.get('game')
        game_group = self.cleaned_data.get('game_group')
        if not game and not game_group:
            err_msg = forms.ValidationError(_("Необходимо выбрать игру из списка или указать ее наименование"))
            self.add_error('game', err_msg)
            self.add_error('game_group', err_msg)

    class Meta:
        model = GroupProfile
        fields = ['name', 'type', 'game', 'game_group', 'privacy', 'emblem', 'motto', 'description', ]
        widgets = {
            'description': Textarea(attrs={'rows': 10}),
            'motto': Textarea(attrs={'rows': 2}),
        }

        help_text_file = _('Максимальный размер: %s. Формат: GIF, JPG или PNG.') % MAX_LOAD_IMG_SIZE['hsize']

        help_texts = {
            'emblem': help_text_file,
            # 'background': "{} {}".format(help_text_file, _('Рекомендуемое разрешение 1200х300 px')),
            'description': _('Максимальный число знаков %s') % 600,
            'game_group': _('Заполняется в случае если игры нет в списке'),
            'game': _('Игра из списка имеет приоритет отображения над пользовательской игрой'),
        }

    def clean(self):
        super(GroupProfileForm, self).clean()
        emblem = self.cleaned_data.get('emblem')
        # background = self.cleaned_data.get('background')
        err_msg = forms.ValidationError(_("Превышен размер загружаемого файла!"))
        if hasattr(emblem, 'size') and emblem.size > MAX_LOAD_IMG_SIZE['size']:
            self.add_error('emblem', err_msg)
        # if hasattr(background, 'size') and background.size > MAX_LOAD_IMG_SIZE['size']:
        #     self.add_error('background', err_msg)


class GroupProfileCreateForm(GroupProfileForm):
    def clean_name(self):
        try:
            GroupProfile.objects.get(name__iexact=self.cleaned_data['name'])
            raise forms.ValidationError(_("Группа с таким именем уже существует."))
        except GroupProfile.DoesNotExist:
            return self.cleaned_data['name']


class GroupMemberInviteForm(forms.Form):

    username = forms.CharField(label=_('Ник пользователя'),
                               help_text=_('Введите ник пользователя для отправки приглашения в группу.'),
                               validators=[
                                    validators.RegexValidator(r'^[a-zA-Z][a-zA-Z0-9-_\.]{3,15}$',
                                      _('Введите правильное имя пользователя!'), 'invalid')])

    desc = forms.CharField(label=_('Приглашение'), widget=forms.Textarea(attrs={'rows': 3}), initial=_('Мы приглашаем Вас в группу!'))

    def clean_username(self):
        username = self.cleaned_data.get('username')
        try:
            member = User.objects.select_related('group_profile').get(username__iexact=username)
            # if is_user_has_group(member):
            #     raise forms.ValidationError(_("Пользователь уже состоит в группе!"))
            if member.block_invites:
                raise forms.ValidationError(_("Пользователь не принимает приглашения!"))
        except User.DoesNotExist:
            raise forms.ValidationError(_("Пользователь не найден!"))

        return member


class GroupInviteForm(forms.Form):
    pass


class GroupModeratorAddForm(forms.Form):

    member = forms.ModelChoiceField(queryset=None, required=True)

    def __init__(self, group, owner, *args, **kwargs):
        super().__init__(*args, **kwargs)
        moderators = GroupModerator.objects.filter(group=group).values('user')
        self.fields['member'].queryset = GroupMember.objects.filter(group=group)\
                                                            .exclude(models.Q(user__in=moderators))\
                                                            .exclude(user=owner).select_related('user')


class PermissionCheckBox(forms.CheckboxSelectMultiple):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


class GroupPermissionForm(forms.ModelForm):

    user_permissions = forms.ModelMultipleChoiceField(label=_('Права пользователя'),
                                                      queryset=None, required=False,
                                                      widget=PermissionCheckBox)

    class Meta:
        model = User
        fields = ['user_permissions']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        group_profile_type = ContentType.objects.get_for_model(GroupProfile)
        self.fields['user_permissions'].queryset = Permission.objects.filter(models.Q(content_type=group_profile_type))


