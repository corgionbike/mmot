from django.shortcuts import render
from django.core.exceptions import PermissionDenied
from .models import SliderModel
from django.http import Http404, JsonResponse
from django.core.cache import cache

cache_key_slide = 'cache.slide.{}'


def slider_play(request, id):
    if not request.is_ajax():
        raise PermissionDenied
    try:
        slide = cache.get(cache_key_slide.format(id))
        if not slide:
            slide = SliderModel.objects.get(id=id)
            cache.set(cache_key_slide.format(id), slide, 0)
    except SliderModel.DoesNotExist:
        raise Http404
    return render(request, "slider/player.html", {"slide": slide})
