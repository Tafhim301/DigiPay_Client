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
  }),
});

export const { useGetAllUsersQuery } = AgentApi;
