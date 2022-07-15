import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"; // defaults to localStorage for web
import transactionsReducer from "../features/transactions/state/transactions";
import accountsReducer from "../features/accounts/state/accounts";
import filesReducer from "../features/account/state/files";
import budgetsReducer from "../features/plan/state/budgets";
import preferencesReducer from "../features/settings/state/preferences";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    blacklist: ["files", "preferences"],
    storage,
};

const combinedReducer = combineReducers({
    transactions: transactionsReducer,
    accounts: accountsReducer,
    files: filesReducer,
    preferences: preferencesReducer,
    budgets: budgetsReducer,
});

const rootReducer = (state, action) => {
    if (action.type.includes("signOut") || action.type.includes("eraseData")) {
        state = undefined;
    }
    return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
