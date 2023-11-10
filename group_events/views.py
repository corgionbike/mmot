from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.exceptions import FieldError
from django.core.exceptions import PermissionDenied
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.urlresolvers import reverse
from django.forms import forms
from django.http import Http404, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect, HttpResponse
from django.utils import timezone, safestring
from django.utils.translation import ugettext_lazy as _
from django.views.decorators.cache import cache_control

from group.models import GroupProfile
from .forms import *
from .models import *
from private_messages.utils import format_quote_bbcode


@cache_control(must_revalidate=True)
@login_required()
def index(request, groupname):
    try:
        group_profile = GroupProfile.objects.select_related('events_profile', 'owner').get(name__iexact=groupname)
        is_user_moderator = group_profile.is_user_moderator(request.user)
        is_user_member = group_profile.is_user_member(request.user)
        settings = group_profile.events_profile.get_settings()
        if not is_user_member and request.user != group_profile.owner:
            messages.error(request, _('Вы не являетесь участником группы {}').format(group_profile.name))
            return redirect(group_profile.get_absolute_url())
        event_list = group_profile.events_profile.events.filter().select_related('followers')
        paginator = Paginator(event_list, settings.num_events or 1)
        page = request.GET.get('page')
        try:
            events = paginator.page(page)
        except PageNotAnInteger:
            events = paginator.page(1)
        except EmptyPage:
            events = paginator.page(paginator.num_pages)
        return render(request, 'group_events/index.html', {'events': events,
                                                          'group_profile': group_profile,
                                                          'events_profile': group_profile.events_profile,
                                                          'is_user_moderator': is_user_moderator,
                                                          'is_user_member': is_user_member})
    except (GroupProfile.DoesNotExist, FieldError):
        raise Http404


@login_required()
def event_create(request, groupname):
    if request.is_ajax():
        try:
            group_profile = GroupProfile.objects.select_related('events_profile', 'owner').get(name__iexact=groupname)
            is_user_member = group_profile.is_user_member(request.user)
            if not is_user_member and request.user != group_profile.owner:
                raise PermissionDenied
            if request.method == 'POST':
                form = EventAddForm(data=request.POST, user=request.user, group_profile=group_profile)
                if form.is_valid():
                    f = form.save(commit=False)
                    f.user = request.user
                    f.profile = group_profile.events_profile
                    f.save()
                    return HttpResponse(status=200)
                else:
                    return JsonResponse(form.errors.as_json(), safe=False)
            form = EventAddForm(user=request.user, group_profile=group_profile)
            return render(request, 'group_events/event/create_form.html', {'form': form,
                                                                          'group_profile': group_profile,
                                                                          'events_profile': group_profile.events_profile})
        except GroupProfile.DoesNotExist:
            raise Http404
    else:
        raise PermissionDenied


@login_required()
def event_edit(request, groupname, id):
    if request.is_ajax():
        try:
            group_profile = GroupProfile.objects.select_related('events_profile', 'owner').get(name__iexact=groupname)
            is_user_member = group_profile.is_user_member(request.user)
            if not is_user_member and request.user != group_profile.owner:
                raise PermissionDenied
            event = get_object_or_404(Event, pk=id)
            if request.method == 'POST':
                form = EventEditForm(data=request.POST, instance=event, user=request.user, group_profile=group_profile)
                if form.is_valid():
                    if form.has_changed():
                        form.save()
                    return HttpResponse(status=200)
                else:
                    return JsonResponse(form.errors.as_json(), safe=False)
            form = EventEditForm(instance=event, user=request.user, group_profile=group_profile)
            return render(request, 'group_events/event/edit_form.html', {'form': form,
                                                                        'event': event})
        except GroupProfile.DoesNotExist:
            raise Http404
    else:
        raise PermissionDenied


@login_required()
def event_remove(request, groupname, id):
    if request.is_ajax():
        try:
            group_profile = GroupProfile.objects.select_related('events_profile', 'owner').get(name__iexact=groupname)
            is_user_member = group_profile.is_user_member(request.user)
            if not is_user_member and request.user != group_profile.owner:
                raise PermissionDenied
            event = get_object_or_404(Event, pk=id)
            if request.method == 'POST':
                form = forms.Form(request.POST)
                if form.is_valid():
                    event.delete()
                    return HttpResponse(status=200)
                else:
                    return JsonResponse(form.errors.as_json(), safe=False)
            form = forms.Form()
            return render(request, 'group_events/event/remove_form.html',
                          {'form': form,
                           'event': event})
        except GroupProfile.DoesNotExist:
            raise Http404
    else:
        raise PermissionDenied


# @cache_control(must_revalidate=True)
# @login_required()
# def topic_detail(request, groupname, id):
#     try:
#         group_profile = GroupProfile.objects.select_related('events_profile', 'owner').get(name__iexact=groupname)
#         is_user_moderator = group_profile.is_user_moderator(request.user)
#         is_user_member = group_profile.is_user_member(request.user)
#         if not is_user_member and request.user != group_profile.owner:
#             raise PermissionDenied
#         topic = Topic.objects.select_related('user').get(pk=id)
#         settings = group_profile.forum.get_settings()
#         if topic.hidden and request.user != group_profile.owner and not is_user_moderator:
#             messages.error(request, _('У вас нет прав для просмотра темы!'))
#             return redirect(reverse('forum_index', args=[groupname]))
#         form = PostForm()
#     except Topic.DoesNotExist:
#         messages.error(request, _('Обсуждение не найдено!'))
#         return redirect(reverse('forum_index', args=[groupname]))
#     except GroupProfile.DoesNotExist:
#         raise Http404
#     post_list = _get_post_list(topic, settings)
#     paginator = Paginator(post_list, settings.num_posts or 1)
#     page = request.GET.get('page')
#     try:
#         posts = paginator.page(page)
#     except PageNotAnInteger:
#         posts = paginator.page(1)
#     except EmptyPage:
#         posts = paginator.page(paginator.num_pages)
#     offset = settings.num_posts * (posts.number - 1)
#     return render(request, 'group_forum/topic/detail.html',
#                   {'topic': topic, 'posts': posts, 'is_user_moderator': is_user_moderator,
#                    'group_profile': group_profile, 'form': form, 'forum': group_profile.forum, 'offset': offset})