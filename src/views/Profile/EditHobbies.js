import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import colors from '../../assets/style/GlobalStyles';
import EditIcon from '../../components/icons/PencilSvg';

const color = colors.colors;

const EditHobbies = (check) => {
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

  const tag = {
    fontSize: '15px',
    fontWeight: 'bold',
    m: '4px 5px',
    color: `${color.color}`,
    padding: '5px 13px',
    border: `0.5px solid ${color.btnBgColor}`,
    borderRadius: '50px'
  };

  return (
    <Box>
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
      {check.check && (
        <Button sx={btnEditProfile}>
          <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
            <EditIcon fill={color.white} size={16} />
          </Box>
          Edit hobbies
        </Button>
      )}
    </Box>
  );
};

export default EditHobbies;
