# Django Backend for Centralised-SARC

This is the backend for the **Centralised-SARC** project, built using Django. It provides the API and database management for the Student Alumni Relations Cell (SARC) platform.


# Set Up Poetry Virtual Environment:

* cd to the folder where you see the poetry.lock file,then run the following commands

> poetry install

> poetry shell

after activating the Virtual env, then only work with the backend



# Setting Up PostgresSQL

* Ensure you have activated your virtual env

1. Download PostgresSQL if not installed(For windows: https://www.postgresql.org/download/)

DON'T FORGET TO NOTE THE USERNAME AND PASSWORD

2. Configure the PostgreSQL Database

* Open the PostgreSQL shell:
> psql -U postgres 

Replace postgres with your PostgreSQL username if it’s different.

* Run the following commands  to create the database and user:
>CREATE DATABASE centralizedsarc;

>CREATE USER myuser WITH PASSWORD 'mypassword';

>GRANT ALL PRIVILEGES ON DATABASE centralizedsarc TO myuser;

Replace myuser and mypassword with your preferred username and password.


* Exit the PostgreSQL shell:

> \q


3.  Add Credentials to .env

* Create a .env file in the project root (where pyproject.toml and manage.py are located):

> touch .env

* Add the following content to the .env file:

```
DB_NAME=centralizedsarc
DB_USER=myuser (your username)
DB_PASSWORD=mypassword (your password)
DB_HOST=localhost
DB_PORT=5432
```

4. Apply Migrations

> python manage.py makemigrations

> python manage.py migrate

5. Testing the Database Connection: After configuring .env, verify the connection by running:

> python manage.py dbshell

If successful, this opens a PostgreSQL shell connected to your database.


Happy Coding : )







