import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  React.useEffect(() => {
    if (query === "") {
      onSearch("latest");
    }
  }, [query]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ".css-1u3bzj6-MuiFormControl-root-MuiTextField-root": {
          width: "70%",
        },
      }}
      mt={2}
      mb={2}
    >
      <TextField
        label="Search articles"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <CloseIcon fontSize="small" onClick={() => setQuery("")} />
          ),
        }}
      />
      <Button onClick={handleSearch}>Search</Button>
    </Box>
  );
};

export default SearchBar;
