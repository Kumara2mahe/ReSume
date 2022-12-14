from .base import *
import dj_database_url


if DEBUG:
    print("SECURITY WARNING: don't run with debug turned on in production!")


# Allowed Hosts
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "localhost").split(" ")

# Securing COOKIES & SESSIONS
CSRF_COOKIE_SECURE = toBool("CSRF_COOKIE_SECURE")
SECURE_HSTS_SECONDS = toInt("SECURE_HSTS_SECONDS")
SECURE_SSL_REDIRECT = toBool("SECURE_SSL_REDIRECT")
SECURE_PROXY_SSL_HEADER = toTuple("SECURE_PROXY_SSL_HEADER")


# Database
DATABASES = {
    "default": dj_database_url.config(
        env="DATABASE_URL",
        conn_max_age=600
    )
}


# Adding Whitenoise
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")

# Serving static files for production
STATIC_ROOT = BASE_DIR / "staticfiles"

# Compressing and Caching static files
STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"


# Adding Cloudinary to serve Media files
INSTALLED_APPS += ["cloudinary_storage", "cloudinary"]

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": toStr("CLD_CLOUD_NAME"),
    "API_KEY": toStr("CLD_API_KEY"),
    "API_SECRET": toStr("CLD_API_SECRET"),
}
DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"


# Email Configuration
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_PORT = toInt("EMAIL_PORT")
EMAIL_USE_TLS = toBool("EMAIL_USE_TLS")
