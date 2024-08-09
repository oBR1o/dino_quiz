from .settings import *

# manage.py with --settings=backend.settings_prod

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'dj',
        'USER': 'root',
        'PASSWORD': 'myPassw0rd',
        'HOST': 'dj_mysql',
        'PORT': '3306',
    }
}

ALLOWED_HOSTS = [
    "wd0302.coe.psu.ac.th"
]
CFRF_TRUSTED_ORIGINS = [
    "https://wd0302.coe.psu.ac.th"
]

DEBUG = False