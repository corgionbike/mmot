from django.conf import settings
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
from django.forms import forms
from django.http import Http404, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.utils.timesince import timesince
from django.utils.translation import ugettext
from django.utils.translation import ugettext_lazy as _
from django.views.decorators.cache import cache_control
from django.views.decorators.http import require_POST
from notifications.signals import notify
from group_forum.views import cache_key_group, cache_key_topics
from stream.models import StreamPreview
from .forms import GroupMemberInviteForm, GroupModeratorAddForm, GroupProfileForm, GroupPermissionForm, \
    GroupProfileCreateForm
from .models import GroupProfile, GroupMember, GroupModerator, GroupInvite
from .utils import *
from django.core.cache import cache

User = get_user_model()


def index(request, groupname):
    try:
        group_profile = GroupProfile.objects.select_related('owner', 'forum', 'game').get(
            name__iexact=groupname)
        user = request.user
        user_is_member = False
        if not user.is_anonymous():
            user_is_member = group_profile.is_user_member(user)
        if not group_profile.privacy and user.is_anonymous():
            messages.error(request, _('Группа не доступна для просмотра!'))
            return redirect('group_list')
        if not group_profile.privacy and not user_is_member and user != group_profile.owner:
            messages.error(request, _('Группа не доступна для просмотра!'))
            return redirect('group_list')
        return render(request, 'group/page/index.html',
                      {'group_profile': group_profile, 'user_is_member': user_is_member})
    except GroupProfile.DoesNotExist:
        messages.error(request, _('Группа не найдена!'))
        return redirect('index')


@login_required()
def members(request, groupname):
    try:
        group_profile = GroupProfile.objects.select_related('owner', 'forum', 'game').get(name__iexact=groupname)
        user = request.user
        user_is_member = group_profile.is_user_member(user)
        user_is_moderator = group_profile.is_user_moderator(user)
        user_is_owner = group_profile.is_user_owner(user)
        if not user_is_member and user != group_profile.owner:
            messages.error(request, _('Вы не являетесь участником группы {}').format(group_profile.name))
            return redirect(group_profile.get_absolute_url())
        member_list = group_profile.get_all_members()
        paginator = Paginator(member_list, 10)
        page = request.GET.get('page')
        try:
            members = paginator.page(page)
        except PageNotAnInteger:
            members = paginator.page(1)
        except EmptyPage:
            members = paginator.page(paginator.num_pages)
        return render(request, 'group/page/members.html', {'members': members,
                                                           'group_profile': group_profile,
                                                           'user_is_moderator': user_is_moderator,
                                                           'user_is_owner': user_is_owner})
    except GroupProfile.DoesNotExist:
        messages.error(request, _('Группа не найдена!'))
        return redirect('index')


@login_required()
def group_members_search(request, groupname):
    try:
        group_profile = GroupProfile.objects.select_related('owner', 'forum', 'game').get(name__iexact=groupname)
        if 'q' in request.GET and request.GET['q'] and len(request.GET['q']):
            q = request.GET['q']
            is_user_member = group_profile.is_user_member(request.user)
            if not is_user_member and request.user != group_profile.owner:
                messages.error(request, _('Вы не являетесь участником группы {}').format(group_profile.name))
                return redirect(group_profile.get_absolute_url())
            member_list = group_profile.group_members.filter(user__username__icontains=q).select_related('user')
            paginator = Paginator(member_list, 10)
            page = request.GET.get('page')
            try:
                members = paginator.page(page)
            except PageNotAnInteger:
                members = paginator.page(1)
            except EmptyPage:
                members = paginator.page(paginator.num_pages)
            return render(request, 'group/page/search_result.html',
                          {'members': members, 'group_profile': group_profile, 'q': q})
        else:
            messages.error(request, _('Необходимо ввести поисковый запрос!'))
            return redirect(group_profile.get_members_url())
    except GroupProfile.DoesNotExist:
        messages.error(request, _('Группа не найдена!'))
        return redirect('index')


