import React from "react";
import { TextField, MenuItem, Button, Box } from "@mui/material";

const Filters = ({
  filters,
  setFilters,
  fetchArticles,
  fetchInitialArticles,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      source: "all",
      category: "",
      dateFrom: "",
      dateTo: "",
    });
    fetchInitialArticles();
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "30px",
        marginBottom: "20px",
        alignItem: "center",
        justifyContent: "center",
      }}
    >
      <TextField
        label="Source"
        name="source"
        select
        value={filters.source}
        onChange={handleInputChange}
        style={{ minWidth: "150px" }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="nytimes">New York Times</MenuItem>
        <MenuItem value="guardian">The Guardian</MenuItem>
        <MenuItem value="verge">The Verge</MenuItem>
      </TextField>
      <TextField
        label="Category"
        name="category"
        value={filters.category}
        onChange={handleInputChange}
        style={{ minWidth: "150px" }}
      />
      <TextField
        label="Date From"
        name="dateFrom"
        type="date"
        value={filters.dateFrom}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Date To"
        name="dateTo"
        type="date"
        value={filters.dateTo}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" onClick={fetchArticles}>
        Apply Filters
      </Button>
      <Button variant="contained" onClick={clearFilters}>
        Clear filters
      </Button>
    </Box>
  );
};

export default Filters;
