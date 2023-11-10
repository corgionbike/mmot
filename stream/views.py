from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.core.urlresolvers import reverse
from django.http import Http404, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.shortcuts import resolve_url
from django.utils.http import is_safe_url
from django.utils.translation import ugettext_lazy as _
from django.views.decorators.cache import cache_control
from django.views.decorators.http import require_POST
from .api import twitch, smashcast, connect
from .forms import CtrlStreamForm, StreamProfileForm, StreamRemoveForm, StreamPreviewForm, StreamManageForm
from .models import StreamManage, StreamPreview, StreamProfile, StreamTeamCounter
from django.template.context_processors import csrf
User = get_user_model()


@cache_control(must_revalidate=True)
def index(request):
    return render(request,
                  'stream/index.html',
                  {'planned_stream_list': StreamPreview.objects.planned().select_related('user', 'game',
                                                                                         'stream_profile', 'group'),
                   'live_stream_list': StreamPreview.objects.live().select_related('user', 'game', 'stream_profile',
                                                                                   'group')})


@login_required()
def profile_create(request):
    if hasattr(request.user, 'stream_profile'):
        messages.info(request, _('Стрим профиль уже создан!'))
        return redirect('stream_profile')
    form = StreamProfileForm(request.POST or None)
    if form.is_valid():
        f = form.save(commit=False)
        f.user = request.user
        f.save()
        StreamTeamCounter.objects.create(profile=f)
        StreamManage.objects.create(profile=f)
        messages.success(request, _('Стрим профиль успешно создан!'))
        return redirect('stream_profile')
    return render(request, 'stream/profile/create_form.html', {
        'form': form,
    })


@login_required()
def profile_edit(request):
    if not hasattr(request.user, 'stream_profile'):
        return redirect('stream_profile_create')
    sp = request.user.stream_profile
    form = StreamProfileForm(request.POST or None, instance=sp)
    if form.is_valid():
        form.save()
        messages.success(request, _('Стрим профиль успешно отредактирован!'))
        return redirect('stream_profile')
    return render(request, 'stream/profile/edit_form.html', {'form': form})


@cache_control(must_revalidate=True)
@login_required()
def profile(request):
    try:
        user = User.objects.select_related('stream_preview',
                                           'stream_profile',
                                           'group_profile',
                                           'site_invite_key').get(pk=request.user.id)
    except User.DoesNotExist:
        raise Http404
    if not hasattr(request.user, 'stream_profile'):
        messages.error(request, _('У Вас не создан профиль трансляций!'))
        return redirect('user_profile')
    stream_profile = user.stream_profile
    return render(request, 'stream/profile/index.html',
                  {'stream_profile': stream_profile, 'user': user})


@login_required()
def profile_remove(request):
    form = StreamRemoveForm(request.POST or None)
    if form.is_valid():
        s = get_object_or_404(StreamProfile, user=request.user)
        s.delete()
        messages.success(request, _('Стрим профиль успешно удален!'))
        return redirect('stream_profile')
    return render(request, 'stream/profile/modal_remove_form.html', {'form': form})


@login_required()
def preview_create(request):
    if not hasattr(request.user, 'stream_profile'):
        messages.error(request, _("Cтрим профиль не найден!"))
        return redirect('stream_profile_create')
    if request.user.stream_profile.is_block:
        messages.error(request, _("Канал пользователя {} заблокирован!").format(request.user))
        return redirect('stream_index')
    if hasattr(request.user, 'stream_preview'):
        messages.error(request, _('Анонс стрима уже создан!'))
        return redirect('stream_profile')
    form = StreamPreviewForm(data=request.POST or None, user=request.user)
    if form.is_valid():
        f = form.save(commit=False)
        f.user = request.user
        f.save()
        sp = request.user.stream_profile
        # Сбрасываем счет
        _team_count_reset(sp)
        # сохраняем ссылку на ананонс
        sp.preview = f
        sp.save()
        messages.success(request, _('Стрим анонс успешно создан!'))
        return redirect('stream_profile')
    return render(request, 'stream/profile/preview/create_form.html', {'form': form})


