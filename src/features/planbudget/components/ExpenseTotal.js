import React, { useContext } from "react";
import { AppContext } from "../context/BudgetPlannerContext";

const ExpenseTotal = () => {
    const { expenses } = useContext(AppContext);

    const total = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    return (
        <div class="alert alert-primary p-4">
            <span>Spent so far: ${total}</span>
        </div>
    );
};

export default ExpenseTotal;
