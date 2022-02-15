import React from 'react';
import PostTravel from './PostTravel';
import { Box } from '@mui/material';

const ListPostTravel = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        mt: '30px',
        paddingBottom: '20px'
      }}
    >
      <PostTravel />
      <PostTravel />
      <PostTravel />
      <PostTravel />
    </Box>
  );
};

export default ListPostTravel;
