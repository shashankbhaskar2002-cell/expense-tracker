import Expense from "../Models/expenseModel.js";

// CREATE EXPENSE
const createExpense = async (req, res) => {
    const {
        title,
        amount,
        category,
        type,
        date
    } = req.body;

    // Title validation
    if (!title || title.trim() === "") {
        const error = new Error("Title is required");
        error.statusCode = 400;
        throw error;
    }

    // Amount validation
    if (
        amount === undefined ||
        amount === null ||
        amount === "" ||
        Number(amount) <= 0
    ) {
        const error = new Error("Amount must be greater than 0");
        error.statusCode = 400;
        throw error;
    }

    // Category validation
    if (!category || category.trim() === "") {
        const error = new Error("Category is required");
        error.statusCode = 400;
        throw error;
    }

    // Type validation
    if (!["income", "expense"].includes(type)) {
        const error = new Error("Type must be income or expense");
        error.statusCode = 400;
        throw error;
    }

    const expense = await Expense.create({
        title: title.trim(),
        amount: Number(amount),
        category: category.trim(),
        type,
        date
    });

    res.status(201).json({
        message: "Expense created successfully",
        expense
    });
};


// GET ALL EXPENSES
const getExpenses = async (req, res) => {
    const expenses = await Expense.find().sort({
        date: -1
    });

    res.status(200).json(expenses);
};


// UPDATE EXPENSE
const updateExpense = async (req, res) => {
    const { id } = req.params;

    const {
        title,
        amount,
        category,
        type,
        date
    } = req.body;

    // Title validation
    if (!title || title.trim() === "") {
        const error = new Error("Title is required");
        error.statusCode = 400;
        throw error;
    }

    // Amount validation
    if (
        amount === undefined ||
        amount === null ||
        amount === "" ||
        Number(amount) <= 0
    ) {
        const error = new Error("Amount must be greater than 0");
        error.statusCode = 400;
        throw error;
    }

    // Category validation
    if (!category || category.trim() === "") {
        const error = new Error("Category is required");
        error.statusCode = 400;
        throw error;
    }

    // Type validation
    if (!["income", "expense"].includes(type)) {
        const error = new Error("Type must be income or expense");
        error.statusCode = 400;
        throw error;
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        {
            title: title.trim(),
            amount: Number(amount),
            category: category.trim(),
            type,
            date
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedExpense) {
        const error = new Error("Expense not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({
        message: "Expense updated successfully",
        expense: updatedExpense
    });
};


// DELETE EXPENSE
const deleteExpense = async (req, res) => {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
        const error = new Error("Expense not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({
        message: "Expense deleted successfully",
        expense: deletedExpense
    });
};


// GET SUMMARY
const getSummary = async (req, res) => {
    const summary = await Expense.aggregate([
        {
            $group: {
                _id: "$type",
                total: {
                    $sum: "$amount"
                }
            }
        }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    summary.forEach((item) => {
        if (item._id === "income") {
            totalIncome = item.total;
        }

        if (item._id === "expense") {
            totalExpense = item.total;
        }
    });

    const balance = totalIncome - totalExpense;

    res.status(200).json({
        totalIncome,
        totalExpense,
        balance
    });
};


// EXPORT
export {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    getSummary
};
