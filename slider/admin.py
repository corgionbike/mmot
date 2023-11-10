from django.contrib import admin
from sorl.thumbnail.admin import AdminImageMixin

from .models import *


@admin.register(SliderModel)
class SliderAdmin(AdminImageMixin, admin.ModelAdmin):
    fields = (
    'title', 'link', 'is_video', 'description', 'background', 'crop', 'quality', 'status', 'start', 'end', 'modified',
    'status_changed',)
    list_display = ('title', 'status', 'id',)
    readonly_fields = ('created', 'modified', 'status_changed', 'id')
