#!/bin/bash
python3 /home/django-projects/mmotimes/manage.py broadcasting;

#*/5 * * * * export DISPLAY=:0 && bash /home/django-projects/cron/broadcasting.sh >/dev/null 2>&1
