import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import MovieList from "../components/MovieList.tsx";

function HomePage() {
  // const [filters, setFilters] = useState({});

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" gutterBottom>
          Movie App
        </Typography>
        <MovieList filters={{}}/>
      </Box>
    </Container>
  );
}

export default HomePage;
