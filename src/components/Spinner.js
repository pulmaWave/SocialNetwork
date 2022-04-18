import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', py: '10px', justifyContent: 'center' }}>
      <CircularProgress sx={{ width: '35px', height: '35px' }} />
    </Box>
  );
}
