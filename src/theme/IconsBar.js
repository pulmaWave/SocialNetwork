import { React, useEffect, useState } from 'react';
import HomeSvg from '../components/icons/HomeSvg';
import PlainSvg from '../components/icons/PlainSvg';
import SeedingSvg from '../components/icons/SeedingSvg';
import Food from '../components/icons/FoodSvg';

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
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const iconBtActive = {
    color: `${props.colorActive}`,
    borderRadius: 'unset',
    padding: '15px',
    [theme.breakpoints.down('md')]: {
      padding: '10px'
    },
    borderBottom: `3px solid ${props.colorActive}`,
    [theme.breakpoints.down('mb')]: {
      borderBottom: 'unset',
      borderTop: `3px solid ${props.colorActive}`
    },
    width: '25%'
  };
  const iconBt = {
    color: `${props.color}`,
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
            <HomeSvg fill={props.colorActive} size="24" />
          </Link>
        </IconButton>
      ) : (
        <IconButton sx={iconBt}>
          <Link to="/" style={classes}>
            <HomeSvg fill={props.color} size="24" />
          </Link>
        </IconButton>
      )}
      {location.pathname === route[1] ? (
        <IconButton sx={iconBtActive}>
          <Link to="/travel" style={classes}>
            <PlainSvg fill={props.colorActive} size="24" />
          </Link>
        </IconButton>
      ) : (
        <IconButton sx={iconBt}>
          <Link to="/travel" style={classes}>
            <PlainSvg fill={props.color} size="24" />
          </Link>
        </IconButton>
      )}
      {location.pathname === route[2] ? (
        <IconButton sx={iconBtActive}>
          <Link to="/food" style={classes}>
            <Food fill={props.colorActive} size="24" />
          </Link>
        </IconButton>
      ) : (
        <IconButton sx={iconBt}>
          <Link to="/food" style={classes}>
            <Food fill={props.color} size="24" />
          </Link>
        </IconButton>
      )}
      {location.pathname === route[3] ? (
        <IconButton sx={iconBtActive}>
          <Link to="/beauty" style={classes}>
            <SeedingSvg fill={props.colorActive} size="24" />
          </Link>
        </IconButton>
      ) : (
        <IconButton sx={iconBt}>
          <Link to="/beauty" style={classes}>
            <SeedingSvg fill={props.color} size="24" />
          </Link>
        </IconButton>
      )}
    </Box>
  );
};

export default IconsBar;
