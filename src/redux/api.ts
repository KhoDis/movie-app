import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FilterConfig } from "../types.ts";

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

export type MovieDocsResponseDto = {
  docs: MovieDto[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};

export type MovieDto = {
  id: string;
  name: string;
  alternativeName: string;
  enName: string;
  type:
    | "movie"
    | "tv-series"
    | "cartoon"
    | "anime"
    | "animated-series"
    | "tv-show";
  year: number;
  description: string;
  rating: RatingDto;
  genres: GenreDto[];
  poster: ShortImage;
};

type GenreDto = {
  name: string;
  slug: string;
};

export type RatingDto = {
  kp: number;
  imdb: number;
};

export type ShortImage = {
  url: string;
  previewUrl: string;
};

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.kinopoisk.dev/v1.4/",
    prepareHeaders: (headers) => {
      headers.set("X-API-KEY", API_KEY as string);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<
      MovieDocsResponseDto,
      { page: number; filters: FilterConfig }
    >({
      query: ({ page, filters }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", "50");
        filters.genres.forEach((genre) => {
          params.append("genres.name", genre);
        });
        params.append("rating.kp", filters.rating.join("-"));
        params.append("year", filters.year.join("-"));
        return `movie?${params.toString()}`;
      },
    }),
    getMovieById: builder.query<MovieDto, string>({
      query: (id) => `movie/${id}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieByIdQuery } = movieApi;

export const valuesApi = createApi({
  reducerPath: "valuesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.kinopoisk.dev/v1/movie/",
    prepareHeaders: (headers) => {
      headers.set("X-API-KEY", API_KEY as string);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGenres: builder.query<GenreDto[], void>({
      query: () => `possible-values-by-field?field=genres.name`,
    }),
  }),
});

export const { useGetGenresQuery } = valuesApi;
