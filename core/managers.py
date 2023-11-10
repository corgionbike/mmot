from django.db.models import Q
from django.db.models import QuerySet
from django.utils import timezone


class LiveQuerySet(QuerySet):
    def live(self, statuses=['published']):
        today = timezone.now()
        return self.filter(status__in=statuses). \
            filter(Q(start__lte=today) | Q(start__isnull=True)). \
            filter(Q(end__gte=today) | Q(end__isnull=True))
