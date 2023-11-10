from __future__ import unicode_literals

from django import forms
from django.contrib.admin.widgets import AdminTextareaWidget
from django.core.urlresolvers import NoReverseMatch, reverse
from django.template.loader import render_to_string
from django.utils.safestring import mark_safe


class EditorInput(forms.Widget):
    def render(self, name, value, attrs=None):
        if value is not None:
            # Special handling for MarkupField value.
            # This won't touch simple TextFields because they don't have
            # 'raw' attribute.
            try:
                value = value.raw
            except AttributeError:
                pass
        return super(EditorInput, self).render(name, value, attrs)


class MarkupTextarea(EditorInput, forms.Textarea):
    pass


class MarkupHiddenWidget(EditorInput, forms.HiddenInput):
    pass


class EditorWidget(MarkupTextarea):

    def __init__(self, attrs=None, video=None, cut=None, html=None):
        self.video = video
        self.cut = cut
        self.html = html
        super(EditorWidget, self).__init__(attrs)

    # def _media(self):
    #     js_media = [absolute_url(settings.JQUERY_URL)] if settings.JQUERY_URL is not None else []
    #     js_media = js_media + [absolute_url('editor/ajax_csrf.js'),
    #                            absolute_url('editor/jquery.editor.js'),
    #                            posixpath.join(self.miu_set, 'set.js')]
    #     return forms.Media(
    #         css={'screen': (posixpath.join(self.miu_skin, 'style.css'),
    #                         posixpath.join(self.miu_set, 'style.css'))},
    #         js=js_media)
    # media = property(_media)

    def render(self, name, value, attrs=None):
        html = super(EditorWidget, self).render(name, value, attrs)

        final_attrs = self.build_attrs(attrs)

        try:
            preview_url = reverse('editor_bbcode_preview')
            if self.html:
                preview_url = reverse('editor_html_preview')
        except NoReverseMatch:
            preview_url = ""

        html = "{1}{0}".format(html, render_to_string('editor/editor.html',
                                 {'textarea_id': final_attrs['id'],
                                 'preview_url': preview_url,
                                  'video': self.video,
                                  'cut': self.cut,
                                  'html': self.html}))

        return mark_safe(html)


class AdminMarkItUpWidget(EditorWidget, AdminTextareaWidget):
    """
    Add vLargeTextarea class to MarkItUpWidget so it looks more
    similar to other admin textareas.

    """
    pass
