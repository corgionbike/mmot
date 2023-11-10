from django.conf import settings
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel

from group.models import GroupProfile

TYPE_EVENTS = (
    (0, _('Прямой эфир')),
    (1, _('Всякое разное')),
    (2, _('Вечеринка')),
    (3, _('Важная встреча')),
)


class GroupEvents(models.Model):
    group = models.OneToOneField(GroupProfile, related_name='events_profile', null=True)
    settings = models.OneToOneField('Settings', related_name='events_profile', null=True)
    is_closed = models.BooleanField(_("Закрыть"), default=False)

    class Meta:
        verbose_name = _("событие группы")
        verbose_name_plural = _("события групп")

    def get_settings(self):
        return self.settings

    # def get_latest_event(self):
    #     if self.events_profile.count() > 0:
    #         return self.event.all()[0]
    #     return None

    def count_events(self):
        return self.events_profile.count()

    def __str__(self):
        return self.group.name

    def get_absolute_url(self):
        return reverse('events_index', args=[self.group.name])

    def get_search_url(self):
        return reverse('events_search', args=[self.group.name])

        # def get_edit_url(self):
        #     return reverse('forum_profile_edit', args=[self.group.name])


class Settings(models.Model):
    num_events = models.PositiveSmallIntegerField(_('Число событий на страницу'), default=10)
    is_member_edit = models.BooleanField(_('Разрешено редактирование события'), default=False)
    is_member_create = models.BooleanField(_('Разрешено создавать события'), default=True)

    class Meta:
        verbose_name = _("Настройка события группы")
        verbose_name_plural = _("Настройки событий групп")

    def __str__(self):
        return "Настройки событий группы {}".format(self.events_profile.group.name)


class Event(TimeStampedModel):
    profile = models.ForeignKey(GroupEvents, related_name='events')
    type = models.IntegerField(_('Тип события'), choices=TYPE_EVENTS, blank=False, null=False)
    name = models.CharField(_("Тема"), max_length=100, null=False)
    description = models.TextField(_("Описание"), blank=True)
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='event_followers')
    start_ts = models.DateTimeField(_('Начало'), blank=False, null=False)
    closed = models.BooleanField(_('Закрыть'), default=False)
    hidden = models.BooleanField(_('Скрыть'), default=False)

    class Meta:
        ordering = ['-start_ts']
        get_latest_by = "created"
        verbose_name_plural = _("События")
        verbose_name = _("Событие")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('event_detail', args=[self.profile.group.name, self.pk])

    def get_remove_url(self):
        return reverse('event_remove', args=[self.profile.group.name, self.pk])

    def get_edit_url(self):
        return reverse('event_edit', args=[self.profile.group.name, self.pk])
