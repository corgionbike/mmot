from django.contrib.auth.models import Group
from .models import GroupProfile, GroupMember
from django.db.models import Q


def is_user_has_group(user):
    return hasattr(user, 'group_profile') or hasattr(user, 'group_member')


# Проверка на пользователя есть ли у него своя группа
def is_owner_group(user, member):
    if user == member:
        return hasattr(user, "group_profile")
    return False


def is_user_in_moderator_group(user):
    try:
        g = Group.objects.get(name='Group moderators')
        return user.groups.filter(id=g.id).exists()
    except Group.DoesNotExist:
        return False


def is_user_moderator(user):
    return hasattr(user, 'group_moderator')


def is_user_has_permission(user):
    return hasattr(user, 'group_profile') or is_user_moderator(user)


def get_all_user_groups(user):
    if not is_user_has_group(user):
        return None
    groups_id = GroupMember.objects.filter(user=user).values('group')
    # groups = GroupProfile.objects.filter(id__in=groups_id, owner=user)
    groups = GroupProfile.objects.filter(Q(id__in=groups_id) | Q(owner=user))
    return groups
