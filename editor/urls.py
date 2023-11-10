from __future__ import unicode_literals

from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'preview/bbcode/$', preview_bbcode, name='editor_bbcode_preview'),
    url(r'preview/html/$', preview_html, name='editor_html_preview'),
]
