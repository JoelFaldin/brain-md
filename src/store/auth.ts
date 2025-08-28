import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendApi = import.meta.env.VITE_BACKEND_URL

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    googleBackendOAuth: builder.mutation({
      query: ({ token }) => ({
        url: backendApi,
        method: "POST",
        body: { token }
      }),
    }),
  })
})

export const { useGoogleBackendOAuthMutation } = authApi