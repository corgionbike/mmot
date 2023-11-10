# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('invite_key', '0001_initial'),
        ('cat_game', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='invitekey',
            name='owner',
            field=models.OneToOneField(null=True, verbose_name='владелец', blank=True, to=settings.AUTH_USER_MODEL, related_name='site_invite_key'),
        ),
        migrations.AddField(
            model_name='gameinvitekey',
            name='game',
            field=models.ForeignKey(null=True, verbose_name='игра', blank=True, to='cat_game.Game', related_name='game_invite_key'),
        ),
        migrations.AddField(
            model_name='gameinvitekey',
            name='owner',
            field=models.ForeignKey(null=True, verbose_name='владелец', blank=True, to=settings.AUTH_USER_MODEL, related_name='game_invite_key'),
        ),
    ]
