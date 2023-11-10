from django.core.exceptions import PermissionDenied
from django.shortcuts import render, get_object_or_404
from django.views.decorators.cache import cache_control
from django.core.cache import cache
from .models import Game
from django.http import Http404, JsonResponse


@cache_control(must_revalidate=True)
def game_detail(request, id):
    if not request.is_ajax():
        raise PermissionDenied
    try:
        cache_key = "cache.game.{}".format(id)
        game = cache.get_or_set(cache_key, Game.objects.get(pk=id))
    except Game.DoesNotExist:
        raise Http404
    return render(request, 'cat_game/game_card.html', {'game': game})


