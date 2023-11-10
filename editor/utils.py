import bleach
import micawber
from micawber import Provider


ALLOWED_TAGS = [
    'i', 'b', 'hr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'a',
    'center', 'sup', 'sub', 'table', 'th', 'td', 'tr', 'strong', 'em',
    's', 'strike', 'ul', 'li', 'u', 'ol', 'li', 'anchor', 'blockquote', 'thead',
    'tbody', 'abbr', 'acronym', 'pre', 'br', 'nobr', 'p', 'video', 'source', 'cut'
]

ALLOWED_ATTRIBUTES = {
    'a': ['href', 'rel', 'target'],
    'img': ['alt', 'src'],
    'table': ['border', 'cellpadding', 'cellspacing', 'style', 'class'],
    '*': ['title', 'width', 'height'],
    'br': ['clear'],
    'td': ['width'],
    'source': ['src', 'type', 'codecs'],
    'video': ['controls', 'poster', 'autoplay', 'width', 'height', 'loop', 'width', 'height']
}

BLEACH_ALLOWED_STYLES = ['width', 'height']


def safe_html(value):
    return bleach.clean(value, tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES, styles=BLEACH_ALLOWED_STYLES)


def oembed_html(value):
    providers = micawber.bootstrap_basic()
    providers.register('https?://www.twitch.tv/videos/\S+', Provider('https://api.twitch.tv/v4/oembed'))
    providers.register('https?://clips.twitch.tv/\S+', Provider('https://api.twitch.tv/v4/oembed'))
    return micawber.parse_text_full(value, providers, urlize_all=False)