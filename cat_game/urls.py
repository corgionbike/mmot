from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^detail/(?P<id>\d+)/$', views.game_detail, name='game_detail'),
]
