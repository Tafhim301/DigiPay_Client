import { baseApi } from "@/redux/baseApi";

export const satsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    transactionStats: builder.query({
      query: (params) => ({
        url: "/stats/transaction-stats",
        method: "GET",
        params
      }),
        providesTags : ["Stats"]
    }),
    userStats: builder.query({
      query: (params) => ({
        url: "/stats/user-stats",
        method: "GET",
        params
      }),
        providesTags : ["Stats"]
    }),


  }),
});

export const {
    useTransactionStatsQuery,
    useUserStatsQuery


} = satsApi;
