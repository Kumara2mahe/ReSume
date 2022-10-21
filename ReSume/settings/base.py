"""
Django settings for ReSume project.

Generated by 'django-admin startproject' using Django 4.1.

"""

from pathlib import Path
from dotenv import load_dotenv
import os
from pModules.envCast import toBool, toTuple, toInt, toStr


# ReSume project's BASE DIR
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# Loading the Environment Values
load_dotenv()


# Secret Key & Debug Mode
SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = toBool("DEBUG")

# Securing Cookies
SESSION_COOKIE_SECURE = toBool("SESSION_COOKIE_SECURE")


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "resumeBuilder"
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "ReSume.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            BASE_DIR / "Templates"
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "ReSume.wsgi.application"

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Database

DATABASES = {
    "default": {
        "ENGINE": os.getenv("DB_ENGINE"),
        "NAME": os.getenv("DB_NAME"),
    }
}


# Password validation

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)

STATIC_URL = "Static/"
STATICFILES_DIRS = [
    BASE_DIR / "Static",
]

# Email Configuration (for Contact form)

DEFAULT_FROM_EMAIL = toStr("DEFAULT_FROM_EMAIL")
EMAIL_HOST_USER = "developer@ReSume.com"

if toBool("EMAIL_SERVER_ONLINE"):
    EMAIL_HOST_USER = toStr("EMAIL_HOST_USER")
