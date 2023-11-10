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
from django.utils.translation import ugettext, ugettext_lazy as _
from group.models import GroupProfile
from .forms import TopicAddForm, PostForm, ForumSetForm, PostAddForm, TopicEditForm, PostEditForm
from .models import Topic, Post
from django.core.cache import cache

cache_key_topic = 'cache.forum.{}.topic.{}'
cache_key_topics = 'cache.forum.{}.topics'
cache_key_forum_set = 'cache.forum.{}.set'
cache_key_group = 'cache.group.{}'


def _get_group_profile_from_cache(groupname):
    group = cache.get(cache_key_group.format(groupname))
    if not group:
        try:
            group = GroupProfile.objects.select_related('forum', 'owner').get(name__iexact=groupname)
            cache.set(cache_key_group.format(groupname), group, 3600)
        except GroupProfile.DoesNotExist:
            raise Http404
    return group


def _get_topic_from_cache(groupname, id):
    topic = cache.get(cache_key_topic.format(groupname, id))
    if not topic:
        try:
            topic = Topic.objects.get(id=id)
            cache.set(cache_key_topic.format(groupname, id), topic, 3600)
        except Topic.DoesNotExist:
            raise Http404
    return topic


@login_required()
def index(request, groupname):
    try:
        group_profile = _get_group_profile_from_cache(groupname)
        is_user_moderator = group_profile.is_user_moderator(request.user)
        is_user_member = group_profile.is_user_member(request.user)
        settings = group_profile.forum.get_settings()
        if not is_user_member and request.user != group_profile.owner:
            messages.error(request, _('Вы не являетесь участником группы {}').format(group_profile.name))
            return redirect(group_profile.get_absolute_url())
        try:
            order_by = request.GET.get('order_by', '-last_post__created')
            topic_list = cache.get(cache_key_topics.format(groupname))
            if not topic_list:
                topic_list = group_profile.forum.topics.order_by('-sticky', order_by).select_related('user',
                                                                                                     'last_post',
                                                                                                     'last_post_user')
                cache.set(cache_key_topics.format(groupname), topic_list, 3600)
        except FieldError:
            topic_list = group_profile.forum.topics.filter().select_related('user', 'last_post', 'last_post_user')
        topics_sticky = [topic for topic in topic_list if topic.sticky or topic.hidden]
        topics_unsticky = [topic for topic in topic_list if not topic.sticky and not topic.hidden]
        paginator = Paginator(topics_unsticky, settings.num_topics or 1)
        page = request.GET.get('page')
        try:
            topics = paginator.page(page)
        except PageNotAnInteger:
            topics = paginator.page(1)
        except EmptyPage:
            topics = paginator.page(paginator.num_pages)
        return render(request, 'group_forum/index.html', {'topics': topics,
                                                          'topics_sticky': topics_sticky,
                                                          'group_profile': group_profile,
                                                          'forum': group_profile.forum,
                                                          'is_user_moderator': is_user_moderator,
                                                          'is_user_member': is_user_member})
    except (GroupProfile.DoesNotExist, FieldError):
        raise Http404


@login_required()
def topic_load(request, groupname):
    if not request.is_ajax():
        raise PermissionDenied
    group_profile = _get_group_profile_from_cache(groupname)
    is_user_member = group_profile.is_user_member(request.user)
    if not is_user_member and request.user != group_profile.owner:
        raise PermissionDenied
    settings = group_profile.forum.get_settings()
    topic_list = group_profile.forum.topics.filter(sticky=False, hidden=False).select_related('user', 'last_post',
                                                                                              'last_post_user')
    paginator = Paginator(topic_list, settings.num_topics or 1)
    page = request.GET.get('page')
    try:
        topics = paginator.page(page)
    except PageNotAnInteger:
        topics = paginator.page(1)
    except EmptyPage:
        topics = paginator.page(paginator.num_pages)
    return render(request, 'group_forum/topic/topic_list.html', {'topics': topics,
                                                                 'group_profile': group_profile,
                                                                 'forum': group_profile.forum})


