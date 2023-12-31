# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-01-17 07:30
from __future__ import unicode_literals

from django.db import migrations, models
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0013_auto_20161026_1546'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupprofile',
            name='tile_background',
            field=models.BooleanField(default=False, verbose_name='замостить фон'),
        ),
        migrations.AlterField(
            model_name='groupprofile',
            name='background',
            field=sorl.thumbnail.fields.ImageField(blank=True, null=True, upload_to='backgrounds', verbose_name='фоновое изображеие'),
        ),
    ]