@cache_control(must_revalidate=True)
@login_required()
def profile(request):
    try:
        user = User.objects.select_related('stream_preview',
                                           'stream_profile',
                                           'group_profile',
                                           'site_invite_key').get(pk=request.user.id)
        host = request.get_host()
    except User.DoesNotExist:
        raise Http404
    group_profile = user.get_group()
    if not group_profile:
        messages.error(request, _('У Вас нет собственной группы!'))
        return redirect('user_profile')
    return render(request, 'group/profile/index.html',
                  {'group_profile': group_profile,
                   'user': user, 'host': host})


@login_required()
def group_profile_create(request):
    if hasattr(request.user, "group_profile"):
        messages.warning(request, _('У Вас уже есть своя группа!'))
        return redirect('group_profile')
    form = GroupProfileCreateForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        f = form.save(commit=False)
        f.owner = request.user  # устанавливаем владельца группы
        f.save()
        cache.delete(cache_key_groups)
        messages.success(request, _('Группа ({}) успешно создана!').format(f.get_type_display()))
        return redirect('group_profile')
    return render(request, 'group/profile/create_form.html', {
        'form': form,
    })


@login_required()
def group_profile_edit(request):
    user = request.user
    group = user.get_group()
    if not group:
        messages.error(request, _('У вас нет группы!'))
        return redirect('user_profile')
    form = GroupProfileForm(request.POST or None, request.FILES or None, instance=group)
    group_name = group.name
    cache.delete_many([cache_key_group.format(group_name), cache_key_topics.format(group_name)])
    if form.is_valid():
        f = form.save(commit=False)
        f.save()
        messages.success(request, _('Группа успешно отредактирована!'))
        return redirect('group_profile')
    return render(request, 'group/profile/edit_form.html', {
        'form': form, })


@login_required()
def group_profile_remove(request):
    form = forms.Form(request.POST or None)
    gp = get_object_or_404(GroupProfile, owner=request.user)
    if form.is_valid():
        cache.delete_many([cache_key_group.format(gp.name), cache_key_topics.format(gp.name)])
        gp.delete()
        cache.delete(cache_key_groups)
        messages.success(request, _('Группа успешно удалена!'))
        return redirect('user_profile')
    return render(request, 'group/profile/modal_remove_form.html', {'form': form, 'group_profile': gp})


# метод для карточки пользователя
@login_required()
@require_POST
def group_member_join(request, id):
    if request.is_ajax():
        if hasattr(request.user, 'group_member') or hasattr(request.user, 'group_profile'):
            data = {'status': ugettext('Вы уже состоите в группе!'), 'cls': 'btn-danger'}
            return JsonResponse(data)
        gp = get_object_or_404(GroupProfile, pk=id)
        if not gp.privacy:
            data = {'status': ugettext('Группа доступна только по приглашению!'), 'cls': 'btn-danger'}
            return JsonResponse(data)
        GroupMember.objects.create(group=gp, user=request.user, user_profile=request.user.user_profile)
        notify.send(request.user, recipient=gp.owner, verb=_('вступил в группу'), level='')
        data = {'status': ugettext('Вы вступили в группу!'), 'cls': 'btn-success'}
        return JsonResponse(data)
    else:
        raise PermissionDenied


# метод для системы заявок
@login_required()
@require_POST
def group_invite_approve(request, id):
    if request.is_ajax():
        user = User.objects.select_related('group_profile').get(pk=request.user.id)
        try:
            invite = GroupInvite.objects.select_related('group', 'recipient').get(pk=id)
        except GroupInvite.DoesNotExist:
            data = {'status': ugettext('Заявка не найдена!')}
            return JsonResponse(data)
        gp = invite.group
        if not gp.is_user_member(user):
            GroupMember.objects.create(group=gp, user=user)
            data = {'status': ugettext('Вы вступили в группу {}!'.format(gp.name))}
            notify.send(user, recipient=gp.owner, verb=_('вступил в группу'), level='')
        else:
            data = {'status': ugettext('Вы уже состоите в группе {}!'.format(gp))}
        invite.delete()
        return JsonResponse(data)
    else:
        raise PermissionDenied


