import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addFavorite, removeFavorite } from "../redux/features/favoritesSlice";
import { MovieDto } from "../redux/api";
import { IconButton } from "@mui/material";

function FavoriteButton({
  movie,
  color = "white",
}: {
  movie: MovieDto;
  color?: string;
}) {
  const favorites = useAppSelector(
    (state) => state.persistedReducer.favorites.movies,
  );
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const isFavoriteMovie = favorites.some(
      (favorite) => favorite.id === movie.id,
    );
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

  return (
    <IconButton onClick={handleFavorites} sx={{ color: color }}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}

export default FavoriteButton;
