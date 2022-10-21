from .base import *


if DEBUG:
    print("SECURITY WARNING: don't run with debug turned on in production!")


# Allowed Hosts
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "localhost").split(" ")

# Securing COOKIES & SESSIONS
CSRF_COOKIE_SECURE = toBool("CSRF_COOKIE_SECURE")
SECURE_HSTS_SECONDS = toInt("SECURE_HSTS_SECONDS")
SECURE_SSL_REDIRECT = toBool("SECURE_SSL_REDIRECT")
SECURE_PROXY_SSL_HEADER = toTuple("SECURE_PROXY_SSL_HEADER")

# Adding Whitenoise
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")

# Serving static files for production
STATIC_ROOT = BASE_DIR / "staticfiles"

# Compressing and Caching static files
STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"

# Email Configuration
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_PORT = toInt("EMAIL_PORT")
EMAIL_USE_TLS = toBool("EMAIL_USE_TLS")
