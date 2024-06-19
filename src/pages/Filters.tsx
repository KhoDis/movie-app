import { FilterConfig } from "../types.ts";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Filter from "../components/Filter.tsx";

function FilterDialog({
  open,
  onClose,
  handleFilterChange,
  defaultValues,
}: {
  open: boolean;
  onClose: () => void;
  handleFilterChange: (filters: FilterConfig) => void;
  defaultValues: FilterConfig;
}) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Configure Filter</DialogTitle>
      <DialogContent>
        <Filter
          onFilterChange={handleFilterChange}
          defaultValues={defaultValues}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default function Filters({
  filters,
  handleFilterChange,
}: {
  filters: FilterConfig;
  handleFilterChange: (filters: FilterConfig) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Typography gutterBottom>
        Current filters:{" "}
        {filters.genres.length > 0 && filters.genres.join(", ") + ", "} rating:{" "}
        {filters.rating[0]}-{filters.rating[1]}, year: {filters.year[0]}-
        {filters.year[1]}
      </Typography>
      <Button
        variant="outlined"
        startIcon={<FilterAltIcon />}
        onClick={() => handleClickOpen()}
      >
        Configure
      </Button>
      <FilterDialog
        open={open}
        onClose={handleClose}
        handleFilterChange={handleFilterChange}
        defaultValues={filters}
      />
    </Stack>
  );
}
