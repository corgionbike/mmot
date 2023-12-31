# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-14 17:14
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('group', '0018_groupprofile_num_members'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('type', models.IntegerField(choices=[(0, 'Прямой эфир'), (1, 'Всякое разное'), (2, 'Вечеринка'), (3, 'Важная встреча')], verbose_name='Тип события')),
                ('name', models.CharField(max_length=100, verbose_name='Тема')),
                ('description', models.TextField(blank=True, verbose_name='Описание')),
                ('start_ts', models.DateTimeField(verbose_name='Начало')),
                ('closed', models.BooleanField(default=False, verbose_name='Закрыть')),
                ('hidden', models.BooleanField(default=False, verbose_name='Скрыть')),
                ('followers', models.ManyToManyField(related_name='event_followers', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'События',
                'verbose_name': 'Событие',
                'ordering': ['-start_ts'],
                'get_latest_by': 'created',
            },
        ),
        migrations.CreateModel(
            name='GroupEvents',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_closed', models.BooleanField(default=False, verbose_name='Закрыть')),
                ('group', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='events_profile', to='group.GroupProfile')),
            ],
            options={
                'verbose_name_plural': 'события групп',
                'verbose_name': 'событие группы',
            },
        ),
        migrations.CreateModel(
            name='Settings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('num_events', models.PositiveSmallIntegerField(default=10, verbose_name='Число событий на страницу')),
                ('is_member_edit', models.BooleanField(default=False, verbose_name='Разрешено редактирование события')),
                ('is_member_create', models.BooleanField(default=True, verbose_name='Разрешено создавать события')),
            ],
            options={
                'verbose_name_plural': 'Настройки событий групп',
                'verbose_name': 'Настройка события группы',
            },
        ),
        migrations.AddField(
            model_name='groupevents',
            name='settings',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='events_profile', to='group_events.Settings'),
        ),
        migrations.AddField(
            model_name='event',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='events_profile', to='group_events.GroupEvents'),
        ),
    ]
