from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.guides_index, name='guides_index'),
    url(r'^profile/$', views.guides_profile, name='guides_profile'),
    url(r'^profile/create/$', views.guide_create, name='guide_create'),
    url(r'^profile/remove/(?P<id>\d+)/$', views.guide_remove, name='guide_remove'),
    url(r'^profile/edit/(?P<id>\d+)/$', views.guide_edit, name='guide_edit'),
    url(r'^post/(?P<id>\d+)/$', views.guide_detail, name='guide_detail'),

    url(r'^filter/$', views.guide_filter, name='guide_filter'),
    url(r'^tag/$', views.guide_search_by_tag, name='guide_search_by_tag'),


    url(r'^autocomplete_tags.json', views.autocomplete_tags, name='guide_autocomplete_tags'),
]
