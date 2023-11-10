from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='events_index'),
    url(r'^event/create/$', views.event_create, name='event_create'),
    url(r'^event/edit/(?P<id>\d+)/$', views.event_edit, name='event_edit'),
    url(r'^event/remove/(?P<id>\d+)/$', views.event_remove, name='event_remove'),
    # url(r'^event/detail/(?P<id>\d+)/$', views.event_detail, name='event_detail'),

]