# метод для системы заявок
@login_required()
@require_POST
def group_petition_approve(request, id):
    if request.is_ajax():
        try:
            invite = GroupInvite.objects.select_related('group', 'recipient').get(pk=id)
        except GroupInvite.DoesNotExist:
            data = {'status': ugettext('Заявка не найдена!')}
            return JsonResponse(data)
        group = invite.group
        user = invite.recipient
        if not group.is_user_member(user):
            GroupMember.objects.create(group=group, user=user)
            data = {'status': ugettext('Заявка одобрена!')}
        else:
            data = {'status': ugettext('{} уже состоит в группе!'.format(user))}
        invite.delete()
        return JsonResponse(data)
    else:
        raise PermissionDenied


@login_required()
@require_POST
def group_invite_reject(request, id):
    if request.is_ajax():
        try:
            invite = GroupInvite.objects.select_related('group').get(pk=id)
        except GroupInvite.DoesNotExist:
            data = {'status': ugettext('Приглашение не найдено!')}
            return JsonResponse(data)
        gp = invite.group
        invite.delete()
        if invite.type == 0:
            notify.send(request.user, recipient=gp.owner, verb=_('отклонил приглашение'), level='')
            data = {'status': ugettext('Вы отклонили приглашение в группу {}.'.format(gp.name))}
            return JsonResponse(data)
        if invite.type == 1:
            notify.send(gp.owner, recipient=request.user, verb=_('отклонил заявку'), level='')
            data = {'status': ugettext('Вы отклонили заявку на вступление.')}
            return JsonResponse(data)
    else:
        raise PermissionDenied


@login_required()
@require_POST
def group_member_reject(request, id):
    if request.is_ajax():
        try:
            gp = GroupProfile.objects.select_related('owner').get(pk=id)
        except GroupProfile.DoesNotExist:
            raise Http404
        notify.send(request.user, recipient=gp.owner, verb=_('отклонил приглашение в группу!'), level='')
        data = {'status': ugettext('Приглашение отклонено!')}
        return JsonResponse(data)
    else:
        raise PermissionDenied


def _get_member_info(request, id):
    try:
        member = User.objects.get(pk=id)
        group = request.user.get_group()
        if not group:
            raise Http404
        return (member, group)
    except User.DoesNotExist:
        raise Http404


@login_required()
def group_member_exclude(request, id, xhr=1):
    if request.is_ajax() and xhr == 1:
        member, group = _get_member_info(request, id)
        if group.is_user_member(member):
            group.group_members.filter(user=member).delete()
            if group.is_user_moderator(member):
                group.group_moderators.filter(user=member).delete()
            desc = _("К сожалению, {} Вас исключил из {}.".format(request.user, request.user.group_profile.name))
            notify.send(member, recipient=member, verb=_('исключение!'), level='',
                        description=desc)
            data = {'status': ugettext('Пользователь исключен!')}
            return JsonResponse(data)
        else:
            data = {'status': ugettext('Пользователь не состоит в группе!')}
            return JsonResponse(data)
    elif not request.is_ajax() and xhr == 1:
        raise PermissionDenied
    elif not (request.is_ajax() and xhr == 0):
        member, group = _get_member_info(request, id)
        if group.is_user_member(member):
            group.group_members.filter(user=member).delete()
            if group.is_user_moderator(member):
                group.group_moderators.filter(user=member).delete()
            desc = _("К сожалению, {} Вас исключил из {}.".format(request.user, request.user.group_profile.name))
            notify.send(member, recipient=member, verb=_('исключение!'), level='',
                        description=desc)
            messages.success(request, _('{} успешно исключен из группы {}!'.format(member, group.name)))
            return redirect(group.get_members_url())
        else:
            messages.success(request, _('Пользователь не состоит в группе!'))
            return redirect(group.get_members_url())


@login_required()
def group_member_out(request, id):
    try:
        user = request.user
        group = GroupProfile.objects.get(pk=id)
    except GroupProfile.DoesNotExist:
        raise Http404
    if group.is_user_member(user):
        group.group_members.filter(user=user).delete()
        notify.send(user, recipient=group.owner, verb=_('покинул группу!'), level='')
        if group.is_user_moderator(user):
            group.group_moderators.filter(user=user).delete()
        messages.success(request, _('Вы успешно вышли из группы {}!'.format(group.name)))
        return redirect('user_profile')
    messages.success(request, _('Вы не состоите в группе {}!'.format(group.name)))
    return redirect('user_profile')


