import { useState } from "react";
import { Container, Box } from "@mui/material";
import MovieList from "../components/MovieList.tsx";
import Filter from "../components/Filter.tsx";
import { FilterConfig } from "../types.ts";

function HomePage() {
  const [filters, setFilters] = useState<FilterConfig>({
    genres: [],
    rating: [0, 10],
    year: [1990, new Date().getFullYear()],
  });

  const handleFilterChange = (newFilters: FilterConfig) => {
    setFilters(newFilters);
  };

  return (
    <Container>
      <Box my={4}>
        <Filter onFilterChange={handleFilterChange} />
        <MovieList filters={filters} />
      </Box>
    </Container>
  );
}

export default HomePage;
