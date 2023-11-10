# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import model_utils.fields
import django.utils.timezone
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('status', model_utils.fields.StatusField(verbose_name='статус', max_length=100, choices=[('Открыта', 'Открыта'), ('Закрыта', 'Закрыта'), ('В работе', 'В работе'), ('Отклонена', 'Отклонена')], no_check_for_status=True, default='Открыта')),
                ('name', models.CharField(null=True, verbose_name='имя', max_length=50)),
                ('type', models.IntegerField(null=True, choices=[(0, 'Общие вопросы'), (1, 'Ошибки на сайте'), (2, 'Отзывы и предложения')], verbose_name='категория обращения', blank=True, default=0)),
                ('subject', models.CharField(verbose_name='тема', max_length=100)),
                ('email', models.EmailField(null=True, verbose_name='Email', max_length=254)),
                ('text', models.TextField(null=True, verbose_name='сообщение')),
                ('attach', sorl.thumbnail.fields.ImageField(null=True, verbose_name='вложения', blank=True, upload_to='feedback')),
            ],
            options={
                'verbose_name_plural': 'Заявки',
                'db_table': 'feedback',
                'verbose_name': 'Заявка',
                'ordering': ['created'],
            },
        ),
    ]
