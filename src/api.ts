import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

export type MovieDocsResponseDto = {
  docs: MovieDto[],
  total: number,
  limit: number,
  page: number,
  pages: number,
}

export type MovieDto = {
  id: string,
  name: string,
  type: 'movie' | 'tv-series' | 'cartoon' | 'anime' | 'animated-series' | 'tv-show',
  year: number,
  description: string,
  rating: RatingDto,
  genres: string[],
  poster: ShortImage,
}

export type RatingDto = {
  kp: number,
  imdb: number,
}

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
    getMovies: builder.query<MovieDocsResponseDto, { page: number, filters: any }>({
      query: ({ page, filters }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '50',
          ...filters,
        });
        return `movie?${params.toString()}`;
      },
    }),
    getMovieById: builder.query<MovieDto, string>({
      query: (id) => `movie/${id}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieByIdQuery } = movieApi;
