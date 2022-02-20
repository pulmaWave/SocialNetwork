import React from 'react';
import { Box, Typography } from '@mui/material';
import avatar from '../assets/images/avt.jpg';

const UserPost = () => {
  const displayName = localStorage.getItem('userName');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          borderRadius: '50%',
          cursor: 'pointer',
          ':hover': {
            boxShadow: 4
          }
        }}
      >
        <img
          src={avatar}
          alt="avatar pictures"
          style={{
            borderRadius: '50%',
            display: 'flex',
            objectFit: 'cover',
            width: '50px',
            height: '50px'
          }}
        />
      </Box>
      <Box sx={{ marginLeft: '10px' }}>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            fontWeight: 'bold',
            cursor: 'pointer',
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          {displayName ? displayName : 'User name is loading'}
        </Typography>
        <Typography variant="subtitle2" component="div">
          10 hours ago
        </Typography>
      </Box>
    </Box>
  );
};

export default UserPost;
