# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-31 17:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0006_auto_20160512_1233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupprofile',
            name='privacy',
            field=models.IntegerField(choices=[(0, 'Закрытая'), (1, 'Публичная')], default=1, verbose_name='приватность группы'),
        ),
    ]
