import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SideBar from './SideBar/SideBar';
import RightSideBar from './RightSideBar/RightSideBar';
import colors from '../../assets/style/GlobalStyles';

const color = colors.colors;
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mb: 480,
      rightBarNone: 950,
      sideBarNone: 1230
    }
  }
});
const main = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: {
            xs: 'center'
          },
          [theme.breakpoints.up('sideBarNone')]: {
            justifyContent: 'space-between'
          },
          padding: '0 30px ',
          [theme.breakpoints.down('mb')]: {
            padding: 'unset'
          },
          backgroundColor: `${color.bgcolor}`
        }}
      >
        <ThemeProvider theme={theme}>
          <Box
            sx={{ display: { xs: 'none', sideBarNone: 'block', width: 300 } }}
          >
            <Box sx={{ position: 'fixed', width: 'inherit' }}>
              <SideBar />
            </Box>
          </Box>
        </ThemeProvider>
        <Outlet />
        <ThemeProvider theme={theme}>
          <Box
            sx={{ display: { xs: 'none', rightBarNone: 'block', width: 300 } }}
          >
            <Box sx={{ position: 'fixed', width: 'inherit' }}>
              <RightSideBar />
            </Box>
          </Box>
        </ThemeProvider>
      </Box>
    </ThemeProvider>
  );
};

export default main;
