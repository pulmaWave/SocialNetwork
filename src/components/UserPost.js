import React from 'react';
import { Box, Typography } from '@mui/material';
import avatar from '../assets/images/avt.jpg';
import colors from '../assets/style/GlobalStyles';
import EarthSvg from '../components/icons/EarthSvg';

const color = colors.colors;

const UserPost = (time) => {
  const displayName = localStorage.getItem('userName');
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
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
            width: '40px',
            height: '40px'
          }}
        />
      </Box>
      <Box sx={{ marginLeft: '10px' }}>
        <Typography
          component="div"
          sx={{
            textTransform: 'capitalize',
            fontWeight: 'bold',
            cursor: 'pointer',
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          <Box sx={{ fontSize: 15 }}>
            {displayName ? displayName : 'User name is loading'}
          </Box>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component="div">
            <Box sx={{ fontSize: 13, color: `${color.gray[500]}`, mr: '5px' }}>
              {time.time}
            </Box>
          </Typography>
          <EarthSvg fill={color.icons} size={12} />
        </Box>
      </Box>
    </Box>
  );
};

export default UserPost;
