from django import template
from mmotimes.api_redis import PostViewsCount
from ..models import GuideModel

register = template.Library()
from django.core.cache import cache
from cat_game.models import Game


@register.simple_tag
def views(id, model='guide'):
    try:
        return PostViewsCount().count(id, model)
    except:
        return 'E'


cache_key_guide = 'cache.guides.more.{}.{}'


@register.inclusion_tag('guides/tag/module_read_more.html', takes_context=False)
def more_read(id_game, id_guide):
    guides = cache.get_or_set(cache_key_guide.format(id_game, id_guide),
                              GuideModel.objects.filter(game=id_game).exclude(id=id_guide).order_by('-modified')[:10])
    return {'guides': guides}
