import json
from pprint import pprint
import os
import random

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def test_json_twitch():
    with open(os.path.join(BASE_DIR, 'api\\streams.json'), encoding='utf-8') as data_file:
        data = json.load(data_file)
    # pprint(data)
    streams = data.get("streams", None)
    if streams and isinstance(streams, list):
        stream_info = streams[random.randrange(0, len(streams), 1)]
        channel = stream_info.get("channel", None)
        if channel:
            game = channel.get("status", "Нет игры")
            title = channel.get("name", "mmotimesru")
            text = channel.get("status", "Описание не найдено")

        pprint(channel)


def test_json_hitgame():
    with open(os.path.join(BASE_DIR, 'api\\hitgame.json'), encoding='utf-8') as data_file:
        data = json.load(data_file)
    # pprint(data)
    featured = data.get("media_featured_list", None)
    if featured and isinstance(featured, list):
        stream_info_rnd = featured[random.randrange(0, len(featured), 1)]
        stream = stream_info_rnd.get("stream", None)
        if stream:
            channel = stream.get("channel", None)
            if channel:
                game = channel.get("game", "Нет игры")
                title = stream_info_rnd.get("title", "mmotimesru")
                text = stream_info_rnd.get("text", "Описание не найдено")

        pprint(stream_info_rnd)


# test_json_hitgame()
test_json_twitch()