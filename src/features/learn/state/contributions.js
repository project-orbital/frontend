import { createSlice } from "@reduxjs/toolkit";
import { formatISO } from "date-fns";

/*
 * Transaction schema:
 * header: string
 * summary: string
 * link: string
 * submissionDate: string - date formatted as ISO string
 * contributedBy: string - username of user
 */

export const ContributionsSlice = createSlice({
    name: "contributions",
    initialState: {
        header: "",
        summary: "",
        link: "",
        contributedBy: "",
        submissionDate: formatISO(new Date()),
    },
    reducers: {
        createHeader: (state, action) => {
            state.header = action.payload;
        },
        createSummary: (state, action) => {
            state.summary = action.payload;
        },
        createLink: (state, action) => {
            state.link = action.payload;
        },
    },
});

export const { createHeader, createSummary, createLink } =
    ContributionsSlice.actions;

export default ContributionsSlice.reducer;
