import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (info) => ({
        url: "/user/update",
        method: "PATCH",
        data: info,
      }),
      invalidatesTags: ["User"],
    }),
    getAllUser: builder.query({
      query: (params) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["All Users"],
    }),
    getAllAgents: builder.query({
      query: (info) => ({
        url: `/agent/suspend-agent/${info}`,
        method: "GET",
       
      }),
      providesTags: ["All Agent"],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/wallet/block-wallet/${id}`,
        method: "PATCH",
       
      }),
      invalidatesTags: ["All Users"],
    }),


  }),
});

export const { useUpdateProfileMutation,useGetAllUserQuery,useBlockUserMutation} = userApi;
