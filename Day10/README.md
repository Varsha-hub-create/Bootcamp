# Task Manager App

## Overview
This project is a simple task manager application built with React, Node.js, and MongoDB. Users can create, view, edit, and delete tasks. Each task includes a title, description, due date, and status (e.g., Open, In Progress, Completed). Users can filter tasks by status and sort them by due date.

The backend is powered by Node.js and Express.js to handle API requests, while MongoDB is used for storing tasks. To keep the project simple, user authentication (signup/login) is not included.

## Features
### 1. Task Management
- **Create Tasks**: Users can create new tasks with the following details:
  - Title (required)
  - Description (optional)
  - Due Date (optional)
  - Status ("Open," "In Progress," "Completed") with a default of "Open"
- **View Tasks**: Users can view a list of tasks displaying the title, due date, and status. Tasks can be sorted by due date (ascending/descending) or filtered by status.
- **Edit Tasks**: Users can modify the title, description, due date, and status of existing tasks.
- **Delete Tasks**: Users can delete tasks.
- **Mark as Complete**: Users can mark tasks as "Completed" with a single click/toggle.

### 2. Filtering and Sorting
- Users can filter tasks by status (e.g., show only "Open" tasks).
- Users can sort tasks by due date (ascending or descending order).

## Technologies Used
### Frontend:
- React.js (UI development)
- CSS (for styling)

### Backend:
- Node.js (server-side logic)
- Express.js (API framework)
- MongoDB (database for storing tasks)

### Other Tools:
- Axios or Fetch API (for handling API requests)
- Mongoose (MongoDB ODM for Node.js)

## Installation & Setup
### Prerequisites:
- Node.js installed
- MongoDB installed and running

### Steps:
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/task-manager-app.git
   cd task-manager-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   cd backend
   node server.js
   ```
4. Start the frontend:
   ```sh
   cd frontend
   npm start
   ```
5. Open the application in a browser:
   ```
   http://localhost:3000
   ```

## API Endpoints
- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
