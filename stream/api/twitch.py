import json
import random
import urllib.request
import urllib.parse
from django.core.cache import cache
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.utils.html import strip_tags

User = get_user_model()

TWITCH_CLIENT_ID = "sntjt32ttopzzv7uxi4foyvtzeyu5id"


def check_id(sid=''):
    if not sid:
        return False
    req = urllib.request.Request(url='https://api.twitch.tv/kraken/streams/{0}'.format(sid, ))
    req.add_header('Accept', 'application/vnd.twitchtv.v3+json')
    req.add_header('Client-ID', TWITCH_CLIENT_ID)
    try:
        responce = urllib.request.urlopen(req)
        if responce.status == 200:
            # with responce as r:
            #     j = json.loads(r.read().decode('utf-8'))
            #     print(j.get('status'))
            return True
    except Exception as e:
        print(e)
        return False


class StreamRobot(object):
    cache_key_streams = 'cache.{}.bots.streams'

    def __init__(self, users=[], client_id=TWITCH_CLIENT_ID,
                 url="https://api.twitch.tv/kraken/streams", limit=50, offset=0,
                 language="ru", stream_type="live", game=""):
        self.users = users
        self.client_id = client_id
        self.limit = limit
        self.offset = offset
        self.game = "Нет игры"
        self.name = "mmotimesru"
        self.title = "Название не найдено"
        self.text = "Описание не найдено"
        self.status = "Не найден"
        self.stream_type = stream_type
        self.language = language
        self.streams_info = {}
        self.game = game
        if url:
            self.url = url
        cache.set(self.cache_key_streams.format(self.__class__.__name__), set())
        if self.get_streams_info():
            self.create_stream()

    def __del__(self):
        cache.delete(self.cache_key_streams.format(self.__class__.__name__))

    def add_index_2cache(self, index):
        cache_list = self.get_indexes_from_cache()
        cache_list.add(index)
        cache.set(self.cache_key_streams.format(self.__class__.__name__), cache_list)

    def get_indexes_from_cache(self):
        return cache.get(self.cache_key_streams.format(self.__class__.__name__))

    def get_streams_info(self):
        pass

    def get_index_stream(self, size, ticks=5):
        rnd_indx = 0
        for i in range(ticks):
            cache_indexes = self.get_indexes_from_cache()
            rnd_indx = random.randrange(0, size, 1)
            self.add_index_2cache(rnd_indx)
            if not rnd_indx in cache_indexes:
                break
        return rnd_indx

    def create_stream(self):
        bots = User.objects.select_related('stream_preview', 'stream_profile', ).filter(username__in=self.users)
        # print(self.streams_info)
        for bot in bots:
            stream_profile = bot.stream_profile
            stream_profile.sid = self.streams_info[bot.username]["name"]
            # print(self.streams_info.get(bot.username)["name"])
            stream_profile.save()
            stream_preview = bot.stream_preview
            stream_preview.game_user = self.streams_info.get(bot.username)["game"]
            stream_preview.name = self.streams_info.get(bot.username).get("title", self.title)
            stream_preview.stream_profile = stream_profile
            stream_preview.description = "{}\n{}".format("Внимание! Трансляция отобрана случайным образом.",
                                                         strip_tags(self.streams_info.get(bot.username)["text"]))
            stream_preview.start_ts = timezone.now() + timezone.timedelta(minutes=1)
            stream_preview.end_ts = stream_preview.start_ts + timezone.timedelta(hours=1)
            stream_preview.save()
        if len(bots):
            return True


class TwitchStreamBot(StreamRobot):
    url = "https://api.twitch.tv/kraken/streams?{}"

    def get_streams_info(self):

        params = urllib.parse.urlencode(
            {'limit': self.limit, 'offset': self.offset, 'language': self.language,
             'stream_type': self.stream_type, 'game': self.game})
        req = urllib.request.Request("{}?{}".format(self.url, params))
        req.add_header('Accept', 'application/vnd.twitchtv.v5+json')
        req.add_header('Client-ID', self.client_id)
        try:
            responce = urllib.request.urlopen(req)
            if responce.status == 200:
                with responce as r:
                    data = json.loads(r.read().decode('utf-8'))
                    streams = data.get("streams", None)
                    if streams and isinstance(streams, list):
                        for bot in self.users:
                            rnd_indx = self.get_index_stream(len(streams))
                            stream_info = streams[rnd_indx]
                            channel = stream_info.get("channel", None)
                            if channel:
                                self.streams_info[bot] = {
                                    "game": channel.get("game", self.game),
                                    "name": channel.get("name", self.name),
                                    "status": channel.get("status", self.status),
                                    "title": channel.get("status", self.title),
                                    "text": channel.get("status", self.text),
                                }

                return True
        except Exception as e:
            return False






