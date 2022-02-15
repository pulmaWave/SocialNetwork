import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

import AppBar from '../../components/NavBar/AppBar';
import Main from '../../components/Main/Main';
import Box from '@mui/material/Box';

const homepage = () => {
  return (
    <Box>
      <Box sx={{ marginBottom: '80px' }}>
        <AppBar />
      </Box>
      <Box>
        <Main />
      </Box>
    </Box>
  );
};

export default homepage;