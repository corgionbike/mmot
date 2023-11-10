from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='forum_index'),
    url(r'^topic/create/$', views.topic_create, name='topic_create'),
    url(r'^topic/edit/(?P<id>\d+)/$', views.topic_edit, name='topic_edit'),
    url(r'^topic/remove/(?P<id>\d+)/$', views.topic_remove, name='topic_remove'),
    url(r'^topic/detail/(?P<id>\d+)/$', views.topic_detail, name='topic_detail'),
    url(r'^topic/load/$', views.topic_load, name='topic_load'),
    url(r'^post/load/(?P<id>\d+)/$', views.post_load, name='post_load'),
    url(r'^post/create/(?P<id>\d+)/$', views.post_create, name='post_create'),
    url(r'^post/remove/(?P<id>\d+)/$', views.post_remove, name='post_remove'),
    url(r'^post/edit/(?P<id>\d+)/$', views.post_edit, name='post_edit'),
    url(r'^profile/edit/$', views.forum_profile_edit, name='forum_profile_edit'),
    url(r'^search/$', views.topic_search, name='topic_search'),
    url(r'^topic/unsubscribe/(?P<id>\d+)/$', views.unsubscribe, name='topic_unsubscribe'),
    url(r'^topic/subscribe/(?P<id>\d+)/$', views.subscribe, name='topic_subscribe'),
    url(r'^post/reply/(?P<id>[\d]+)/$', views.reply, name='post_reply'),

]
