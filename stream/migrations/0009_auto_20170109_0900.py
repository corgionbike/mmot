# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-01-09 06:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stream', '0008_auto_20161217_2303'),
    ]

    operations = [
        migrations.AlterField(
            model_name='streamprofile',
            name='auto_broadcasting',
            field=models.BooleanField(default=False, verbose_name='автоактивация канала'),
        ),
    ]
