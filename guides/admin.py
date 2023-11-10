from django.contrib import admin
from .models import *
from taggit.models import Tag


@admin.register(GuideModel)
class GuideModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'game', 'is_draft', 'user', 'status')
    list_editable = ('status', 'is_draft', 'user')
    search_fields = ('title', 'user', 'game')

