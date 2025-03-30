#!/bin/bash

# Wait for a few seconds to ensure all services are up
sleep 5

echo "Applying database migrations..."
# Apply database migrations
poetry run python manage.py migrate || true

echo "Starting Django server..."
# Start server
poetry run python manage.py runserver 0.0.0.0:8000 