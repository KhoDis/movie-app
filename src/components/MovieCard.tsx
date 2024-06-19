import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { MovieDto } from "../api.ts";
import { BrokenImage } from "@mui/icons-material";

function MovieCard({ movie }: { movie: MovieDto }) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/movie/${movie.id}`)}>
      <Box sx={{ position: "relative" }}>
        {movie.poster ? (
          <CardMedia
            component="img"
            image={movie.poster.previewUrl}
            sx={{ height: 400 }}
          />
        ) : (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: 400 }}
          >
            <BrokenImage fontSize="large" />
            No available preview
          </Stack>
        )}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            bgcolor: "rgba(0, 0, 0, 0.54)",
            color: "white",
            padding: "10px",
          }}
        >
          <Rating
            name="half-rating"
            defaultValue={movie.rating.imdb}
            precision={0.5}
            readOnly
          />
        </Box>
      </Box>
      <CardContent>
        <Typography variant="h5" noWrap>
          {movie.name ?? movie.alternativeName ?? movie.enName}
        </Typography>
        <Typography variant="body2">{movie.year}</Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
