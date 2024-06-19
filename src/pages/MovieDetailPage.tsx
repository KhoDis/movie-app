import { Box, Container, Grid, Rating, Stack, Typography } from "@mui/material";
import { useGetMovieByIdQuery } from "../redux/api.ts";
import { useParams } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton.tsx";

function MovieDetailPage() {
  const { id } = useParams();
  const { data: movie, error, isLoading } = useGetMovieByIdQuery(id!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong: {JSON.stringify(error)}</div>;
  }

  if (!movie) {
    return <div>Something went wrong. Reload the page</div>;
  }

  return (
    <Container>
      <Stack direction="row" p={2} spacing={2}>
        {movie.poster && (
          <img
            src={movie.poster.url}
            alt={movie.name}
            style={{ width: "300px", height: "auto" }}
          />
        )}
        <Stack spacing={2}>
          <Box>
            <Typography variant="h4" component="h1">
              {movie.name ?? movie.alternativeName ?? movie.enName}
            </Typography>
            <Typography variant="h6" component="h2">
              {movie.alternativeName}
            </Typography>
          </Box>

          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Typography>Add to favorites</Typography>
            <FavoriteButton movie={movie} color={"black"} />
          </Stack>

          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              About Movie
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography>Description</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{movie.description ?? "-"}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>Release Date</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{movie.year}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>Genres</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>
                  {movie.genres.map((x) => x.name).join(", ")}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>Rating</Typography>
              </Grid>
              <Grid item xs={9}>
                <Rating
                  name="half-rating"
                  defaultValue={movie.rating.imdb || movie.rating.kp}
                  precision={0.5}
                  readOnly
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

export default MovieDetailPage;
