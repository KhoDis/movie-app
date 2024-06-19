import { Box, Container, Grid, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard.tsx";
import { useAppSelector } from "../redux/hooks.ts";

export default function FavoritesPage() {
  const favorites = useAppSelector(
    (state) => state.persistedReducer.favorites.movies,
  );

  return (
    <Container>
      <Typography variant="h3">Favorites</Typography>
      <Box my={4}>
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
