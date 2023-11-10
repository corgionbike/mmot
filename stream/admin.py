from django.contrib import admin

from .models import *


@admin.register(StreamPreview)
class StreamPreviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'id', 'stream_profile')
    # list_editable = ('name',)
    search_fields = ('name',)


@admin.register(StreamProfile)
class StreamProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'id')
    search_fields = ('user',)


@admin.register(StreamTeamCounter)
class StreamTeamCounterAdmin(admin.ModelAdmin):
    pass


@admin.register(StreamManage)
class StreamManageAdmin(admin.ModelAdmin):
    pass