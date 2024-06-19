import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.kinopoisk.dev/v1.4/',
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', API_KEY as string);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<any, { page: number, filters: any }>({
      query: ({ page, filters }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '50',
          ...filters,
        });
        return `movie?${params.toString()}`;
      },
    }),
    getMovieById: builder.query<any, string>({
      query: (id) => `movie/${id}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieByIdQuery } = movieApi;
