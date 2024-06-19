import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Poster } from "./Poster";
import { MovieDto } from "../redux/api";
import FavoriteButton from "./FavoriteButton.tsx";

function MovieCard({ movie }: { movie: MovieDto }) {
  const navigate = useNavigate();

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
            color: "white",
          }}
        >
          <Rating
            name="half-rating"
            defaultValue={rating.imdb}
            precision={0.5}
            readOnly
          />
          <FavoriteButton movie={movie} />
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
