import { createSlice } from "@reduxjs/toolkit";
import { compareAsc, isSameMonth, parseISO } from "date-fns";

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
            state.history.push({
                ...action.payload,
                id: state.counter++,
            });
        },
        addTransactions: (state, action) => {
            const transactions = action.payload.map((transaction, index) => {
                return {
                    ...transaction,
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

export const selectTransactionsFromAccount = (accountId) => (state) => {
    // Convert ISO strings back into Date objects.
    return state.transactions.history
        .filter((transaction) => transaction.accountId === accountId)
        .map((transaction) => {
            const { date } = transaction;
            return {
                ...transaction,
                date: parseISO(date),
            };
        });
};

export const selectLastTransactionFromAccount = (accountId) => (state) => {
    const result = state.transactions.history
        .filter((transaction) => transaction.accountId === accountId)
        .reduce((a, b) => (a === null || b.date > a.date ? b : a), null);
    if (result === null) {
        return null;
    }
    return {
        ...result,
        date: parseISO(result.date),
    };
};

/**
 * Selects the balances for the given account and the end of each month.
 * If there are no transactions for the month, that month is skipped in the returned array.
 * The elements of the array are objects { date, balance } and sorted by date in ascending order.
 *
 * @param accountId (number) the ID of the account to select balances for
 * @return a function that accepts the ID of the account to select balances for
 * which is curried and then returns the month-end balances
 */
// Remove the other fields because they aren't needed.
export const selectMonthEndBalancesFromAccount = (accountId) => (state) => {
    return state.transactions.history
        .filter((transaction) => transaction.accountId === accountId)
        .map((transaction) => ({
            date: parseISO(transaction.date),
            balance: transaction.balance,
        }))
        .sort((a, b) => compareAsc(a.date, b.date))
        .reduce((acc, transaction) => {
            if (acc.length === 0) {
                acc.push(transaction);
                return acc;
            }
            const last = acc[acc.length - 1];
            if (isSameMonth(last.date, transaction.date)) {
                acc[acc.length - 1] = transaction;
            } else {
                acc.push(transaction);
            }
            return acc;
        }, []);
};

export const { addTransaction, addTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
