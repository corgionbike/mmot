import random

from django.core.exceptions import PermissionDenied
from django.http import JsonResponse
from django.utils.translation import ugettext

from .models import InviteKey


def invite_site_key_get(request):
    if request.is_ajax():
        keys = InviteKey.objects.filter(state=1)
        count = len(keys)
        if not count:
            return JsonResponse({'key': ugettext('Ключи закончились!')})
        else:
            index = random.randint(0, count - 1)
            key = keys[index]
            return JsonResponse({'key': key.id})
    else:
        raise PermissionDenied
