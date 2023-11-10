from django.db import models
from django.utils.translation import ugettext_lazy as _
from sorl.thumbnail import ImageField
import hashlib
from core.models import ArticleAbstractModel
from django.core.urlresolvers import reverse
import os
CROPES = (
    (0, _('center')),
    (1, _('top')),
    (2, _('bottom')),
    (3, _('right')),
    (4, _('left')),

)


def slider_directory_path(instance, filename):
    file, file_extension = os.path.splitext(filename)
    return 'slider/{0}_{1}{2}'.format(instance.id, hashlib.md5(file.encode('utf-8')).hexdigest(), file_extension)


class SliderModel(ArticleAbstractModel):
    title = models.CharField(_('название'), max_length=100)
    description = models.TextField(_('описание'), max_length=300, null=True, blank=True)
    background = ImageField(verbose_name=_('фон'), upload_to=slider_directory_path, blank=True, null=True)
    crop = models.IntegerField(_('обрезка'), choices=CROPES, default=0, blank=False, null=True)
    quality = models.PositiveIntegerField(_('качество'), default=80, blank=True, null=True)
    is_video = models.BooleanField(_('видео'), default=False)
    link = models.URLField(_('сылка на видео'), blank=True, null=True)

    class Meta:
        ordering = ['-start']
        verbose_name_plural = _("Слайды")
        verbose_name = _("Слайд")

    def __str__(self):
        return self.title

    def get_play_url(self):
        return reverse('slider_play', args=[self.id])