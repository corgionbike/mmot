from django.db.models.signals import post_save, pre_delete, post_delete
from django.dispatch import receiver

from news.models import ArticleModel
from django.core.cache import cache
from ..views import cache_key_all_news, cache_key_top_news, cache_key_news
from mmotimes.api_redis import PostViewsCount


# Очистка кеша
@receiver([post_save, pre_delete], sender=ArticleModel)
def del_cache(sender, instance, **kwargs):
    cache.delete_many([cache_key_top_news, cache_key_all_news, cache_key_news.format(instance.id)])


@receiver([pre_delete], sender=ArticleModel)
def del_views(sender, instance, **kwargs):
    PostViewsCount().delete(instance.id, 'news')
