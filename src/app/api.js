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
                error: (await response?.text()) || (await response?.json()),
            };
        }
    };

// Define a service using a base URL and expected endpoints.
export const api = createApi({
    reducerPath: "api",
    baseQuery: kyBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND }),
    endpoints: (builder) => ({
        getAccounts: builder.query({
            query: () => ({ url: "accounts", method: "get" }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints.
export const { useGetAccountsQuery } = api;
