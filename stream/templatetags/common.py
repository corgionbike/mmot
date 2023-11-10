from django import template

register = template.Library()


@register.inclusion_tag('stream/tag/_info_msg.html', takes_context=False)
def info_msg(msg='', status='info', icon='glyphicon glyphicon-info-sign', distimes=True):
    return {'msg': msg, 'status': status, 'icon': icon, 'distimes': distimes}
