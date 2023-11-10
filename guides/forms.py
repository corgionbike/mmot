from django.forms import ModelForm, Textarea
from django import forms
from django.utils.translation import ugettext_lazy as _
from editor.widgets import EditorWidget
from .models import *
from cat_game.models import Game
from django.conf import settings
from taggit.models import Tag
from django.db.models.query import QuerySet
from taggit.forms import TagField, TagWidget


class GuideAddForm(ModelForm):

    tags = TagField(label=_('Теги'), required=True, help_text=_('Теги лучше разделять запятой'),
                    widget=TagWidget(attrs={'autocomplete': "off"}))

    class Meta:
        model = GuideModel
        fields = ['game', 'title', 'body', 'is_draft', 'tags']
        widgets = {'body': EditorWidget(attrs={'rows': 40, 'required': True}, cut=True, html=True, video=True)}
        labels = {'body': _('Текст гайда...')}

        help_texts = {
            'game': _('Выберите игру, которой будет посвещен гайд'),
            'title': _('Заголовок должен быть наполнен смыслом, чтобы можно было понять, о чем будет публикация'),
            'tags': _('Метки лучше разделять запятой'),
            'is_draft': _('Публикация будет сохранена как черновик и будет доступна для редактирования'),
        }


class GuideFilterForm(forms.Form):

    game = forms.ModelChoiceField(queryset=Game.objects.all(), label=_('Игра'),
                                  help_text=_('Выберите игру из списка'),
                                  required=False)
    tags = TagField(label=_('Теги'), required=False, help_text=_('Теги нужно разделять запятой'),
                    widget=TagWidget(attrs={'data-provide': 'typeahead', 'autocomplete': "off"}))


    # def __init__(self, *args, **kwargs):
    #     super(GuideFilterForm, self).__init__(*args, **kwargs)
    #     self.fields['tags'].queryset = Tag.objects.none()

