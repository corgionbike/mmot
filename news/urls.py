from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='news_index'),
    url(r'^post/(?P<slug>[\w-]+)/$', views.news_detail, name='news_detail'),

]
