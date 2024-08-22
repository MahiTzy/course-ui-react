### Frontend Application (ReactJS)

#### `README.md` for Frontend

# Courses API Frontend

This is a frontend application built with ReactJS that provides an interface to consume the Courses API and display data in a web browser.

## Features

- **Create a new course**
- **Create a new instance of a course delivery**
- **List all courses**
- **View details of a particular course**
- **Delete a particular course**
- **List course delivery instances in a particular year and semester**
- **View details of a particular course instance**
- **Delete a particular course instance**

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MahiTzy/course-ui-react.git
   ```

2. Navigate to the project directory:
   ```bash
   cd course-ui-react
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Docker

1. Build the Docker image:
   ```bash
   docker build -t yourdockerhubusername/courses-api-frontend .
   ```

2. Push the Docker image to DockerHub:
   ```bash
   docker push yourdockerhubusername/courses-api-frontend
   ```

## Docker-Compose

Refer to the `docker-compose.yaml` in course-api-springboot repository to set up the full application stack.

### Docker Compose File

#### `docker-compose.yaml`

```yaml
version: '3.8'

services:
  backend:
    image: yourdockerhubusername/courses-api-backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/coursedb
      SPRING_DATASOURCE_USERNAME: youruser
      SPRING_DATASOURCE_PASSWORD: yourpassword
      SPRING_DATASOURCE_DRIVER_CLASS_NAME: org.postgresql.Driver
      SPRING_JPA_DATABASE_PlATFORM: org.hibernate.dialect.PostgreSQLDialect
    depends_on:
      - db
    networks:
      - app-network

  frontend:
    image: yourdockerhubusername/courses-api-frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    networks:
      - app-network

  database:
    image: postgres:13
    environment:
      POSTGRES_USER: youruser
      POSTGRES_PASSWORD: yourpassword
      POSTGRES_DB: coursesdb
    ports:
      - "5432:5432"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

Replace `yourdockerhubusername` with your actual DockerHub username, and adjust any configuration parameters (e.g., database credentials) as needed.
