from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _
from sorl.thumbnail.admin import AdminImageMixin

from .forms import UserCreationForm2
from .models import UserProfile, UserProfileSetting, GameCharacter


class UserProfileAdmin(AdminImageMixin, UserAdmin):
    add_form = UserCreationForm2
    verbose_name_plural = 'Профиль пользователя'
    list_display = ('username', 'email', 'is_staff')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('avatar', 'email')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )


@admin.register(UserProfileSetting)
class UserProfileSetting(admin.ModelAdmin):
    pass


@admin.register(GameCharacter)
class GameCharacter(admin.ModelAdmin):
    list_display = ('name', 'game', 'user', 'group')

# Now register the new UserAdmin...
admin.site.register(UserProfile, UserProfileAdmin)

