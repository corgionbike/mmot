# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-12 09:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0004_auto_20160511_1023'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='game_user',
            field=models.CharField(blank=True, max_length=300, null=True, verbose_name='игровые ники'),
        ),
    ]