#!/bin/sh

echo "Applying database migrations..."
until cd /Centralised-Backend
do
    echo "Waiting for server volume..."
done

# Create SQLite directory if it doesn't exist
mkdir -p /Centralised-Backend/Data/sqlite
chmod -R 755 /Centralised-Backend/Data/sqlite

# Create static directory if it doesn't exist
mkdir -p /Centralised-Backend/static
mkdir -p /Centralised-Backend/staticfiles

# Make migrations for all apps
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

echo "Starting Django server..."
gunicorn sarc_backend.wsgi:application --bind 0.0.0.0:8000 --workers 4 --threads 4 