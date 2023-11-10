from .twitch import TWITCH_CLIENT_ID


class TwitchConnect():
    url = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id={}&redirect_uri={}&scope=channel_editor&state={}"

    def __init__(self, client_id=None, redirect_uri="https://mmotimes.ru/streams/profile/"):
        self.client_id = client_id
        if not client_id:
            self.client_id = TWITCH_CLIENT_ID
        self.redirect_uri = redirect_uri

    def get_connect_url(self, csrf):
        return self.url.format(self.client_id, self.redirect_uri, csrf)