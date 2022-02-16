import { Box } from '@mui/material';
import React from 'react';
import ModalPostEditor from './ModalPostEditor';

import userImg from '../assets/images/avt.jpg';
import color from '../assets/style/GlobalStyles';

const ShowCreatePost = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '600px',
        border: `${color.colors.gray[100]} 1px solid`,
        borderRadius: '5px',
        p: '10px',
        boxShadow: 1,
        backgroundColor: `${color.colors.white}`
      }}
    >
      <Box>
        <img
          src={userImg}
          alt="user images"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50px',
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
