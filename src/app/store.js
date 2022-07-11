import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/state/transactions";
import accountsReducer from "../features/accounts/state/accounts";
import filesReducer from "../features/account/state/files";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist"; // defaults to localStorage for web
import preferencesReducer from "../features/settings/state/preferences";

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
});

const rootReducer = (state, action) => {
    if (action.type.includes("signOut")) {
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
