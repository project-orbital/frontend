import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";
import filesReducer from "../features/accounts/state/files";
import preferencesReducer from "../features/settings/state/preferences";

// IntelliJ won't be able to resolve the values of `api`, so we disable
// the inspection here.
// noinspection JSUnresolvedVariable
export const store = configureStore({
    reducer: {
        files: filesReducer,
        preferences: preferencesReducer,
        // Add the generated reducer as a specific top-level slice.
        [api.reducerPath]: api.reducer,
    },
    // Add the api middleware, enabling caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        // Silence unserializable value warnings since we're not persisting API data.
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(api.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
