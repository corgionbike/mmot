from django.contrib import admin
from .models import *


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('name', 'groups', 'platform', 'developer', 'rating', 'id')
    list_editable = ('groups', 'platform', 'developer', 'rating')
    search_fields = ('name', 'platform', 'developer', 'rating')


@admin.register(GroupGame)
class GroupGameAdmin(admin.ModelAdmin):
    list_display = ('name', 'id')
    # list_editable = ('name',)
    search_fields = ('name',)
