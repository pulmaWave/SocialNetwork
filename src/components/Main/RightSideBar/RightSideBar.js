import React from 'react';
import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Ads from '../SideBar/Ads';
import ListFriend from './ListFriend';
import colors from '../../../assets/style/GlobalStyles';

const RightSideBar = () => {
  return (
    <Box
      sx={{
        p: '40px 10px 10px 10px',
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
      <Divider
        sx={{
          m: '5px',
          visibility: 'visible'
        }}
      />
      <Box sx={{ visibility: 'visible' }}>
        <ListFriend />
      </Box>
    </Box>
  );
};

export default RightSideBar;
