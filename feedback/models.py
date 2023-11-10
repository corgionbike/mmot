from django.db import models
from django.utils.translation import ugettext_lazy as _
from model_utils import Choices
from model_utils.fields import StatusField
from model_utils.models import TimeStampedModel, StatusModel
from sorl.thumbnail import ImageField

TYPES = (
    (0, _('Общие вопросы')),
    (1, _('Ошибки на сайте')),
    (2, _('Отзывы и предложения')),
)


class Feedback(TimeStampedModel):
    STATUS = Choices(_('Открыта'), _('Закрыта'), _('В работе'), _('Отклонена'))
    status = StatusField(_('статус'))
    name = models.CharField(max_length=50, verbose_name=_('имя'), null=True, blank=False)
    type = models.IntegerField(_('категория обращения'), choices=TYPES, default=0, blank=True, null=True)
    subject = models.CharField(max_length=100, verbose_name=_('тема'), null=False)
    email = models.EmailField('Email', null=True)
    text = models.TextField(_('сообщение'), null=True)
    attach = ImageField(verbose_name=_('вложения'), upload_to='feedback', blank=True, null=True)

    class Meta:
        db_table = 'feedback'
        verbose_name = _('Заявка')
        verbose_name_plural = _('Заявки')
        ordering = ['created']

    def __str__(self):
        return self.subject