@login_required()
def topic_search(request, groupname):
    group_profile = _get_group_profile_from_cache(groupname)
    if 'q' in request.GET and request.GET['q'] and len(request.GET['q']):
        q = request.GET['q']
        is_user_member = group_profile.is_user_member(request.user)
        if not is_user_member and request.user != group_profile.owner:
            raise PermissionDenied
        topic_list = group_profile.forum.topics.filter(hidden=False, name__icontains=q).select_related('user',
                                                                                                       'last_post')
        paginator = Paginator(topic_list, 10)
        page = request.GET.get('page')
        try:
            topics = paginator.page(page)
        except PageNotAnInteger:
            topics = paginator.page(1)
        except EmptyPage:
            topics = paginator.page(paginator.num_pages)
        return render(request, 'group_forum/search_result.html',
                      {'topics': topics,
                       'group_profile': group_profile,
                       'forum': group_profile.forum,
                       'q': q})
    else:
        messages.error(request, _('Необходимо ввести поисковый запрос!'))
        return redirect(group_profile.forum.get_absolute_url())


@login_required()
def topic_create(request, groupname):
    if not request.is_ajax():
        raise PermissionDenied
    try:
        group_profile = _get_group_profile_from_cache(groupname)
        is_user_member = group_profile.is_user_member(request.user)
        if not is_user_member and request.user != group_profile.owner:
            raise PermissionDenied
        if request.method == 'POST':
            form = TopicAddForm(data=request.POST, user=request.user, group_profile=group_profile)
            if form.is_valid():
                f = form.save(commit=False)
                f.user = request.user
                f.forum = group_profile.forum
                f.save()
                cache.set(cache_key_topic.format(groupname, f.id), f, None)
                cache.delete(cache_key_topics.format(groupname))
                return HttpResponse(status=200)
            else:
                return JsonResponse(form.errors.as_json(), safe=False)
        form = TopicAddForm(user=request.user, group_profile=group_profile)
        return render(request, 'group_forum/topic/create_form.html', {'form': form,
                                                                      'group_profile': group_profile,
                                                                      'forum': group_profile.forum})
    except GroupProfile.DoesNotExist:
        raise Http404


@login_required()
def topic_edit(request, groupname, id):
    if not request.is_ajax():
        raise PermissionDenied
    try:
        group_profile = _get_group_profile_from_cache(groupname)
        is_user_member = group_profile.is_user_member(request.user)
        if not is_user_member and request.user != group_profile.owner:
            raise PermissionDenied
        topic = _get_topic_from_cache(groupname, id)
        if request.method == 'POST':
            form = TopicEditForm(data=request.POST, instance=topic, user=request.user, group_profile=group_profile)
            if form.is_valid():
                if form.has_changed():
                    f = form.save(commit=False)
                    cache.set(cache_key_topic.format(groupname, id), f, None)
                    cache.delete(cache_key_topics.format(groupname))
                    f.save()
                return HttpResponse(status=200)
            else:
                return JsonResponse(form.errors.as_json(), safe=False)
        form = TopicEditForm(instance=topic, user=request.user, group_profile=group_profile)
        return render(request, 'group_forum/topic/edit_form.html', {'form': form,
                                                                    'topic': topic})
    except GroupProfile.DoesNotExist:
        raise Http404


@login_required()
def topic_remove(request, groupname, id):
    if not request.is_ajax():
        raise PermissionDenied
    try:
        group_profile = _get_group_profile_from_cache(groupname)
        is_user_member = group_profile.is_user_member(request.user)
        if not is_user_member and request.user != group_profile.owner:
            raise PermissionDenied
        topic = _get_topic_from_cache(groupname, id)
        if request.method == 'POST':
            form = forms.Form(request.POST)
            if form.is_valid():
                cache.delete_many([cache_key_topic.format(groupname, id), cache_key_topics.format(groupname)])
                topic.delete()
                return HttpResponse(status=200)
            else:
                return JsonResponse(form.errors.as_json(), safe=False)
        form = forms.Form()
        return render(request, 'group_forum/topic/remove_form.html',
                      {'form': form,
                       'topic': topic})
    except GroupProfile.DoesNotExist:
        raise Http404


