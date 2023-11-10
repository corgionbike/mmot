from django import template
from django.db.models import Q

from ..models import *

register = template.Library()


@register.inclusion_tag('group/tag/_top_menu.html', takes_context=True)
def group_menu(context):
    user = context.get('user')
    if user.is_anonymous():
        return None
    members = GroupMember.objects.filter(user=user).select_related('group')
    my_group = user.get_group()
    return {'user': user, 'group_members': members, 'my_group': my_group}


@register.inclusion_tag('group/profile/tag/_members.html', takes_context=True)
def members_info(context, count=7):
    group = context.get('group_profile')
    member_list = group.group_members.filter().select_related('user')[:count]
    return {'member_list': member_list, 'group_profile': group}


@register.inclusion_tag('group/tag/_member_list.html', takes_context=True)
def member_list(context, count=6):
    group = context.get('group_profile')
    member_list = group.group_members.filter().select_related('user')[:count]
    return {'member_list': member_list, 'group_profile': group, 'count': count}


@register.inclusion_tag('group/tag/_group_tab.html', takes_context=True)
def group_tab(context):
    group = context.get('group_profile')
    return {'group_profile': group}


@register.inclusion_tag('group/profile/invite_list.html', takes_context=False)
def list_invites(user):
    try:
        gi = GroupInvite.objects.filter(recipient=user).select_related('group')
    except GroupInvite.DoesNotExist:
        return {'gi': None}
    return {'invites': gi}


@register.simple_tag
def get_icon_privacy(privacy):
    try:
        img_logo = []
        img_logo.append('fa fa-lock')
        img_logo.append('fa fa-globe')
        return img_logo[privacy]
    except:
        return 'fa fa-info {}'


@register.simple_tag(takes_context=True)
def get_count_invites(context):
    try:
        user = context.get('user')
        group = user.get_group()
        return GroupInvite.objects.filter(Q(recipient=user, type=0) | Q(group=group, type=1)).count()
    except:
        return 0


@register.inclusion_tag('group/profile/tag/_group_info.html', takes_context=True)
def profile_group_info(context):
    user_is_moderator = context.get('user_is_moderator')
    group = context.get('group_profile')
    host = context.get('host')
    return {'group': group,
            'user_is_moderator': user_is_moderator,
            'host': host}


@register.inclusion_tag('group/profile/tag/_moderators.html', takes_context=True)
def moderators_info(context):
    group = context.get('group_profile')
    user_is_moderator = context.get('user_is_moderator')
    moderator_list = group.group_moderators.filter().select_related('user')
    return {'moderator_list': moderator_list,
            'user_is_moderator': user_is_moderator}


@register.inclusion_tag('group/tag/_group_card_link.html', takes_context=False)
def group_card_link(group, w=54, h=54, is_img=True, fname=True, cls='img-circle img-thumbnail',):
    return {'group': group, 'w': w, 'h': h, 'is_img': is_img, 'cls': cls, 'fname':fname}


@register.inclusion_tag('group/tag/_search_form.html', takes_context=False)
def search_form(url=''):
    return {'url': url}


@register.simple_tag(takes_context=False)
def is_moderator_group(user, group):
    return group.group_moderators.filter(user=user).exists()


@register.simple_tag(takes_context=False)
def is_owner_group(user, group):
    return group.owner == user


@register.inclusion_tag('group/profile/tag/_user_groups_info.html', takes_context=True)
def user_groups_info(context):
    user = context.get('user')
    group_members = GroupMember.objects.filter(user=user).select_related('group')
    return {'user': user, 'group_members': group_members}
