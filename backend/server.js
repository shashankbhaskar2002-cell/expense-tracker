import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./Config/db.js";
import expenseRoutes from "./Routes/ExpenseRoute.js";
import errorHandler from "./Middlewares/errorMiddleware.js";


dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());

app.use(express.json());


// Database
connectDB();


// Home route
app.get("/", (req, res) => {

    res.json({
        message: "Expense Tracker API is running"
    });

});


// Expense routes
app.use(
    "/api/expenses",
    expenseRoutes
);


// Global error handler
app.use(errorHandler);


// Start server
app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});