// import React, { useState } from "react";

// interface SearchProps {
//   onSearch: (searchTerm: string) => void;
// }

// const Search: React.FC<SearchProps> = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   const handleSearch = () => {
//     onSearch(searchTerm);
//   };

//   return (
//     <div>
//       <h2>Пошук серед завантажених постів</h2>
//       <input
//         type="text"
//         placeholder="Введіть термін пошуку"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={handleSearch}>Пошук</button>
//     </div>
//   );
// };
// export default Search;

import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Box mt={3} sx={{ mb: "10px" }}>
      <Typography variant="h6" gutterBottom>
        Пошук за назвою поста
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={9}>
          <TextField
            label="Введіть назву поста"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            fullWidth
            sx={{ height: "56px" }}
            onClick={handleSearch}
          >
            Пошук
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
