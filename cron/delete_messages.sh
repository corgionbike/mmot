#!/bin/bash
python3 /home/django-projects/mmotimes/manage.py delete_deleted_messages 7;

#*/5 * * * * export DISPLAY=:0 && bash /home/django-projects/cron/streambot.sh >/dev/null 2>&1
@monthly export DISPLAY=:0 && bash /home/django-projects/cron/streambot.sh >/dev/null 2>&1