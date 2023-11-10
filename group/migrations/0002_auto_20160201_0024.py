# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='groupprofile',
            name='owner',
            field=models.OneToOneField(verbose_name='владелец', to=settings.AUTH_USER_MODEL, related_name='group_profile'),
        ),
        migrations.AddField(
            model_name='groupmoderator',
            name='group',
            field=models.ForeignKey(verbose_name='группа', to='group.GroupProfile', related_name='group_moderators'),
        ),
        migrations.AddField(
            model_name='groupmoderator',
            name='user',
            field=models.OneToOneField(verbose_name='модератор', to=settings.AUTH_USER_MODEL, related_name='group_moderator'),
        ),
        migrations.AddField(
            model_name='groupmember',
            name='group',
            field=models.ForeignKey(verbose_name='группа', to='group.GroupProfile', related_name='group_members'),
        ),
        migrations.AddField(
            model_name='groupmember',
            name='user',
            field=models.OneToOneField(verbose_name='участник', to=settings.AUTH_USER_MODEL, related_name='group_member'),
        ),
        migrations.AddField(
            model_name='groupinvite',
            name='group',
            field=models.ForeignKey(verbose_name='группы', to='group.GroupProfile', related_name='group_invites'),
        ),
        migrations.AddField(
            model_name='groupinvite',
            name='recipient',
            field=models.ForeignKey(verbose_name='приглашенный', to=settings.AUTH_USER_MODEL, related_name='group_invites'),
        ),
    ]
