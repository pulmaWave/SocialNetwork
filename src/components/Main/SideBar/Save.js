import React from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Box, Typography } from '@mui/material';
import colors from '../../../assets/style/GlobalStyles';

const color = colors.colors;

const Save = () => {
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
      <CloudDownloadIcon
        sx={{
          width: '32px',
          height: '32px',
          marginRight: '10px',
          borderRadius: '50%'
        }}
      />
      <Typography component="div">
        <Box sx={{ fontSize: '15px' }}>Save</Box>
      </Typography>
    </Box>
  );
};

export default Save;
