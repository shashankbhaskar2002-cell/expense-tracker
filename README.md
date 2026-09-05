Expense Tracker

A full-stack expense tracking application built using React, Node.js, Express.js, MongoDB, and Mongoose. The application allows users to manage income and expenses with CRUD operations, search, filtering, financial summaries, validation, and error handling.

Features
Add income and expenses
View all transactions
Edit transactions
Delete transactions
Search transactions
Filter by category
Filter by transaction type
Filter by date
Calculate total income
Calculate total expenses
Calculate current balance
Backend validation
Global error handling
RESTful APIs
MongoDB aggregation
API testing with Postman
Responsive user interface
Tech Stack
Frontend
React.js
JavaScript
HTML
CSS
Vite
Backend
Node.js
Express.js
REST API
MVC Architecture
Database
MongoDB
Mongoose
Tools
Git
GitHub
Postman
MongoDB Compass
VS Code
Project Architecture

The backend follows the MVC (Model-View-Controller) architecture.

Client
   |
   v
React Frontend
   |
   v
REST API
   |
   v
Express.js
   |
   v
Routes
   |
   v
Controllers
   |
   v
Mongoose
   |
   v
MongoDB

Project Structure
expense-tracker/
|
├── backend/
│   |
│   ├── Config/
│   │   └── db.js
│   |
│   ├── Controllers/
│   │   └── Expense.js
│   |
│   ├── Middlewares/
│   │   ├── asyncHandler.js
│   │   └── errorMiddleware.js
│   |
│   ├── Models/
│   │   └── expensemodel.js
│   |
│   ├── Routes/
│   │   └── ExpenseRoute.js
│   |
│   ├── .env
│   ├── package.json
│   └── server.js
|
├── frontend/
│   |
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   └── ExpenseList.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
|
├── .gitignore
└── README.md

API Endpoints
Method	Endpoint	Description
GET	/	Check server status
POST	/api/expenses	Create a transaction
GET	/api/expenses	Get all transactions
GET	/api/expenses/summary	Get financial summary
PUT	/api/expenses/:id	Update a transaction
DELETE	/api/expenses/:id	Delete a transaction
Expense Data Model

Each transaction contains the following fields:

title
amount
category
type
date
createdAt
updatedAt


The type field accepts:

income
expense

Financial Summary

The application uses MongoDB aggregation to calculate:

Total Income
Total Expense
Balance


The balance is calculated using:

Balance = Total Income - Total Expense

Search and Filtering

Transactions can be filtered using:

Search by title
Category
Transaction type
Today's transactions
Current month's transactions
Backend Validation

The backend validates incoming data before storing it in MongoDB.

Validation includes:

Title cannot be empty
Amount must be greater than 0
Category is required
Transaction type must be either income or expense
Error Handling

The application uses centralized error handling with Express middleware.

Request
   |
   v
Route
   |
   v
Controller
   |
   v
Error
   |
   v
Global Error Middleware
   |
   v
JSON Error Response


This keeps error-handling logic centralized instead of repeating it throughout the controllers.

API Testing

The backend APIs were tested using Postman.

The following operations were tested:

Create transaction
Get all transactions
Update transaction
Delete transaction
Get financial summary
Validation errors
Invalid requests
Error responses
Installation and Setup
1. Clone the Repository
git clone https://github.com/shashankbhaskar2002-cell/expense-tracker.git

2. Open the Project
cd expense-tracker

Backend Setup

Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string


Start the development server:

npm run dev


The backend will run on:

http://localhost:5000

Frontend Setup

Open another terminal and navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the development server:

npm run dev


The frontend URL will be displayed in the terminal.

Environment Variables

The backend requires the following environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string


The .env file should not be committed to GitHub.

Learning Outcomes

This project provided practical experience with:

React components
React state management
React hooks
Form handling
API integration
REST API development
Node.js
Express.js
MongoDB
Mongoose
CRUD operations
MVC architecture
MongoDB aggregation
Search and filtering
Backend validation
Global error handling
Async error handling
Postman API testing
Git and GitHub
Future Improvements

Some possible improvements for the project include:

JWT authentication
User-specific transactions
Monthly financial charts
Expense analytics
Budget management
Dark mode
Export transactions to CSV or PDF
Cloud deployment
Advanced dashboard
Pagination
Author

Shashank Bhaskar

Technologies
React.js
Node.js
Express.js
MongoDB
Mongoose
JavaScript
HTML
CSS
Git
GitHub
Postman