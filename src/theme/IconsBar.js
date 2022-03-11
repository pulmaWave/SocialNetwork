import React from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FlightIcon from '@mui/icons-material/Flight';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import colors from '../assets/style/GlobalStyles';

const color = colors.colors;

const IconsBar = () => {
  return (
    <Box
      sx={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }}
    >
      <IconButton color="error">
        <Link to="/" style={{ color: `${color.gray[500]}` }}>
          <AccountBalanceIcon sx={{ width: '40px', height: '40px' }} />
        </Link>
      </IconButton>
      <IconButton>
        <Link to="travel" style={{ color: `${color.gray[500]}` }}>
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
        <Link to="food" style={{ color: `${color.gray[500]}` }}>
          <RestaurantIcon sx={{ width: '40px', height: '40px' }} />
        </Link>
      </IconButton>
      <IconButton>
        <Link to="beauty" style={{ color: `${color.gray[500]}` }}>
          <AutoFixHighIcon sx={{ width: '40px', height: '40px' }} />
        </Link>
      </IconButton>
    </Box>
  );
};

export default IconsBar;
