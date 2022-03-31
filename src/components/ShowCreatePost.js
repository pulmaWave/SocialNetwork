import { Box } from '@mui/material';
import React from 'react';
import ModalPostEditor from './ModalPostEditor';
import { createTheme } from '@mui/material/styles';

import userImg from '../assets/images/avt.jpg';
import color from '../assets/style/GlobalStyles';

const theme = createTheme({
  breakpoints: {
    values: {
      mb: 480,
      md: 900
    }
  }
});

const ShowCreatePost = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        border: `${color.colors.gray[100]} 1px solid`,
        borderRadius: '5px',
        [theme.breakpoints.down('mb')]: {
          borderRadius: 'unset',
          height: 'fit-content'
        },
        p: '10px 15px',
        boxShadow: 1,
        backgroundColor: `${color.colors.white}`,
        maxWidth: 500,
        boxSizing: 'border-box'
      }}
    >
      <Box>
        <img
          src={userImg}
          alt="user images"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '100%',
            display: 'flex',
            objectFit: 'cover'
          }}
        />
      </Box>
      <ModalPostEditor />
    </Box>
  );
};

export default ShowCreatePost;
