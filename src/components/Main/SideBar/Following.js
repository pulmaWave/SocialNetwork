import React from 'react';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Box, Typography } from '@mui/material';

const Following = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px'
      }}
    >
      <SupervisedUserCircleIcon
        sx={{
          width: '32px',
          height: '32px',
          marginRight: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          ':hover': {
            boxShadow: 3
          }
        }}
      />
      <Typography
        sx={{
          cursor: 'pointer',
          ':hover': {
            textDecoration: 'underline'
          }
        }}
      >
        Following
      </Typography>
    </Box>
  );
};

export default Following;
