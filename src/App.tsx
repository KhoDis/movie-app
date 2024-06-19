import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function ButtonAppBar() {
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
            >
              <MovieIcon fontSize="large"/>
            </IconButton>
            <Typography variant="h3" component="h3" m={2} sx={{ flexGrow: 1 }}>
              Movie App
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

function App() {
  return (
    <>
      <ButtonAppBar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/*<Route path="/movie/:id" element={<MovieDetailPage />} />*/}
        </Routes>
      </Router>
    </>
  );
}

export default App;
