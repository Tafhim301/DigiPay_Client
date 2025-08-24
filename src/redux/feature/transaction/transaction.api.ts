import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ownTransaction: builder.query({
      query: (params) => ({
        url: "/transaction/own-transactions",
        method: "GET",
        params
      }),
      providesTags: ["Transaction"],
    }),
    topUp: builder.mutation({
      query: (topUp) => ({
        url: "/transaction/top-up",
        method: "POST",
        data: topUp
      }),
      invalidatesTags: ["Wallet","User","Transaction"],
    }),
    sendMoney: builder.mutation({
      query: (info) => ({
        url: "/transaction/send-money",
        method: "POST",
        data: info
      }),
      invalidatesTags: ["Wallet","User","Transaction"],
    }),
    cashOut: builder.mutation({
      query: (info) => ({
        url: "/transaction/cash-out",
        method: "POST",
        data: info
      }),
      invalidatesTags: ["Wallet","User","Transaction"],
    }),
    withdrawATM: builder.mutation({
      query: (info) => ({
        url: "/transaction/withdraw-money",
        method: "POST",
        data: info
      }),
      invalidatesTags: ["Wallet","User","Transaction"],
    }),
    transactions: builder.query({
      query: () => ({
        url: "/transaction/all-transactions",
        method: "GET",
      
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const { useOwnTransactionQuery, useTopUpMutation ,useSendMoneyMutation, useCashOutMutation, useWithdrawATMMutation,useTransactionsQuery} = transactionApi;
