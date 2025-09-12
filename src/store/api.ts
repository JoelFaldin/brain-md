import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendApi = import.meta.env.VITE_BACKEND_URL

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    googleBackendOAuth: builder.mutation({
      query: ({ token }) => ({
        url: `${backendApi}/auth/google`,
        method: "POST",
        body: { token }
      }),
    }),
    createNote: builder.mutation({
      query: ({ title, content, email }) => ({
        url: `${backendApi}/notes`,
        method: "POST",
        body: { title, content, userEmail: email }
      }),
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `${backendApi}/notes/${id}`,
        method: "DELETE",
      }),
    }),
    updateNoteTitle: builder.mutation({
      query: ({ newTitle, noteId }) => ({
        url: `${backendApi}/notes/${noteId}`,
        method: "PATCH",
        body: { title: newTitle }
      }),
    })
  })
})

export const { useGoogleBackendOAuthMutation, useCreateNoteMutation, useDeleteNoteMutation, useUpdateNoteTitleMutation } = api