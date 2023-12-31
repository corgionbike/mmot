# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-05 20:25
from __future__ import unicode_literals

from django.db import migrations
import sorl.thumbnail.fields
import user_profile.models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0012_auto_20170109_0900'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='avatar',
            field=sorl.thumbnail.fields.ImageField(blank=True, null=True, upload_to=user_profile.models.user_directory_path, verbose_name='аватар'),
        ),
    ]
