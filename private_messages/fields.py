from django import forms
from django.contrib.auth import get_user_model
from django.forms import widgets
from django.utils.translation import ugettext_lazy as _


User = get_user_model()


class CommaSeparatedUserInput(widgets.Input):
    input_type = 'text'

    def render(self, name, value, attrs=None):
        if value is None:
            value = ''
        elif isinstance(value, (list, tuple)):
            value = (', '.join([getattr(user, 'username') for user in value]))
        return super(CommaSeparatedUserInput, self).render(name, value, attrs)


class CommaSeparatedUserField(forms.Field):
    widget = CommaSeparatedUserInput(attrs={'placeholder': _('Получатели'), 'autocomplete': "off"})

    def __init__(self, *args, **kwargs):
        recipient_filter = kwargs.pop('recipient_filter', None)
        self._recipient_filter = recipient_filter
        super(CommaSeparatedUserField, self).__init__(*args, **kwargs)

    def clean(self, value):
        super(CommaSeparatedUserField, self).clean(value)
        if not value:
            return ''
        if isinstance(value, (list, tuple)):
            return value

        names = set(value.split(','))
        names_set = set([name.strip() for name in names if name.strip()])
        users = list(User.objects.filter(**{'%s__in' % 'username': names_set}))
        unknown_names = names_set ^ set([getattr(user, 'username') for user in users])

        recipient_filter = self._recipient_filter
        invalid_users = []
        if recipient_filter is not None:
            for r in users:
                if recipient_filter(r) is False:
                    users.remove(r)
                    invalid_users.append(getattr(r, 'username'))

        if unknown_names or invalid_users:
            raise forms.ValidationError(_(u"The following usernames are incorrect: %(users)s") % {
                'users': ', '.join(list(unknown_names) + invalid_users)})

        return users

    def prepare_value(self, value):
        if value is None:
            value = ''
        elif isinstance(value, (list, tuple)):
            value = (', '.join([getattr(user, 'username') for user in value]))
        return value
