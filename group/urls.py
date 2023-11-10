from django.conf.urls import url, include

from . import views

urlpatterns = [
    url(r'^page/(?P<groupname>[a-zA-Z][a-zA-Z0-9-_\.]{3,15})/$', views.index, name='group_index'),
    url(r'^page/(?P<groupname>[a-zA-Z][a-zA-Z0-9-_\.]{3,15})/forum/', include("group_forum.urls")),
    url(r'^page/(?P<groupname>[a-zA-Z][a-zA-Z0-9-_\.]{3,15})/events/', include("group_events.urls")),
    url(r'^page/(?P<groupname>[a-zA-Z][a-zA-Z0-9-_\.]{3,15})/members/$', views.members, name='group_members'),
    url(r'^page/(?P<groupname>[a-zA-Z][a-zA-Z0-9-_\.]{3,15})/members/search/$', views.group_members_search,
        name='group_members_search'),
    url(r'^page/(?P<groupname>[a-zA-Z][a-zA-Z0-9-_\.]{3,15})/streams/$', views.streams, name='group_streams'),
]

urlpatterns += [
    url(r'^profile/$', views.profile, name='group_profile'),
    url(r'^profile/create/$', views.group_profile_create, name='group_profile_create'),
    url(r'^profile/edit/$', views.group_profile_edit, name='group_profile_edit'),
    url(r'^profile/remove/$', views.group_profile_remove, name='group_profile_remove'),
    url(r'^profile/card/(?P<id>\d+)/$', views.group_profile_card, name='group_profile_card'),
]

urlpatterns += [
    url(r'^profile/invite/send/$', views.group_invite_send, name='group_invite_send'),
    url(r'^profile/invite/send/(?P<username>[\w.@+-]+)/$', views.group_invite_send, name='group_invite_send_to'),
    url(r'^profile/petition/send/(?P<group_id>\d+)/$', views.group_petition_send, name='group_petition_send'),


    url(r'^profile/invite/list/$', views.group_invite_list, name='group_invite_list'),
    url(r'^profile/invite/load/$', views.group_invite_load, name='group_invite_load'),
    url(r'^profile/invite/load/(?P<offset>\d+)/$', views.group_invite_load, name='group_invite_load'),
    url(r'^profile/invite/approve/(?P<id>\d+)/$', views.group_invite_approve, name='group_invite_approve'),
    url(r'^profile/petition/approve/(?P<id>\d+)/$', views.group_petition_approve, name='group_petition_approve'),
    url(r'^profile/invite/reject/(?P<id>\d+)/$', views.group_invite_reject, name='group_invite_reject'),
    url(r'^profile/invites/remove/(?P<id>\d+)/$', views.group_invite_remove, name='group_invite_remove'),
]

urlpatterns += [
    url(r'^profile/moderator/add/$', views.group_moderator_add, name='group_moderator_add'),
    url(r'^profile/moderator/exclude/(?P<group_id>\d+)/(?P<id>\d+)/$', views.group_moderator_exclude, name='group_moderator_exclude'),
]

urlpatterns += [
    url(r'^member/exclude/(?P<id>\d+)/(?P<xhr>\d+)/$', views.group_member_exclude, name='group_member_exclude'),
    url(r'^member/exclude/(?P<id>\d+)/$', views.group_member_exclude, name='group_member_exclude'),
    url(r'^member/reject(?P<id>\d+)/$', views.group_member_reject, name='group_member_reject'),
    url(r'^member/join/(?P<id>\d+)/$', views.group_member_join, name='group_member_join'),
    url(r'^member/out/(?P<id>\d+)/$', views.group_member_out, name='group_member_out'),
]

urlpatterns += [
    url(r'^search/$', views.group_search, name='group_search'),
    url(r'^$', views.group_list, name='group_list'),
]
