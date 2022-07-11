import { createSlice } from "@reduxjs/toolkit";

export const preferencesSlice = createSlice({
    name: "preferences",
    initialState: {
        dataSync: false,
    },
    reducers: {
        setDataSync: (state, action) => {
            state.dataSync = action.payload;
        },
        toggleDataSync: (state) => {
            state.dataSync = !state.dataSync;
        },
    },
});

export const selectDataSync = (state) => state.preferences.dataSync;
export const { setDataSync, toggleDataSync } = preferencesSlice.actions;
export default preferencesSlice.reducer;
