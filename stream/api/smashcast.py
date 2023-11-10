import json
import random
import urllib.request

from .twitch import StreamRobot


def check_id(sid=''):
    if not sid:
        return False
    req = urllib.request.Request(url='https://api.smashcast.tv/media/status/{}'.format(sid))
    try:
        responce = urllib.request.urlopen(req)
        if responce.status == 200:
            with responce as r:
                j = json.loads(r.read().decode('utf-8'))
            if j:
                return True
            return False
    except:
        return False


class SmashcastStreamBot(StreamRobot):

    def get_streams_info(self):
        req = urllib.request.Request(url="{0}?liveonly={1}&language={2}".format(self.url, self.stream_type, self.language))
        try:
            responce = urllib.request.urlopen(req)
            if responce.status == 200:
                with responce as r:
                    data = json.loads(r.read().decode('utf-8'))
                    livestream = data.get("livestream", None)
                    if livestream and isinstance(livestream, list):
                        for bot in self.users:
                            rnd_indx = self.get_index_stream(len(livestream))
                            livestream_info = livestream[rnd_indx]
                            self.streams_info[bot] = {
                                "game": livestream_info.get("category_name", self.game),
                                "name": livestream_info.get("media_name", self.name),
                                "status": livestream_info.get("media_status", self.status),
                                "title": livestream_info.get("media_status", self.title),
                                "text": livestream_info.get("media_status", self.text)
                            }
                return True
        except:
            return False