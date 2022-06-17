import {createSlice} from '@reduxjs/toolkit';

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        history: []
    },
    reducers: {
        addTransaction: (state, action) => {
            state.history.push(action.payload);
        },
        addTransactions: (state, action) => {
            state.history.push(...action.payload);
        }
    }
});

export const selectTransactions = state => state.transactions.history;
export const {
    addTransaction,
    addTransactions
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
