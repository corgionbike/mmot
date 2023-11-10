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
            name='SliderModel',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('start', models.DateTimeField(null=True, verbose_name='start', blank=True)),
                ('end', models.DateTimeField(null=True, verbose_name='end', blank=True)),
                ('status', model_utils.fields.StatusField(verbose_name='status', max_length=100, choices=[('draft', 'draft'), ('published', 'published')], no_check_for_status=True, default='draft')),
                ('status_changed', model_utils.fields.MonitorField(monitor='status', verbose_name='status changed', default=django.utils.timezone.now)),
                ('title', models.CharField(verbose_name='название', max_length=100)),
                ('description', models.TextField(null=True, verbose_name='описание', max_length=300, blank=True)),
                ('background', sorl.thumbnail.fields.ImageField(null=True, verbose_name='фон', blank=True, upload_to='slider')),
            ],
            options={
                'verbose_name_plural': 'Слайды',
                'ordering': ['-start'],
                'verbose_name': 'Слайд',
            },
        ),
    ]
