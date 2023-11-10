from django.db.models import Q
from django.db.models import QuerySet
from django.utils import timezone


class LiveQuerySet(QuerySet):

    def live(self, status=True):
        today = timezone.now()
        return self.filter( (Q(status=status) & Q(is_postpone=False)) | (Q(start_ts__lt=today) & Q(end_ts__gt=today) & Q(is_postpone=False) ))

    def planned(self, status=False):
        today = timezone.now()
        return self.filter( Q(status=status) & (Q(end_ts__gt=today) & Q(start_ts__gt=today)))

