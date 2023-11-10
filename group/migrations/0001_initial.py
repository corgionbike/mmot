# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
import model_utils.fields
import django.core.validators
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('cat_game', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupInvite',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('send_ts', models.DateTimeField(auto_now_add=True, verbose_name='отправлено')),
                ('description', models.TextField(null=True, validators=[django.core.validators.MinLengthValidator(10)], verbose_name='приглашение', max_length=100, blank=True)),
            ],
            options={
                'verbose_name_plural': 'приглашения',
                'db_table': 'group_invite',
                'verbose_name': 'приглашение',
                'ordering': ['-send_ts'],
            },
        ),
        migrations.CreateModel(
            name='GroupMember',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('joined_ts', models.DateTimeField(auto_now_add=True, verbose_name='вступил')),
            ],
            options={
                'verbose_name_plural': 'yчастники',
                'db_table': 'group_member',
                'verbose_name': 'участник',
                'ordering': ['joined_ts'],
            },
        ),
        migrations.CreateModel(
            name='GroupModerator',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('joined_ts', models.DateTimeField(auto_now_add=True, verbose_name='назначен')),
            ],
            options={
                'verbose_name_plural': 'модераторы',
                'db_table': 'group_moderator',
                'verbose_name': 'модератор',
                'ordering': ['joined_ts'],
            },
        ),
        migrations.CreateModel(
            name='GroupProfile',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('name', models.CharField(unique=True, max_length=15, verbose_name='название')),
                ('emblem', sorl.thumbnail.fields.ImageField(null=True, verbose_name='эмблема', blank=True, upload_to='emblems')),
                ('type', models.IntegerField(verbose_name='тип', choices=[(0, 'Группа'), (1, 'Отряд'), (2, 'Команда'), (3, 'Клан'), (4, 'Гильдия')])),
                ('description', models.TextField(validators=[django.core.validators.MinLengthValidator(30)], verbose_name='описание', max_length=300)),
                ('motto', models.CharField(null=True, validators=[django.core.validators.MinLengthValidator(10)], verbose_name='девиз', max_length=100, blank=True)),
                ('privacy', models.IntegerField(verbose_name='приватность группы', choices=[(0, 'Закрытая'), (1, 'Публичная')])),
                ('is_block', models.BooleanField(verbose_name='блокировка группы', default=False)),
                ('game', models.ForeignKey(null=True, verbose_name='игра', to='cat_game.Game', related_name='group_profile')),
            ],
            options={
                'verbose_name_plural': 'группы',
                'db_table': 'group_profile',
                'verbose_name': 'группа',
                'ordering': ['created', 'name'],
            },
        ),
    ]
