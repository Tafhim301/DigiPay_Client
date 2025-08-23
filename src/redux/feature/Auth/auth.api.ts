import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
        invalidatesTags : ["User"]
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags : ["User"]
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
        providesTags : ["User"]
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags : ["User"]
    }),
    validatePassword: builder.mutation({
      query: (password) => ({
        url: "/user/validate-password",
        method: "POST",
        data : password
      }),

    }),
  }),
});

export const {
  useRegisterMutation,

  useLoginMutation,

  useUserInfoQuery,
  useLogoutMutation,
  useValidatePasswordMutation
} = authApi;
