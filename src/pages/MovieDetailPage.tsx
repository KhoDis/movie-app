import { Container, Typography, Box, Rating, Stack, Grid } from "@mui/material";
import { useGetMovieByIdQuery } from "../redux/api.ts";
import { useParams } from "react-router-dom";

function MovieDetailPage() {
  const {id} = useParams();
  const { data: movie, error, isLoading } = useGetMovieByIdQuery(id!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong: {JSON.stringify(error)}</div>
  }

  if (!movie) {
    return <div>Something went wrong. Reload the page</div>
  }

  return (
    <Container>
      <Stack direction="row" p={2} spacing={2}>
        <img src={movie.poster.url} alt={movie.name} style={{ width: "300px", height: "auto" }} />
        <Stack spacing={2}>
          <Box>
            <Typography variant="h4" component="h1">{movie.name}</Typography>
            <Typography variant="h6" component="h2">{movie.alternativeName}</Typography>
          </Box>

          <Box>
            <Typography variant="h6" component="h3" gutterBottom>About Movie</Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography>Description</Typography>
              </Grid>
              <Grid item xs={9}>
                {movie.description ?? "-"}
              </Grid>
              <Grid item xs={3}>
                <Typography>Release Date</Typography>
              </Grid>
              <Grid item xs={9}>
                {movie.year}
              </Grid>
              <Grid item xs={3}>
                <Typography>Genres</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{movie.genres.map(x => x.name).join(", ")}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>Rating</Typography>
              </Grid>
              <Grid item xs={9}>
                <Rating
                  name="half-rating"
                  defaultValue={movie.rating.imdb}
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
