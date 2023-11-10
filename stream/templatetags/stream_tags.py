from django import template
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
import json
from django.core.cache import cache

from ..models import *

register = template.Library()


def get_info_stream(streamer):
    if streamer.stream_profile.has_preview() and isinstance(streamer.stream_preview.provider, int):
        provider = streamer.stream_preview.get_provider_display().lower().split('.')
        sid = streamer.stream_preview.sid
        return {'provider': provider, 'sid': sid}
    else:
        provider = streamer.stream_profile.get_provider_display().lower().split('.')
        sid = streamer.stream_profile.sid
    return {'provider': provider, 'sid': sid}


@register.simple_tag(takes_context=True)
def player(context, streamer=None):
    if not streamer:
        streamer = context.get('streamer')
    info = get_info_stream(streamer)
    tmpl = 'stream/channel/{0}/_{0}_player.html'.format(info['provider'][0])
    try:
        return render_to_string(tmpl, {'sid': info['sid']})
    except:
        return _('Плеер не найден!')


@register.simple_tag(takes_context=True)
def chat(context):
    streamer = context.get('streamer')
    info = get_info_stream(streamer)
    tmpl = 'stream/channel/{0}/_{0}_chat.html'.format(info['provider'][0])
    try:
        return render_to_string(tmpl, {'sid': info['sid']})
    except:
        return ''


@register.inclusion_tag('stream/channel/module/_ctrl_stream.html', takes_context=True)
def ctrl_stream(context):
    if 'form' not in context:
        return None
    form = context.get('form')
    user = context.get('user')
    return {'form': form, 'user': user}


@register.inclusion_tag('stream/profile/tag/_top_menu.html', takes_context=True)
def manager_player_menu(context):
    if 'user' not in context:
        return None
    user = context.get('user')
    if user.is_anonymous():
        return None
    return {'user': user}


@register.inclusion_tag('stream/channel/tag/_stream_desc.html', takes_context=True)
def stream_desc(context):
    streamer = context.get('streamer')
    return {'streamer': streamer}


@register.inclusion_tag('stream/channel/module/_stream_archive.html', takes_context=True)
def archives(context):
    streamer = context.get('streamer')
    archives = streamer.stream_archives.all()
    return {'archives': archives}


def calc_duration(end_ts, start_ts):
    duration = end_ts - start_ts
    now = timezone.now()
    delta = end_ts - now
    if delta.days < 0:
        return 100
    progress = int(100 - (delta * 100) / duration)
    if progress < 0:
        return 0
    return progress


def calc_remainder(start_ts):
    now = timezone.now()
    delta = start_ts - now
    if delta.days < 0:
        return 0
    return delta


@register.assignment_tag(takes_context=False)
def remainder_time(start_ts):
    t = calc_remainder(start_ts)
    return str(t)


@register.inclusion_tag('stream/channel/module/_progress_line.html', takes_context=True)
def stream_progress_line(context, streamer=None, header=True):
    if not streamer:
        streamer = context.get('streamer')
    preview = StreamPreview.objects.filter(user=streamer)
    if not preview:
        return {'has_preview': False}
    progress = int(calc_duration(preview[0].end_ts, preview[0].start_ts))
    return {'progress': progress,
            'preview': preview[0],
            'has_preview': True,
            'end_ts': preview[0].end_ts,
            'start_ts': preview[0].start_ts}


@register.simple_tag(takes_context=True)
def stream_progress(context):
    preview = context.get('stream')
    progress = int(calc_duration(preview.end_ts, preview.start_ts))
    return '{}%'.format(progress)


@register.simple_tag(takes_context=False)
def stream_json_progress(preview):
    data = {"start_year": preview.start_ts.year, "start_month": preview.start_ts.month,
            "start_day": preview.start_ts.day, "start_hour": preview.start_ts.hour,
            "start_minute": preview.start_ts.minute,
            "end_year": preview.end_ts.year, "end_month": preview.end_ts.month, "end_day": preview.end_ts.day,
            "end_hour": preview.end_ts.hour, "end_minute": preview.end_ts.minute}

    return json.dumps(data)


@register.assignment_tag
def get_logo_provider(provider, cls=''):
    try:
        img_logo = list()
        img_logo.append('fa fa-twitch {}'.format(cls))
        img_logo.append('fa fa-youtube {}'.format(cls))
        return img_logo[provider]
    except:
        return 'fa fa-play-circle-o {}'.format(cls)


@register.inclusion_tag('stream/channel/module/_counter.html', takes_context=True)
def team_counter(context, streamer=None):
    user = context.get('user')
    is_control = False
    if not streamer:
        streamer = context.get('streamer')
    if streamer == user:
        is_control = True
    counter = streamer.stream_profile.team_counter
    return {'counter': counter, 'is_control': is_control, 'id': counter.profile.id, 'user': user}


@register.inclusion_tag('stream/channel/tag/_chat_btn.html', takes_context=False)
def action_chat_btn():
    return {}


@register.inclusion_tag('stream/profile/tag/_stream_info.html', takes_context=True)
def profile_stream_info(context):
    stream = context.get('stream_profile')
    host = context.get('host')
    return {'stream': stream, 'host': host}


@register.inclusion_tag('stream/profile/tag/_stream_preview_info.html', takes_context=True)
def profile_stream_preview_info(context):
    user = context.get('user')
    preview = ''
    if hasattr(user, 'stream_preview'):
        preview = user.stream_preview
    return {'preview': preview}


@register.inclusion_tag('stream/profile/tag/_stream_accounts.html', takes_context=True)
def profile_stream_accounts(context):

    return {}

@register.inclusion_tag('stream/profile/tag/_stream_manage.html', takes_context=True)
def profile_stream_manage_info(context):
    stream = context.get('stream_profile')
    manage = stream.stream_manage
    return {'manage': manage}


@register.simple_tag(takes_context=False)
def stream_live_count():
    live = cache.get_or_set("key_cache_stream_live", StreamPreview.objects.live(), 15*60)
    count = live.count()
    return '{}'.format(count)
