from django.conf import settings

from ..models import Message

if getattr(settings, 'PRIVATE_MESSAGES_NOTIFY', True):
    from private_messages.utils import new_message_email
    from django.db.models.signals import post_save

    post_save.connect(new_message_email, sender=Message)
