# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-17 18:45
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('group_forum', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='forum',
            options={'verbose_name': 'форум', 'verbose_name_plural': 'форумы'},
        ),
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['created'], 'verbose_name': 'пост', 'verbose_name_plural': 'посты'},
        ),
        migrations.AddField(
            model_name='topic',
            name='created',
            field=model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created'),
        ),
        migrations.AddField(
            model_name='topic',
            name='modified',
            field=model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified'),
        ),
        migrations.AddField(
            model_name='topic',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='forum_topics', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
