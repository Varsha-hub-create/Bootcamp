# Student API Documentation

## Overview
This API provides CRUD (Create, Read, Update, Delete) operations for managing student records in a database. It includes features such as input validation, pagination, and search functionality.

## Technologies Used
- **Backend:** Node.js with Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (if applicable)
- **Validation:** Joi or Express Validator
- **API Testing:** Postman / Jest

## API Endpoints

###  Create Student API (POST)
**Endpoint:** `/students`
- Accepts JSON input with fields: `name`, `age`, `rollNo`
- Adds a new student to the database
- Returns a success response with student data
- Handles duplicate roll numbers

## How to Run the API
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables (MongoDB URI, JWT secret, etc.)
4. Start the server: `npm start`
5. Use Postman or any API client to test the endpoints

## Future Enhancements
- Implement authentication and authorization
- Add soft delete functionality
- Enhance search capabilities with more filters

## Author
Varshini S

