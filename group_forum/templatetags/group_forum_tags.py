from django import template
from django.contrib.auth.models import Group, Permission
from math import ceil

register = template.Library()


@register.inclusion_tag('group_forum/index.html', takes_context=True)
def forum(context):
    forum = context.get('forum')
    topics = forum.topics.all().select_related('user')
    return {'forum': forum, 'topics': topics}


@register.inclusion_tag('group_forum/tag/topic_menu.html', takes_context=True)
def topic_menu(context, is_edit=True, is_del=True):
    topic = context.get('topic')
    return {'topic': topic, 'is_edit': is_edit, 'is_del': is_del}


@register.inclusion_tag('group_forum/tag/post_menu.html', takes_context=True)
def post_menu(context):
    post = context.get('post')
    return {'post': post}


@register.inclusion_tag('group_forum/tag/quote_menu.html', takes_context=True)
def quote_menu(context):
    post = context.get('post')
    return {'post': post}


@register.inclusion_tag('group_forum/profile/_forum_manage.html', takes_context=True)
def forum_info(context):
    group = context.get('group_profile')
    return {'forum': group.forum}


@register.assignment_tag(takes_context=False)
def get_num_pages(count_posts, num_posts):
    hits = max(1, count_posts)
    num_pages = int(ceil(hits / float(num_posts)))
    return str(num_pages)


@register.inclusion_tag('group_forum/tag/subscribe_menu.html', takes_context=True)
def subscribe_menu(context):
    topic = context.get('topic')
    user = context.get('user')
    group = context.get('group_profile')
    return {'topic': topic, 'user': user, 'group': group}


# @register.inclusion_tag('group_forum/tag/include_editor.html', takes_context=False)
# def editor(form, selector="", action_url="", preview_url="", video_btn=True):
#     return {"form": form,
#             "selector": selector,
#             "action_url": action_url,
#             "preview_url": preview_url,
#             "video_btn": video_btn}