import React from 'react';
import { Box, Typography } from '@mui/material';
import Ads from './Ads';

const ListAds = () => {
  return (
    <Box sx={{ paddingBottom: '20px' }}>
      <Typography variant='caption'>Sponsored</Typography>
      <Ads />
      <Ads />
      <Ads />
      <Ads />
      <Ads />
      <Ads />
      <Ads />
      <Ads />
      <Ads />
      <Ads />
      <Ads />
      <Ads />
    </Box>
  );
};

export default ListAds;
