from django import forms
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from editor.widgets import EditorWidget
from .fields import CommaSeparatedUserField
from .models import Message

# if "notification" in settings.INSTALLED_APPS and getattr(settings, 'DJANGO_MESSAGES_NOTIFY', True):
#     from notification import models as notification
# else:
#     notification = None

notification = None


class ComposeForm(forms.Form):
    """
    A simple default form for private messages.
    """
    recipient = CommaSeparatedUserField(label=_("Получатель"), help_text=_(
        'Несколько пользователей вводятся через запятую c учетом регистра'), )
    subject = forms.CharField(label=_("Тема"), max_length=140)
    body = forms.CharField(label=_("Сообщение"),
                           widget=EditorWidget(attrs={'rows': '6'}, html=True))

    def __init__(self, *args, **kwargs):
        recipient_filter = kwargs.pop('recipient_filter', None)
        super(ComposeForm, self).__init__(*args, **kwargs)
        if recipient_filter is not None:
            self.fields['recipient']._recipient_filter = recipient_filter

    def save(self, sender, parent_msg=None):
        recipients = self.cleaned_data['recipient']
        subject = self.cleaned_data['subject']
        body = self.cleaned_data['body']
        message_list = []
        for r in recipients:
            msg = Message(
                sender=sender,
                recipient=r,
                subject=subject,
                body=body,
            )
            if parent_msg is not None:
                msg.parent_msg = parent_msg
                parent_msg.replied_at = timezone.now()
                parent_msg.save()
            msg.save()
            message_list.append(msg)
            if notification:
                if parent_msg is not None:
                    notification.send([sender], "messages_replied", {'message': msg,})
                    notification.send([r], "messages_reply_received", {'message': msg,})
                else:
                    notification.send([sender], "messages_sent", {'message': msg,})
                    notification.send([r], "messages_received", {'message': msg,})
        return message_list
