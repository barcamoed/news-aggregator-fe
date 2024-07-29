import React from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

const sourcesOptions = [
  { value: 'nytimes', label: 'New York Times' },
  { value: 'guardian', label: 'The Guardian' },
  { value: 'verge', label: 'The Verge' },
  // Add other sources as needed
];

const categoriesOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'sports', label: 'Sports' },
  { value: 'business', label: 'Business' },
  // Add other categories as needed
];

const authorsOptions = [
  { value: 'author1', label: 'Author 1' },
  { value: 'author2', label: 'Author 2' },
  { value: 'author3', label: 'Author 3' },
  // Add other authors as needed
];

const Preferences = ({ preferences, setPreferences, savePreferences }) => {
  const handleSourceChange = (event) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      preferredSources: event.target.value,
    }));
  };

  const handleCategoryChange = (event) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      preferredCategories: event.target.value,
    }));
  };

  const handleAuthorChange = (event) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      preferredAuthors: event.target.value,
    }));
  };

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexDirection: 'column' }}>
      <TextField
        label="Preferred Sources"
        select
        SelectProps={{
          multiple: true,
          value: preferences.preferredSources,
          onChange: handleSourceChange,
        }}
        style={{ minWidth: '150px' }}
      >
        {sourcesOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Preferred Categories"
        select
        SelectProps={{
          multiple: true,
          value: preferences.preferredCategories,
          onChange: handleCategoryChange,
        }}
        style={{ minWidth: '150px' }}
      >
        {categoriesOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Preferred Authors"
        select
        SelectProps={{
          multiple: true,
          value: preferences.preferredAuthors,
          onChange: handleAuthorChange,
        }}
        style={{ minWidth: '150px' }}
      >
        {authorsOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={savePreferences}>
        Save Preferences
      </Button>
    </div>
  );
};

export default Preferences;
