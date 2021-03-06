import React from 'react';
import { createTheme } from '@mui/material/styles';

import { Box } from '@mui/material';
import user1 from '../assets/images/1.jpg';
import user2 from '../assets/images/ads.jpg';
import user3 from '../assets/images/face1.jpeg';
import user4 from '../assets/images/face2.jpeg';
import user5 from '../assets/images/face3.jpg';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mb: 480,
      m900: 900,
      large: 1440
    }
  }
});

const box = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  cursor: 'pointer'
};

const wrapper = {
  display: 'flex',
  width: '100%',
  mt: '15px',
  [theme.breakpoints.down('m900')]: {
    justifyContent: 'center'
  }
};

const ShowFriendIcons = () => {
  return (
    <Box sx={wrapper}>
      <Box sx={box}>
        <img
          src={user1}
          alt="1"
          style={{ width: '32px', height: '32px', borderRadius: '50%' }}
        />
      </Box>
      <Box sx={box}>
        <img
          src={user1}
          alt="1"
          style={{ width: '32px', height: '32px', borderRadius: '50%' }}
        />
      </Box>
      <Box sx={box}>
        <img
          src={user2}
          alt="1"
          style={{ width: '32px', height: '32px', borderRadius: '50%' }}
        />
      </Box>
      <Box sx={box}>
        <img
          src={user3}
          alt="1"
          style={{ width: '32px', height: '32px', borderRadius: '50%' }}
        />
      </Box>
      <Box sx={box}>
        <img
          src={user4}
          alt="1"
          style={{ width: '32px', height: '32px', borderRadius: '50%' }}
        />
      </Box>
      <Box sx={box}>
        <img
          src={user5}
          alt="1"
          style={{ width: '32px', height: '32px', borderRadius: '50%' }}
        />
      </Box>
    </Box>
  );
};

export default ShowFriendIcons;
