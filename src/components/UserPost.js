import React from 'react';
import { Box, Typography } from '@mui/material';

import avatar from '../assets/images/avt.jpg';

const UserPost = () => {
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
            width: '42px',
            height: '42px'
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
          Nguyen Cong Thinh
        </Typography>
        <Typography variant="subtitle2" component="div">
          10 hours ago
        </Typography>
      </Box>
    </Box>
  );
};

export default UserPost;
