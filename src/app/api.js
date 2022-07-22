import { createApi } from "@reduxjs/toolkit/query/react";
import ky from "ky";
import { parseISO } from "date-fns";
import currency from "currency.js";
import {
    transformAsset,
    transformAssets,
    transformLiabilities,
    transformLiability,
    transformOrder,
    transformOrders,
    transformPayment,
    transformPayments,
} from "./transformers";

// Nothing against the Fetch API, but since we're already using the `ky` library,
// we can use their abstraction instead.
const kyBaseQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, params, headers, body }) => {
        try {
            const response = await ky(url, {
                prefixUrl: baseUrl,
                method: method,
                json: data,
                credentials: "include",
                searchParams: params,
                headers: headers,
                body: body,
            }).json();
            return { data: response };
        } catch (error) {
            const response = error.response;
            return {
                error: await response?.json(),
            };
        }
    };

// Deserializes decimal128 into currency values and ISO date strings into Date objects.
// We won't be persisting this data, so we don't need to worry about it being unserializable.
const transformTransaction = (tx) => ({
    id: tx._id,
    date: parseISO(tx.date),
    amount: currency(tx.amount["$numberDecimal"]),
    balance: currency(tx.balance ? tx.balance["$numberDecimal"] : 0),
    category: tx.category,
    description: tx.description,
    accountId: tx.account_id,
});
const transformTransactions = (response) => response.map(transformTransaction);

const transformContribution = (c) => ({
    _id: c._id,
    header: c.header,
    summary: c.summary,
    link: c.link,
    submissionDate: parseISO(c.submissionDate),
    username: c.username,
    likedBy: c.likedBy,
});
const transformContributions = (response) =>
    response.map(transformContribution);

