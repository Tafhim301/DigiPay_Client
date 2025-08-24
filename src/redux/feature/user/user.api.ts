import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
   updateProfile : builder.mutation({
      query: (info) => ({
        url: "/user/update",
        method: "PATCH",
        data: info
      }),
      invalidatesTags: ["User"],
    }),
    
  }),
});

export const { useUpdateProfileMutation} = transactionApi;
