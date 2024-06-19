import { useState } from "react";
import {
  Box,
  Container,
} from "@mui/material";
import MovieList from "../components/MovieList.tsx";
import { FilterConfig } from "../types.ts";
import Filters from "./Filters.tsx";

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
        <Filters filters={filters} handleFilterChange={handleFilterChange} />
        <MovieList filters={filters} />
      </Box>
    </Container>
  );
}

export default HomePage;
