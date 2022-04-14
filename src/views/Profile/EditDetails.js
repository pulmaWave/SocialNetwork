import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import colors from '../../assets/style/GlobalStyles';
import EditIcon from '../../components/icons/PencilSvg';
import HomeSvg from '../../components/icons/HomeSvg';
import HeartSvg from '../../components/icons/HeartSvg';
import WatchSvg from '../../components/icons/WatchSvg';

const color = colors.colors;

const EditDetails = (check) => {
  const btnEditProfile = {
    fontSize: '15px',
    fontWeight: 'bold',
    width: '100%',
    p: '5px 10px',
    color: `${color.white}`,
    bgcolor: `${color.main}`,
    textTransform: 'unset',
    ':hover': {
      backgroundColor: `${color.mainHover}`
    }
  };

  const component = {
    display: 'flex',
    alignItems: 'center',
    mb: 1,
    p: '8px 0 8px 0'
  };

  return (
    <Box>
      <Typography component="div" variant="body" sx={component}>
        <HomeSvg fill={color.main} size={20} />
        <Box
          sx={{
            color: `${color.color}`,
            display: 'flex',
            ml: 1,
            fontSize: 15
          }}
        >
          Live in{' '}
          <Box sx={{ fontWeight: 'bold', ml: '5px' }}>Ho Chi Minh City</Box>
        </Box>
      </Typography>
      <Typography component="div" variant="body" sx={component}>
        <HeartSvg fill={color.main} size={20} />
        <Box
          sx={{
            color: `${color.color}`,
            display: 'flex',
            ml: 1,
            fontSize: 15
          }}
        >
          Single
        </Box>
      </Typography>
      <Typography component="div" variant="body" sx={component}>
        <WatchSvg fill={color.main} size={20} />
        <Box
          sx={{
            color: `${color.color}`,
            display: 'flex',
            ml: 1,
            fontSize: 15
          }}
        >
          Joined November 2012
        </Box>
      </Typography>
      {check.check && (
        <Button sx={btnEditProfile}>
          <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
            <EditIcon fill={color.white} size={16} />
          </Box>
          Edit details
        </Button>
      )}
    </Box>
  );
};

export default EditDetails;
