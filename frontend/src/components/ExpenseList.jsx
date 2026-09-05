import { useEffect, useState } from "react";


function ExpenseList() {

    const [expenses, setExpenses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // Search
    const [search, setSearch] =
        useState("");


    // Category filter
    const [category, setCategory] =
        useState("all");


    // Type filter
    const [type, setType] =
        useState("all");


    // Date filter
    const [dateFilter, setDateFilter] =
        useState("all");


    // Fetch expenses
    const fetchExpenses = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/expenses"
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to fetch expenses"
                );

            }


            const data =
                await response.json();


            setExpenses(data);


        } catch (error) {

            setError(
                error.message
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchExpenses();

    }, []);


    // DELETE
    const handleDelete = async (id) => {

        try {

            const response = await fetch(
                `http://localhost:5000/api/expenses/${id}`,
                {
                    method: "DELETE"
                }
            );


            if (!response.ok) {

                const data =
                    await response.json();

                throw new Error(
                    data.message ||
                    "Failed to delete expense"
                );

            }


            setExpenses(
                expenses.filter(
                    (expense) =>
                        expense._id !== id
                )
            );


        } catch (error) {

            setError(
                error.message
            );

        }

    };


    // EDIT
    const handleEdit = async (expense) => {

        const newTitle = prompt(
            "Enter new title:",
            expense.title
        );


        if (!newTitle) {
            return;
        }


        try {

            const response = await fetch(
                `http://localhost:5000/api/expenses/${expense._id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        title: newTitle,
                        amount: expense.amount,
                        category:
                            expense.category,
                        type: expense.type,
                        date: expense.date
                    })
                }
            );


            if (!response.ok) {

                const data =
                    await response.json();

                throw new Error(
                    data.message ||
                    "Failed to update expense"
                );

            }


            const data =
                await response.json();


            setExpenses(
                expenses.map(
                    (item) =>
                        item._id === expense._id
                            ? data.expense
                            : item
                )
            );


        } catch (error) {

            setError(
                error.message
            );

        }

    };


    // FILTER
    const filteredExpenses =
        expenses.filter((expense) => {


            // Search
            const matchesSearch =
                expense.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            // Category
            const matchesCategory =
                category === "all" ||
                expense.category
                    .toLowerCase() ===
                    category.toLowerCase();


            // Type
            const matchesType =
                type === "all" ||
                expense.type === type;


            // Date
            const expenseDate =
                new Date(expense.date);

            const today =
                new Date();


            let matchesDate = true;


            // Today
            if (
                dateFilter === "today"
            ) {

                matchesDate =
                    expenseDate.toDateString() ===
                    today.toDateString();

            }


            // This month
            if (
                dateFilter === "month"
            ) {

                matchesDate =
                    expenseDate.getMonth() ===
                        today.getMonth() &&

                    expenseDate.getFullYear() ===
                        today.getFullYear();

            }


            return (
                matchesSearch &&
                matchesCategory &&
                matchesType &&
                matchesDate
            );

        });


    // Loading
    if (loading) {

        return (
            <p>
                Loading expenses...
            </p>
        );

    }


    // Error
    if (error) {

        return (
            <p>
                {error}
            </p>
        );

    }


    return (
        <div className="expense-section">

            <h2>
                Recent Transactions
            </h2>


            {/* FILTERS */}

            <div className="filters">


                {/* Search */}

                <input
                    type="text"
                    placeholder="Search expenses..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />


                {/* Category */}

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(
                            e.target.value
                        )
                    }
                >

                    <option value="all">
                        All Categories
                    </option>

                    <option value="food">
                        Food
                    </option>

                    <option value="travel">
                        Travel
                    </option>

                    <option value="shopping">
                        Shopping
                    </option>

                    <option value="bills">
                        Bills
                    </option>

                    <option value="entertainment">
                        Entertainment
                    </option>

                </select>


                {/* Type */}

                <select
                    value={type}
                    onChange={(e) =>
                        setType(
                            e.target.value
                        )
                    }
                >

                    <option value="all">
                        All Types
                    </option>

                    <option value="income">
                        Income
                    </option>

                    <option value="expense">
                        Expense
                    </option>

                </select>


                {/* Date */}

                <select
                    value={dateFilter}
                    onChange={(e) =>
                        setDateFilter(
                            e.target.value
                        )
                    }
                >

                    <option value="all">
                        All Dates
                    </option>

                    <option value="today">
                        Today
                    </option>

                    <option value="month">
                        This Month
                    </option>

                </select>


            </div>


            {/* EXPENSE LIST */}

            {filteredExpenses.length === 0 ? (

                <p>
                    No matching expenses found.
                </p>

            ) : (

                filteredExpenses.map(
                    (expense) => (

                        <div
                            className="expense-item"
                            key={expense._id}
                        >


                            <div>

                                <h3>
                                    {expense.title}
                                </h3>

                                <p>
                                    Category:{" "}
                                    {expense.category}
                                </p>

                                <p>
                                    Type:{" "}
                                    {expense.type}
                                </p>

                                <p>
                                    Date:{" "}
                                    {new Date(
                                        expense.date
                                    ).toLocaleDateString()}
                                </p>

                            </div>


                            <div>

                                <strong>
                                    ₹{expense.amount}
                                </strong>


                                <div className="expense-actions">

                                    <button
                                        onClick={() =>
                                            handleEdit(
                                                expense
                                            )
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                expense._id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>


                        </div>

                    )
                )

            )}

        </div>
    );
}


export default ExpenseList;