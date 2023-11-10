# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('stream', '0001_initial'),
        ('cat_game', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='streamprofile',
            name='user',
            field=models.OneToOneField(verbose_name='стример', to=settings.AUTH_USER_MODEL, related_name='stream_profile'),
        ),
        migrations.AddField(
            model_name='streampreview',
            name='game',
            field=models.ForeignKey(verbose_name='игра', to='cat_game.Game', related_name='stream_preview'),
        ),
        migrations.AddField(
            model_name='streampreview',
            name='user',
            field=models.OneToOneField(verbose_name='стример', to=settings.AUTH_USER_MODEL, related_name='stream_preview'),
        ),
        migrations.AddField(
            model_name='streammanage',
            name='profile',
            field=models.OneToOneField(verbose_name='стрим профайл', to='stream.StreamProfile', related_name='stream_manage'),
        ),
        migrations.AddField(
            model_name='streamarchive',
            name='game',
            field=models.ForeignKey(verbose_name='игра', to='cat_game.Game', related_name='stream_archives'),
        ),
        migrations.AddField(
            model_name='streamarchive',
            name='user',
            field=models.ForeignKey(verbose_name='владелец', to=settings.AUTH_USER_MODEL, related_name='stream_archives'),
        ),
    ]
