# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-10 07:41
from __future__ import unicode_literals

from django.db import migrations, models
import precise_bbcode.fields


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0002_auto_20160507_2214'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='_description_rendered',
            field=models.TextField(blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='description',
            field=precise_bbcode.fields.BBCodeTextField(blank=True, max_length=300, no_rendered_field=True, null=True, verbose_name='о себе'),
        ),
    ]
