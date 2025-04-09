import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = 'http://localhost:8000/api/v1';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL, // Change this to your actual backend base URL
  }),
  headers: {
    'Content-Type': 'application/json',
  },
  tagTypes: ['Document'],
  endpoints: () => ({}),
});
