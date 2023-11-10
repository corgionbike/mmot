import datetime
from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from ...models import Message


class Command(BaseCommand):
    # args = '<minimum age in days (e.g. 30)>'
    help = (
        'Deletes messages that have been marked as deleted by both the sender '
        'and recipient. You must provide the minimum age in days.'
    )

    def add_arguments(self, parser):
        parser.add_argument('days', nargs=1, type=int)

    def handle(self, *args, **options):
        if 'days' in options:
            # self.stdout.write("{}".format(options['days'][0]))
            the_date = timezone.now() - datetime.timedelta(days=options['days'][0])
            Message.objects.filter(
                recipient_deleted_at__lte=the_date,
                sender_deleted_at__lte=the_date,
            ).delete()
