from django.db.models.signals import post_save, pre_delete, post_delete
from django.dispatch import receiver
from notifications.signals import notify
from django.utils.translation import ugettext_lazy as _
from django.core.cache import cache
from ..models import *
from ..views import cache_key_guides, cache_key_guide


@receiver(post_save, sender=GuideModel)
def notification_user(sender, instance, **kwargs):
    if instance.status == GuideModel.STATUS.published:
        desc = _('Ваш гайд "{}" был одобрен модератором и опубликован на сайте.').format(instance.title)
        notify.send(instance.user, recipient=instance.user, verb=_('ваш гайд одобрен!'), description=desc, level='')
        cache.delete_many([cache_key_guide.format(instance.id), cache_key_guides])


