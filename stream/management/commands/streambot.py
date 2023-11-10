from django.core.management.base import BaseCommand, CommandError

from ...api import twitch, smashcast


class Command(BaseCommand):
    help = 'Stream Robot v1.0 for Twitch'

    def add_arguments(self, parser):
        parser.add_argument('-go',
                            action='store_true',
                            dest='go',
                            default=True,
                            help='Active stream bot')

    def handle(self, *args, **options):
        try:
            if options['go']:
                twitch.TwitchStreamBot(["bot1", "bot2", "izubrishe"])
                smashcast.SmashcastStreamBot(["bot3", "bot4", "Boston"],
                                             url="https://api.smashcast.tv/media/live/list",
                                             stream_type=True)
                self.stdout.write('StreamBot GO GO')
        except Exception as e:
            raise CommandError(e)
