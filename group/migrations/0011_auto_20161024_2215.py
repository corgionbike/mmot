# -*- coding: utf-8 -*-
# Generated by Django 1.9.10 on 2016-10-24 19:15
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0010_auto_20161024_2207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupmember',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group_member', to=settings.AUTH_USER_MODEL, verbose_name='участник'),
        ),
        migrations.AlterUniqueTogether(
            name='groupmember',
            unique_together=set([('user', 'group')]),
        ),
    ]