def _get_text_invite(user):
    return _("Для просмотра заявления перейдите в свой <a href='{}'>профиль</a>.".format(user.get_absolute_url()))


@login_required()
def group_petition_send(request, group_id):
    try:
        user = request.user
        group = GroupProfile.objects.get(pk=group_id)
    except GroupProfile.DoesNotExist:
        raise Http404
    if user == group.owner or group.is_user_member(user):
        messages.error(request, _('Отклонено!'))
        return redirect(group.get_absolute_url())
    if not group.group_invites.filter(recipient=user, type=1).exists():
        # создаем объект заявления для пользователя если у пользователя его нет
        GroupInvite.objects.create(recipient=user, group=group, type=1,
                                   description=_("Пользователь {} желает вступить в группу.".format(user)))
        invite_msg = _get_text_invite(group.owner)
        notify.send(user, recipient=group.owner,
                    verb=_("желает вступить в группу!"), level='', description=invite_msg)
        messages.success(request, _('Запрос на вступление в группу отправлен!'))
    else:
        # получаем нужное заявление связанное с пользователем и группой
        petition = group.group_invites.get(recipient=user, type=1)
        delta = timezone.now() - petition.send_ts
        hours = getattr(settings, 'MAX_REPEAT_HOUR_SEND_PETITION', 8)
        if delta > timezone.timedelta(hours=hours):
            notify.send(user, recipient=group.owner,
                        verb=_('повторно отправил запрос на вступление в группу!'),
                        level='', description='')
            messages.success(request, _('Запрос на вступление в группу отправлен повторно!'))
            return redirect(group.get_absolute_url())
        else:
            new_date = timezone.timedelta(hours=hours) + petition.send_ts
            dt = timesince(timezone.now(), new_date)
            messages.error(request, _('Повторная отправка запроса возможна через {}').format(dt))
            return redirect(group.get_absolute_url())
    return redirect(group.get_absolute_url())


@login_required()
def group_invite_send(request, username=None):
    user = User.objects.select_related('stream_preview',
                                       'stream_profile',
                                       'group_profile',
                                       'site_invite_key').get(pk=request.user.id)

    if not is_user_has_permission(user):
        messages.error(request, _('У Вас не хватает прав!'))
        return redirect('user_profile')
    form = GroupMemberInviteForm(request.POST or None)
    if username is not None:
        form.fields['username'].initial = username
    if form.is_valid():
        member = form.cleaned_data['username']
        desc = form.cleaned_data['desc']
        gp = user.get_group()
        if not gp:
            messages.error(request, _('У Вас не хватает прав!'))
            return redirect('user_profile')
        else:
            if user == member:
                messages.error(request, _('Нельзя отправить приглашение самому себе!'))
                return redirect('group_invite_send')
        if gp.is_user_member(member):
            messages.error(request, _('Пользователь уже числится в вашей группе!'))
            return redirect('group_invite_send')
        if not gp.group_invites.filter(recipient=member, type=0).exists():
            # создаем объект приглашения для пользователя если у пользователя его нет
            GroupInvite.objects.create(recipient=member, group=gp, description=desc)
            invite_msg = _get_text_invite(member)
            notify.send(user.group_profile, recipient=member,
                        verb=_("приглашает Вас в свои ряды!"), level='', description=invite_msg)
            messages.success(request, _('Приглашение отправлено!'))
        else:
            # получаем нужный инвайт связанный с пользователем и группой
            invite = gp.group_invites.get(recipient=member, type=0)
            delta = timezone.now() - invite.send_ts
            hours = getattr(settings, 'MAX_REPEAT_HOUR_SEND_INVITE', 1)
            if delta > timezone.timedelta(hours=hours):
                notify.send(user.group_profile, recipient=member,
                            verb=_('повторно приглашает Вас в свои ряды!'),
                            level='', description='')
                messages.success(request, _('Приглашение отправлено повторно!'))
                return redirect('group_invite_send')
            else:
                new_date = timezone.timedelta(hours=hours) + invite.send_ts
                dt = timesince(timezone.now(), new_date)
                messages.error(request, _('Повторная отправка приглашения возможна через {}').format(dt))
                return redirect('group_invite_send')
    return render(request, 'group/profile/invite_form.html', {
        'form': form,
    })


