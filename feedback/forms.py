from captcha.fields import ReCaptchaField
from django import forms
from django.conf import settings
from django.forms import ModelForm
from django.utils.translation import ugettext_lazy as _

from .models import Feedback

MAX_LOAD_IMG_SIZE = getattr(settings, 'MAX_LOAD_IMG_SIZE', {'size': 500000, 'hsize': '500 kb'})
is_captcha = getattr(settings, 'CAPTCHA_ACTIVE', False)


class FeedbackForm(ModelForm):

    if is_captcha:
        captcha = ReCaptchaField(attrs={'theme': 'clean'})

    def __init__(self, user, *args, **kwargs):
        super(FeedbackForm, self).__init__(*args, **kwargs)
        if user.is_authenticated():
            self.fields["name"].widget = forms.HiddenInput()
            self.fields["name"].initial = user
            self.fields["email"].widget = forms.HiddenInput()
            self.fields["email"].initial = user.email

    class Meta:
        model = Feedback
        fields = ['name', 'type', 'subject', 'email', 'text', 'attach']
        if is_captcha:
            fields += ['captcha']
        help_texts = {
            'attach': _('Максимальный размер: %s. Формат: JPG или PNG.') % MAX_LOAD_IMG_SIZE['hsize'],
        }
