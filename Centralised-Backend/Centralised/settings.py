# Add or update the STATIC_ROOT setting
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# STATIC_URL = '/static/'
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# # Make sure the directory exists
# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'static'),
# ] 
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

STATICFILES_DIRS = [
    BASE_DIR / 'static',
]