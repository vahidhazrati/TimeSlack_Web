# User CRUD API (Node.js & Express)

This directory contains a simple CRUD API for managing users, built with Node.js and Express.

## Prerequisites

- Node.js and npm installed.

## Setup and Running the Server

1.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies (if you haven't already):**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3001` by default (or the port specified by the `PORT` environment variable). Nodemon is used to automatically restart the server on file changes.

## API Endpoints

The API uses an in-memory store, so data will be reset if the server restarts.

### Users

-   **`POST /users`**: Create a new user.
    -   Request body (JSON): `{ "name": "string", "email": "string" }`
    -   Response: The created user object or an error message.
-   **`GET /users`**: Retrieve all users.
    -   Response: An array of user objects.
-   **`GET /users/:id`**: Retrieve a specific user by their ID.
    -   Response: The user object or a 404 error if not found.
-   **`PUT /users/:id`**: Update a specific user by their ID.
    -   Request body (JSON): `{ "name": "string" (optional), "email": "string" (optional) }`
    -   Response: The updated user object or a 404 error if not found.
-   **`DELETE /users/:id`**: Delete a specific user by their ID.
    -   Response: A success message with the deleted user object or a 404 error if not found.

### Root

-   **`GET /`**: A simple welcome message.
    -   Response: "User CRUD API is running!"
