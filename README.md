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

## Demo

### Screenshots

Below are some screenshots of the application:

1. **Homepage**
   ![Homepage](https://github.com/user-attachments/assets/2f59d3b1-53be-4617-b145-6e44a99c5389)
   *The homepage shows a list of all available courses.*

2. **Course Creation**
   ![Course Creation](https://github.com/user-attachments/assets/7dce0492-b047-4156-828e-375c937785de)
   *The interface for creating a new course.*

3. **Course Details**
   ![Course Details 1](https://github.com/user-attachments/assets/3ee2ff78-8b1c-45a0-9b86-a80ca974f1b1)
   ![Course Details 2](https://github.com/user-attachments/assets/01f81489-b10e-4787-a994-dcd56a7dd9ce)
   *Detailed view of a specific course.*

4. **Instance Management**
   ![Instance Management 1](https://github.com/user-attachments/assets/cd4512b1-0ac7-4cc6-8a9e-c8639c1cfe71)
   ![Instance Management 2](https://github.com/user-attachments/assets/430f947f-2394-4a30-bc03-162e1633ed63)
   ![Instance Management 3](https://github.com/user-attachments/assets/246cd2fe-ec15-419d-b966-70457285ca89)
   ![Instance Management 4](https://github.com/user-attachments/assets/b6cb8afa-a80d-4ff5-9e91-b507b69dd3ff)
   *Manage and view instances of course deliveries.*

5. **Deleting a Course**
   ![Delete Course](https://github.com/user-attachments/assets/2169b91c-7305-4397-b0eb-c9cd500e27a0)
   *The option to delete a particular course.*

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
