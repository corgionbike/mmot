from django.contrib import sitemaps
from django.core.urlresolvers import reverse
from news.models import ArticleModel
from stream.models import StreamPreview
from group.models import GroupProfile
from guides.models import GuideModel

class StaticViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'monthly'
    i18n = True

    def items(self):
        return ['index', 'feedback', 'faq']

    def location(self, item):
        return reverse(item)


class GroupViewSitemap(sitemaps.Sitemap):
    priority = 0.5
    changefreq = 'monthly'
    i18n = True

    def items(self):
        return ['group_list',]

    def location(self, item):
        return reverse(item)


class NewsSitemap(sitemaps.Sitemap):
    changefreq = "monthly"
    priority = 0.5
    i18n = True

    def items(self):
        return ArticleModel.objects.live()

    def lastmod(self, obj):
        return obj.modified


class GuidesSitemap(sitemaps.Sitemap):
    changefreq = "monthly"
    priority = 0.5
    i18n = True

    def items(self):
        return GuideModel.objects.all()

    def lastmod(self, obj):
        return obj.modified


class StreamLiveSitemap(sitemaps.Sitemap):
    changefreq = "hourly"
    priority = 0.5
    i18n = True

    def items(self):
        return StreamPreview.objects.all()


class OpenGroupsSitemap(sitemaps.Sitemap):
    changefreq = "monthly"
    priority = 0.5
    i18n = True

    def items(self):
        return GroupProfile.objects.filter(privacy=1)
