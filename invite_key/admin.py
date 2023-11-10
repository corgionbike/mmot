from django.contrib import admin

from .models import InviteKey, GameInviteKey


@admin.register(InviteKey)
class SiteKeyAdmin(admin.ModelAdmin):
    list_display = ('id', 'owner', 'state')
    list_filter = ('created', 'modified', 'state', 'owner')
    list_editable = ('state',)
    search_fields = ('owner',)


@admin.register(GameInviteKey)
class GameKeyAdmin(admin.ModelAdmin):
    list_display = ('key', 'owner', 'state')
    list_filter = ('created', 'modified', 'state', 'owner')
    list_editable = ('state',)
    search_fields = ('owner',)