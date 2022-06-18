import {createSlice} from "@reduxjs/toolkit";

export const accountsSlice = createSlice({
    name: "accounts", initialState: {
        list: [], counter: 0
    }, reducers: {
        addAccount: (state, action) => {
            state.list.push({id: state.counter, createdAt: new Date(), ...action.payload});
            state.counter++;
        }, addAccounts: (state, action) => {
            for (const account of action.payload) {
                state.list.push({id: state.counter, createdAt: new Date(), ...account});
                state.counter++;
            }
        }, renameAccount: (state, action) => {
            const {id, name, nickname} = action.payload;
            const index = state.list.findIndex(acc => acc.id === id);
            state.list[index] = {...state.list[index], name, nickname};
        }
    }
});

export const selectAccounts = state => state.accounts.list;
export const {
    addAccount, addAccounts, renameAccount
} = accountsSlice.actions;

export default accountsSlice.reducer;
