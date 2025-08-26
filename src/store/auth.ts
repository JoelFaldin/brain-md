import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { AuthInterface } from "@/interfaces/AuthInterface";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  endpoints: (builder) => ({
    googleOAuth: builder.mutation<AuthInterface, string>({
      query: (token) => ({
        url: "/auth/google",
        method: "POST",
        body: { token: `Bearer ${token}` }
      }),
    })
  })
})

export const { useGoogleOAuthMutation } = authApi