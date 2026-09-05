import { useEffect, useState } from "react";

import "./index.css";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";


function App() {

    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });

    const [refresh, setRefresh] = useState(0);


    const fetchSummary = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/expenses/summary"
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch summary"
                );
            }

            const data = await response.json();

            setSummary(data);

        } catch (error) {

            console.error(
                error.message
            );

        }
    };


    useEffect(() => {

        fetchSummary();

    }, [refresh]);


    const handleExpenseAdded = () => {

        setRefresh(
            (previous) => previous + 1
        );

    };


    return (
        <div className="app">

            <h1>
                Expense Tracker
            </h1>


            <ExpenseForm
                onExpenseAdded={
                    handleExpenseAdded
                }
            />


            <div className="summary">

                <div className="card">

                    <h3>
                        Total Income
                    </h3>

                    <p>
                        ₹{summary.totalIncome}
                    </p>

                </div>


                <div className="card">

                    <h3>
                        Total Expense
                    </h3>

                    <p>
                        ₹{summary.totalExpense}
                    </p>

                </div>


                <div className="card">

                    <h3>
                        Balance
                    </h3>

                    <p>
                        ₹{summary.balance}
                    </p>

                </div>

            </div>


            <ExpenseList />

        </div>
    );
}


export default App;