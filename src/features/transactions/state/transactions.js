import { createSlice } from "@reduxjs/toolkit";

/*
 * Transaction schema:
 * date: string - formatted as `dd LLLL yyyy`, e.g. 10 January 2022
 * amount: number
 * balance: number
 * description: string
 * accountId: number
 * id: number
 */

export const transactionsSlice = createSlice({
    name: "transactions",
    initialState: {
        history: [],
        counter: 0,
    },
    reducers: {
        addTransaction: (state, action) => {
            state.history.push({ ...action.payload, id: state.counter++ });
        },
        addTransactions: (state, action) => {
            const transactions = action.payload.map((transaction, index) => {
                return { ...transaction, id: state.counter + index };
            });
            state.history.push(...transactions);
            state.counter += transactions.length;
        },
    },
});

export const selectTransactions = (state) => state.transactions.history;
export const { addTransaction, addTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
