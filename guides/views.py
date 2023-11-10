from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.cache import cache
from django.core.exceptions import PermissionDenied
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
from django.http import Http404, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.utils.translation import ugettext_lazy as _
from django.views.decorators.cache import cache_control
from taggit.models import Tag
from editor.utils import safe_html
from mmotimes.api_redis import PostViewsCount
from .forms import *

cache_key_tags = 'cache.guide.tags.{}'
cache_key_guide = 'cache.guide.{}'
cache_key_guides = 'cache.guides'
MAX_GUIDES_POST = 10


@cache_control(must_revalidate=True)
def guides_index(request):
    if not request.user.is_staff:
        guides = GuideModel.objects.filter(status=GuideModel.STATUS.published) \
            .select_related('game', 'user').prefetch_related('tags')
        guides_list = cache.get_or_set(cache_key_guides, guides)
    else:
        guides_list = GuideModel.objects.filter().select_related('game', 'user') \
            .prefetch_related('tags')
    paginator = Paginator(guides_list, MAX_GUIDES_POST)
    page = request.GET.get('page')
    try:
        guides = paginator.page(page)
    except PageNotAnInteger:
        guides = paginator.page(1)
    except EmptyPage:
        guides = paginator.page(paginator.num_pages)
    form = GuideFilterForm()
    return render(request, 'guides/index.html', {'guides': guides, 'form': form})


@cache_control(must_revalidate=True)
def guide_detail(request, id):
    try:
        guide = cache.get(cache_key_guide.format(id))
        if not guide:
            guide = GuideModel.objects.select_related('user', 'game').get(id=id)
            cache.set(cache_key_guide.format(id), guide)
    except GuideModel.DoesNotExist:
        raise Http404
    tags = cache.get_or_set(cache_key_tags.format(id), guide.tags.all())
    if guide.status == guide.STATUS.published or (not request.user.is_anonymous and request.user.is_staff):
        pv = PostViewsCount().save(request, id)
        views = pv.count(id)
        return render(request, 'guides/detail.html', {'guide': guide, 'tags': tags, 'views': views})
    else:
        messages.error(request, _('Гайд не доступен для просмотра!'))
    return redirect('guides_index')


def guide_filter(request):
    form = GuideFilterForm(data=request.GET or None)
    if form.is_valid():
        game = form.cleaned_data['game']
        tags = form.cleaned_data['tags']
        if game and tags:
            guides_list = GuideModel.objects.filter(game=game, tags__name__in=tags).prefetch_related(
                'tags').select_related('user', 'game').distinct()
        else:
            guides_list = GuideModel.objects.filter(Q(game=game) | Q(tags__name__in=tags)).prefetch_related(
                'tags').select_related('user', 'game').distinct()
        paginator = Paginator(guides_list, MAX_GUIDES_POST)
        page = request.GET.get('page')
        try:
            guides = paginator.page(page)
        except PageNotAnInteger:
            guides = paginator.page(1)
        except EmptyPage:
            guides = paginator.page(paginator.num_pages)
        return render(request, 'guides/index.html',
                      {'guides': guides, 'form': form, 'title': _('Отфильтрованные публикации')})
    messages.error(request, _('Фильтр составлен неверно!'))
    return redirect('guides_index')


def guide_search_by_tag(request):
    tag = request.GET.get('search')
    cache_key = "guides.search.tag.{}".format(tag)
    guides = GuideModel.objects.filter(tags__name__iexact=tag).prefetch_related('tags').select_related('user',
                                                                                                       'game').distinct()
    guides_list = cache.get_or_set(cache_key, guides)
    paginator = Paginator(guides_list, MAX_GUIDES_POST)
    page = request.GET.get('page')
    try:
        guides = paginator.page(page)
    except PageNotAnInteger:
        guides = paginator.page(1)
    except EmptyPage:
        guides = paginator.page(paginator.num_pages)
    form = GuideFilterForm(data={'tags': tag})
    return render(request, 'guides/index.html', {'guides': guides, 'form': form,
                                                 'title': _('Отфильтрованные публикации по тегу {}').format(tag)})


def autocomplete_tags(request):
    if not request.is_ajax():
        raise PermissionDenied
    query = request.GET.get('q', '')
    if query:
        tags = Tag.objects.filter(name__istartswith=query).values_list('name', flat=True)
        return JsonResponse({'suggestions': list(tags)}, safe=False)
    return JsonResponse({})


# def q_tags(request):
#     if not request.is_ajax():
#         raise PermissionDenied
#     query = request.GET.get('q', '')
#     if query:
#         tags = Tag.objects.filter(name__istartswith=query).values_list('name', flat=True)
#         return JsonResponse({'tags': list(tags)}, safe=False)
#     return JsonResponse({})


@login_required
def guide_create(request):
    form = GuideAddForm(data=request.POST or None)
    if form.is_valid():
        f = form.save(commit=False)
        f.user = request.user
        f.body = safe_html(f.body)
        if not f.is_draft:
            f.status = GuideModel.STATUS.moderation
        f.save()
        form.save_m2m()
        if f.status == GuideModel.STATUS.draft:
            messages.success(request, _('Гайд успешно сохранен как черновик!'))
        else:
            messages.success(request, _('Гайд успешно передан на модерацию!'))
        if request.POST.get('_continue'):
            return redirect(f.get_edit_url())
        return redirect('guides_profile')
    return render(request, 'guides/profile/create_form.html', {'form': form})


@login_required()
def guide_edit(request, id):
    try:
        guide = GuideModel.objects.select_related('game').get(id=id, user=request.user)
    except GuideModel.DoesNotExist:
        raise Http404
    if guide.status != guide.STATUS.draft:
        messages.error(request, _('Гайд не доступен для модификации!'))
        return redirect('guides_profile')
    form = GuideAddForm(data=request.POST or None, instance=guide)
    if form.is_valid():
        f = form.save(commit=False)
        f.user = request.user
        f.body = safe_html(f.body)
        if not f.is_draft:
            f.status = GuideModel.STATUS.moderation
        f.save()
        form.save_m2m()
        cache.delete_many([cache_key_guide.format(id), cache_key_tags.format(id)])
        if f.status == GuideModel.STATUS.draft:
            messages.success(request, _('Гайд успешно сохранен!'))
            if request.POST.get('_continue'):
                return redirect(guide.get_edit_url())
        else:
            messages.success(request, _('Гайд успешно передан на модерацию!'))
        return redirect('guides_profile')
    return render(request, 'guides/profile/edit_form.html', {'form': form})


@login_required
def guides_profile(request):
    guide_list = GuideModel.objects.select_related('user', 'game', ).filter(user=request.user)
    return render(request, 'guides/profile/index.html', {'guide_list': guide_list})


@login_required()
def guide_remove(request, id):
    form = forms.Form(request.POST or None)
    guide = get_object_or_404(GuideModel, id=id, user=request.user)
    if guide.status != guide.STATUS.draft:
        messages.error(request, _('Гайд не доступен для модификации!'))
        return redirect('guides_profile')
    if form.is_valid():
        guide.delete()
        cache.delete_many([cache_key_guide.format(id), cache_key_tags.format(id), cache_key_guides])
        messages.success(request, _('Черновик гайда успешно удален!'))
        return redirect('guides_profile')
    return render(request, 'guides/profile/modal_remove_form.html', {'form': form, 'guide': guide})
