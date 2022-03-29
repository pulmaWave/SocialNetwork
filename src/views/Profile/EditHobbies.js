import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import colors from '../../assets/style/GlobalStyles';
import EditIcon from '../../components/icons/PencilSvg';
import HomeSvg from '../../components/icons/HomeSvg';
import HeartSvg from '../../components/icons/HeartSvg';
import WatchSvg from '../../components/icons/WatchSvg';

const color = colors.colors;

const EditHobbies = () => {
  const btnEditProfile = {
    mt: '10px',
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

  const tag = {
    fontSize: '15px',
    fontWeight: 'bold',
    m: '4px 5px',
    color: `${color.color}`,
    padding: '5px 13px',
    border: `0.5px solid ${color.btnBgColor}`,
    borderRadius: '50px',
    fontStyle: 'italic'
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        <Typography component="div">
          <Box sx={tag}>Futsal</Box>
        </Typography>
        <Typography component="div">
          <Box sx={tag}>Badminton</Box>
        </Typography>
        <Typography component="div">
          <Box sx={tag}>Coding</Box>
        </Typography>
        <Typography component="div">
          <Box sx={tag}>Volleyball</Box>
        </Typography>
        <Typography component="div">
          <Box sx={tag}>Photography</Box>
        </Typography>
        <Typography component="div">
          <Box sx={tag}>Listen to music</Box>
        </Typography>
        <Typography component="div">
          <Box sx={tag}>Film</Box>
        </Typography>
      </Box>
      <Button sx={btnEditProfile}>
        <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
          <EditIcon fill={color.white} size={16} />
        </Box>
        Edit hobbies
      </Button>
    </Box>
  );
};

export default EditHobbies;
