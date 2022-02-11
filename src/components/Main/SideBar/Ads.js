import React from 'react';
import { Box, Typography } from '@mui/material';
import ads from '../../../assets/images/ads.jpg';
import colors from '../../../assets/style/GlobalStyles';

const color = colors.colors;

const Ads = () => {
  return (
    <Box sx={{ display: 'flex', marginBottom: '10px' }}>
      <Box sx={{ marginRight: '10px', cursor: 'pointer' }}>
        <img
          style={{ borderRadius: '8px' }}
          src={ads}
          alt="advertise images"
          width={'150px'}
          height={'75px'}
        />
      </Box>
      <Box>
        <Typography sx={{ marginBottom: '10px' }}>Penthouse</Typography>
        <Typography
          sx={{
            fontSize: '14px',
            color: `${color.gray[400]}`,
            ':hover': {
              cursor: 'pointer',
              textDecoration: 'underline'
            }
          }}
        >
          dallas.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Ads;
