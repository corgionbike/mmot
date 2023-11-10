# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import uuid
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GameInviteKey',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('key', models.CharField(unique=True, max_length=100, verbose_name='игровой ключ')),
                ('state', models.IntegerField(verbose_name='состояние', choices=[(0, 'Погашен'), (1, 'Активен')], default=1)),
            ],
            options={
                'verbose_name_plural': 'Игровые ключики',
                'db_table': 'game_invite_key',
                'verbose_name': 'Игровой ключ',
                'ordering': ['state', '-created'],
            },
        ),
        migrations.CreateModel(
            name='InviteKey',
            fields=[
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('id', models.UUIDField(serialize=False, editable=False, primary_key=True, default=uuid.uuid4)),
                ('state', models.IntegerField(verbose_name='состояние', choices=[(0, 'Погашен'), (1, 'Активен')], default=1)),
            ],
            options={
                'verbose_name_plural': 'Пригласительные ключи',
                'db_table': 'site_invite_key',
                'verbose_name': 'Пригласительный ключ',
                'ordering': ['state', '-created'],
            },
        ),
    ]
