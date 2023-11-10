import pytz
from django import http
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.urlresolvers import reverse
from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404, redirect
from django.shortcuts import render
from django.template import Context, Engine, TemplateDoesNotExist, loader
from django.utils import six
from django.utils.http import is_safe_url
from django.views.decorators.cache import cache_control
from django.views.decorators.csrf import requires_csrf_token
from django.views.decorators.http import require_POST
from notifications.models import Notification
from notifications.utils import *


@cache_control(must_revalidate=True)
def index(request):
    if request.is_ajax():
        raise Http404
    if request.GET.get('group'):
        return redirect(reverse('group_index', args=[str(request.GET.get('group'))]))
    if request.GET.get('stream'):
        return redirect(reverse('stream_channel', args=[str(request.GET.get('stream'))]))
    return render(request, 'index.html')


# def test(request):
#     return render(request, 'test.html')


@require_POST
def set_timezone(request):
    next = request.POST.get('next', request.GET.get('next'))
    if not is_safe_url(url=next, host=request.get_host()):
        next = request.META.get('HTTP_REFERER')
        if not is_safe_url(url=next, host=request.get_host()):
            next = '/'
    request.session['django_timezone'] = request.POST['timezone']
    return redirect(next)


def get_timezone(request):
    return render(request, 'include_set_time_zone.html', {'TIME_ZONES_LIST': pytz.common_timezones})


@login_required
@require_POST
def notice_delete(request, slug=None):
    if request.is_ajax():
        _id = slug2id(slug)
        notification = get_object_or_404(Notification, recipient=request.user, id=_id)
        if getattr(settings, 'NOTIFICATIONS_SOFT_DELETE', False):
            notification.deleted = True
            notification.save()
        else:
            notification.delete()
        return HttpResponse(status=200)
    else:
        raise Http404


@login_required
@require_POST
def notice_delete_all(request):
    if request.is_ajax():
        notifications = request.user.notifications.all()
        notifications.delete()
        return HttpResponse(status=200)
    else:
        raise Http404


@login_required
def notice_all(request):
    if request.is_ajax():
        notifications = request.user.notifications.all()
        paginator = Paginator(notifications, 5)  # Show 25 contacts per page
        try:
            notices = paginator.page(1)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            notices = paginator.page(paginator.num_pages)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            notices = paginator.page(paginator.num_pages)
        return render(request, 'notifications/list.html', {'notifications': notices})
    else:
        raise Http404


@login_required
def notice_load(request, offset=1):
    if request.is_ajax():
        notifications = request.user.notifications.all()
        paginator = Paginator(notifications, 5)  # Show 25 contacts per page
        try:
            notices = paginator.page(offset)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            notices = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            notices = paginator.page(paginator.num_pages)
        return render(request, 'notifications/notice.html', {'notifications': notices})
    else:
        raise Http404


@requires_csrf_token
def page_not_found(request, exception, template_name='errs/404.html'):
    """
    Default 404 handler.

    Templates: :template:`404.html`
    Context:
        request_path
            The path of the requested URL (e.g., '/app/pages/bad_page/')
        exception
            The message from the exception which triggered the 404 (if one was
            supplied), or the exception class name
    """
    exception_repr = exception.__class__.__name__
    # Try to get an "interesting" exception message, if any (and not the ugly
    # Resolver404 dictionary)
    try:
        message = exception.args[0]
    except (AttributeError, IndexError):
        pass
    else:
        if isinstance(message, six.text_type):
            exception_repr = message
    context = {
        'request_path': request.path,
        'exception': exception_repr,
    }
    try:
        template = loader.get_template(template_name)
        body = template.render(context, request)
        content_type = None  # Django will use DEFAULT_CONTENT_TYPE
    except TemplateDoesNotExist:
        template = Engine().from_string(
            '<h1>Not Found</h1>'
            '<p>The requested URL {{ request_path }} was not found on this server.</p>')
        body = template.render(Context(context))
        content_type = 'text/html'
    return http.HttpResponseNotFound(body, content_type=content_type)
