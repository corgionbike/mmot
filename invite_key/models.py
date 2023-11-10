import uuid

from django.conf import settings
from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.models import StatusModel, TimeStampedModel

from cat_game.models import Game

STATE_KEY = (
    (0, _('Погашен')),
    (1, _('Активен')),)


class InviteKey(TimeStampedModel):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.OneToOneField(settings.AUTH_USER_MODEL, verbose_name=_("владелец"), null=True, blank=True, related_name='site_invite_key')
    state = models.IntegerField(verbose_name=_("состояние"), default=1, choices=STATE_KEY)

    class Meta:
        db_table = 'site_invite_key'
        ordering = ['state', '-created']
        verbose_name_plural = _("Пригласительные ключи")
        verbose_name = _("Пригласительный ключ")

    def __str__(self):
        return self.id.hex


class GameInviteKey(TimeStampedModel):

    key = models.CharField(_('игровой ключ'), max_length=100, unique=True, blank=False, null=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=_("владелец"), null=True, blank=True, related_name='game_invite_key')
    game = models.ForeignKey(Game, verbose_name=_("игра"), null=True, blank=True, related_name='game_invite_key')
    state = models.IntegerField(verbose_name=_("состояние"), default=1, choices=STATE_KEY)

    class Meta:
        db_table = 'game_invite_key'
        ordering = ['state', '-created']
        verbose_name_plural = _("Игровые ключики")
        verbose_name = _("Игровой ключ")

    def __str__(self):
        return self.key

