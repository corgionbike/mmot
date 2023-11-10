from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from group_forum.models import Post


# подсчет постов в теме
@receiver(post_save, sender=Post)
def update_topic_on_post(sender, instance, created, **kwargs):
    if created:
        instance.topic.last_post = instance
        instance.topic.last_post_user = instance.user
        instance.topic.num_posts = instance.topic.count_posts()
        instance.topic.save()


# подсчет постов в теме
@receiver(post_delete, sender=Post)
def update_topic_on_post_remove(sender, instance, **kwargs):
    instance.topic.num_posts = instance.topic.count_posts()
    try:
        # если удалили последний пост
        if not instance.topic.last_post:
            instance.topic.last_post = instance.topic.get_latest_post()
            instance.topic.last_post_user = instance.topic.last_post.user
    except Post.DoesNotExist:
        pass
    finally:
        instance.topic.save()
