import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { AuthInterface } from "@/interfaces/AuthInterface";

const backendApi = import.meta.env.VITE_BACKEND_URL
const googleApi = import.meta.env.VITE_GOOGLE_BACKEND

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    googleBackendOAuth: builder.mutation<{ response: string, token: string }, AuthInterface>({
      query: ({ email, name }) => ({
        url: backendApi,
        method: "POST",
        body: { email, name }
      }),
    }),
    googleOAuth: builder.mutation({
      query: (token) => ({
        url: googleApi,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    })
  })
})

export const { useGoogleBackendOAuthMutation, useGoogleOAuthMutation } = authApi