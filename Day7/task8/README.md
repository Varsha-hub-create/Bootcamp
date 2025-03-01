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

### 8. Search by Roll Number or ID (GET)
**Endpoint:** `/students/search?rollNo=<value>&id=<value>`
- Case-insensitive search by roll number or ID
- Returns matching student records or an empty array

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

