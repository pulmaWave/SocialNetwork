import * as React from 'react';
import { Box, Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import colors from '../assets/style/GlobalStyles';

const color = colors.colors;

export default function CustomizedInputBase() {
  return (
    <Box sx={{ display: 'flex', p: '15px 15px 15px 0' }}>
      <IconButton>
        <ChevronLeftIcon />
      </IconButton>
      <Paper
        component="form"
        sx={{
          width: '100%',
          borderRadius: '25px',
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          bgcolor: `${color.gray[100]}`
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Something"
          inputProps={{ 'aria-label': 'search something' }}
        />
        <IconButton type="submit" sx={{ p: '7px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
