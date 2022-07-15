import { createSlice } from "@reduxjs/toolkit";
import { formatISO } from "date-fns";

/*
 * Transaction schema:
 * start date: string - date formatted as ISO string
 * start date: string - date formatted as ISO string
 * budget: number
 */

export const BudgetSlice = createSlice({
    name: "budgets",
    initialState: {
        budget: 0,
        start_date: formatISO(new Date()),
        end_date: formatISO(new Date()),
    },
    reducers: {
        createBudget: (state, action) => {
            state.budget = action.payload;
        },
        createStartDate: (state, action) => {
            state.start_date = action.payload;
        },
        createEndDate: (state, action) => {
            state.end_date = action.payload;
        },
        accountsSelected: (state, action) => {
            state.accounts = action.payload;
        },
        deleteBudget: (state) => {
            state.budget = 0;
            state.start_date = formatISO(new Date());
            state.end_date = formatISO(new Date());
        },
    },
});

export const { createBudget, createStartDate, createEndDate, deleteBudget } =
    BudgetSlice.actions;

export default BudgetSlice.reducer;
