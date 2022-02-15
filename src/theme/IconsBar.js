import React from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FlightIcon from '@mui/icons-material/Flight';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const IconsBar = () => {
  return (
    <Box
      sx={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}
    >
      <IconButton color="error">
        <Link to="/">
          <AccountBalanceIcon sx={{ width: '40px', height: '40px' }} />
        </Link>
      </IconButton>
      <IconButton>
        <Link to="travel">
          <FlightIcon
            sx={{
              width: '40px',
              height: '40px',
              transform: 'rotate(45deg)'
            }}
          />
        </Link>
      </IconButton>
      <IconButton>
        <Link to="food">
          <RestaurantIcon sx={{ width: '40px', height: '40px' }} />
        </Link>
      </IconButton>
      <IconButton>
        <Link to="beauty">
          <AutoFixHighIcon sx={{ width: '40px', height: '40px' }} />
        </Link>
      </IconButton>
    </Box>
  );
};

export default IconsBar;
