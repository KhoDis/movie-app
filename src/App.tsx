import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import {
  AppBar,
  Box,
  Button, Container,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import MovieDetailPage from "./pages/MovieDetailPage.tsx";

function ButtonAppBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ my: 2 }}
              onClick={() => navigate(`/`)}
            >
              <MovieIcon fontSize="large"/>
            </IconButton>
            <Typography variant="h4" component="h4" m={2} sx={{ flexGrow: 1 }}>
              Movie App
            </Typography>
            <Button color="inherit" onClick={() => navigate("/favorites")}>Favorites</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

function App() {
  return (
    <>
      <Router>
        <ButtonAppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
