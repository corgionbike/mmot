from django.forms import ModelForm, Textarea
from django.utils.translation import ugettext_lazy as _
from .models import *


class EventAddForm(ModelForm):
    class Meta:
        model = Event
        fields = ['name', 'description', 'type', 'start_ts', 'closed', 'hidden']
        widgets = {'description': Textarea(attrs={'rows': 5,
                                                  'required': False,
                                                  'placeholder': _('Опишите предстоящее событие подробнее...')})}

    def __init__(self, user, group_profile, *args, **kwargs):
        super(EventAddForm, self).__init__(*args, **kwargs)
        if not group_profile.is_user_moderator(user) and group_profile.owner != user:
            self.fields.pop('closed')
            self.fields.pop('hidden')


class EventEditForm(EventAddForm):
    def __init__(self, user, group_profile, *args, **kwargs):
        super(EventEditForm, self).__init__(user, group_profile, *args, **kwargs)


class EventSetForm(ModelForm):
    class Meta:
        model = Settings
        fields = ['num_events', 'is_member_edit', 'is_member_create']
        labels = {'num_topics': _('Число событий на страницу'),
                  'is_member_edit': _('Разрешить редактировать события пользователям'),
                  'is_member_create': _('Разрешить создавать события пользователям'),
                  }
