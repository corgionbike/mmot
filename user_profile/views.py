from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.http import Http404
from django.shortcuts import render, redirect
from django.utils.translation import ugettext_lazy as _
from django.views.decorators.cache import cache_control
from django.core.cache import cache
from .forms import UserProfileForm

User = get_user_model()

cache_key_user = 'cache.user.card.{}'


@cache_control(must_revalidate=True)
@login_required()
def profile(request):
    try:
        user = User.objects.select_related('stream_preview',
                                           'stream_profile',
                                           'group_profile',
                                           'site_invite_key',).get(pk=request.user.id)
    except User.DoesNotExist:
        raise Http404
    return render(request, 'user_profile/index.html', {'user': user})


@login_required()
def profile_edit(request):
    form = UserProfileForm(request.POST or None, request.FILES or None, instance=request.user)
    if form.is_valid():
        form.save()
        cache.delete(cache_key_user)
        messages.success(request, _('Профиль успешно отредактирован!'))
        return redirect('user_profile')
    return render(request, 'user_profile/edit_form.html', {
        'form': form,})


@cache_control(must_revalidate=True)
def profile_user_card(request, id):
    if not request.is_ajax():
        raise PermissionDenied
    try:
        member = User.objects.select_related('group_profile').get(pk=id)
        cache.get_or_set(cache_key_user.format(id), member)
        user = request.user
        user_group = None
        is_user_owner_current_group, is_user_has_group = (False, False)
        is_member_group, is_member_moderator_group, is_member_has_group = (False, False, False)
        if not user.is_anonymous():
            user_group = user.get_group()
        if user_group:
            is_user_has_group = True
            if user_group.is_user_member(member):
                is_member_group = True
                is_user_owner_current_group = True
                if user_group.is_user_moderator(member):
                    is_member_moderator_group = True
    except User.DoesNotExist:
        raise Http404
    return render(request, 'user_profile/user_card.html',
                  {'member': member, "group": user_group, "is_member_group": is_member_group,
                   'is_user_has_group': is_user_has_group,
                   'is_user_owner_current_group': is_user_owner_current_group,

                   'is_member_moderator_group': is_member_moderator_group})


