#!/bin/bash
python3 /home/django-projects/mmotimes/manage.py thumbnail clear_delete_all;

#@monthly export DISPLAY=:0 && bash /home/django-projects/cron/thumbnail_clear.sh >/dev/null 2>&1