import React from 'react';

import AppBar from '../../components/NavBar/AppBar';
import Main from '../../components/Main/Main';
import IconBar from '../../theme/IconsBar';
import Box from '@mui/material/Box';

const homepage = () => {
  return (
    <Box>
      <Box sx={{ marginBottom: '65px' }}>
        <AppBar />
      </Box>
      <Box>
        <Main />
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          left: 0
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            display: { xs: 'block', md: 'none' }
          }}
        >
          <IconBar />
        </Box>
      </Box>
    </Box>
  );
};

export default homepage;
