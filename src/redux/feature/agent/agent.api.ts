import { baseApi } from "@/redux/baseApi";

export const AgentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),
    getAllAgentApplications: builder.query({
      query: (params) => ({
        url: "/agent/agent-applications",
        method: "GET",
        params,
      }),
      providesTags: ["Applicants"],
    }),
    approveAgentApplications: builder.mutation({
      query: (id) => ({
        url: `/agent/approve-agent/${id}`,
        method: "PATCH",
        
      }),
      invalidatesTags: ["Applicants"],
    }),
    rejectAgentApplications: builder.mutation({
      query: (id) => ({
        url: `/agent/reject-agent/${id}`,
        method: "PATCH",
        
      }),
      invalidatesTags: ["Applicants"],
    }),
    applyAgent: builder.mutation({
      query: () => ({
        url: "/agent/agent-application",
        method: "PATCH",
      
      }),
      invalidatesTags: ["User"],
    }),
    agentCashIn: builder.mutation({
      query: (data) => ({
        url: "/agent/cash-in-agent",
        method: "POST",
        data : data


      
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery , useApplyAgentMutation , useGetAllAgentApplicationsQuery,useApproveAgentApplicationsMutation,useRejectAgentApplicationsMutation , useAgentCashInMutation} = AgentApi;
