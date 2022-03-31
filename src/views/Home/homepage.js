import React from 'react';
import AppBar from '../../components/NavBar/AppBar';
import Main from '../../components/Main/Main';
import IconsBar from '../../theme/IconsBar';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import colors from '../../assets/style/GlobalStyles';

const color = colors.colors;

const theme = createTheme({
  breakpoints: {
    values: {
      mb: 480,
      md: 900
    }
  }
});

const homepage = () => {
  return (
    <Box>
      <Box sx={{ marginBottom: '65px' }}>
        <AppBar />
      </Box>
      <Box>
        <Main />
      </Box>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            boxShadow:' 0 -1px 1px -1px gray',
            boxSizing: 'border-box',
            width: '100%',
            position: 'fixed',
            bottom: 0,
            left: 0,
            display: 'none',
            backgroundColor: 'white',
            justifyContent: 'center',
            [theme.breakpoints.down('mb')]: {
              display: 'flex'
            }
          }}
        >
          <IconsBar colorActive={`${color.main}`} color={`${color.gray[600]}`} />
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default homepage;
