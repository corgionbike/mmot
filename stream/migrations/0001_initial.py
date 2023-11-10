# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
import re
import model_utils.fields
import django.db.models.deletion
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StreamArchive',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('name', models.CharField(verbose_name='название', max_length=100)),
                ('rec_url', models.URLField(verbose_name='ссылка на запись', max_length=100)),
                ('description', models.TextField(null=True, verbose_name='описание', max_length=300, blank=True)),
                ('rec_ts', models.DateField(verbose_name='время записи')),
                ('provider', models.IntegerField(null=True, verbose_name='провайдер', blank=True, choices=[(0, 'Twitch.tv'), (1, 'Youtube.com'), (2, 'Cybergame.tv'), (3, 'Hitbox.tv')])),
            ],
            options={
                'verbose_name_plural': 'стрим архив',
                'db_table': 'stream_archive',
                'verbose_name': 'стрим архив',
            },
        ),
        migrations.CreateModel(
            name='StreamManage',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('chat', models.BooleanField(verbose_name='чат', default=True)),
                ('progress', models.BooleanField(verbose_name='линия прогресса', default=True)),
                ('archive', models.BooleanField(verbose_name='архив', default=False)),
                ('counter', models.BooleanField(verbose_name='командный счетчик', default=False)),
            ],
            options={
                'verbose_name_plural': 'стрим менеджеры',
                'db_table': 'stream_manage',
                'verbose_name': 'стрим менеджер',
            },
        ),
        migrations.CreateModel(
            name='StreamPreview',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('status', models.BooleanField(verbose_name='статус', default=False)),
                ('name', models.CharField(verbose_name='наименование', max_length=100)),
                ('preview_url', models.URLField(null=True, verbose_name='ссылка на превью', max_length=100, blank=True)),
                ('start_ts', models.DateTimeField(verbose_name='начало')),
                ('end_ts', models.DateTimeField(verbose_name='окончание')),
                ('description', models.TextField(validators=[django.core.validators.MinLengthValidator(30)], verbose_name='описание', max_length=300)),
            ],
            options={
                'verbose_name_plural': 'стрим анонсы',
                'db_table': 'stream_preview',
                'verbose_name': 'стрим анонс',
                'ordering': ['status', 'start_ts', 'name'],
            },
        ),
        migrations.CreateModel(
            name='StreamProfile',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('sid', models.CharField(null=True, validators=[django.core.validators.RegexValidator(re.compile('^[-a-zA-Z0-9_]+\\Z', 32), "Enter a valid 'slug' consisting of letters, numbers, underscores or hyphens.", 'invalid')], verbose_name='идентификатор', max_length=50, blank=True)),
                ('provider', models.IntegerField(verbose_name='провайдер', choices=[(0, 'Twitch.tv'), (1, 'Youtube.com'), (2, 'Cybergame.tv'), (3, 'Hitbox.tv')])),
                ('description', models.TextField(null=True, verbose_name='описание', max_length=300, blank=True)),
                ('is_block', models.BooleanField(verbose_name='блокировка стрим профиля', default=False)),
                ('auto_broadcasting', models.BooleanField(verbose_name='автоуправление трансляцией', default=False)),
                ('preview', models.OneToOneField(null=True, verbose_name='анонс трансляции', on_delete=django.db.models.deletion.SET_NULL, to='stream.StreamPreview', related_name='stream_profile')),
            ],
            options={
                'verbose_name_plural': 'стрим профиля',
                'db_table': 'stream_profile',
                'verbose_name': 'стрим профиль',
                'ordering': ['provider'],
            },
        ),
        migrations.CreateModel(
            name='StreamTeamCounter',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('name_red', models.CharField(verbose_name='Имя красной команды', max_length=10, default='Красные')),
                ('name_blue', models.CharField(verbose_name='Имя синей команды', max_length=10, default='Синие')),
                ('count_red', models.IntegerField(null=True, verbose_name='счет красных', default=0)),
                ('count_blue', models.IntegerField(null=True, verbose_name='счет синих', default=0)),
                ('profile', models.OneToOneField(verbose_name='командный счетчик', to='stream.StreamProfile', related_name='team_counter')),
            ],
            options={
                'verbose_name_plural': 'командный счетчик',
                'db_table': 'stream_team_counter',
                'verbose_name': 'командный счетчик',
            },
        ),
    ]