@login_required()
def preview_remove(request):
    form = StreamRemoveForm(request.POST or None)
    if form.is_valid():
        s = get_object_or_404(StreamPreview, user=request.user)
        # Сбрасываем счет
        _team_count_reset(request.user.stream_profile)
        s.delete()
        messages.success(request, _('Анонс стрима успешно удален!'))
        return redirect('stream_profile')
    return render(request, 'stream/profile/modal_remove_form.html', {'form': form})


@cache_control(must_revalidate=True)
def preview_detail(request, id):
    if request.is_ajax():
        p = get_object_or_404(StreamPreview, pk=id)
        return render(request, 'stream/preview/stream_card.html', {'preview': p})
    else:
        raise PermissionDenied


@login_required()
def preview_edit(request):
    if request.user.stream_profile.is_block:
        messages.error(request, _("Канал пользователя {} заблокирован!").format(request.user))
        return redirect('stream_index')
    try:
        s = StreamPreview.objects.select_related('game', 'user').get(user=request.user)
    except StreamPreview.DoesNotExist:
        raise Http404
    form = StreamPreviewForm(data=request.POST or None, instance=s, user=request.user)
    if form.is_valid():
        form.save()
        messages.success(request, _('Анонс стрима успешно отредактирован!'))
        return redirect('stream_profile')
    return render(request, 'stream/profile/preview/edit_form.html', {'form': form})


@login_required()
def stream_profile_manager(request):
    if not hasattr(request.user, 'stream_profile'):
        raise Http404
    if request.user.stream_profile.is_block:
        messages.error(request, _("Канал пользователя {} заблокирован!").format(request.user))
        return redirect('stream_index')
    redirect_to = request.META.get('HTTP_REFERER', 'index')
    if not is_safe_url(url=redirect_to, host=request.get_host()):
        redirect_to = resolve_url('index')
    form = StreamManageForm(data=request.POST or None, instance=request.user.stream_profile.stream_manage)
    if form.is_valid():
        form.save()
        messages.success(request, _('Настройки успешно обновлены!'))
        return redirect(request.POST.get('next', ''))
    return render(request, 'stream/profile/manage_form.html', {'form': form, 'next': redirect_to})


@login_required()
def stream_channel_ctrl(request):
    if hasattr(request.user, 'stream_preview'):
        preview = request.user.stream_preview
        form = CtrlStreamForm(data=request.POST or None, instance=preview)
        if form.is_valid():
            form.save()
        return redirect(reverse('stream_channel', args=[request.user.username]))
    return redirect('stream_index')


@cache_control(must_revalidate=True)
def stream_channel(request, username):
    try:
        streamer = User.objects.select_related('stream_preview', 'stream_profile').get(username__iexact=username)
        form = None
        user_has_preview = hasattr(streamer, 'stream_preview')
        if (streamer == request.user) and user_has_preview:
            preview = request.user.stream_preview
            form = CtrlStreamForm(instance=preview)
        if not hasattr(streamer, 'stream_profile'):
            messages.error(request, _('Канал не найден!'))
            return redirect('stream_index')
        if streamer.stream_profile.is_block:
            messages.error(request, _('Канал пользователя {} заблокирован!').format(streamer))
            return redirect('stream_index')
        if not user_has_preview:
            if streamer == request.user:
                messages.info(request, _('У вас нет запланированных трансляций!'))
                return render(request, "stream/channel/index.html", {'streamer': streamer, 'form': form})
            messages.info(request, _('Пользователь не запланировал трансляцию!'))
            # return redirect('stream_index')
        # elif not streamer.stream_preview.status:
        #     messages.info(request, _('Трансляция отключена!'))
        return render(request, "stream/channel/index.html", {'streamer': streamer, 'form': form})
    except User.DoesNotExist:
        messages.error(request, _('Канал не найден!'))
        return redirect('stream_index')


