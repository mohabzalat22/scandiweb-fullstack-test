
# Scandiweb Fullstack Project (No Frameworks)

## Project Overview
This is a full-stack e-commerce test project built using PHP, React, and GraphQL. The application demonstrates the ability to create a scalable, maintainable, and efficient e-commerce platform with a modern tech stack.

## Requirements
- **PHP Version**: 8.1+
- **PSR Compliance**:
  - PSR-1
  - PSR-12
  - PSR-4
- **Third-Party Libraries**:
  - Dotenv
  - Medoo
  - Webonyx/GraphQL
  - Monolog

## Tools
- **Development Environment**: Laragon

## Libraries Used
### PHP Libraries
- **Medoo**: For database interactions.
- **Dotenv**: For environment variable management.
- **Webonyx/GraphQL**: For GraphQL functionality.
- **Monolog**: For logging.

### React Libraries
- **React**: Core library for building the user interface.
- **React Router**: For client-side routing.
- **Apollo Client**: To manage GraphQL queries and mutations.
- **Redux**: For global state management.


## Installation
### 1. Clone the Repository
```bash
git clone https://github.com/mohabzalat22/scandiweb-fullstack-test.git
cd scandiweb-fullstack-test
```

### 2. Install Dependencies
Run the following command to install the necessary PHP libraries via Composer:
```bash
composer install
```

### 3. Configure Environment Variables
1. Create a `.env` file in the root directory of the project:
   ```bash
   cp .env.example .env
   ```
2. Edit the `.env` file to match your database configuration:
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=scandiweb
   DB_USERNAME=root
   DB_PASSWORD=
   ```

### 4. Set Up the Database
Import database.sql from main dir to mysql 
   

### 5. Serve the Application
Run the following command to start the development server:
```bash
php -S localhost:8000 -t public
```

The application will be accessible at [http://localhost:8000](http://localhost:8000).

---



*Created by Mohab (2025)*