from django.contrib import admin
from sorl.thumbnail.admin import AdminImageMixin

from .models import *


@admin.register(Feedback)
class FeedbackAdmin(AdminImageMixin, admin.ModelAdmin):
    list_display = ('subject', 'name', 'status', 'type', 'text')
    fields = ('status', 'name', 'subject', 'type', 'text', 'email', 'created')
    readonly_fields = ('name', 'subject', 'type', 'text', 'email', 'created')
    search_fields = ('name', 'email')
    list_editable = ('status',)
