import {createSlice} from '@reduxjs/toolkit';

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState: {
        list: []
    },
    reducers: {
        addAccount: (state, action) => {
            state.list.push(action.payload);
        },
        addAccounts: (state, action) => {
            state.list.push(...action.payload);
        }
    }
});

export const selectAccounts = state => state.accounts.list;
export const {
    addAccount,
    addAccounts
} = accountsSlice.actions;

export default accountsSlice.reducer;
