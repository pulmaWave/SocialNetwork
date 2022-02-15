import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import SideBar from './SideBar/SideBar';
import RightSideBar from './RightSideBar/RightSideBar';
import colors from '../../assets/style/GlobalStyles';

const color = colors.colors;

const main = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 30px ',
        backgroundColor: `${color.gray[100]}`
      }}
    >
      <Box sx={{ width: 400 }}>
        <Box sx={{ position: 'fixed', width: 'inherit' }}>
          <SideBar />
        </Box>
      </Box>
      <Outlet />
      <Box sx={{ width: 400 }}>
        <Box sx={{ position: 'fixed', width: 'inherit' }}>
          <RightSideBar />
        </Box>
      </Box>
    </Box>
  );
};

export default main;
