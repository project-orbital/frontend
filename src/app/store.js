import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/state/transactions";
import accountsReducer from "../features/accounts/state/accounts";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist"; // defaults to localStorage for web

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    transactions: transactionsReducer,
    accounts: accountsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
});
export const persistor = persistStore(store);
