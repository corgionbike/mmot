from django.core.urlresolvers import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils.fields import SplitField
from model_utils.models import StatusModel, TimeStampedModel, TimeFramedModel
from taggit.managers import TaggableManager
from core.models import ArticleAbstractModel
# from markitup.widgets import MarkItUpWidget


class ArticleModel(ArticleAbstractModel):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    body = SplitField()
    tags = TaggableManager()

    class Meta:
        ordering = ['-start']
        verbose_name_plural = _("Новости")
        verbose_name = _("Новость")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('news_detail', args=[self.slug])


