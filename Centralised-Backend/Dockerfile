# Use the official Python image as base
FROM python:3.9

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /Backend/

# Install Poetry
RUN pip install --upgrade pip
RUN pip install poetry
RUN poetry config virtualenvs.create false

# Copy the pyproject.toml and poetry.lock files
COPY pyproject.toml ./
COPY poetry.lock ./

# Install dependencies
RUN poetry install --no-dev

# Copy the rest of the application code
COPY . /Backend/

# Copy the entrypoint script
COPY wsgi-entrypoint.sh ./

# Command to run the application
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]