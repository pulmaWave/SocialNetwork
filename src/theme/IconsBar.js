import { React, useEffect, useState } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PedalBikeOutlinedIcon from '@mui/icons-material/PedalBikeOutlined';
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import FastFoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import FastFoodIcon from '@mui/icons-material/Fastfood';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import { Box, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link, useLocation } from 'react-router-dom';
import colors from '../assets/style/GlobalStyles';

const color = colors.colors;
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mb: 480,
      md: 600,
      large: 1440
    }
  }
});

const IconsBar = (props) => {
  const classes = {
    color: `${props.color}`,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const iconBtActive = {
    borderRadius: 'unset',
    padding: '15px',
    [theme.breakpoints.down('md')]: {
      padding: '10px'
    },
    borderBottom: `3px solid ${props.color}`,
    [theme.breakpoints.down('mb')]: {
      borderBottom: 'unset',
      borderTop: `3px solid ${props.color}`
    },
    width: '25%'
  };
  const iconBt = {
    borderRadius: 'unset',
    padding: '18px',
    [theme.breakpoints.down('md')]: {
      padding: '10px'
    },
    borderBottom: '3px solid transparent',
    [theme.breakpoints.down('mb')]: {
      borderBottom: 'unset',
      borderTop: '3px solid transparent'
    },
    width: '25%'
  };

  const location = useLocation();
  const route = ['/', '/travel', '/food', '/beauty'];

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        maxWidth: '600px',
        [theme.breakpoints.down('large')]: {
          maxWidth: 500
        }
      }}
    >
      {location.pathname === route[0] ? (
        <IconButton sx={iconBtActive}>
          <Link to="/" style={classes}>
            <HomeIcon />
          </Link>
        </IconButton>
      ) : (
        <IconButton sx={iconBt}>
          <Link to="/" style={classes}>
            <HomeOutlinedIcon />
          </Link>
        </IconButton>
      )}
      {location.pathname === route[1] ? (
        <IconButton sx={iconBtActive}>
          <Link to="/travel" style={classes}>
            <TwoWheelerOutlinedIcon />
          </Link>
        </IconButton>
      ) : (
        <IconButton sx={iconBt}>
          <Link to="/travel" style={classes}>
            <PedalBikeOutlinedIcon />
          </Link>
        </IconButton>
      )}
      {location.pathname === route[2] ? (
        <IconButton sx={iconBtActive}>
          <Link to="/food" style={classes}>
            <FastFoodIcon />
          </Link>
        </IconButton>
      ) : (
        <IconButton sx={iconBt}>
          <Link to="/food" style={classes}>
            <FastFoodOutlinedIcon />
          </Link>
        </IconButton>
      )}
      {location.pathname === route[3] ? (
        <IconButton sx={iconBtActive}>
          <Link to="/beauty" style={classes}>
            <AutoFixHighIcon />
          </Link>
        </IconButton>
      ) : (
        <IconButton sx={iconBt}>
          <Link to="/beauty" style={classes}>
            <AutoFixHighOutlinedIcon />
          </Link>
        </IconButton>
      )}
    </Box>
  );
};

export default IconsBar;
