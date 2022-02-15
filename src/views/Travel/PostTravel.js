import React from 'react';
// import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Typography } from '@mui/material';
import {
  LocalFireDepartment,
  Sms,
  WifiProtectedSetup
} from '@mui/icons-material';

import HaLongBay from '../../assets/images/vinhhalong.jpg';
import UserPost from '../../components/UserPost';
import colors from '../../assets/style/GlobalStyles';

const color = colors.colors;

const Post = () => {
  // const [bgColor, setBgColor] = useState('');

  // const handleClickButton = () => {
  //   setBgColor(`${color.gray[400]}`);
  // };

  return (
    <Box
      sx={{
        width: 600,
        border: `${color.gray[100]} 1px solid`,
        borderRadius: '5px',
        paddingBottom: '10px',
        boxShadow: 1,
        backgroundColor: `${color.white}`
      }}
    >
      <Box sx={{ p: '10px', marginBottom: '10px' }}>
        <UserPost />
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{ marginBottom: '10px', padding: '0 10px' }}
        >
          Vinh Ha Long - Viet Nam
        </Typography>
        <Box>
          <img src={HaLongBay} alt="Ha Long Bay images" width={'600px'} />
        </Box>
      </Box>
      <Box sx={{ p: '0 20px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: '10px 0'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ marginRight: 1 }}>
              <LocalFireDepartment sx={{ color: `${color.red[500]}` }} />
            </Box>
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: `${color.gray[500]}`,
                cursor: 'pointer',
                border: '1px solid transparent',
                ':hover': {
                  borderBottom: 1
                }
              }}
            >
              10.000
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 5 }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: `${color.gray[500]}`,
                cursor: 'pointer',
                border: '1px solid transparent',
                ':hover': {
                  borderBottom: `1px solid ${color.gray[500]}`
                }
              }}
            >
              1456 Comment
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: `${color.gray[500]}`,
                cursor: 'pointer',
                border: '1px solid transparent',
                ':hover': {
                  borderBottom: `1px solid ${color.gray[500]}`
                }
              }}
            >
              3421 Share
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: '5px 50px',
            m: '0 0 10px 0',
            borderTop: `1px solid ${color.gray[400]}`,
            borderBottom: `1px solid ${color.gray[400]}`
          }}
        >
          <Button
            sx={{
              width: '33%',
              color: 'unset',
              textTransform: 'unset',
              m: 'unset',
              p: '10px 0',
              ':hover': {
                backgroundColor: `${color.gray[200]}`
              }
            }}
          >
            <Box sx={{ marginRight: 1, display: 'flex', alignItems: 'center' }}>
              <LocalFireDepartment sx={{ color: `${color.red[500]}` }} />
            </Box>
            <Typography sx={{ display: 'block' }}>Vote</Typography>
          </Button>
          <Button
            sx={{
              width: '33%',
              color: 'unset',
              textTransform: 'unset',
              m: 'unset',
              p: '10px 0',
              ':hover': {
                backgroundColor: `${color.gray[200]}`
              }
            }}
          >
            <Box sx={{ marginRight: 1, display: 'flex', alignItems: 'center' }}>
              <Sms />
            </Box>
            <Typography>Comment</Typography>
          </Button>
          <Button
            sx={{
              display: 'unset',
              width: '33%',
              color: 'unset',
              textTransform: 'unset',
              m: 'unset',
              p: '10px 0',
              ':hover': {
                backgroundColor: `${color.gray[200]}`
              }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box
                sx={{ marginRight: 1, display: 'flex', alignItems: 'center' }}
              >
                <WifiProtectedSetup />
              </Box>
              <Typography>Share</Typography>
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
