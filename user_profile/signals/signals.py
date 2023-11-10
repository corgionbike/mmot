from django.db.models.signals import pre_save, post_save, post_delete, pre_delete
from django.dispatch import receiver
from user_profile.models import UserProfile, UserProfileSetting
from django_cleanup.signals import cleanup_pre_delete, cleanup_post_delete
from django.conf import settings


# создание профиля
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, **kwargs):

    UserProfileSetting.objects.get_or_create(user=instance)


def sorl_delete(**kwargs):
    from sorl.thumbnail import delete
    delete(kwargs['file'])

cleanup_pre_delete.connect(sorl_delete)