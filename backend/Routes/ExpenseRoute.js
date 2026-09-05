import express from "express";

import {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    getSummary
} from "../Controllers/Expense.js";

import asyncHandler from "../Middlewares/asyncHandler.js";

const router = express.Router();


// CREATE
router.post(
    "/",
    asyncHandler(createExpense)
);


// GET ALL
router.get(
    "/",
    asyncHandler(getExpenses)
);


// SUMMARY
router.get(
    "/summary",
    asyncHandler(getSummary)
);


// UPDATE
router.put(
    "/:id",
    asyncHandler(updateExpense)
);


// DELETE
router.delete(
    "/:id",
    asyncHandler(deleteExpense)
);


export default router;