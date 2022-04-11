import React from 'react';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Box, Typography } from '@mui/material';
import colors from '../../../assets/style/GlobalStyles';

const color = colors.colors;

const Friend = () => {
  return (
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
  );
};

export default Friend;
