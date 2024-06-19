import { ReactNode, useState } from "react";
import { Box, Button, Chip, Divider, Slider, Stack, Typography } from "@mui/material";
import { useGetGenresQuery } from "../redux/api.ts";
import { FilterConfig } from "../types.ts";

function FilterOption({
                        title,
                        children
                      }: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Stack direction="column">
      <Typography variant="subtitle1" gutterBottom>{title}</Typography>
      <Box>
        {children}
      </Box>
    </Stack>
  );
}

function Filter({
                  defaultValues,
                  onFilterChange,
    onClose
                }: {
  defaultValues: FilterConfig;
  onFilterChange: (filters: FilterConfig) => void;
  onClose: () => void;
}) {
  const [pickedGenres, setPickedGenres] = useState<string[]>(defaultValues.genres);
  const [rating, setRating] = useState<[number, number]>(defaultValues.rating);
  const [year, setYear] = useState<[number, number]>(defaultValues.year);

  const { data: genres, error, isLoading } = useGetGenresQuery();

  const handleFilterChange = () => {
    onFilterChange({ genres: pickedGenres, rating, year });
    onClose();
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
    <Stack direction="column"
           divider={<Divider orientation="horizontal" flexItem />}
           spacing={2}>
      {isLoading ? (
        <Typography>Loading genres...</Typography>
      ) : error ? (
        <Typography color="error">Error: {JSON.stringify(error)}</Typography>
      ) : (
        <FilterOption title="Genres">
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
        </FilterOption>
      )}

      <FilterOption title="Rating">
        <Box px={2}>
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
              { value: 10, label: "10" }
            ]}
          />
        </Box>
      </FilterOption>

      <FilterOption title="Year">
        <Box px={2}>
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
                label: new Date().getFullYear().toString()
              }
            ]}
          />
        </Box>
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
