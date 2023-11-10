from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^site/key/get/$', views.invite_site_key_get, name='invite_site_key_get'),

]
