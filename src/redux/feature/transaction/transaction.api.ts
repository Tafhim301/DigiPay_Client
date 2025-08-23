import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ownTransaction: builder.query({
      query: () => ({
        url: "/transaction/own-transactions",
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    topUp: builder.mutation({
      query: (topUp) => ({
        url: "/transaction/top-up",
        method: "POST",
        data: topUp
      }),
      invalidatesTags: ["Wallet","User"],
    }),
  }),
});

export const { useOwnTransactionQuery, useTopUpMutation } = transactionApi;
