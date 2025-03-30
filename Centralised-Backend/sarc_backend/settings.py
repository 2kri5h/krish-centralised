from dotenv import load_dotenv
import os
from pathlib import Path
from datetime import timedelta

load_dotenv()  # Load .env variables

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-z!56b43!o#g*&4pq&2j17$wq#c5sn6us4%5ie_ap2r*au1l0m+'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['centralised.sarc-iitb.org', 'localhost', '127.0.0.1', '*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'Chatbot',
    'Authentication',
    'corsheaders',  # Ensure this is present for CORS handling
    'rest_framework',  # For API handling
    'rest_framework_simplejwt',
    'oauth2_provider',
    'api_root',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",    
    'django.middleware.security.SecurityMiddleware',
    'oauth2_provider.middleware.OAuth2TokenMiddleware', # to check for tokens in requests
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# OAuth 2.0 Settings
OAUTH2_PROVIDER = {
    "ACCESS_TOKEN_MODEL": "oauth2_provider.AccessToken",
    "OAUTH2_BACKEND_CLASS": "oauth2_provider.oauth2_backends.JSONOAuthLibCore",
    "SCOPES": {"read": "Read data", "write": "Write data"},
    "ACCESS_TOKEN_EXPIRE_SECONDS": 3600,
    "REFRESH_TOKEN_EXPIRE_SECONDS": 86400,
    "APPLICATION_MODEL": "oauth2_provider.Application",
    'ALLOWED_REDIRECT_URI_SCHEMES': ['http', 'https'],
    "AUTHORIZATION_CODE_EXPIRE_SECONDS": 300,
    "OIDC_ENABLED": True,
}

AUTHENTICATION_BACKENDS = (
    'oauth2_provider.backends.OAuth2Backend',  # Allow OAuth authentication
    'django.contrib.auth.backends.ModelBackend',
)

ROOT_URLCONF = 'sarc_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'sarc_backend.wsgi.application'

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    'https://centralised.sarc-iitb.org',
    'http://localhost:5024',
    'http://127.0.0.1:5024',
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# CSRF Settings
CSRF_TRUSTED_ORIGINS = [
    'https://centralised.sarc-iitb.org',
    'http://localhost:5024',
    'http://127.0.0.1:5024',
]

# For API views that use token auth, you might want to exempt them from CSRF
CSRF_EXEMPT_VIEWS = [
    'Authentication.views.UserAuthView',
]

# Session settings
SESSION_COOKIE_SECURE = True  # Only send cookies over HTTPS
CSRF_COOKIE_SECURE = True  # Only send CSRF cookie over HTTPS
SESSION_COOKIE_SAMESITE = 'Lax'  # Prevents CSRF in modern browsers
CSRF_COOKIE_SAMESITE = 'Lax'  # Prevents CSRF in modern browsers

# If you're using HTTPS
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# Comment out PostgreSQL configuration
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': os.getenv('DB_NAME'),  # This should match the environment variable in docker-compose
#         'USER': os.getenv('DB_USER'),  # This should match the environment variable in docker-compose
#         'PASSWORD': os.getenv('DB_PASSWORD'),  # This should match the environment variable in docker-compose
#         'HOST': os.getenv('DB_HOST', 'localhost'),  # Default to 'localhost' if not set
#         'PORT': os.getenv('DB_PORT', '5432'),  # Default to '5432' if not set
#     }
# }

# Use SQLite instead
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        "oauth2_provider.contrib.rest_framework.OAuth2Authentication", # OAuth2Authentication backend for the API 
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend'
    ],
    # 'DEFAULT_RENDERER_CLASSES' : (
    #     'rest_framework.renderers.JSONRenderer',
    # )
}

OAUTH2_PROVIDER = {             
# this is the dictionary of available scopes that will be visible to the user             
  'SCOPES': {                 
    'images': 'Create and get images',                 
    'image': 'Read and delete an image'             
  }         
}

AUTH_USER_MODEL = 'Authentication.User'

# Email config
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'  # Replace with your actual email
EMAIL_HOST_PASSWORD = 'your-app-password'  # Replace with your actual app password

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

PASSWORD_RESET_TIMEOUT = 600 # 10 minutes, that is, Password Reset Token will expire in 10 minutes

# JWT Settings
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=2),

    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

    "JTI_CLAIM": "jti",
}

LOGIN_URL = '/admin/login/'

APPEND_SLASH = False