from django.contrib import admin

from .models import ArticleModel


@admin.register(ArticleModel)
class NewsAdmin(admin.ModelAdmin):
    fields = ('title', 'slug', 'body', 'tags', 'status', 'start', 'end', 'modified', 'status_changed')
    prepopulated_fields = {"slug": ("title",)}
    list_display = ('title', 'status', 'modified', 'id')
    readonly_fields = ('created', 'modified', 'status_changed', 'id')
    ordering = ['-start']