@cache_control(must_revalidate=True)
def stream_liveview(request, username):
    if request.is_ajax():
        try:
            streamer = User.objects.select_related('stream_preview', 'stream_profile').get(username__iexact=username)
            return render(request, "stream/channel/liveview.html", {'streamer': streamer})
        except User.DoesNotExist:
            raise Http404
    else:
        raise PermissionDenied


@cache_control(must_revalidate=True)
def team_count_get(request, streamer_id):
    if request.is_ajax():
        st = get_object_or_404(StreamTeamCounter, profile_id=streamer_id)
        data = {'count_blue': st.count_blue, 'count_red': st.count_red}
        return JsonResponse(data)
    else:
        raise PermissionDenied


@login_required()
def team_count_reset(request, streamer_id):
    if request.is_ajax():
        st = get_object_or_404(StreamTeamCounter, profile_id=streamer_id)
        if st.profile != request.user.stream_profile:
            raise Http404
        st.reset_count()
        data = {'count_blue': st.count_blue, 'count_red': st.count_red}
        return JsonResponse(data)
    else:
        raise PermissionDenied


def _team_count_reset(streamer_profile):
    st = get_object_or_404(StreamTeamCounter, profile=streamer_profile)
    st.reset_count()


@require_POST
@login_required()
def team_count_action(request, team_id, action, streamer_id):
    if request.is_ajax():
        st = get_object_or_404(StreamTeamCounter, profile_id=streamer_id)
        if st.profile != request.user.stream_profile:
            raise Http404
        if team_id == '0':  # red
            if action == 'inc':
                st.red_count_inc()
            if action == 'dec':
                st.red_count_dec()
                if st.count_red < 0:
                    st.count_red = 0
        if team_id == '1':  # blue
            if action == 'inc':
                st.blue_count_inc()
            if action == 'dec':
                st.blue_count_dec()
                if st.count_blue < 0:
                    st.count_blue = 0
        st.save()
        data = {'count_blue': st.count_blue, 'count_red': st.count_red}
        return JsonResponse(data)
    else:
        raise PermissionDenied


@login_required()
def refresh_stream_bot(request):
    if not request.user.is_staff:
        raise PermissionDenied
    try:
        twitch.TwitchStreamBot(["bot1", "bot2", "izubrishe"], game="Destiny 2")
        smashcast.SmashcastStreamBot(["bot3", "bot4", "Boston"],
                                     url="https://api.smashcast.tv/media/live/list",
                                     stream_type=True)
        return redirect('stream_index')
    except Exception:
        return redirect('stream_index')


@login_required()
def connect_twitch(request):
    con = connect.TwitchConnect()
    state = str(csrf(request).get('csrf_token'))
    url = con.get_connect_url(state)

    return redirect(url)


# @login_required()
# def archive_create(request):
#     if not hasattr(request.user, 'stream_profile'):
#         return redirect('stream_profile_null')
#     a = StreamArchive.objects.filter(user=request.user).count()
#     max = getattr(settings, 'MAX_RECORDS_STREAM_ARCHIVE', 10)
#     if a >= max:
#         messages.error(request, _('Превышено количество архивных записей. Максимальное число {} '.format(max)))
#         return redirect('stream_profile')
#     form = StreamArchiveForm(request.POST or None)
#     if form.is_valid():
#         f = form.save(commit=False)
#         f.user = request.user
#         f.save()
#         messages.success(request, _('Архивная запись успешно добавлена!'))
#         return redirect('stream_profile')
#     return render(request, 'stream/archive/create_form.html', {
#         'form': form,
#     })
#
#
# @login_required()
# def archive(request):
#     archives = StreamArchive.objects.filter(user=request.user)
#     return render(request, 'stream/profile/stream_archive.html', {'archives': archives})
