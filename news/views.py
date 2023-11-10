from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render, get_object_or_404, redirect
from django.http import Http404
from django.contrib import messages
from .models import ArticleModel
from django.utils.translation import ugettext_lazy as _
from mmotimes.api_redis import PostViewsCount

cache_key_top_news = 'cache.top_news'
cache_key_all_news = 'cache.all_news'
cache_key_news = 'cache.news.{}'


def index(request):
    articles = ArticleModel.objects.live()
    paginator = Paginator(articles, 5)  # Show 25 news per page

    page = request.GET.get('page')
    try:
        news = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        news = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        news = paginator.page(paginator.num_pages)

    return render(request, 'news/index.html', {"news": news})


def news_detail(request, slug):
    try:
        article = ArticleModel.objects.get(slug=slug)
        if not article.is_live() and not request.user.is_staff:
            messages.info(request, _("Новость не найдена или недоступна!"))
            return redirect('news_index')
        pv = PostViewsCount().save(request, article.id, model='news')
        views = pv.count(article.id, model='news')
        return render(request, 'news/detail.html', {'article': article, 'views': views})
    except ArticleModel.DoesNotExist:
        raise Http404
