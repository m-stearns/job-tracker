# Job Tracker

### Getting started with Postgres

1. Download and install Docker desktop
2. From the command line run `docker volume create pgdata`
3. Run `docker-compose up --build` to run Postgres and Adminer at http://localhost:
   If you get this error:

  ```
  PostgreSQL Database directory appears to contain a database; Skipping initialization
  ```

   Run `docker-compose down --volumes`
4. Log in

![pglogin](./pglogin.png)