import React from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Box, Typography } from '@mui/material';

const Save = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <CloudDownloadIcon
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
        Save
      </Typography>
    </Box>
  );
};

export default Save;
