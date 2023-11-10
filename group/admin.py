from django.contrib import admin

from .models import *


@admin.register(GroupProfile)
class GroupProfileAdmin(admin.ModelAdmin):
    pass


@admin.register(GroupMember)
class GroupMemberAdmin(admin.ModelAdmin):
    list_display = ('user', 'group')


@admin.register(GroupInvite)
class GroupInviteAdmin(admin.ModelAdmin):
    list_display = ('recipient', 'group', 'type')


@admin.register(GroupModerator)
class GroupMemberAdmin(admin.ModelAdmin):
    list_display = ('user', 'group')
