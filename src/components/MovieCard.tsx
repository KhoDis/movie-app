import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Rating, Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addFavorite, removeFavorite } from "../redux/features/favoritesSlice";
import { Poster } from "./Poster";
import { MovieDto } from "../redux/api";

type MovieCardProps = {
  movie: MovieDto;
};

function MovieCard({ movie }: MovieCardProps) {
  const favorites = useAppSelector((state) => state.persistedReducer.favorites.movies);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const isFavoriteMovie = favorites.some((favorite) => favorite.id === movie.id);
    setIsFavorite(isFavoriteMovie);
  }, [favorites, movie.id]);

  const handleFavorites = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const { poster, rating, name, alternativeName, enName, year } = movie;

  return (
    <Card>
      <Box sx={{ position: "relative" }}>
        <Poster poster={poster} />
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
            color: "white"
          }}
        >
          <Rating name="half-rating" defaultValue={rating.imdb} precision={0.5} readOnly />
          {isFavorite ? (
            <FavoriteIcon onClick={handleFavorites} sx={{ cursor: "pointer" }} />
          ) : (
            <FavoriteBorderIcon onClick={handleFavorites} sx={{ cursor: "pointer" }} />
          )}
        </Stack>
      </Box>
      <CardContent onClick={handleCardClick} sx={{ cursor: "pointer" }}>
        <Typography variant="h5" noWrap>
          {name ?? alternativeName ?? enName}
        </Typography>
        <Typography variant="body2">{year}</Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