// Define a service using a base URL and expected endpoints.
// Tags are used to group related data together, and allow for cache invalidation
// of the groups of data with the same tag. This is needed for automatic
// refreshing of data when changes are made (and to trigger re-renders, etc.).
// Use CRUD for the method name prefixes, e.g. (createAccount, readAccounts, etc.).
// TODO: Give tags their own ID for more controlled cache invalidation.
export const api = createApi({
    reducerPath: "api",
    baseQuery: kyBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND }),
    tagTypes: [
        "Account",
        "Accounts",
        "Transaction",
        "Transactions",
        "Contribution",
        "Contributions",
        "ReportedContributions",
        "Budget",
        "Assets",
        "Liabilities",
        "Orders",
        "Payments",
    ],
    endpoints: (builder) => ({
        // === === ===
        // User
        deleteUserAccount: builder.mutation({
            query: (password) => ({
                url: `users/preferences/delete-account`,
                method: "delete",
                headers: {
                    password: password,
                },
            }),
            invalidatesTags: [
                "Account",
                "Accounts",
                "Transaction",
                "Transactions",
                "Contribution",
                "Contributions",
                "ReportedContributions",
                "Budget",
            ],
        }),
        signOut: builder.mutation({
            query: () => ({
                url: `users/sign-out`,
                method: "get",
            }),
            invalidatesTags: [
                "Account",
                "Accounts",
                "Transaction",
                "Transactions",
                "Contribution",
                "Contributions",
                "ReportedContributions",
                "Budget",
            ],
        }),
        deleteUserData: builder.mutation({
            query: (password) => ({
                url: `users/preferences/erase-data`,
                method: "delete",
                headers: {
                    password: password,
                },
            }),
            invalidatesTags: [
                "Account",
                "Accounts",
                "Transaction",
                "Transactions",
                "Contribution",
                "Contributions",
                "ReportedContributions",
                "Budget",
            ],
        }),
        // === === ===
        // Accounts
        createAccount: builder.mutation({
            query: (values) => ({
                url: "accounts",
                method: "post",
                data: values,
            }),
            invalidatesTags: ["Accounts"],
        }),
        readAccount: builder.query({
            query: (id) => ({
                url: `accounts/${id}`,
                method: "get",
            }),
            providesTags: ["Account"],
        }),
        readAccounts: builder.query({
            query: () => ({
                url: "accounts",
                method: "get",
            }),
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
            invalidatesTags: [
                "Account",
                "Accounts",
                "Transaction",
                "Transactions",
            ],
        }),
        // === === ===
        // Transactions
        createTransaction: builder.mutation({
            query: (values) => ({
                url: "transactions",
                method: "post",
                data: values,
            }),
            invalidatesTags: ["Transactions"],
        }),
        createTransactionsFromStatements: builder.mutation({
            query: ({ id, data }) => ({
                url: `api/upload/${id}`,
                method: "post",
                body: data,
            }),
            invalidatesTags: ["Transactions", "Transaction"],
        }),
        readTransaction: builder.query({
            query: (id) => ({
                url: `transactions/${id}`,
                method: "get",
            }),
            transformResponse: transformTransaction,
            providesTags: ["Transaction"],
        }),
        readTransactions: builder.query({
            query: () => ({
                url: "transactions",
                method: "get",
            }),
            transformResponse: transformTransactions,
            providesTags: ["Transactions"],
        }),
        readTransactionsInAccount: builder.query({
            query: (id) => ({
                url: "transactions",
                method: "get",
                params: { accountId: id },
            }),
            transformResponse: transformTransactions,
            providesTags: ["Transactions"],
        }),
        updateTransaction: builder.mutation({
            query: ({ id, ...values }) => ({
                url: `transactions/${id}`,
                method: "put",
                data: values,
            }),
            invalidatesTags: ["Transaction", "Transactions"],
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `transactions/${id}`,
                method: "delete",
            }),
            invalidatesTags: ["Transaction", "Transactions"],
        }),
        // === === ===
        // Contributions
        createContribution: builder.mutation({
            query: (values) => ({
                url: "learn/contribute",
                method: "post",
                data: values,
            }),
            invalidatesTags: ["Contribution", "Contributions"],
        }),
        readContributions: builder.query({
            query: () => ({
                url: "learn",
                method: "get",
            }),
            transformResponse: transformContributions,
            providesTags: ["Contributions"],
        }),
        likeContribution: builder.mutation({
            query: ({ id }) => ({
                url: `learn/like/${id}`,
                method: "put",
                params: { id: id },
            }),
            invalidatesTags: ["Contributions"],
        }),
        unlikeContribution: builder.mutation({
            query: ({ id }) => ({
                url: `learn/unlike/${id}`,
                method: "put",
                params: { id: id },
            }),
            invalidatesTags: ["Contributions"],
        }),
        reportContribution: builder.mutation({
            query: ({ id, ...values }) => ({
                url: `learn/report/${id}`,
                method: "put",
                data: values,
                params: { id: id },
            }),
            invalidatesTags: ["Contributions"],
        }),
        readReports: builder.query({
            query: () => ({
                url: "learn/reactions/reports",
                method: "get",
            }),
            providesTags: ["Contributions"],
        }),
        readLikes: builder.query({
            query: () => ({
                url: "learn/reactions/likes",
                method: "get",
            }),
            providesTags: ["Contributions"],
        }),
        // === === ===
        // Budgeting
        createBudget: builder.mutation({
            query: (values) => ({
                url: "budget",
                method: "post",
                data: values,
            }),
            invalidatesTags: ["Budget"],
        }),
        deleteBudget: builder.mutation({
            query: () => ({
                url: "budget",
                method: "delete",
            }),
            invalidatesTags: ["Budget"],
        }),
        updateBudget: builder.mutation({
            query: (values) => ({
                url: "budget/update",
                method: "put",
                data: values,
            }),
            invalidatesTags: ["Budget"],
        }),
        readBudget: builder.query({
            query: () => ({
                url: "budget",
                method: "get",
            }),
            providesTags: ["Budget"],
        }),
        // === === ===
        // Assets
        createAsset: builder.mutation({
            query: (values) => ({
                url: "assets",
                method: "post",
                data: values,
            }),
            invalidatesTags: ["Assets"],
        }),
        readAsset: builder.query({
            query: (id) => ({
                url: `assets/${id}`,
                method: "get",
            }),
            transformResponse: transformAsset,
            providesTags: ["Assets"],
        }),
        readAssets: builder.query({
            query: () => ({
                url: "assets",
                method: "get",
            }),
            transformResponse: transformAssets,
            providesTags: ["Assets"],
        }),
        updateAsset: builder.mutation({
            query: ({ id, ...values }) => ({
                url: `assets/${id}`,
                method: "put",
                data: values,
            }),
            invalidatesTags: ["Assets"],
        }),
        deleteAsset: builder.mutation({
            query: (id) => ({
                url: `assets/${id}`,
                method: "delete",
            }),
            invalidatesTags: ["Assets", "Orders"],
        }),
        // === === ===
        // Liabilities
        createLiability: builder.mutation({
            query: (values) => ({
                url: "liabilities",
                method: "post",
                data: values,
            }),
            invalidatesTags: ["Liabilities"],
        }),
        readLiability: builder.query({
            query: (id) => ({
                url: `liabilities/${id}`,
                method: "get",
            }),
            transformResponse: transformLiability,
            providesTags: ["Liabilities"],
        }),
        readLiabilities: builder.query({
            query: () => ({
                url: "liabilities",
                method: "get",
            }),
            transformResponse: transformLiabilities,
            providesTags: ["Liabilities"],
        }),
        updateLiability: builder.mutation({
            query: ({ id, ...values }) => ({
                url: `liabilities/${id}`,
                method: "put",
                data: values,
            }),
            invalidatesTags: ["Liabilities"],
        }),
        deleteLiability: builder.mutation({
            query: (id) => ({
                url: `liabilities/${id}`,
                method: "delete",
            }),
            invalidatesTags: ["Liabilities", "Payments"],
        }),
        // === === ===
        // Orders
        createOrder: builder.mutation({
            query: (values) => ({
                url: "orders",
                method: "post",
                data: values,
            }),
            invalidatesTags: ["Orders"],
        }),
        readOrder: builder.query({
            query: (id) => ({
                url: `orders/${id}`,
                method: "get",
            }),
            transformResponse: transformOrder,
            providesTags: ["Orders"],
        }),
        readOrders: builder.query({
            query: () => ({
                url: "orders",
                method: "get",
            }),
            transformResponse: transformOrders,
            providesTags: ["Orders"],
        }),
        readAssetOrders: builder.query({
            query: (id) => ({
                url: "orders",
                method: "get",
                params: { assetId: id },
            }),
            transformResponse: transformOrders,
            providesTags: ["Orders"],
        }),
        updateOrder: builder.mutation({
            query: ({ id, ...values }) => ({
                url: `orders/${id}`,
                method: "put",
                data: values,
            }),
            invalidatesTags: ["Orders"],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `orders/${id}`,
                method: "delete",
            }),
            invalidatesTags: ["Orders"],
        }),
        // === === ===
        // Payments
        createPayment: builder.mutation({
            query: (values) => ({
                url: "payments",
                method: "post",
                data: values,
            }),
            invalidatesTags: ["Payments"],
        }),
        readPayment: builder.query({
            query: (id) => ({
                url: `payments/${id}`,
                method: "get",
            }),
            transformResponse: transformPayment,
            providesTags: ["Payments"],
        }),
        readPayments: builder.query({
            query: () => ({
                url: "payments",
                method: "get",
            }),
            transformResponse: transformPayments,
            providesTags: ["Payments"],
        }),
        readLiabilityPayments: builder.query({
            query: (id) => ({
                url: "payments",
                method: "get",
                params: { liabilityId: id },
            }),
            transformResponse: transformPayments,
            providesTags: ["Payments"],
        }),
        updatePayment: builder.mutation({
            query: ({ id, ...values }) => ({
                url: `payments/${id}`,
                method: "put",
                data: values,
            }),
            invalidatesTags: ["Payments"],
        }),
        deletePayment: builder.mutation({
            query: (id) => ({
                url: `payments/${id}`,
                method: "delete",
            }),
            invalidatesTags: ["Payments"],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints.
export const {
    // User
    useDeleteUserDataMutation,
    useDeleteUserAccountMutation,
    useSignOutMutation,
    // Accounts
    useCreateAccountMutation,
    useReadAccountQuery,
    useReadAccountsQuery,
    useUpdateAccountMutation,
    useDeleteAccountMutation,
    // Transactions
    useCreateTransactionMutation,
    useCreateTransactionsFromStatementsMutation,
    useReadTransactionQuery,
    useReadTransactionsQuery,
    useReadTransactionsInAccountQuery,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,
    // Contributions
    useCreateContributionMutation,
    useReadContributionsQuery,
    useLikeContributionMutation,
    useUnlikeContributionMutation,
    useReportContributionMutation,
    useReadReportsQuery,
    useReadLikesQuery,
    // Budgets
    useCreateBudgetMutation,
    useDeleteBudgetMutation,
    useUpdateBudgetMutation,
    useReadBudgetQuery,
    // Assets
    useCreateAssetMutation,
    useReadAssetQuery,
    useReadAssetsQuery,
    useUpdateAssetMutation,
    useDeleteAssetMutation,
    // Liabilities
    useCreateLiabilityMutation,
    useReadLiabilityQuery,
    useReadLiabilitiesQuery,
    useUpdateLiabilityMutation,
    useDeleteLiabilityMutation,
    // Orders
    useCreateOrderMutation,
    useReadOrderQuery,
    useReadOrdersQuery,
    useReadAssetOrdersQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    // Payments
    useCreatePaymentMutation,
    useReadPaymentQuery,
    useReadPaymentsQuery,
    useReadLiabilityPaymentsQuery,
    useUpdatePaymentMutation,
    useDeletePaymentMutation,
} = api;
