from django.db.models.signals import post_save, pre_delete, post_delete
from django.dispatch import receiver

from group.models import GroupProfile, GroupInvite, GroupMember
from group_forum.models import Forum, Settings
from group_events.models import GroupEvents
from group_events.models import Settings as Events_Settings


# создание группы модераторов
@receiver(post_delete, sender=GroupMember)
def del_num_members(sender, instance, **kwargs):
    count = instance.group.count_members()
    instance.group.num_members = count
    instance.group.save()


@receiver(post_save, sender=GroupMember)
def update_num_members(sender, instance, **kwargs):
    count = instance.group.count_members()
    instance.group.num_members = count
    instance.group.save()


# создание форума для группы
@receiver(post_save, sender=GroupProfile)
def create_group_forum(sender, instance, **kwargs):
    try:
        forum = Forum.objects.get_or_create(group=instance)
        if forum[1]:
            setup = Settings.objects.create()
            forum[0].settings = setup
            forum[0].save()
    except Exception:
        pass


# создание событий для группы
@receiver(post_save, sender=GroupProfile)
def create_group_events(sender, instance, **kwargs):
    try:
        events = GroupEvents.objects.get_or_create(group=instance)
        if events[1]:
            setup = Events_Settings.objects.create()
            events[0].settings = setup
            events[0].save()
    except Exception:
        pass


# удаление заявок в случае
@receiver(pre_delete, sender=GroupProfile)
def remove_invites(sender, instance, **kwargs):
    try:
        gi = GroupInvite.objects.all(group=instance)
        gi.delete()
    except Exception:
        pass

# @receiver(post_delete, sender=GroupModerator)
# def remove_user_moderator(sender, instance, **kwargs):
#     try:
#         instance.user.is_moderator = False
#         instance.user.save()
#     except Exception:
#         pass
