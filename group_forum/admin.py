from django.contrib import admin

from .models import Forum, Topic, Post, Settings


class ForumAdmin(admin.ModelAdmin):
    list_display = ('group', 'settings', 'is_closed')


admin.site.register(Forum, ForumAdmin)
admin.site.register(Topic)
admin.site.register(Post)
admin.site.register(Settings)
