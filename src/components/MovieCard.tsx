import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { MovieDto } from "../api.ts";

function MovieCard({ movie }: { movie: MovieDto }) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/movie/${movie.id}`)}>
      {/*{JSON.stringify(movie)}*/}
      {movie.poster && <CardMedia component="img" image={movie.poster.previewUrl} />}
      <CardContent>
        <Typography variant="h5">{movie.name}</Typography>
        <Typography variant="body2">{movie.year}</Typography>
        <Typography variant="body2">Rating: {movie.rating.kp}, {movie.rating.imdb}</Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
