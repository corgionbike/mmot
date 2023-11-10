from django.db import models
from group.models import GroupProfile
from model_utils.models import TimeStampedModel
from cat_game.models import Game
from django.conf import settings
from django.utils.translation import ugettext_lazy as _


# Create your models here.
# class BankProfile(TimeStampedModel):
#
#     owner = models.OneToOneField(GroupProfile, related_name='bank_profile', verbose_name=_('владелец'))
#     game = models.ForeignKey(Game, verbose_name=_('игра'), related_name='bank_profile', blank=False, null=True)
#     is_block = models.BooleanField(_('блокировка счета'), default=False)
#
#     class Meta:
#         db_table = 'bank_profile'
#         verbose_name_plural = _("счета")
#         verbose_name = _("счет")
#         ordering = ['created', 'owner']
#
#     def __str__(self):
#         return "{0}".format(self.owner.name)