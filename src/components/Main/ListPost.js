import React from 'react';
import Post from './Post';
import { Box } from '@mui/material';

const ListPost = () => {
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
      <Post />
      <Post />
      <Post />
      <Post />
    </Box>
  );
};

export default ListPost;