@login_required()
def topic_detail(request, groupname, id):
    try:
        group_profile = _get_group_profile_from_cache(groupname)
        is_user_moderator = group_profile.is_user_moderator(request.user)
        is_user_member = group_profile.is_user_member(request.user)
        if not is_user_member and request.user != group_profile.owner:
            raise PermissionDenied
        topic = _get_topic_from_cache(groupname, id)
        settings = group_profile.forum.get_settings()
        if topic.hidden and request.user != group_profile.owner and not is_user_moderator:
            messages.error(request, _('У вас нет прав для просмотра темы!'))
            return redirect(reverse('forum_index', args=[groupname]))
        form = PostForm()
    except Topic.DoesNotExist:
        messages.error(request, _('Обсуждение не найдено!'))
        return redirect(reverse('forum_index', args=[groupname]))
    except GroupProfile.DoesNotExist:
        raise Http404
    post_list = _get_post_list(topic, settings)
    paginator = Paginator(post_list, settings.num_posts or 1)
    page = request.GET.get('page')
    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    offset = settings.num_posts * (posts.number - 1)
    return render(request, 'group_forum/topic/detail.html',
                  {'topic': topic, 'posts': posts, 'is_user_moderator': is_user_moderator,
                   'group_profile': group_profile, 'form': form, 'forum': group_profile.forum, 'offset': offset})


def _get_post_list(topic, settings):
    direction = ['', '-']
    posts = topic.posts.filter().select_related('user').order_by('{}created'.format(direction[settings.post_ordering]))
    return posts


@login_required()
def post_load(request, groupname, id):
    try:
        group_profile = _get_group_profile_from_cache(groupname)
        is_user_member = group_profile.is_user_member(request.user)
        if not is_user_member and request.user != group_profile.owner:
            raise PermissionDenied
        topic = _get_topic_from_cache(groupname, id)
        settings = group_profile.forum.get_settings()
        post_list = _get_post_list(topic, settings)
    except Topic.DoesNotExist:
        raise Http404
    paginator = Paginator(post_list, settings.num_posts or 1)
    page = request.GET.get('page')
    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    offset = settings.num_posts * (posts.number - 1)
    return render(request, 'group_forum/post/post_list.html',
                  {'topic': topic, 'posts': posts,
                   'group_profile': group_profile,
                   'forum': group_profile.forum,
                   'offset': offset})


@login_required()
def _post_create(request, groupname, id):
    if not request.is_ajax():
        raise PermissionDenied
    try:
        group_profile = _get_group_profile_from_cache(groupname)
        is_user_member = group_profile.is_user_member(request.user)
        if not is_user_member and request.user != group_profile.owner:
            raise PermissionDenied
        topic = _get_topic_from_cache(groupname, id)
        form = PostAddForm(request.POST)
        if request.method == 'POST':
            if form.is_valid():
                f = form.save(commit=False)
                f.user = request.user
                f.topic = topic
                f.save()
                if f.topic.user != request.user:
                    f.topic.send_email_about_post(f)
                return HttpResponse(status=200)
            else:
                return JsonResponse(form.errors.as_json(), safe=False)
        else:
            return HttpResponse(status=404)
    except GroupProfile.DoesNotExist:
        raise Http404


