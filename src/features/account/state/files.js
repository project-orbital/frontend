import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
    name: "files",
    initialState: {
        list: [],
    },
    reducers: {
        addFile: (state, action) => {
            state.list.push(action.payload);
            state.counter++;
        },
        addFiles: (state, action) => {
            state.list = [...state.list, ...action.payload];
        },
        deleteAllFiles: (state) => {
            state.list = [];
        },
    },
});

export const selectFiles = (state) => {
    return state.files.list;
};

export const { addFile, addFiles, deleteAllFiles } = filesSlice.actions;

export default filesSlice.reducer;
