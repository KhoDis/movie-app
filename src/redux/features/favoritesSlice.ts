import { MovieDto } from "../api.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  movies: MovieDto[];
}

const initialState: FavoriteState = {
  movies: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (
      state: FavoriteState,
      action: PayloadAction<MovieDto>
    ) => {
      const existingMovie = state.movies.find(
        (movie) => movie.id === action.payload.id
      );

      if (!existingMovie) {
        state.movies.push(action.payload);
      }
    },
    removeFavorite: (
      state: FavoriteState,
      action: PayloadAction<number>
    ) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;