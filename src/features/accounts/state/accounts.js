import { createSlice } from "@reduxjs/toolkit";
import { formatISO, parseISO } from "date-fns";

export const accountsSlice = createSlice({
    name: "accounts",
    initialState: {
        list: [],
        counter: 0,
    },
    reducers: {
        addAccount: (state, action) => {
            state.list.push({
                id: state.counter,
                // Store dates as formatted ISO strings because Date objects aren't serializable.
                createdAt: formatISO(new Date()),
                ...action.payload,
            });
            state.counter++;
        },
        addAccounts: (state, action) => {
            for (const account of action.payload) {
                state.list.push({
                    id: state.counter,
                    createdAt: formatISO(new Date()),
                    ...account,
                });
                state.counter++;
            }
        },
        renameAccount: (state, action) => {
            const { id, name, nickname } = action.payload;
            const index = state.list.findIndex((acc) => acc.id === id);
            state.list[index] = { ...state.list[index], name, nickname };
        },
        deleteAccount: (state, action) => {
            const index = state.list.findIndex(
                (acc) => acc.id === action.payload.id
            );
            state.list.splice(index, 1);
        },
    },
});

export const selectAccounts = (state) => {
    // Convert ISO strings back into Date objects.
    return state.accounts.list.map((account) => {
        const { createdAt } = account;
        return {
            ...account,
            createdAt: parseISO(createdAt),
        };
    });
};

export const { addAccount, addAccounts, renameAccount, deleteAccount } =
    accountsSlice.actions;

export default accountsSlice.reducer;
