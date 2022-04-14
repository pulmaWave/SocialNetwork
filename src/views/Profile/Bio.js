import React from 'react';
import { Box, Button, Typography, Divider } from '@mui/material';
import colors from '../../assets/style/GlobalStyles';

const color = colors.colors;

const Bio = (check) => {
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
  return (
    <Box>
      <Typography component="div" variant="body">
        <Box
          sx={{
            color: `${color.color}`,
            textAlign: 'center',
            mb: 1,
            fontSize: 15
          }}
        >
          When?
        </Box>
      </Typography>
      {check.check && <Button sx={btnEditProfile}>Edit bio</Button>}
      <Divider />
    </Box>
  );
};

export default Bio;
