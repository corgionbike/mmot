from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.flatpages.sitemaps import FlatPageSitemap
from django.contrib.flatpages.views import flatpage
from django.contrib.sitemaps.views import sitemap
from django.views.decorators.cache import cache_page
from django.views.generic import TemplateView
from django.conf.urls.i18n import i18n_patterns

from . import views
from .sitemaps import *

debug = getattr(settings, 'DEBUG', False)
handler404 = 'mmotimes.views.page_not_found'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^i18n/', include('django.conf.urls.i18n')),
    url(r'^adminpanel0608/', include(admin.site.urls)),
    url(r'^timezone/set/$', views.set_timezone, name='set_timezone'),
    url(r'^timezone/get/$', views.get_timezone, name='get_timezone'),
    url(r'^news/', include("news.urls")),
    url(r'^slider/', include("slider.urls")),
    url(r'^bank/', include("bank.urls")),
    url(r'^streams/', include("stream.urls")),
    url(r'^groups/', include("group.urls")),
    url(r'^feedback/', include("feedback.urls")),
    url(r'^invite/', include("invite_key.urls")),
    url(r'^user/', include("user_profile.urls")),
    url(r'^messages/', include("private_messages.urls")),
    url(r'^game/', include("cat_game.urls")),
    url(r'^guides/', include("guides.urls")),
    url(r'^faq/$', TemplateView.as_view(template_name='faq/index.html'), name='faq'),
]

urlpatterns += i18n_patterns(
    url(r'^$', views.index, name='index'),
    url(r'^news/', include("news.urls")),
    url(r'^bank/', include("bank.urls")),
    url(r'^streams/', include("stream.urls")),
    url(r'^groups/', include("group.urls")),
    url(r'^feedback/', include("feedback.urls")),
    url(r'^invite/', include("invite_key.urls")),
    url(r'^user/', include("user_profile.urls")),
    url(r'^messages/', include("private_messages.urls")),
    url(r'^game/', include("cat_game.urls")),
    url(r'^guides/', include("guides.urls")),
    url(r'^faq/$', TemplateView.as_view(template_name='faq/index.html'), name='faq'),
)

urlpatterns += [
    url(r'^notifications/$', views.notice_all, name='notice_all'),
    url(r'^notifications/load/$', views.notice_load, name='notice_load'),
    url(r'^notifications/load/(?P<offset>\d+)/$', views.notice_load, name='notice_load'),
    url(r'^notifications/delete/all/$', views.notice_delete_all, name='delete_all'),
    url(r'^notifications/delete/(?P<slug>\d+)/$', views.notice_delete, name='delete'),
    url(r'^notifications/', include('notifications.urls', namespace='notifications')),
]

sitemaps = {
    'news': NewsSitemap,
    'stream_live': StreamLiveSitemap,
    'static': StaticViewSitemap,
    'flatpages': FlatPageSitemap,
    'group': GroupViewSitemap,
    'open_group': OpenGroupsSitemap,
    'guides': GuidesSitemap
}

urlpatterns += [
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps},
        name='django.contrib.sitemaps.views.sitemap')]

urlpatterns += [
    url(r'^editor/', include("editor.urls"))
]

urlpatterns += [
    url(r'^thanks/$', TemplateView.as_view(template_name='thanks.html'), name='thanks'),
    url(r'^agreement/$', cache_page(60 * 15)(flatpage), {'url': '/agreement/'}, name='agreement'),
    url(r'^donations/$', TemplateView.as_view(template_name='donations.html'), name='donations')
    # url(r'^donations/$', cache_page(60 * 15)(flatpage), {'url': '/donations/'}, name='donations'),
]

urlpatterns += [
    url(r'^faq/sid_player/$', cache_page(60 * 15)(flatpage), {'url': '/faq/sid_player/'}, name='faq_sid_player'),
    url(r'^faq/bbcodes/$', cache_page(60 * 15)(flatpage), {'url': '/faq/bbcodes/'}, name='faq_bbcodes'),
    url(r'^faq/timezone/$', cache_page(60 * 15)(flatpage), {'url': '/faq/timezone/'}, name='faq_timezone'),
    
]

if debug:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if debug:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]