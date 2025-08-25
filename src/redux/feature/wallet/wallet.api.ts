import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userWallet: builder.query({
      query: () => ({
        url: "/wallet/my-wallet",
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
    GetWalletSummary: builder.query({
      query: () => ({
        url: "/wallet/wallet-summary",
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
  }),
});

export const { useUserWalletQuery, useGetWalletSummaryQuery } = walletApi;
