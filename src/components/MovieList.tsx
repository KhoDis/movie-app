import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Grid, Pagination, Box, Typography } from '@mui/material';
import { useGetMoviesQuery } from "../api.ts";

interface MovieListProps {
  filters: any;
}

function MovieList({ filters }) {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetMoviesQuery({ page, filters });

  useEffect(() => {
    setPage(1);
  }, [filters]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {data?.docs.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            {JSON.stringify(movie)}
            {/*<MovieCard movie={movie} />*/}
          </Grid>
        ))}
      </Grid>
      {/*<Box mt={4} display="flex" justifyContent="center">*/}
      {/*  <Pagination*/}
      {/*    count={data?.totalPages}*/}
      {/*    page={page}*/}
      {/*    onChange={(_, value) => setPage(value)}*/}
      {/*  />*/}
      {/*</Box>*/}
    </Box>
  );
}

export default MovieList;
