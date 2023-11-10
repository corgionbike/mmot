from django import template
from django.core.cache import cache
from ..models import *

register = template.Library()
cache_key_slides = 'cache.slides'


@register.inclusion_tag('slider/_slider.html', takes_context=True)
def slider(context, limit=5):
    user = context.get('user')
    if not user.is_staff:
        sliders = cache.get_or_set(cache_key_slides, SliderModel.objects.live()[:limit], 0)
    else:
        sliders = SliderModel.objects.all()[:limit]
    return {'sliders': sliders}
