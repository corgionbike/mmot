from django.db import models
from sorl.thumbnail import ImageField
from django.utils.translation import ugettext_lazy as _
from django.core.validators import MinLengthValidator, validate_slug
from django.core.urlresolvers import reverse
import hashlib
import os


class GroupGame(models.Model):
    name = models.CharField(_('группа'), max_length=50, unique=False, blank=True, null=True)

    class Meta:
        db_table = 'group_game'
        ordering = ['name']
        verbose_name_plural = _("игровые группы")
        verbose_name = _("игровая группа")

    def __str__(self):
        return self.name


def logo_directory_path(instance, filename):
    file, file_extension = os.path.splitext(filename)
    return 'games/{0}_{1}{2}'.format(instance.id, hashlib.md5(file.encode('utf-8')).hexdigest(), file_extension)


class Game(models.Model):
    name = models.CharField(_('игра'), max_length=50, unique=False, blank=True, null=True)
    logo = ImageField(verbose_name=_('логотип'), upload_to=logo_directory_path, blank=True, null=True)
    logo_url = models.URLField(_('ссылка на логотип'), max_length=300, null=True, blank=True)
    groups = models.ForeignKey(GroupGame, related_name='games', verbose_name=_('группа'), max_length=50,
                               unique=False, blank=True, null=True)
    description = models.TextField(_('описание'), max_length=600, null=True, blank=True,
                                   validators=[MinLengthValidator(10)])

    platform = models.CharField(_('платформы'), max_length=50, unique=False, blank=True, null=True, default="PC")
    developer = models.CharField(_('разрабочик'), max_length=50, unique=False, blank=True, null=True)
    rating = models.IntegerField(_('рейтинг'), blank=True, null=True)

    class Meta:
        db_table = 'game'
        ordering = ['name']
        verbose_name_plural = _("игры")
        verbose_name = _("игра")

    def __str__(self):
        return self.name

    def get_game_detail_url(self):
            return reverse('game_detail', args=[self.pk])