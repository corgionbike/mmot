from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel
from sorl.thumbnail import ImageField
import hashlib
from cat_game.models import Game
from stream.models import StreamProfile
from group.models import GroupProfile
import os


class GameCharacter(TimeStampedModel):
    name = models.CharField(_('имя'), max_length=20, null=False, blank=False)
    game = models.ForeignKey(Game, verbose_name=_('игра'), related_name='game_characters', blank=True, null=True)
    user = models.ForeignKey('UserProfile', verbose_name=_('пользовательский профиль'), related_name='game_characters')
    group = models.ForeignKey(GroupProfile, verbose_name=_('группа'), related_name='game_characters', blank=True,
                              null=True)

    class Meta:
        db_table = 'game_character'
        verbose_name_plural = _("игровые персонажи")
        verbose_name = _("игровой персонаж")

    def __str__(self):
        return self.name


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    file, file_extension = os.path.splitext(filename)
    return 'avatars/user_{0}/{1}{2}'.format(instance.id, hashlib.md5(file.encode('utf-8')).hexdigest(), file_extension)


class UserProfile(TimeStampedModel, AbstractUser):
    avatar = ImageField(verbose_name=_('аватар'), upload_to=user_directory_path, blank=True, null=True)
    description = models.TextField(_('о себе'), max_length=300, default='', null=True, blank=True)
    block_invites = models.BooleanField(_('не принимать приглашения в группы'), default=False)
    userbar = models.CharField(_('подпись на форуме'), max_length=100, null=True, blank=True)

    class Meta:
        db_table = 'user_profile'
        verbose_name_plural = _("пользователи")
        verbose_name = _("профиль пользователя")

    def is_block_invites(self):
        return self.block_invites

    def is_has_group(self):
        return hasattr(self, 'group_profile')

    def get_group(self):
        if self.is_has_group():
            return self.group_profile
        return None

    def is_member_group(self):
        return hasattr(self, 'group_members')

    def is_has_stream(self):
        return hasattr(self, "stream_profile")

    def get_user_card_url(self):
        return reverse('profile_user_card', args=[str(self.pk)])

    def get_absolute_url(self):
        return reverse('user_profile', args=[])

    def get_group_member_exclude_url(self):
        return reverse('group_member_exclude', args=[str(self.pk)])

    def get_group_member_exclude_no_xhr_url(self):
        return reverse('group_member_exclude', args=[str(self.pk), "0"])

    # def get_group_moderator_exclude_url(self):
    #     return reverse('group_moderator_exclude', args=[str(self.pk)])

    def get_group_send_invite_member_url(self):
        return reverse('group_send_invite_member', args=[str(self.pk)])


class UserProfileSetting(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='user_profile_setting')
    stream_records = models.PositiveIntegerField(_('Количество архивных стрим записей'), default=10)

    class Meta:
        db_table = 'user_profile_setting'
        verbose_name_plural = _("Настройки профилей")
        verbose_name = _("Настройки профиля")

    def __str__(self):
        return self.user.get_username()



        # class TaggedItem(models.Model):
        #     karma = models.PositiveIntegerField(_('Карма'))
        #     content_type = models.ForeignKey(ContentType)
        #     object_id = models.PositiveIntegerField()
        #     content_object = GenericForeignKey('content_type', 'object_id')