@login_required()
def group_moderator_add(request):
    user = User.objects.select_related('group_profile').get(pk=request.user.id)
    group = user.get_group()
    if not group:
        raise Http404
    count_gm = user.group_profile.group_members.count()
    max_mod = getattr(settings, 'MAX_GROUP_MODERATOR', 5)
    if count_gm > max_mod:
        messages.error(request, _('Превышено максимальное количество модераторов!'))
        return redirect('group_profile')
    form = GroupModeratorAddForm(data=request.POST or None, group=group, owner=user)
    if form.is_valid():
        try:
            member = form.cleaned_data['member']
            # g = Group.objects.get(name='Group moderators')
            GroupModerator.objects.update_or_create(user=member.user, group=group)
            # member.user.groups.add(g)
            # member.user.is_moderator = True
            # member.user.save()
            messages.success(request, _('{} назначен модератором!').format(member.user))
            notify.send(user.group_profile, recipient=member.user,
                        verb=_('назначение модератором!'), level='', description='')
            return redirect('group_profile')
        except Group.DoesNotExist:
            messages.error(request, _('Группа модераторов не найдена!'))
            return redirect('group_profile')
    return render(request, 'group/profile/moderator_add_form.html', {
        'form': form,
    })


@login_required()
@require_POST
def group_moderator_exclude(request, group_id, id):
    if request.is_ajax():
        try:
            member = User.objects.get(pk=id)
            group = GroupProfile.objects.select_related('owner').get(pk=group_id)
            # удалить из модераторов может только владелец группы
            if group.owner != request.user:
                raise PermissionDenied
        except (User.DoesNotExist, GroupProfile.DoesNotExist):
            raise Http404
        if group.is_user_moderator(member):
            group.group_moderators.filter(user=member).delete()
            notify.send(member, recipient=member, verb=_('исключение!'), level='',
                        description=_("К сожалению, Вас исключили из группы модераторов!"))
            data = {'status': ugettext('Пользователь исключен из группы модераторов!')}
            return JsonResponse(data)
        else:
            data = {'status': ugettext('Пользователь не является модератором группы!')}
            return JsonResponse(data)
    else:
        raise PermissionDenied


@login_required()
def group_invite_list(request):
    if request.is_ajax():
        user = request.user
        petition_list = list()
        group = user.get_group()
        invite_list = GroupInvite.objects.filter(Q(recipient=user, type=0) | Q(group=group, type=1)).select_related(
            'group')
        # group = user.get_group()
        # if group:
        #     petition_list = GroupInvite.objects.filter(group=group, type=1).exclude(recipient=user).select_related('group')
        # result_list = list(chain(invite_list, petition_list))
        paginator = Paginator(invite_list, 5)  # Show 25 contacts per page
        try:
            invites = paginator.page(1)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            invites = paginator.page(paginator.num_pages)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            invites = paginator.page(paginator.num_pages)
        return render(request, 'group/profile/invite_list.html', {'invites': invites})
    else:
        raise PermissionDenied


@login_required()
def group_invite_load(request, offset=1):
    if request.is_ajax():
        user = request.user
        invite_list = GroupInvite.objects.filter(recipient=user).select_related('group')
        paginator = Paginator(invite_list, 5)  # Show 25 contacts per page
        try:
            invites = paginator.page(offset)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            invites = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            invites = paginator.page(paginator.num_pages)
        return render(request, 'group/profile/invite.html', {'invites': invites})
    else:
        raise PermissionDenied


@login_required()
def group_invite_remove(request, id):
    user = request.user
    try:
        if hasattr(user, 'group_profile'):
            invite = user.group_profile.invites.get(pk=id)
            invite.delete()
            messages.success(request, _('Приглашение успешно удалено!'))
            return redirect('group_invite_list')
        else:
            raise Http404
    except GroupInvite.DoesNotExist:
        messages.error(request, _('Приглашение не найдено!'))
        return redirect('group_invite_list')


