import React from 'react';
import { Box, Typography } from '@mui/material';
import ads from '../../../assets/images/ads.jpg';
import colors from '../../../assets/style/GlobalStyles';

const color = colors.colors;

const Ads = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        p: '7px',
        borderRadius: '6px',
        cursor: 'pointer',
        ':hover': { bgcolor: `${color.btnBgColor}` }
      }}
    >
      <Box
        sx={{
          marginRight: '10px',
          cursor: 'pointer',
          bgcolor: `${color.white}`,
          borderRadius: '7px',
          width: '100px',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img
          style={{ objectFit: 'cover', display: 'flex' }}
          src={ads}
          alt="advertise images"
          width={'100px'}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Typography sx={{ fontSize: '15px' }}>Penthouse in Dalat</Typography>
        <Typography
          sx={{
            fontSize: '13px',
            color: `${color.gray[400]}`
          }}
        >
          dallas.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Ads;
