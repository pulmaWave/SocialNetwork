import React from 'react';
import { Box } from '@mui/material';

import UserInfo from '../../UserInfo/UserInfo';
import Friend from './Friend';
import Save from './Save';
import ListAds from './ListAds';
import colors from '../../../assets/style/GlobalStyles';

const SideBar = () => {
  return (
    <Box
      sx={{
        p: '40px 20px 10px 0',
        height: 'calc(100vh - 112px)',
        overflow: 'auto',
        visibility: 'hidden',
        overscrollBehaviorY: 'contain',
        ':hover': {
          visibility: 'visible'
        },
        '::-webkit-scrollbar': {
          width: '10px'
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: `${colors.colors.gray[200]}`
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: `${colors.colors.gray[400]}`,
          borderRadius: '10px'
        }
      }}
    >
      <Box sx={{ visibility: 'visible' }}>
        <UserInfo />
      </Box>
      <Box sx={{ visibility: 'visible' }}>
        <Friend />
      </Box>
      <Box sx={{ visibility: 'visible' }}>
        <Save />
      </Box>
      <Box
        sx={{
          borderBottom: `1px solid ${colors.colors.gray[500]}`,
          marginBottom: '20px',
          visibility: 'visible'
        }}
      />
      <Box sx={{ visibility: 'visible' }}>
        <ListAds />
      </Box>
    </Box>
  );
};

export default SideBar;