@cache_control(must_revalidate=True)
def group_profile_card(request, id):
    if request.is_ajax():
        group = GroupProfile.objects.select_related('game', 'owner').get(pk=id)
        user_is_member, user_is_owner, user_is_moderator = (False, False, False)
        if not request.user.is_anonymous():
            user_is_member = group.is_user_member(request.user)
            user_is_owner = group.owner == request.user
            user_is_moderator = group.is_user_moderator(request.user)
        return render(request, 'group/group_card.html', {"group": group,
                                                         "user_is_member": user_is_member,
                                                         "user_is_owner": user_is_owner,
                                                         'user_is_moderator': user_is_moderator})
    else:
        raise PermissionDenied


@login_required()
def group_profile_perms_set(request):
    try:
        user = User.objects.get(pk=request.user.id)
    except User.DoesNotExist:
        raise Http404
    form = GroupPermissionForm(request.POST or None, instance=user)
    if form.is_valid():
        form.save()
        messages.success(request, _('Права успешно отредактированы!'))
        return redirect('group_profile')
    return render(request, 'group/profile/perms_form.html', {
        'form': form})


cache_key_groups = 'cache.groups.list'


@cache_control(must_revalidate=True)
def group_list(request):
    try:
        group_list = cache.get_or_set(cache_key_groups, GroupProfile.objects.all())
        paginator = Paginator(group_list, 20)
        page = request.GET.get('page')
        try:
            groups = paginator.page(page)
        except PageNotAnInteger:
            groups = paginator.page(1)
        except EmptyPage:
            groups = paginator.page(paginator.num_pages)
        return render(request, 'group/index.html', {'groups': groups})
    except GroupProfile.DoesNotExist:
        messages.error(request, _('Группа не найдена!'))
        return redirect('index')


def group_search(request):
    try:
        if 'q' in request.GET and request.GET['q'] and len(request.GET['q']):
            q = request.GET['q']
            group_list = GroupProfile.objects.filter(name__icontains=q)
            paginator = Paginator(group_list, 10)
            page = request.GET.get('page')
            try:
                groups = paginator.page(page)
            except PageNotAnInteger:
                groups = paginator.page(1)
            except EmptyPage:
                groups = paginator.page(paginator.num_pages)
            return render(request, 'group/search_result.html',
                          {'groups': groups, 'q': q})
        else:
            messages.error(request, _('Необходимо ввести поисковый запрос!'))
            return redirect('group_list')
    except GroupProfile.DoesNotExist:
        messages.error(request, _('Группа не найдена!'))
        return redirect('group_list')


@cache_control(must_revalidate=True)
@login_required()
def streams(request, groupname):
    try:
        group_profile = GroupProfile.objects.select_related('owner', 'forum', 'game').get(name__iexact=groupname)
        is_user_member = group_profile.is_user_member(request.user)
        if not is_user_member and request.user != group_profile.owner:
            messages.error(request, _('Вы не являетесь участником группы {}').format(group_profile.name))
            return redirect(group_profile.get_absolute_url())
        member_id_list = group_profile.get_all_members()
        planned_stream_list = StreamPreview.objects.planned() \
            .filter(Q(user__group_members__in=member_id_list) | Q(user=group_profile.owner)).distinct() \
            .select_related('user', 'game', 'stream_profile')
        live_stream_list = StreamPreview.objects.live() \
            .filter(Q(user__group_members__in=member_id_list) | Q(user=group_profile.owner)).distinct() \
            .select_related('user', 'game', 'stream_profile')
        return render(request, 'group/page/streams.html', {'planned_stream_list': planned_stream_list,
                                                           'live_stream_list': live_stream_list,
                                                           'group_profile': group_profile})
    except GroupProfile.DoesNotExist:
        messages.error(request, _('Группа не найдена!'))
        return redirect('index')


@login_required()
def group_load(request):
    if request.is_ajax():
        gm_list = request.user.group_members.filter().select_related('group')
        paginator = Paginator(gm_list, 1)
        page = request.GET.get('page')
        try:
            group_members = paginator.page(page)
        except PageNotAnInteger:
            group_members = paginator.page(1)
        except EmptyPage:
            group_members = paginator.page(paginator.num_pages)
        return render(request, 'group/profile/tag/.html', {'group_members': group_members})
    else:
        raise PermissionDenied
