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
        end_date: "01/01/2022",
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
    },
});

export const { createBudget, createStartDate, createEndDate } =
    BudgetSlice.actions;

export default BudgetSlice.reducer;
