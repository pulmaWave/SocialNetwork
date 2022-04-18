import * as React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

export default function Variants() {
  return (
    <Stack spacing={0.5}>
      <Box sx={{ display: 'flex', p: 1 }}>
        <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1 }} />
        <Skeleton variant="text" width={150} height={16}/>
      </Box>
    </Stack>
  );
}
