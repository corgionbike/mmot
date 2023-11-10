from collections import OrderedDict

from captcha.fields import ReCaptchaField
from django import forms
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordChangeForm, SetPasswordForm, AuthenticationForm
from django.contrib.auth.forms import UserCreationForm
from django.core import validators
from django.forms import ModelForm, ClearableFileInput, Textarea
from django.utils.translation import ugettext_lazy as _
from registration.forms import RegistrationFormTermsOfService, RegistrationFormUniqueEmail

from invite_key.models import InviteKey

User = get_user_model()

MAX_LOAD_IMG_SIZE = getattr(settings, 'MAX_LOAD_IMG_SIZE', {'size': 500000, 'hsize': '500 kb'})

BLACK_LIST_USER_NAME = ['администратор', 'аметов', 'ametov', 'admin', 'administrator', 'админ', 'модератор', 'moderator']


# форма для регистрации пользователя в админке
class UserCreationForm2(UserCreationForm):
    username = forms.CharField(label=_('Имя пользователя'),
                               help_text=_('Обязательное поле c ограничением 4-15 латинских символов, которыми могут быть буквы и цифры, первый символ обязательно буква.'),
                               validators=[
                                    validators.RegexValidator(r'^[a-zA-Z][a-zA-Z0-9-_\.]{3,15}$',
                                      _('Введите правильное имя пользователя.'), 'invalid')],
                               error_messages={
                                    'unique': _("Пользователь с таким именем уже существует."),
                               })

    password1 = forms.CharField(label=_("Пароль"),
                                help_text=_('Минимум 6 максимум 12 символов.'),
                                widget=forms.PasswordInput,
                                min_length=6,
                                max_length=12)

    def clean_username(self):
        try:
            User.objects.get(username__iexact=self.cleaned_data['username'])
            raise forms.ValidationError(_("Пользователь с таким именем уже существует."))
        except User.DoesNotExist:
            return self.cleaned_data['username']


class RegistrationFormCustom(RegistrationFormTermsOfService, RegistrationFormUniqueEmail):

    key_cache = None
    is_key = getattr(settings, 'INVITE_KEYS_ACTIVE', True)
    is_captcha = getattr(settings, 'CAPTCHA_ACTIVE', False)

    username = forms.CharField(label=_('Имя пользователя'),
                               help_text=_('Обязательное поле c ограничением 4-15 латинских символов, которыми могут быть буквы и цифры, первый символ обязательно буква.'),
                               validators=[
                                    validators.RegexValidator(r'^[a-zA-Z][a-zA-Z0-9-_\.]{3,15}$',
                                      _('Введите правильное имя пользователя.'), 'invalid')],
                               error_messages={
                                    'unique': _("Пользователь с таким логином уже существует"),
                               })

    password1 = forms.CharField(label=_("Пароль"), required=True,
                                help_text=_('Минимум 6 максимум 12 символов.'),
                                widget=forms.PasswordInput,
                                min_length=6,
                                max_length=12)

    tos = forms.BooleanField(widget=forms.CheckboxInput,
                             label=_('Я прочитал и согласен с Пользовательским соглашением'),
                             error_messages={'required': _("Вы должны согласиться с правилами регистрации")})

    if is_key:
        key = forms.UUIDField(label=_('Пригласительный ключ'),
                              required=True,)

    if is_captcha:
        captcha = ReCaptchaField(attrs={'theme': 'clean'})

    def clean_username(self):
        try:
            if self.cleaned_data['username'].lower() in BLACK_LIST_USER_NAME:
                raise forms.ValidationError(_("Пользователь с таким именем запрещен."))
            User.objects.get(username__iexact=self.cleaned_data['username'])
            raise forms.ValidationError(_("Пользователь с таким именем уже существует."))
        except User.DoesNotExist:
            return self.cleaned_data['username']

    def clean_key(self):
        key = self.cleaned_data.get('key')
        try:
            k = InviteKey.objects.get(id=key)
        except InviteKey.DoesNotExist:
            raise forms.ValidationError(_("Вы ввели неверный ключ!"))
        if not k.state:
            raise forms.ValidationError(_("Этот ключ уже погашен!"))
        self.key_cache = k
        return key

    def save(self, commit=True):
        user = super().save()
        if self.is_key:
            self.key_cache.state = 0
            self.key_cache.owner = user
            self.key_cache.save()
        return user


# сортировка полей
fields = ['username', 'email', 'password1', 'password2', 'tos']
is_captcha = getattr(settings, 'CAPTCHA_ACTIVE', False)
is_key = getattr(settings, 'INVITE_KEYS_ACTIVE', True)
if is_key:
    fields += ['key']
if is_captcha:
    fields += ['captcha']
RegistrationFormCustom.base_fields = OrderedDict(
    (k, RegistrationFormCustom.base_fields[k])
    for k in fields
)


# сортировка полей
class PasswordChangeForm2(PasswordChangeForm):

    new_password1 = forms.CharField(label=_("Новый пароль"),
                                    widget=forms.PasswordInput, min_length=6, max_length=12)

PasswordChangeForm2.base_fields = OrderedDict(
    (k, PasswordChangeForm2.base_fields[k])
    for k in ['old_password', 'new_password1', 'new_password2']
)


class SetPasswordForm2(SetPasswordForm):

    new_password1 = forms.CharField(label=_("Новый пароль"),
                                    widget=forms.PasswordInput, min_length=6, max_length=12)


class UserProfileForm(ModelForm):
    class Meta:
        model = User
        fields = ['avatar', 'description', 'userbar', 'block_invites', ]

        widgets = {
            'avatar': ClearableFileInput,
            'description': Textarea(attrs={'rows': 5}),
            'userbar': Textarea(attrs={'rows': 2})
        }
        help_texts = {
            'avatar': _('Максимальный размер: %s. Формат: JPG или PNG.') % MAX_LOAD_IMG_SIZE['hsize'],
            'description': _('Максимальное число знаков %s') % 300,
            'userbar': _('Максимальное число знаков %s') % 100,
        }

    def clean_avatar(self):
        avatar = self.cleaned_data.get('avatar')
        if hasattr(avatar, 'size') and avatar.size > MAX_LOAD_IMG_SIZE['size']:
            raise forms.ValidationError(_("Превышен размер загружаемого файла!"))
        return avatar


class AuthenticationFormNew(AuthenticationForm):

    username = forms.CharField(label=_('Логин или email'), max_length=254, help_text=_('Оба поля могут быть чувствительны к регистру.'))
    if is_captcha:
        captcha = ReCaptchaField(attrs={'theme': 'clean'})

