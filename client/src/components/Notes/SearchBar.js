import { TextField, Box } from '@mui/material';

const SearchBar = ({ search, setSearch }) => (
  <Box sx={{ mb: 2, maxWidth: 320, mx: 'auto' }}>
    <TextField
      label="Search notes"
      value={search}
      onChange={e => setSearch(e.target.value)}
      fullWidth
    />
  </Box>
);

export default SearchBar;
