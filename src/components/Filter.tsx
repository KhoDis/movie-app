import { ReactNode, useState } from "react";
import {
  Button,
  Slider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetGenresQuery } from "../api";
import { FilterConfig } from "../types.ts";

function FilterOption({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

function Filter({
  onFilterChange,
}: {
  onFilterChange: (filters: FilterConfig) => void;
}) {
  const [pickedGenres, setPickedGenres] = useState<string[]>([]);
  const [rating, setRating] = useState<[number, number]>([0, 10]);
  const [year, setYear] = useState<[number, number]>([
    1990,
    new Date().getFullYear(),
  ]);

  const { data: genres, error, isLoading } = useGetGenresQuery();

  const handleFilterChange = () => {
    onFilterChange({ genres: pickedGenres, rating, year });
  };

  const handleGenreClick = (selectedGenre: string) => {
    setPickedGenres((prevGenres) => {
      if (prevGenres.includes(selectedGenre)) {
        return prevGenres.filter((genre) => genre !== selectedGenre);
      } else {
        return [...prevGenres, selectedGenre];
      }
    });
  };

  return (
    <Stack>
      <FilterOption title="Genres">
        {isLoading ? (
          <Typography>Loading genres...</Typography>
        ) : error ? (
          <Typography color="error">Error: {JSON.stringify(error)}</Typography>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {genres?.map((genre) => (
              <Chip
                key={genre.name}
                label={genre.name}
                variant={
                  pickedGenres.includes(genre.name) ? "filled" : "outlined"
                }
                onClick={() => handleGenreClick(genre.name)}
                color={
                  pickedGenres.includes(genre.name) ? "primary" : "default"
                }
                clickable
              />
            ))}
          </Box>
        )}
      </FilterOption>

      <FilterOption title="Rating">
        <Slider
          getAriaLabel={(index) =>
            index === 0 ? "Minimum rating" : "Maximum rating"
          }
          value={rating}
          onChange={(_, value) => setRating(value as [number, number])}
          valueLabelDisplay="auto"
          min={0}
          max={10}
          marks={[
            { value: 0, label: "0" },
            { value: 10, label: "10" },
          ]}
        />
      </FilterOption>

      <FilterOption title="Year">
        <Slider
          getAriaLabel={(index) =>
            index === 0 ? "Minimum year" : "Maximum year"
          }
          value={year}
          onChange={(_, value) => setYear(value as [number, number])}
          valueLabelDisplay="auto"
          min={1990}
          max={new Date().getFullYear()}
          marks={[
            { value: 1990, label: "1990" },
            {
              value: new Date().getFullYear(),
              label: new Date().getFullYear().toString(),
            },
          ]}
        />
      </FilterOption>

      <Stack direction="row" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterChange}
        >
          Apply Filters
        </Button>
      </Stack>
    </Stack>
  );
}

export default Filter;
