# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-01-09 06:00
from __future__ import unicode_literals

from django.db import migrations
import django.db.models.manager


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='articlemodel',
            managers=[
                ('draft', django.db.models.manager.Manager()),
            ],
        ),
    ]
