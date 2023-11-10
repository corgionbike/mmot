# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'dv+ro6c)wyyw+3m_upk@hmg6x9^fmak_jed0%q%5!z=$hh$s%='

RECAPTCHA_PUBLIC_KEY = '6Le-4d4SAAAAAGgTi5wQgBwNgrzZGhbBJUVKjetG'
RECAPTCHA_PRIVATE_KEY = '6Le-4d4SAAAAALrqwEWHmjimdZamhsXbLLYkKV76'
NOCAPTCHA = True
# включение показа капчи
CAPTCHA_ACTIVE = False

THUMBNAIL_DEBUG = False
THUMBNAIL_PRESERVE_FORMAT = True

ACCOUNT_ACTIVATION_DAYS = 3  # One-week activation window; you may, of course, use a different value.
REGISTRATION_AUTO_LOGIN = True  # Automatically log the user in.
REGISTRATION_OPEN = True
REGISTRATION_FORM = 'user_profile.forms.RegistrationFormCustom'
LOGIN_REDIRECT_URL = '/user/profile/'
LOGIN_URL = '/user/login/'
LOGOUT_URL = '/user/logout/'
LOGOUT_REDIRECT_URL = 'index'
SEND_ACTIVATION_EMAIL = True
INVITE_KEYS_ACTIVE = False  # Активация регистрации по пригласительным кючам
EMAIL_SUBJECT_PREFIX = '[MMOTIMES.RU] '

# Время повторной отправки приглашения пользователю, ч.
MAX_REPEAT_HOUR_SEND_INVITE = 1

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
