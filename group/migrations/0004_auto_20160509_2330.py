# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-09 20:30
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models
import precise_bbcode.fields


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0003_auto_20160507_2214'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupprofile',
            name='_description_rendered',
            field=models.TextField(blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='groupprofile',
            name='description',
            field=precise_bbcode.fields.BBCodeTextField(max_length=300, no_rendered_field=True, validators=[django.core.validators.MinLengthValidator(30)], verbose_name='описание'),
        ),
        migrations.AlterField(
            model_name='groupprofile',
            name='motto',
            field=models.CharField(blank=True, max_length=100, null=True, validators=[django.core.validators.MinLengthValidator(10)], verbose_name='слоган'),
        ),
    ]