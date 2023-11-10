from django.contrib import admin

from .models import GroupEvents, Event, Settings


class EventsAdmin(admin.ModelAdmin):
    list_display = ('group', 'settings', 'is_closed')


admin.site.register(GroupEvents, EventsAdmin)
admin.site.register(Event)
admin.site.register(Settings)
