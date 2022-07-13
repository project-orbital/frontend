import { createApi } from "@reduxjs/toolkit/query/react";
import ky from "ky";

// Nothing against the Fetch API, but since we're already using the `ky` library,
// we can use their abstraction instead.
const kyBaseQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, params }) => {
        try {
            const response = await ky(url, {
                prefixUrl: baseUrl,
                method: method,
                json: data,
                credentials: "include",
                searchParams: params,
            }).json();
            return { data: response };
        } catch (error) {
            const response = error.response;
            return {
                error: await response?.json(),
            };
        }
    };

// Define a service using a base URL and expected endpoints.
// Tags are used to group related data together, and allow for cache invalidation
// of the groups of data with the same tag. This is needed for automatic
// refreshing of data when changes are made (and to trigger re-renders, etc.).
// Use CRUD for the method name prefixes, e.g. (createAccount, readAccounts, etc.).
export const api = createApi({
    reducerPath: "api",
    baseQuery: kyBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND }),
    tagTypes: ["Account", "Accounts"],
    endpoints: (builder) => ({
        createAccount: builder.mutation({
            query: (values) => ({
                url: "accounts",
                method: "post",
                data: values,
            }),
            invalidatesTags: ["Accounts"],
        }),
        readAccount: builder.query({
            query: (id) => ({ url: `accounts/${id}`, method: "get" }),
            providesTags: ["Account"],
        }),
        readAccounts: builder.query({
            query: () => ({ url: "accounts", method: "get" }),
            providesTags: ["Accounts"],
        }),
        updateAccount: builder.mutation({
            query: ({ id, ...values }) => ({
                url: `accounts/${id}`,
                method: "put",
                data: values,
            }),
            invalidatesTags: ["Account", "Accounts"],
        }),
        deleteAccount: builder.mutation({
            query: (id) => ({
                url: `accounts/${id}`,
                method: "delete",
            }),
            invalidatesTags: ["Account", "Accounts"],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints.
export const {
    useCreateAccountMutation,
    useReadAccountQuery,
    useReadAccountsQuery,
    useUpdateAccountMutation,
    useDeleteAccountMutation,
} = api;
