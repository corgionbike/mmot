# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-07 19:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stream', '0002_auto_20160201_0024'),
    ]

    operations = [
        migrations.AlterField(
            model_name='streamprofile',
            name='preview',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='stream_profile', to='stream.StreamPreview', verbose_name='анонс трансляции'),
        ),
    ]
