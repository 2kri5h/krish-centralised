# Add or update the STATIC_ROOT setting
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Make sure the directory exists
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
] 