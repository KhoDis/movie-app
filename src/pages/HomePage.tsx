import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';

function HomePage() {
  // const [filters, setFilters] = useState({});

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" gutterBottom>
          Movie App
        </Typography>
      </Box>
    </Container>
  );
}

export default HomePage;
