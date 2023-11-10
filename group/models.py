import hashlib

from django.conf import settings
from django.core.urlresolvers import reverse
from django.core.validators import MinLengthValidator
from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel
from sorl.thumbnail import ImageField
import os
from cat_game.models import Game


def emblems_directory_path(instance, filename):
    file, file_extension = os.path.splitext(filename)
    return 'emblems/group_{0}/{1}{2}'.format(instance.id, hashlib.md5(file.encode('utf-8')).hexdigest(), file_extension)


def background_directory_path(instance, filename):
    file, file_extension = os.path.splitext(filename)
    return 'background/group_{0}/{1}{2}'.format(instance.id, hashlib.md5(filename.encode('utf-8')).hexdigest(), file_extension)


class GroupProfile(TimeStampedModel):
    TYPES = (
        (0, _('Группа')),
        (1, _('Отряд')),
        (2, _('Команда')),
        (3, _('Клан')),
        (4, _('Гильдия')),
        (5, _('Клуб')),
        (6, _('Легион')),
    )

    PRIVACY_TYPES = (
        (0, _('Закрытая')),
        (1, _('Публичная')),
    )

    name = models.CharField(_('название'), max_length=15, unique=True, blank=False, null=False)
    owner = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='group_profile', verbose_name=_('владелец'))
    emblem = ImageField(verbose_name=_('эмблема'), upload_to=emblems_directory_path, blank=True, null=True)
    background = ImageField(verbose_name=_('фоновое изображение'), upload_to=background_directory_path, blank=True,
                            null=True)
    tile_background = models.BooleanField(_('замостить фон'), default=False)
    type = models.IntegerField(_('тип'), choices=TYPES, blank=False, null=False)
    description = models.TextField(_('описание'), max_length=600, null=False, blank=False,
                                   validators=[MinLengthValidator(10)])
    motto = models.CharField(_('статус'), max_length=100, unique=False, blank=True, null=True,
                             validators=[MinLengthValidator(3)])
    game = models.ForeignKey(Game, verbose_name=_('игра'), related_name='group_profile', blank=True, null=True)
    game_group = models.CharField(_('игра группы'), max_length=100, unique=False, blank=True, null=True)
    privacy = models.IntegerField(_('приватность группы'), choices=PRIVACY_TYPES, default=1, blank=False, null=False)
    num_members = models.IntegerField(default=0)
    is_block = models.BooleanField(_('блокировка группы'), default=False)

    class Meta:
        db_table = 'group_profile'
        verbose_name_plural = _("кланы")
        verbose_name = _("клан")
        ordering = ['created', 'name']

    def __str__(self):
        return "{0} {1}".format(self.get_type_display(), self.name)

    def count_members(self):
        return self.group_members.count()

    def get_forum(self):
        return self.forum

    def get_all_members(self):
        return self.group_members.filter().select_related('user')

    def get_all_moderators(self):
        return self.group_moderators.filter().select_related('user')

    def is_user_moderator(self, user):
        return self.group_moderators.filter(user=user).exists()

    def is_user_member(self, user):
        return self.group_members.filter(user=user).exists()

    def is_user_owner(self, user):
        if user == self.owner:
            return True
        else:
            return False

    def get_members_url(self):
        return reverse('group_members', args=[str(self.name)])

    def get_streams_url(self):
        return reverse('group_streams', args=[str(self.name)])

    def get_members_search_url(self):
        return reverse('group_members_search', args=[str(self.name)])

    def get_absolute_url(self):
        return reverse('group_index', args=[str(self.name)])

    def get_profile_url(self):
        return reverse('group_profile', args=[])

    def get_group_card_url(self):
        return reverse('group_profile_card', args=[str(self.pk)])

    def get_group_join_url(self):
        return reverse('group_member_join', args=[str(self.pk)])

    def get_group_petition_send_url(self):
        return reverse('group_petition_send', args=[str(self.pk)])


class GroupMember(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=_('участник'), related_name='group_members')
    joined_ts = models.DateTimeField(verbose_name=_("вступил"), auto_now_add=True)
    group = models.ForeignKey(GroupProfile, verbose_name=_('группа'), related_name='group_members', null=False)

    class Meta:
        db_table = 'group_member'
        unique_together = ("user", "group")
        verbose_name_plural = _("yчастники")
        verbose_name = _("участник")
        ordering = ['joined_ts']

    def __str__(self):
        return self.user.username


class GroupModerator(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=_('модератор'), related_name='group_moderator')
    joined_ts = models.DateTimeField(verbose_name=_("назначен"), auto_now_add=True)
    group = models.ForeignKey(GroupProfile, verbose_name=_('группа'), related_name='group_moderators', null=False)

    class Meta:
        db_table = 'group_moderator'
        unique_together = ("user", "group")
        verbose_name_plural = _("модераторы")
        verbose_name = _("модератор")
        ordering = ['joined_ts']

    def __str__(self):
        return self.user.username


class GroupInvite(TimeStampedModel):
    TYPES = (
        (0, _('Приглашение')),
        (1, _('Заявка')),)

    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='group_invites', verbose_name=_('получатель'),
                                  null=False)
    send_ts = models.DateTimeField(verbose_name=_("отправлено"), auto_now_add=True)
    description = models.TextField(_('описание'), max_length=100, null=True, blank=True,
                                   validators=[MinLengthValidator(10)])
    group = models.ForeignKey(GroupProfile, verbose_name=_('группы'), related_name='group_invites', null=False)
    type = models.IntegerField(_('тип'), choices=TYPES, blank=False, null=False, default=0)

    class Meta:
        db_table = 'group_invite'
        unique_together = ('recipient', 'group', 'type')
        verbose_name_plural = _('заявки')
        verbose_name = _('заявка')
        ordering = ['-send_ts']

    def __str__(self):
        return "{0} {1}#{2}".format(self.get_type_display(), self.recipient, self.pk)

    def get_remove_url(self):
        return reverse('group_invite_remove', args=[str(self.pk)])

    def get_send_invite_repeat_url(self):
        return reverse('group_send_invite_repeat', args=[str(self.recipient.pk)])
