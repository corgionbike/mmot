from django.conf.urls import url
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    url(r'^$', views.index, name='stream_index'),

    url(r'^channel/form/control/$', views.stream_channel_ctrl, name='stream_channel_ctrl'),
    url(r'^channel/(?P<username>[a-zA-Z][a-zA-Z0-9-_\.]{3,15})/$', views.stream_channel, name='stream_channel'),
    url(r'^watch/(?P<username>[a-zA-Z][a-zA-Z0-9-_\.]{3,15})/$', views.stream_liveview, name='stream_liveview'),

    url(r'^profile/$', views.profile, name='stream_profile'),
    url(r'^profile/create/$', views.profile_create, name='stream_profile_create'),
    url(r'^profile/edit/$', views.profile_edit, name='stream_profile_edit'),
    url(r'^profile/blocked/$',  TemplateView.as_view(template_name='stream/profile/blocked.html'), name='stream_profile_blocked'),
    url(r'^profile/null/$',  TemplateView.as_view(template_name='stream/profile/null.html'), name='stream_profile_null'),
    url(r'^profile/manage/$', views.stream_profile_manager, name='stream_profile_manager'),

    url(r'^profile/preview/create/$', views.preview_create, name='stream_preview_create'),
    url(r'^profile/preview/edit/$', views.preview_edit, name='stream_preview_edit'),
    url(r'^profile/preview/remove/$', views.preview_remove, name='stream_preview_remove'),
    url(r'^profile/preview/detail/(?P<id>\d+)/$', views.preview_detail, name='preview_detail'),

    url(r'^team/count/(?P<streamer_id>\d+)/$', views.team_count_get, name='team_count_get'),
    url(r'^team/count/reset/(?P<streamer_id>\d+)/$', views.team_count_reset, name='team_count_reset'),
    url(r'^team/count/(?P<team_id>\d+)/(?P<action>[a-z]{1,3})/(?P<streamer_id>\d+)/$', views.team_count_action, name='team_count_action'),

    url(r'^refresh/stream/$', views.refresh_stream_bot, name='refresh_stream_bot'),
    url(r'^connect/twitch/$', views.connect_twitch, name='connect_twitch'),

]
