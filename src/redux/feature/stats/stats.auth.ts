import { baseApi } from "@/redux/baseApi";

export const satsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    transactionStats: builder.query({
      query: () => ({
        url: "/stats/transaction-stats",
        method: "GET",
      }),
        providesTags : ["Stats"]
    }),


  }),
});

export const {
    useTransactionStatsQuery


} = satsApi;
