from math import ceil

from django.conf import settings
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel

from group.models import GroupProfile
from .utils.mail import send_templated_email


class Forum(models.Model):
    group = models.OneToOneField(GroupProfile, related_name='forum', null=True)
    settings = models.OneToOneField('Settings', related_name='forum', null=True)
    is_closed = models.BooleanField(_("Закрыть форум"), default=False)

    class Meta:
        verbose_name = _("форум")
        verbose_name_plural = _("форумы")

    def get_settings(self):
        return self.settings

    def get_latest_topic(self):
        if self.topics.count() > 0:
            return self.topics.all()[0]
        return None

    def get_latest_poster(self):
        latest_topic = self.get_latest_topic()
        if latest_topic:
            return latest_topic.last_post.user.username
        return '-'

    def count_topics(self):
        return self.topics.count()

    def count_posts(self):
        count = 0
        for topic in self.topics.all():
            count += topic.count_posts()
        return count

    def __str__(self):
        return self.group.name

    def get_absolute_url(self):
        return reverse('forum_index', args=[self.group.name])

    def get_search_url(self):
        return reverse('topic_search', args=[self.group.name])

    def get_edit_url(self):
        return reverse('forum_profile_edit', args=[self.group.name])


class Settings(models.Model):
    num_topics = models.PositiveSmallIntegerField(_('Число обсуждений'), default=10)
    num_posts = models.PositiveSmallIntegerField(_('Число комментариев'), default=10)
    is_member_edit = models.BooleanField(_('Разрешено редактирование посты'), default=False)
    is_member_create = models.BooleanField(_('Разрешено создавать темы'), default=True)
    post_ordering = models.BooleanField(_('Последний пост сверху'), default=False)

    class Meta:
        verbose_name = _("настройки форума")
        verbose_name_plural = _("настройки форумов")

    def __str__(self):
        return "Настройки форума {}".format(self.forum.group.name)


class Topic(TimeStampedModel):
    forum = models.ForeignKey(Forum, related_name='topics')
    name = models.CharField(_("Тема"), max_length=100, null=False)
    description = models.TextField(_("Описание"), blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='forum_topics')
    last_post = models.ForeignKey('Post', verbose_name=_("Последний комментарий"),
                                  related_name='forum_last_post',
                                  blank=True, null=True, on_delete=models.SET_NULL, )
    last_post_user = models.ForeignKey(settings.AUTH_USER_MODEL,
                                       related_name='forum_last_post_user',
                                       blank=True, null=True, on_delete=models.SET_NULL, )
    closed = models.BooleanField(_('Закрыть'), default=False)
    sticky = models.BooleanField(_('Закрепить'), default=False)
    hidden = models.BooleanField(_('Скрыть'), default=False)
    num_posts = models.IntegerField(default=0)
    send_response = models.BooleanField(_('подписаться на обсуждение'), default=False)

    class Meta:
        ordering = ['-sticky', '-last_post__created']
        get_latest_by = "created"
        verbose_name_plural = _("обсуждения")
        verbose_name = _("обсуждение")

    def count_posts(self):
        return self.posts.count()

    def __str__(self):
        return self.name

    def get_latest_post(self):
        return self.posts.latest()

    def get_latest_poster(self):
        latest_post = self.get_latest_post()
        if latest_post:
            return latest_post.user
        return '-'

    def get_absolute_url(self):
        return reverse('topic_detail', args=[self.forum.group.name, self.pk])

    def get_remove_url(self):
        return reverse('topic_remove', args=[self.forum.group.name, self.pk])

    def get_edit_url(self):
        return reverse('topic_edit', args=[self.forum.group.name, self.pk])

    def get_unsubscribe_url(self):
        return reverse('topic_unsubscribe', args=[self.forum.group.name, self.pk])

    def get_subscribe_url(self):
        return reverse('topic_subscribe', args=[self.forum.group.name, self.pk])

    def send_email_about_post(self, post):
        if not self.send_response:
            return

        subject = _('Новый комментарий в вашей теме "{}"').format(self)
        context = {
            'topic': post.topic
        }
        send_templated_email(
            self.user.email, subject,
            'group_forum/email_new_post.html',
            context,
            self.user,
            fail_silently=settings.DEBUG
        )


class Post(TimeStampedModel):
    topic = models.ForeignKey(Topic, related_name='posts', null=False, blank=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='forum_posts')
    body = models.TextField(_("Комментарий"))
    edited_by = models.CharField(max_length=255, blank=True)  # user name

    class Meta:
        ordering = ['created']
        verbose_name = _("пост")
        verbose_name_plural = _("посты")
        get_latest_by = "created"

    def __str__(self):
        return self.body

    def get_remove_url(self):
        return reverse('post_remove', args=[self.topic.forum.group.name, self.pk])

    def get_edit_url(self):
        return reverse('post_edit', args=[self.topic.forum.group.name, self.pk])

    def get_reply_url(self):
        return reverse('post_reply', args=[self.topic.forum.group.name, self.pk])

    def get_absolute_url(self):
        topic_url = self.topic.get_absolute_url()
        posts = list(self.topic.posts.all())
        post_index = posts.index(self)
        post_on_page = self.topic.forum.settings.num_posts

        if post_index <= post_on_page:
            return topic_url + '#' + str(self.pk)
        else:
            url = '%s?page=%s#%s'
            # page = post_index / post_on_page + 1
            page = int(ceil(post_index / float(post_on_page)))
            return url % (topic_url, page, str(self.pk))
