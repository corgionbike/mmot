from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.urlresolvers import reverse
from django.core.validators import MinLengthValidator, validate_slug
from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel

import group
from cat_game.models import Game
from group.models import GroupProfile
from .managers import LiveQuerySet

PROVIDERS = (
    (0, 'Twitch.tv'),
    (1, 'Youtube.com'),
    (2, 'Cybergame.tv'),
    (3, 'Smashcast.tv'),
)


class StreamPreview(TimeStampedModel):
    status = models.BooleanField(_('статус'), default=False)
    sid = models.CharField(_('идентификатор'), max_length=50, unique=False, blank=True, null=True,
                           validators=[validate_slug])
    provider = models.IntegerField(_('провайдер'), choices=PROVIDERS, blank=True, null=True)
    name = models.CharField(_('наименование'), max_length=100, unique=False, blank=False, null=False)
    game = models.ForeignKey(Game, verbose_name=_('игра'), related_name='stream_preview',
                             blank=True, null=True)
    game_user = models.CharField(_('игра пользователя'), max_length=100, unique=False, blank=True, null=True)
    preview_url = models.URLField(_('ссылка на превью'), max_length=100, blank=True, null=True)
    start_ts = models.DateTimeField(_('начало'), blank=False, null=False)
    end_ts = models.DateTimeField(_('окончание'), blank=False, null=False)
    description = models.TextField(_('описание'), max_length=300, null=False, blank=False,
                                   validators=[MinLengthValidator(10)])
    is_postpone = models.BooleanField(_('отсрочить трансляцию'), default=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, verbose_name=_('стример'), related_name='stream_preview',
                                blank=False)
    group = models.ForeignKey(GroupProfile, verbose_name=_('группа'), related_name='stream_preview',
                              blank=True, null=True)

    class Meta:
        db_table = 'stream_preview'
        ordering = ['status', 'start_ts', 'name']
        verbose_name_plural = _("стрим анонсы")
        verbose_name = _("стрим анонс")

    objects = LiveQuerySet.as_manager()

    def __str__(self):
        return self.name

    def clean(self):
        super().clean()
        if self.start_ts and self.end_ts and self.start_ts >= self.end_ts:
            raise ValidationError(_("Дата окончания раньше или равна дате начала!"))
            # validate_start_ts(self.start_ts)

    def get_absolute_url(self):
        return reverse('stream_channel', args=[self.user.username])

    def get_liveview_url(self):
        return reverse('stream_liveview', args=[self.user.username])

    def get_preview_detail_url(self):
        return reverse('preview_detail', args=[self.pk])


class StreamProfile(TimeStampedModel):
    sid = models.CharField(_('идентификатор'), max_length=50, unique=False, blank=True, null=True,
                           validators=[validate_slug])
    provider = models.IntegerField(_('провайдер'), choices=PROVIDERS, blank=False, null=False)
    description = models.TextField(_('описание'), max_length=300, null=True, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, verbose_name=_('стример'), related_name='stream_profile',
                                blank=False)
    is_block = models.BooleanField(_('блокировка стрим профиля'), default=False, )
    auto_broadcasting = models.BooleanField(_('автоактивация канала'), default=False)
    preview = models.OneToOneField(StreamPreview, verbose_name=_('анонс трансляции'), related_name='stream_profile',
                                   blank=True, null=True, on_delete=models.SET_NULL)

    class Meta:
        db_table = 'stream_profile'
        ordering = ['provider']
        verbose_name_plural = _("стрим профиля")
        verbose_name = _("стрим профиль")

    def __str__(self):
        return self.user.username

    def has_preview(self):
        if self.preview:
            return True
        return False

    def get_absolute_url(self):
        return reverse('stream_profile', args=[])

    def get_url_create(self):
        return reverse('stream_profile_create', args=[])

    def get_url_edit(self):
        return reverse('stream_profile_edit', args=[])

    def get_url_remove(self):
        return reverse('stream_profile_del', args=[])

    def get_url_my_stream(self):
        return reverse('stream_channel', args=[self.user.username])


class StreamTeamCounter(models.Model):
    name_red = models.CharField(_('Имя красной команды'), default='Красные', max_length=10, blank=False, null=False)
    name_blue = models.CharField(_('Имя синей команды'), default='Синие', max_length=10, blank=False, null=False)
    count_red = models.IntegerField(_('счет красных'), default=0, null=True)
    count_blue = models.IntegerField(_('счет синих'), default=0, null=True)
    profile = models.OneToOneField(StreamProfile, verbose_name=_('командный счетчик'), related_name='team_counter')

    class Meta:
        db_table = 'stream_team_counter'
        verbose_name_plural = _("командный счетчик")
        verbose_name = _("командный счетчик")

    def blue_count_inc(self):
        self.count_blue += 1
        self.save()

    def red_count_inc(self):
        self.count_red += 1
        self.save()

    def red_count_dec(self):
        self.count_red -= 1
        self.save()

    def blue_count_dec(self):
        self.count_blue -= 1
        self.save()

    def reset_count(self):
        self.count_red = 0
        self.count_blue = 0
        self.save()

    def __str__(self):
        return self.profile.user.username

    def get_url_team_count(self):
        return reverse('team_count_get', args=[self.profile.id])

    def get_url_team_count_reset(self):
        return reverse('team_count_reset', args=[self.profile.id])


class StreamManage(models.Model):
    chat = models.BooleanField(_('чат'), default=True)
    progress = models.BooleanField(_('линия прогресса'), default=True)
    archive = models.BooleanField(_('архив'), default=False)
    counter = models.BooleanField(_('командный счетчик'), default=False)
    profile = models.OneToOneField(StreamProfile, verbose_name=_('стрим профайл'), related_name='stream_manage')

    class Meta:
        db_table = 'stream_manage'
        verbose_name_plural = _("стрим менеджеры")
        verbose_name = _("стрим менеджер")

    def __str__(self):
        return self.profile.user.username


class StreamArchive(TimeStampedModel):
    name = models.CharField(_('название'), max_length=100, unique=False, blank=False, null=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=_('владелец'), related_name='stream_archives',
                             blank=False)
    rec_url = models.URLField(_('ссылка на запись'), max_length=100, blank=False, null=False)
    game = models.ForeignKey(Game, verbose_name=_('игра'), related_name='stream_archives', blank=False, null=False)
    description = models.TextField(_('описание'), max_length=300, null=True, blank=True)
    rec_ts = models.DateField(_('время записи'), blank=False, null=False)
    provider = models.IntegerField(_('провайдер'), choices=PROVIDERS, blank=True, null=True)

    class Meta:
        db_table = 'stream_archive'
        verbose_name_plural = _("стрим архив")
        verbose_name = _("стрим архив")

    def __str__(self):
        return self.name
