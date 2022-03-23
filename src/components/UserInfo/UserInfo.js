import * as React from 'react';
import avatar from '../../assets/images/avt.jpg';
import { Box, Typography } from '@mui/material';

const UserInfo = (props) => {
  const displayName = localStorage.getItem('userName');
  return (
    <Box sx={{ marginBottom: '10px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: props.paddingLeft ? props.paddingLeft : ''
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
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              objectFit: 'cover'
            }}
          />
        </Box>
        <Typography
          variant="body1"
          sx={{
            textTransform: 'capitalize',
            marginLeft: '10px',
            cursor: 'pointer',
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          {displayName ? displayName : 'User name is loading'}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserInfo;
