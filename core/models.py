from django.core.exceptions import ValidationError
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from model_utils import Choices
from django.db import models
from model_utils.models import StatusModel, TimeStampedModel, TimeFramedModel

from .managers import LiveQuerySet


class ArticleAbstractModel(StatusModel, TimeStampedModel, TimeFramedModel):
    STATUS = Choices('published', 'draft')

    objects = LiveQuerySet.as_manager()

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        """Set the start date for non-draft items if it hasn't been set already."""
        if self.status != self.STATUS.draft and self.start is None:
            self.start = timezone.now()
        super().save(*args, **kwargs)

    def clean(self):
        super().clean()
        if self.start and self.end and self.start > self.end:
            raise ValidationError(_("Дата окончания раньше даты начала."))

    def is_live(self, statuses=['published']):
        if self.status not in statuses:
            return False
        if self.start and self.start > timezone.now():
            return False
        if self.end and self.end < timezone.now():
            return False
        return True

    @property
    def staff_preview(self):
        """
        For example, in the example_project we have this snippet:
        .. code-block:: django
            {% if article.staff_preview %}
                <div class="label label-warning">This is a preview</div>
            {% endif %}
        """

        return self.status == self.STATUS.draft


        # class PermissionProxy(Permission):
        #
        #     class Meta:
        #         proxy = True
        #
        #     def __str__(self):
        #         return "%s (%s)" % (
        #             six.text_type(self.name), six.text_type(self.content_type.app_label))
