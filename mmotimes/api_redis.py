import time
from datetime import datetime

import hashlib
import redis
from django.conf import settings

ONLINE_LAST_MINUTES = getattr(settings, 'ONLINE_LAST_MINUTES', 10)
ONLINE_DB_REDIS_SETTING = getattr(settings, 'ONLINE_DB_REDIS_SETTING', {'host': 'localhost', 'port': 6379, 'db': 15})
WATCHER_DB_REDIS_SETTING = getattr(settings, 'WATCHER_DB_REDIS_SETTING', {'host': 'localhost', 'port': 6379, 'db': 15})

BOTS = [
    'Googlebot',
    'Slurp',
    'Yahoo',
    'Yandex',
    'Mail',
    'Aport',
    'StackRambler',
    'MSNBot',
    'Teoma',
    'Lycos',
    'WebAlta'
]


class OnlineNowRedisApi():
    def __init__(self, *args, **kwargs):
        self.redis = redis.StrictRedis(**ONLINE_DB_REDIS_SETTING)

    def mark_online(self, uid):
        try:
            now = int(time.time())
            expires = now + ONLINE_LAST_MINUTES * 60
            all_users_key = 'online:users.%d' % (now // 60)
            user_key = 'online:user.activity.%s' % uid
            cmd = self.redis.pipeline()
            cmd.sadd(all_users_key, uid)
            cmd.set(user_key, now)
            cmd.expireat(all_users_key, expires)
            cmd.expireat(user_key, expires)
            cmd.execute()
        except:
            pass

    def get_user_last_activity(self, uid):
        try:
            last_active = self.redis.get('online:user.activity.%s' % uid)
            if last_active is None:
                return None
            return datetime.utcfromtimestamp(int(last_active))
        except:
            pass

    def get_online_users(self):
        try:
            current = int(time.time()) // 60
            minutes = range(ONLINE_LAST_MINUTES)
            b_online_users = self.redis.sunion(['online:users.%d' % (current - x) for x in minutes])
            return [int(id) for id in b_online_users]
        except:
            pass

    def get_count_online_users(self):
        try:
            current = int(time.time()) // 60
            minutes = range(ONLINE_LAST_MINUTES)
            return len(self.redis.sunion(['online:users.%d' % (current - x) for x in minutes]))
        except:
            return -1

    def is_online_user(self, uid):
        last_active = self.redis.get('online:user.activity.%s' % uid)
        if last_active is None:
            return False
        return True


class PostViewsCount():
    key_users_model_id = "views:{}:{}:users"

    def __init__(self):
        self.redis = redis.StrictRedis(**WATCHER_DB_REDIS_SETTING)

    def save(self, request, id, model='guide'):
        try:
            key_users = self.key_users_model_id.format(model, id)
            remote_addr = request.META.get('REMOTE_ADDR', '127.0.0.1')
            agent = request.META.get('HTTP_USER_AGENT', None)
            if self.check_agent(agent):
                return self
            value = "{}:{}".format(remote_addr, agent).encode('utf-8')
            hash = hashlib.md5(value).hexdigest()
            if not self.redis.sismember(key_users, hash):
                self.add(key_users, hash)
            return self
        except Exception:
            pass

    @staticmethod
    def check_agent(agent):
        for bot in BOTS:
            if bot.lower() in agent.lower():
                return True
        return False

    def add(self, key_users, value):
        self.redis.sadd(key_users, value)

    def delete(self, id, model):
        key_users = self.key_users_model_id.format(model, id)
        self.redis.spop(key_users)

    def count(self, id, model='guide'):
        try:
            return self.redis.scard(self.key_users_model_id.format(model, id))
        except:
            return -1
