from django import template
from group.models import *
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import Group, Permission
from group.utils import is_user_moderator

register = template.Library()


@register.inclusion_tag('user_profile/tag/_top_menu.html', takes_context=True)
def user_menu(context):
    user = context.get('user')
    return {'user': user}


@register.inclusion_tag('user_profile/tag/_thumbnail.html', takes_context=False)
def img_thumbnail(img=None, w=54, h=54, cls='img-circle img-thumbnail'):
    size = '{0}x{1}'.format(w, h)
    return {'img': img,
            'w': w,
            'h': h,
            'size': size,
            'cls': cls}


# У пользователя есть группа
@register.assignment_tag
def is_user_has_group(user):
    return hasattr(user, "group_profile")


# Пользователь состоит в группе
@register.assignment_tag
def is_member_in_group(user):
    return hasattr(user, "group_member")


# У пользователь есть стрим профиль
@register.assignment_tag
def is_user_has_stream(user):
    return hasattr(user, "stream_profile")


# У пользователь есть стрим анонс
@register.assignment_tag
def is_user_has_preview(user):
    return hasattr(user, "stream_preview")


# Получить группу, в которой состоит пользователь
@register.assignment_tag(takes_context=False)
def get_group(user):
    if hasattr(user, "group_profile"):
        return user.group_profile
    if hasattr(user, "group_member"):
        return user.group_member.group
    return ''


# Владелец ли группы текущий пользователь
# @register.assignment_tag(takes_context=True)
# def is_owner_group_current_user(context, member):
#     user = context.get('user')
#     if user == member:
#         return hasattr(user, "group_profile")
#     return False


# Владелец ли группы текущий пользователь
@register.assignment_tag(takes_context=True)
def is_owner_group_current_user(context):
    user = context.get('user')
    return hasattr(user, "group_profile")


@register.assignment_tag(takes_context=True)
def is_invite_was_send(context, member):
    user = context.get('user')
    gi = GroupInvite.objects.filter(recipient=member, groups=user.group_profile)
    if gi:
        return True
    return False


@register.inclusion_tag('user_profile/tag/_service_menu_block.html', takes_context=True)
def service_menu_block(context):
    user = context.get('user')
    user_has_stream_profile = hasattr(user, "stream_profile")
    user_has_group_profile = hasattr(user, "group_profile")
    user_member_group = hasattr(user, "group_member")

    return {'user': user,
            'user_has_stream_profile': user_has_stream_profile,
            'user_has_group_profile': user_has_group_profile,
            'user_member_group': user_member_group}


@register.inclusion_tag('user_profile/tag/_banner_menu.html', takes_context=True)
def profile_banner_menu(context):
    user = context.get('user')
    request = context.get('request')
    path = request.path
    group_type = ''
    user_has_stream_profile = hasattr(user, "stream_profile")
    user_has_group_profile = hasattr(user, "group_profile")
    # user_is_moderator = is_user_moderator(user)

    if user_has_group_profile:
        group_type = user.group_profile.get_type_display()
    # if user_is_moderator:
    #     group_type = user.group_moderator#.group.get_type_display()

    return {'path': path,
            'user': user,
            'group_type': group_type,
            'user_has_stream_profile': user_has_stream_profile,
            'user_has_group_profile': user_has_group_profile,
            # 'user_is_moderator': user_is_moderator,
            }


@register.inclusion_tag('user_profile/tag/_edit_menu.html', takes_context=True)
def profile_edit_menu(context):
    return {}


@register.inclusion_tag('user_profile/tag/_user_info.html', takes_context=True)
def profile_user_info(context):
    user = context.get('user')
    return {'user': user}


@register.inclusion_tag('user_profile/tag/_game_character_info.html', takes_context=True)
def game_characters_info(context):
    user = context.get('user')
    characters = user.game_characters.all()
    return {'user': user, 'characters': characters}


@register.assignment_tag(takes_context=True)
def is_online_user_css(context, user):
    try:
        request = context.get('request')
        if request and request.is_user_online(user.id):
            return 'online-user'
        else:
            from mmotimes.api_redis import OnlineNowRedisApi
            redis = OnlineNowRedisApi()
            if redis.is_online_user(user.id):
                return 'online-user'
    except:
        return ''


@register.assignment_tag(takes_context=True)
def is_user_online(context, user):
    try:
        request = context.get('request')
        return request.is_user_online(user.id)
    except:
        return False


@register.inclusion_tag('user_profile/tag/_user_card_link.html', takes_context=False)
def user_card_link(user, w=54, h=54, is_img=True, cls='img-circle img-thumbnail'):
    return {'user': user, 'w': w, 'h': h, 'is_img': is_img, 'cls': cls}


@register.inclusion_tag('user_profile/tag/_modal_link.html', takes_context=False)
def modal_link(title='', url='#', name='', cls='btn btn-sm btn-link', id=''):
    return {'title': title, 'url': url, 'name': name, 'cls': cls, 'id': id}