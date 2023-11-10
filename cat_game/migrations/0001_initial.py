# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('name', models.CharField(null=True, verbose_name='игра', max_length=50, blank=True)),
                ('logo', sorl.thumbnail.fields.ImageField(null=True, verbose_name='логотип', blank=True, upload_to='games/logotype')),
                ('logo_url', models.URLField(null=True, verbose_name='ссылка на логотип', max_length=300, blank=True)),
            ],
            options={
                'verbose_name_plural': 'игры',
                'db_table': 'game',
                'verbose_name': 'игра',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='GroupGame',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('name', models.CharField(null=True, verbose_name='группа', max_length=50, blank=True)),
            ],
            options={
                'verbose_name_plural': 'игровые группы',
                'db_table': 'group_game',
                'verbose_name': 'игровая группа',
                'ordering': ['name'],
            },
        ),
        migrations.AddField(
            model_name='game',
            name='groups',
            field=models.ForeignKey(null=True, verbose_name='группа', blank=True, to='cat_game.GroupGame', max_length=50, related_name='games'),
        ),
    ]
