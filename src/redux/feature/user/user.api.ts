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
      query: () => ({
        url: `/agent/all-agents`,
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
    suspendAgent: builder.mutation({
      query: (id) => ({
        url: `/agent/suspend-agent/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["All Agent"],
    }),
    approveAgent: builder.mutation({
      query: (id) => ({
        url: `/agent/approve-agent/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["All Agent"],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetAllUserQuery,
  useGetAllAgentsQuery,
  useBlockUserMutation,
  useSuspendAgentMutation,
  useApproveAgentMutation
} = userApi;
