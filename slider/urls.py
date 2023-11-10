from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^play/(?P<id>\d+)$', views.slider_play, name='slider_play'),

]
