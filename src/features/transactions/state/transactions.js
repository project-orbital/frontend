import { createSlice } from "@reduxjs/toolkit";
import { formatISO, parseISO } from "date-fns";

/*
 * Transaction schema:
 * date: string - date formatted as ISO string
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
            const { date } = action.payload;
            state.history.push({
                ...action.payload,
                // Store dates as formatted ISO strings because Date objects aren't serializable.
                date: formatISO(date),
                id: state.counter++,
            });
        },
        addTransactions: (state, action) => {
            const transactions = action.payload.map((transaction, index) => {
                const { date } = transaction;
                return {
                    ...transaction,
                    // Store dates as formatted ISO strings because Date objects aren't serializable.
                    date: formatISO(date),
                    id: state.counter + index,
                };
            });
            state.history.push(...transactions);
            state.counter += transactions.length;
        },
    },
});

export const selectTransactions = (state) => {
    // Convert ISO strings back into Date objects.
    return state.transactions.history.map((transaction) => {
        const { date } = transaction;
        return {
            ...transaction,
            date: parseISO(date),
        };
    });
};
export const { addTransaction, addTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
