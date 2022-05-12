import React from 'react';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Box, Typography } from '@mui/material';
import colors from '../../../assets/style/GlobalStyles';
import { Link } from 'react-router-dom';

const color = colors.colors;
const uid = localStorage.getItem('uid');

const Friend = () => {
  return (
    <Link
      to={`/profile=${uid}/friends`}
      style={{ textDecoration: 'none', color: 'unset' }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '5px',
          p: '6px',
          ':hover': {
            bgcolor: `${color.btnBgColor}`,
            cursor: 'pointer'
          }
        }}
      >
        <SupervisedUserCircleIcon
          sx={{
            width: '32px',
            height: '32px',
            marginRight: '10px',
            borderRadius: '50%'
          }}
        />
        <Typography component="div">
          <Box sx={{ fontSize: '15px' }}>Friends</Box>
        </Typography>
      </Box>
    </Link>
  );
};

export default Friend;
