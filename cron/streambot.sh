#!/bin/bash
python3 /home/django-projects/mmotimes/manage.py streambot;

#*/5 * * * * export DISPLAY=:0 && bash /home/django-projects/cron/streambot.sh >/dev/null 2>&1
