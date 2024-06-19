import { ChangeEvent, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Grid, Pagination, Stack, Typography } from "@mui/material";
import { useGetMoviesQuery } from "../redux/api.ts";
import { FilterConfig } from "../types.ts";

function MovieList({ filters }: { filters: FilterConfig }) {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetMoviesQuery({ page, filters });

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const handleChangePage = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {JSON.stringify(error)}</Typography>;
  }

  if (!data) {
    return <Typography>Something went wrong, reload the page</Typography>;
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Pagination count={data.pages} page={page} onChange={handleChangePage} />
      <Grid container spacing={2}>
        {data.docs.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            {/*{JSON.stringify(movie)}*/}
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Pagination count={data.pages} page={page} onChange={handleChangePage} />
    </Stack>
  );
}

export default MovieList;
