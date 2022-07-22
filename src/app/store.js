import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"; // defaults to localStorage for web
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";
import filesReducer from "../features/accounts/state/files";
import budgetsReducer from "../features/plan/state/budgets";
import contributionsReducer from "../features/learn/state/contributions";
import preferencesReducer from "../features/settings/state/preferences";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    // Files aren't serialized by default, so we need to blacklist them.
    // Preferences are retrieved from the server, so we blacklist them as well.
    // The API is only used for synchronized data, and is also retrieved from the server.
    blacklist: ["files", "preferences", "api"],
    storage,
};

// IntelliJ won't be able to resolve the values of `api`, so we disable
// the inspection here.
// noinspection JSUnresolvedVariable
const combinedReducer = combineReducers({
    files: filesReducer,
    preferences: preferencesReducer,
    budgets: budgetsReducer,
    contributions: contributionsReducer,
    // Add the generated reducer as a specific top-level slice.
    [api.reducerPath]: api.reducer,
});

const rootReducer = (state, action) => {
    if (action.type.includes("signOut") || action.type.includes("eraseData")) {
        state = undefined;
    }
    return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// IntelliJ won't be able to resolve the values of `api`, so we disable
// the inspection here.
// noinspection JSUnresolvedVariable
export const store = configureStore({
    reducer: persistedReducer,
    // Add the api middleware, enabling caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        // Silence unserializable value warnings since we're not persisting API data.
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(api.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
