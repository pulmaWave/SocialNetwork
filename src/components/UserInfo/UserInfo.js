import React from 'react';
import avatar from '../../assets/images/avt.jpg';
import { Box, Typography } from '@mui/material';

const UserInfo = () => {
  return (
    <Box sx={{ marginBottom: '10px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            borderRadius: '50%',
            ':hover': {
              cursor: 'pointer',
              boxShadow: 4
            }
          }}
        >
          <img
            src={avatar}
            alt="profile images"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50px',
              display: 'flex',
              objectFit: 'cover'
            }}
          />
        </Box>
        <Typography
          sx={{
            fontWeight: 'bold',
            marginLeft: '10px',
            cursor: 'pointer',
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Nguyen Cong Thinh
        </Typography>
      </Box>
    </Box>
  );
};

export default UserInfo;