from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from notifications.signals import notify

from stream.models import StreamProfile


class Command(BaseCommand):
    help = 'Auto active streaming broadcasting'

    def add_arguments(self, parser):
        parser.add_argument('-start',
                            action='store_true',
                            dest='start',
                            default=True,
                            help='Active streaming broadcasting')

        parser.add_argument('-stop',
                            action='store_true',
                            dest='stop',
                            default=True,
                            help='Stop streaming broadcasting')

    def handle(self, *args, **options):
        try:
            profiles = StreamProfile.objects.filter(auto_broadcasting=True).select_related('user', 'preview')
            # self.stdout.write('%s' % options['start'])
            today = timezone.now()
            if profiles:
                users = []
                for profile in profiles:
                    if profile.preview:
                        if options['start']:
                            if not profile.preview.status:
                                if (profile.preview.start_ts < today) and (profile.preview.end_ts > today):
                                    profile.preview.status = True
                                    profile.preview.save()
                                    notify.send(profile.preview, recipient=profile.user,
                                                verb=_('трансляция активирована автоматически!'), level='')
                                    users.append(profile.user.username)
                        if options['stop']:
                            if profile.preview.status:
                                if profile.preview.end_ts < today:
                                    profile.preview.status = False
                                    profile.preview.save()
                                    notify.send(profile.preview, recipient=profile.user,
                                                verb=_('трансляция остановлена автоматически!'), level='')
                                    users.append(profile.user.username)
                self.stdout.write('Successfully for "%s"' % ', '.join(users))
        except Exception as e:
            raise CommandError(e)
