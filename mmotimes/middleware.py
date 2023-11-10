import pytz
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.utils import timezone
from django.utils.deprecation import MiddlewareMixin

from .api_redis import OnlineNowRedisApi

User = get_user_model()


def timezone_middleware(get_response):
    # One-time configuration and initialization.

    def middleware(request):
        tzname = request.session.get('django_timezone')
        if tzname:
            timezone.activate(pytz.timezone(tzname))
        else:
            timezone.deactivate()

        response = get_response(request)

        return response

    return middleware

ONLINE_THRESHOLD = getattr(settings, 'ONLINE_THRESHOLD', 60 * 5)
ONLINE_MAX = getattr(settings, 'ONLINE_MAX', 500)


class OnlineNowRedisMiddleware(MiddlewareMixin):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.redis = OnlineNowRedisApi()

    def process_request(self, request):

        if request.user.is_authenticated():
            uid = request.user.id
            self.redis.mark_online(uid)

        # Attach our modifications to the request object
        request.__class__.online_now_ids = self.redis.get_online_users()
        request.__class__.is_user_online = self.redis.is_online_user


class OnlineNowMiddleware(MiddlewareMixin):
    """
    Maintains a list of users who have interacted with the website recently.
    Their user IDs are available as ``online_now_ids`` on the request object,
    and their corresponding users are available (lazily) as the
    ``online_now`` property on the request object.
    """

    def process_request(self, request):
        # First get the index
        uids = cache.get('online-now', [])

        # Perform the multiget on the individual online uid keys
        online_keys = ['online-%s' % (u,) for u in uids]
        fresh = cache.get_many(online_keys).keys()
        online_now_ids = [int(k.replace('online-', '')) for k in fresh]

        # If the user is authenticated, add their id to the list
        if request.user.is_authenticated():
            uid = request.user.id
            # If their uid is already in the list, we want to bump it
            # to the top, so we remove the earlier entry.
            if uid in online_now_ids:
                online_now_ids.remove(uid)
            online_now_ids.append(uid)
            if len(online_now_ids) > ONLINE_MAX:
                del online_now_ids[0]

        # Attach our modifications to the request object
        request.__class__.online_now_ids = online_now_ids

        # Set the new cache
        cache.set('online-%s' % (request.user.pk,), True, ONLINE_THRESHOLD)
        cache.set('online-now', online_now_ids, ONLINE_THRESHOLD)







