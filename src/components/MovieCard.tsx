import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { MovieDto } from "../redux/api.ts";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  addFavorite,
  removeFavorite,
} from "../redux/features/favoritesSlice.ts";
import { Poster } from "./Poster.tsx";

function MovieCard({ movie }: { movie: MovieDto }) {
  const favorites = useAppSelector(
    (state) => state.persistedReducer.favorites.movies,
  );
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    const isFavoriteMovie = favorites.find(
      (favorite) => favorite.id === movie.id,
    );
    return !!isFavoriteMovie;
  });
  const navigate = useNavigate();

  const handleFavorites = (e: React.MouseEvent<HTMLElement>) => {
    if (!isFavorite) {
      dispatch(addFavorite(movie));
      setIsFavorite((prev) => !prev);
    } else {
      dispatch(removeFavorite(movie.id));
      setIsFavorite((prev) => !prev);
    }
    e.preventDefault();
  };

  return (
    <Card>
      <Box sx={{ position: "relative" }}>
        <Poster poster={movie.poster} />
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          py={1}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            bgcolor: "rgba(0, 0, 0, 0.54)",
            color: "white",
          }}
        >
          <Rating
            name="half-rating"
            defaultValue={movie.rating.imdb}
            precision={0.5}
            readOnly
          />
          {isFavorite ? (
            <FavoriteIcon onClick={handleFavorites} />
          ) : (
            <FavoriteBorderIcon onClick={handleFavorites} />
          )}
        </Stack>
      </Box>
      <CardContent onClick={() => navigate(`/movie/${movie.id}`)}>
        <Typography variant="h5" noWrap>
          {movie.name ?? movie.alternativeName ?? movie.enName}
        </Typography>
        <Typography variant="body2">{movie.year}</Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