@login_required()
def post_create(request, groupname, id):
    try:
        group_profile = _get_group_profile_from_cache(groupname)
        is_user_member = group_profile.is_user_member(request.user)
        if not is_user_member and request.user != group_profile.owner:
            raise PermissionDenied
        topic = _get_topic_from_cache(groupname, id)
        form = PostAddForm(request.POST or None)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.topic = topic
            post.save()
            if post.topic.user != request.user:
                post.topic.send_email_about_post(post)
            return redirect(post)
        return redirect(topic)
        # return render(request, topic, form)
    except GroupProfile.DoesNotExist:
        raise Http404


@login_required()
def post_remove(request, groupname, id):
    if not request.is_ajax():
        raise PermissionDenied
    try:
        group_profile = _get_group_profile_from_cache(groupname)
        is_user_member = group_profile.is_user_member(request.user)
        if not is_user_member and request.user != group_profile.owner:
            raise PermissionDenied
        post = get_object_or_404(Post, pk=id)
        if request.method == 'POST':
            form = forms.Form(request.POST)
            if form.is_valid():
                post.delete()
                return HttpResponse(status=200)
            else:
                return JsonResponse(form.errors.as_json(), safe=False)
        form = forms.Form()
        return render(request, 'group_forum/post/remove_form.html',
                      {'form': form,
                       'post': post})
    except GroupProfile.DoesNotExist:
        raise Http404


@login_required()
def post_edit(request, groupname, id):
    if not request.is_ajax():
        raise PermissionDenied
    try:
        group_profile = _get_group_profile_from_cache(groupname)
        is_user_member = group_profile.is_user_member(request.user)
        if not is_user_member and request.user != group_profile.owner:
            raise PermissionDenied
        post = get_object_or_404(Post, pk=id)
        if request.method == 'POST':
            form = PostEditForm(request.POST, instance=post)
            if form.is_valid():
                if form.has_changed():
                    f = form.save(commit=False)
                    f.edited_by = _('Отредактировано {} ({})').format(request.user,
                                                                      timezone.localtime(timezone.now()).strftime(
                                                                          "%d/%m/%Y %X"))
                    f.save()
                return HttpResponse(status=200)
            else:
                return JsonResponse(form.errors.as_json(), safe=False)
        form = PostEditForm(instance=post)
        return render(request, 'group_forum/post/edit_form.html',
                      {'form': form,
                       'post': post})
    except GroupProfile.DoesNotExist:
        raise Http404


@login_required()
def forum_profile_edit(request, groupname):
    try:
        group_profile = _get_group_profile_from_cache(groupname)
        settings = group_profile.forum.get_settings()
        if request.user != group_profile.owner and not group_profile.is_user_moderator(request.user):
            raise PermissionDenied
        form = ForumSetForm(request.POST or None, instance=settings)
        if form.is_valid():
            form.save()
            messages.success(request, _('Настройки успешно обновлены!'))
            return redirect('group_profile')
        return render(request, 'group_forum/profile/edit_form.html', {'form': form})
    except GroupProfile.DoesNotExist:
        raise Http404


@login_required
def unsubscribe(request, groupname, id):
    topic = get_object_or_404(Topic, pk=id)
    if topic.user == request.user:
        topic.send_response = False
        topic.save()
    messages.success(request, _('Вы успешно отписались от обсуждения "{}"').format(topic))

    return redirect(topic)


@login_required
def subscribe(request, groupname, id):
    topic = get_object_or_404(Topic, pk=id)
    if topic.user == request.user:
        topic.send_response = True
        topic.save()
    messages.success(request, _('Вы успешно подписались на обсуждение "{}"').format(topic))
    return redirect(topic)


def format_quote_html(sender, body):
    """
    Used for quoting messages in replies.
    """
    quote = '<blockquote>{}</blockquote>'.format(body)
    return ugettext("%(sender)s писал(а):\n%(body)s") % {
        'sender': sender,
        'body': quote
    }


@login_required
def reply(request, groupname, id):
    if request.is_ajax():
        post = get_object_or_404(Post, pk=id)
        quote = format_quote_html(post.user, post.body)
        return HttpResponse(quote)
    raise PermissionDenied
