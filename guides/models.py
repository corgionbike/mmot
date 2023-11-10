from django.core.urlresolvers import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.fields import SplitField
from model_utils.models import StatusModel, TimeStampedModel, TimeFramedModel
from taggit.managers import TaggableManager
from model_utils import Choices
from django.conf import settings
from cat_game.models import Game


class GuideModel(StatusModel, TimeStampedModel):
    STATUS = Choices('draft', 'published', 'moderation')

    is_draft = models.BooleanField(_('черновик'), blank=False, default=True)
    title = models.CharField(_('Заголовок'), max_length=100, blank=False, null=False)
    body = SplitField()
    game = models.ForeignKey(Game, verbose_name=_('игра'), related_name='guide', blank=False, null=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='guide', verbose_name=_('автор'))
    tags = TaggableManager()

    class Meta:
        db_table = 'guide_model'
        ordering = ['-created']
        verbose_name_plural = _("Гайды")
        verbose_name = _("Гайд")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('guide_detail', args=[self.id])

    def get_remove_url(self):
        return reverse('guide_remove', args=[self.id])

    def get_edit_url(self):
        return reverse('guide_edit', args=[self.id])

    def get_detail_url(self):
        return reverse('guide_detail', args=[self.id])

    def save(self, *args, **kwargs):
        if self.is_draft:
            self.status = self.STATUS.draft
        super().save(*args, **kwargs)
