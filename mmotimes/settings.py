"""
Django settings for mmotimes project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
try:
    from .local_settings import *
except ImportError:
    pass

from django.utils.translation import ugettext_lazy as _

# BASE_DIR = os.path.dirname(os.path.dirname(__file__))
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mmot',
        'USER': 'test',
        'PASSWORD': '1234',
        'HOST': '192.168.1.105',
        'PORT': '5432',
    }
}

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
THUBMNAIL_DUBUG = True

AUTH_USER_MODEL = "user_profile.UserProfile"

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

INTERNAL_IPS = ['127.0.0.1']
# Application definition

DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.sites',
    'registration',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.flatpages',
    'django.contrib.sitemaps',
    'notifications',
    'bootstrap3',
    'datetimewidget',
    'sorl.thumbnail',
    'django_cleanup',
    'captcha',
    'precise_bbcode',
    'django_extensions',
    'debug_toolbar',
    'taggit',
    'hreflang',
]


SITE_APPS = [
    'core',
    'bank',
    'stream',
    'cat_game',
    'group',
    'news',
    'invite_key',
    'user_profile',
    'feedback',
    'slider',
    'group_forum',
    'private_messages',
    'editor',
    'group_events',
    'guides'
]

INSTALLED_APPS = DJANGO_APPS + SITE_APPS



TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors':
                [
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.template.context_processors.debug',
                    'django.contrib.messages.context_processors.messages',
                    'django.template.context_processors.i18n',
                    # добавлена переменная MEDIA_URL, которая содержит значение MEDIA_URL.
                    'django.template.context_processors.media',
                    # добавлена переменная STATIC_URL, которая содержит значение STATIC_URL.
                    'django.template.context_processors.static',
                    'private_messages.context_processors.inbox',
                ],
            'debug': True,

        }

    },
]
TEMPLATE_DEBUG = True
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.sites.middleware.CurrentSiteMiddleware',
    'mmotimes.middleware.timezone_middleware',
    'mmotimes.middleware.OnlineNowRedisMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

AUTHENTICATION_BACKENDS = [
    'mmotimes.auth.backends.EmailBackend',
]

SECURE_BROWSER_XSS_FILTER = True

SESSION_COOKIE_SECURE = False

CSRF_COOKIE_SECURE = False

CSRF_COOKIE_HTTPONLY = False

LOCALE_PATHS = (os.path.join(BASE_DIR, 'locale'),)

ROOT_URLCONF = 'mmotimes.urls'

WSGI_APPLICATION = 'mmotimes.wsgi.application'

# if not DEBUG:
SESSION_ENGINE = 'redis_sessions.session'
SESSION_REDIS_HOST = '192.168.1.50'
# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mmot',
        'USER': 'test',
        'PASSWORD': '1234',
        'HOST': '192.168.1.105',
        'PORT': '5432',
    }
}

# CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
#         'LOCATION': '/var/tmp/django_cache',
#         'TIMEOUT': 60,
#         'OPTIONS': {
#             'MAX_ENTRIES': 300}
#
#     }
# }

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://192.168.1.50:6379/2",
        "TIMEOUT": 60 * 60 * 24,
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}

ONLINE_DB_REDIS_SETTING = {'host': '192.168.1.50', 'port': 6379, 'db': 15}
WATCHER_DB_REDIS_SETTING = {'host': '192.168.1.50', 'port': 6379, 'db': 15}

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'ru-RU'

LANGUAGES = [
    ('ru', _('RU')),
    ('en', _('EN')),
]

TIME_ZONE = 'Europe/Moscow'

USE_I18N = False

USE_L10N = True

USE_TZ = True

SITE_ID = 1
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'mmotimes/static'),
    os.path.join(BASE_DIR, 'stream/static'),
]

MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

MAX_LOAD_IMG_SIZE = {'size': 500000, 'hsize': '500 kb'}

ADMINS = (('Я', 'ametovsi@gmail.com'),)

# EMAIL_BACKEND = 'django.core.mail.backends.filebased.EmailBackend'
# EMAIL_FILE_PATH = '/tmp/app-messages' # change this to a proper location
# python -m smtpd -n -c DebuggingServer localhost:1025
EMAIL_HOST_USER = 'mmotimes.ru@gmail.com'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 465
EMAIL_HOST_PASSWORD = 'cepggbglmbucfpzu'
EMAIL_USE_SSL = True

MAX_RECORDS_STREAM_ARCHIVE = 10

# API YOUTUBE
DEVELOPER_KEY = "AIzaSyDOaI1BRtuQgfAJk438MnvTHOGnG6tJ_yM"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

SPLIT_DEFAULT_PARAGRAPHS = 1

CACHE_MIDDLEWARE_SECONDS = 3600


TAGGIT_TAGS_FROM_STRING = 'guides.utils.comma_splitter'
TAGGIT_STRING_FROM_TAGS = 'guides.utils.comma_joiner'

THUMBNAIL_REDIS_HOST = '192.168.1.50'
THUMBNAIL_REDIS_DB = 1
THUMBNAIL_REDIS_PORT = 6379
THUMBNAIL_KVSTORE = 'sorl.thumbnail.kvstores.redis_kvstore.KVStore'
# THUMBNAIL_DEBUG = True

# DEFAULT_FILE_STORAGE = 'storages.backends.dropbox.DropBoxStorage'
# DROPBOX_OAUTH2_TOKEN = 'Je7yvjI_SrAAAAAAAAAAi9ixXzLCNrt8IYw2_mAyQt1njiaOBxOIR5_4QaLDot6V'
# DROPBOX_ROOT_PATH = 'MMMOTIMES_STORAGE'
SPLIT_MARKER = "<cut></cut>"
