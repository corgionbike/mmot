from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


def preview_bbcode(request):
    if request.is_ajax():
        return render(request, 'editor/preview_bbcode.html', {'body': request.POST['textarea']})
    else:
        raise PermissionDenied


def preview_html(request):
    if request.is_ajax():
        return render(request, 'editor/preview_html.html', {'body': request.POST['textarea']})
    else:
        raise PermissionDenied