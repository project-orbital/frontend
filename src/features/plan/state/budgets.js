import { createSlice } from "@reduxjs/toolkit";

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
        start_date: "01/01/2000",
        end_date: "10/10/2000",
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
            state.start_date = "01/01/2000";
            state.end_date = "10/10/2000";
        },
    },
});

export const { createBudget, createStartDate, createEndDate, deleteBudget } =
    BudgetSlice.actions;

export default BudgetSlice.reducer;
