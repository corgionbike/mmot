from __future__ import unicode_literals


def time_zones_list(request):
    """
        Добавляет список временных зон

    """
    import pytz
    return {'TIME_ZONES_LIST': pytz.common_timezones}


def online_user_list(request):
    """
        Добавляет список онлайн пользователей

    """
    return {'ONLINE_USER_LIST': request.online_now_ids}
