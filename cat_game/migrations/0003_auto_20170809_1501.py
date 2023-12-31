# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-09 12:01
from __future__ import unicode_literals

import cat_game.models
from django.db import migrations, models
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('cat_game', '0002_game_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='developer',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='разрабочик'),
        ),
        migrations.AddField(
            model_name='game',
            name='platform',
            field=models.CharField(blank=True, default='PC', max_length=50, null=True, verbose_name='платформы'),
        ),
        migrations.AddField(
            model_name='game',
            name='rating',
            field=models.IntegerField(blank=True, null=True, verbose_name='рейтинг'),
        ),
        migrations.AlterField(
            model_name='game',
            name='logo',
            field=sorl.thumbnail.fields.ImageField(blank=True, null=True, upload_to=cat_game.models.logo_directory_path, verbose_name='логотип'),
        ),
    ]
