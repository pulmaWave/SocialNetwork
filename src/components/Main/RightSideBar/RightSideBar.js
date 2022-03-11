import React from 'react';
import { Box, Typography } from '@mui/material';

import Ads from '../SideBar/Ads';
import ListFollowing from './ListFollowing';
import colors from '../../../assets/style/GlobalStyles';

const RightSideBar = () => {
  return (
    <Box
      sx={{
        p: '40px 0 10px 40px',
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
        <Typography variant="caption">Sponsored</Typography>
        <Ads />
      </Box>
      <Box
        sx={{
          borderBottom: `1px solid ${colors.colors.gray[500]}`,
          marginBottom: '20px',
          visibility: 'visible'
        }}
      />
      <Box sx={{ visibility: 'visible' }}>
        <ListFollowing />
      </Box>
    </Box>
  );
};

export default RightSideBar;
