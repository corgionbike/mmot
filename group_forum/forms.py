from django.forms import ModelForm, Textarea, forms
from django.utils.translation import ugettext_lazy as _
from editor.widgets import EditorWidget
from .models import Topic, Post, Settings
from django.conf import settings

MAX_GROUP_TOPICS = getattr(settings, 'MAX_GROUP_TOPICS', 20)


class TopicAddForm(ModelForm):
    class Meta:
        model = Topic
        fields = ['name', 'description', 'sticky', 'closed', 'hidden']
        widgets = {'description': Textarea(attrs={'rows': 5,
                                                  'required': False,
                                                  'placeholder': _('Опишите тему обсуждения подробнее...')})}

    def __init__(self, user, group_profile, *args, **kwargs):
        super(TopicAddForm, self).__init__(*args, **kwargs)
        self.count_topic = group_profile.forum.topics.count()
        if not group_profile.is_user_moderator(user) and group_profile.owner != user:
            self.fields.pop('sticky')
            self.fields.pop('closed')
            self.fields.pop('hidden')

    def clean(self):
        super(TopicAddForm, self).clean()
        if self.count_topic >= MAX_GROUP_TOPICS:
            raise forms.ValidationError(_("Количество обсуждений ограничено < {}!").format(MAX_GROUP_TOPICS))


class TopicEditForm(TopicAddForm):
    def __init__(self, user, group_profile, *args, **kwargs):
        super(TopicEditForm, self).__init__(user, group_profile, *args, **kwargs)
        self.count_topic = 0
        # topic = kwargs.get('instance', None)
        # if topic:
        #     if topic.user != user:
        #         self.fields.pop('send_response')


class PostForm(ModelForm):
    class Meta:
        model = Post
        fields = ['body']
        widgets = {'body': EditorWidget(attrs={'rows': 5,
                                           'required': False,
                                           'placeholder': _('Здесь можно оставить свой комментарий...')},
                                            html=True)}


class PostAddForm(PostForm):
    pass


class PostEditForm(ModelForm):
    class Meta:
        model = Post
        fields = ['body']
        widgets = {'body': Textarea(attrs={'rows': 5,
                                           'required': False,
                                           'placeholder': _('Здесь можно оставить свой комментарий...')},
                                    )}
    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     post = self.instance
    #     self.fields['body'].widget = EditorWidget(attrs={'rows': 5, 'id': 'id_body_{}'.format(post.pk),
    #                                        'required': False,
    #                                        'placeholder': _('Здесь можно оставить свой комментарий...')},
    #                                         video=True)
    pass


class ForumSetForm(ModelForm):
    class Meta:
        model = Settings
        fields = ['num_topics', 'num_posts', 'is_member_edit', 'is_member_create']
        labels = {'num_topics': _('Число обсуждений на страницу'),
                  'num_posts': _('Число комментариев на страницу'),
                  'is_member_edit': _('Разрешить редактировать посты пользователям'),
                  'is_member_create': _('Разрешить создавать обсуждения пользователям'),
                  # 'post_ordering': _('Последний пост сверху')
                  }
