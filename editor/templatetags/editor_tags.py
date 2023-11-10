from django import template
from django.template.defaultfilters import stringfilter

from ..utils import safe_html, oembed_html

register = template.Library()


@register.filter(is_safe=True)
@stringfilter
def safehtml(value):
    return safe_html(value)


@register.filter(is_safe=True)
@stringfilter
def oembedhtml(value):
    return oembed_html(value)
