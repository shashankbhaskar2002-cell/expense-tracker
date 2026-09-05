import { useState } from "react";


function ExpenseForm({ onExpenseAdded }) {

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        type: "expense",
        date: ""
    });


    const [error, setError] = useState("");


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData({
            ...formData,
            [name]: value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        try {

            const response = await fetch(
                "http://localhost:5000/api/expenses",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to create expense"
                );

            }


            // Clear form

            setFormData({
                title: "",
                amount: "",
                category: "",
                type: "expense",
                date: ""
            });


            // Refresh parent data

            onExpenseAdded();


            // Refresh page list

            window.location.reload();


        } catch (error) {

            setError(
                error.message
            );

        }

    };


    return (
        <div className="expense-form">

            <h2>
                Add Transaction
            </h2>


            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}


            <form
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />


                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                />


                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                >

                    <option value="expense">
                        Expense
                    </option>

                    <option value="income">
                        Income
                    </option>

                </select>


                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />


                <button type="submit">
                    Add Transaction
                </button>

            </form>

        </div>
    );
}


export default ExpenseForm;