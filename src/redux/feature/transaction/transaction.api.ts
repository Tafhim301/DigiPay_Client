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
    sendMoney: builder.mutation({
      query: (info) => ({
        url: "/transaction/send-money",
        method: "POST",
        data: info
      }),
      invalidatesTags: ["Wallet","User"],
    }),
    cashOut: builder.mutation({
      query: (info) => ({
        url: "/transaction/cash-out",
        method: "POST",
        data: info
      }),
      invalidatesTags: ["Wallet","User"],
    }),
    withdrawATM: builder.mutation({
      query: (info) => ({
        url: "/transaction/withdraw-money",
        method: "POST",
        data: info
      }),
      invalidatesTags: ["Wallet","User"],
    }),
  }),
});

export const { useOwnTransactionQuery, useTopUpMutation ,useSendMoneyMutation, useCashOutMutation, useWithdrawATMMutation} = transactionApi;
