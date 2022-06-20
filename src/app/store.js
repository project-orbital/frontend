import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/state/transactions";
import accountsReducer from "../features/accounts/state/accounts";

export default configureStore({
    reducer: {
        transactions: transactionsReducer,
        accounts: accountsReducer,
    },
});
