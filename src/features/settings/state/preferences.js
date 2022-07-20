import { createSlice } from "@reduxjs/toolkit";

export const preferencesSlice = createSlice({
    name: "preferences",
    initialState: {
        dataSync: false,
    },
    reducers: {
        signOut: () => {},
        eraseData: () => {},
    },
});

export const selectDataSync = (state) => state.preferences.dataSync;
export const { signOut, eraseData } = preferencesSlice.actions;
export default preferencesSlice.reducer;
