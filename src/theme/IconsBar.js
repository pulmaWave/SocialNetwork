import React from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FlightIcon from '@mui/icons-material/Flight';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Box, IconButton } from '@mui/material';

const IconsBar = () => {
  return (
    <Box
      sx={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}
    >
      <IconButton color="error">
        <AccountBalanceIcon sx={{ width: '40px', height: '40px' }} />
      </IconButton>
      <IconButton>
        <FlightIcon
          sx={{
            width: '40px',
            height: '40px',
            transform: 'rotate(45deg)'
          }}
        />
      </IconButton>
      <IconButton>
        <RestaurantIcon sx={{ width: '40px', height: '40px' }} />
      </IconButton>
      <IconButton>
        <AutoFixHighIcon sx={{ width: '40px', height: '40px' }} />
      </IconButton>
    </Box>
  );
};

export default IconsBar;
