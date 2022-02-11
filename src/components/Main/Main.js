import React from 'react';
import { Box } from '@mui/material';
import SideBar from './SideBar/SideBar';
import RightSideBar from './RightSideBar/RightSideBar';
import Post from './Post';

const main = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 30px '
      }}
    >
      <Box sx={{ width: 400 }}>
        <Box sx={{ position: 'fixed', width: 'inherit' }}>
          <SideBar />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          mt: '30px',
          paddingBottom: '20px'
        }}
      >
        <Post />
        <Post />
        <Post />
        <Post />
      </Box>
      <Box sx={{ width: 400 }}>
        <Box sx={{ position: 'fixed', width: 'inherit' }}>
          <RightSideBar />
        </Box>
      </Box>
    </Box>
  );
};

export default main;
