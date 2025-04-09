import { apiSlice } from "../../app/api/apiSlice";

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDocument: builder.mutation({
      query: () => ({
        url: "/documents",
        method: "POST",
      }),
      invalidatesTags: ["Document"],
    }),

    updateDocument: builder.mutation({
      query: ({ id, title, description }) => ({
        url: `/documents-update/${id}`,
        method: "PUT",
        body: { title, description },
      }),
      invalidatesTags: ["Document"],
    }),

    deleteDcoument: builder.mutation({
      query: ({ id }) => ({
        url: `/documents-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Document"],
    }),


    getDocuments: builder.query({
      query: () => `/documents`,
      providesTags: ["Document"],
    }),

    getDocumentById: builder.query({
      query: (taskId) => `/documents/${taskId}`,
      providesTags: ["Document"],
    }),
  }),
});

export const {
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDcoumentMutation,
  useGetDocumentsQuery,
  useGetDocumentByIdQuery,
} = todoApiSlice;
