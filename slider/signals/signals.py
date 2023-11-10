from django.db.models.signals import post_save, pre_delete, post_delete
from django.dispatch import receiver

from slider.models import SliderModel
from django.core.cache import cache
from ..views import cache_key_slide
from ..templatetags.slider_tags import cache_key_slides


# Очистка кеша
@receiver([post_save, pre_delete], sender=SliderModel)
def del_cache(sender, instance, **kwargs):
    cache.delete_many([cache_key_slide.format(instance.id), cache_key_slides])
