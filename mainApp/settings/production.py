from .base import *


if DEBUG:
    print("SECURITY WARNING: don't run with debug turned on in production!")


# Allowed Hosts
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "localhost").split(" ")

# Securing COOKIES & SESSIONS
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = False

# Adding Whitenoise
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")

# Serving static files for production
STATIC_ROOT = (os.path.join(BASE_DIR, "staticfiles"))

# Compressing and Caching static files
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
