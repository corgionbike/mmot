from django import template
from ..models import *
from django.core.cache import cache
from ..views import cache_key_top_news


register = template.Library()


@register.inclusion_tag('news/_top_news.html', takes_context=True)
def top_news(context, limit=5):
    user = context.get('user')
    if user.is_staff:
        news = ArticleModel.objects.all()[:limit]
    else:
        news = cache.get_or_set(cache_key_top_news, ArticleModel.objects.live()[:limit])
    return {'news': news}
