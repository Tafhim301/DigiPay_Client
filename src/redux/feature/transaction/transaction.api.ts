import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query({
      query: () => ({
        url: "/transaction/own-transactions",
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const { useUserInfoQuery } = transactionApi;
