# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-01-17 18:21
from __future__ import unicode_literals

from django.db import migrations
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0014_auto_20170117_1030'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupprofile',
            name='background',
            field=sorl.thumbnail.fields.ImageField(blank=True, null=True, upload_to='backgrounds', verbose_name='фоновое изображение'),
        ),
    ]
