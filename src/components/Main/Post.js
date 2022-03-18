import { React, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  LocalFireDepartment,
  Sms,
  WifiProtectedSetup
} from '@mui/icons-material';

import UserPost from '../UserPost';
import colors from '../../assets/style/GlobalStyles';

const color = colors.colors;
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      md: 650
    }
  }
});

const Post = ({ content, url }) => {
  const [vote, setVote] = useState(false);
  const handleClickVote = () => {
    setVote(!vote);
    console.log('check vote: ', vote);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '90vw',
          maxWidth: 600,
          border: `${color.gray[100]} 1px solid`,
          borderRadius: '5px',
          paddingBottom: '10px',
          boxShadow: 1,
          backgroundColor: `${color.white}`
        }}
      >
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              p: '10px',
              marginBottom: '10px'
            }}
          >
            <UserPost />
          </Box>
        </ThemeProvider>
        <Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              marginBottom: '10px',
              padding: '0 10px',
              wordBreak: 'break-word'
            }}
          >
            {content}
          </Typography>
          {url && (
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  borderTop: `0.5px solid ${color.gray[300]}`,
                  display: 'flex',
                  justifyContent: 'center',
                  [theme.breakpoints.down('md')]: {
                    width: '90vw'
                  }
                }}
              >
                <img
                  src={url}
                  alt="images"
                  style={{
                    cursor: 'pointer',
                    maxWidth: '95%'
                  }}
                />
              </Box>
            </ThemeProvider>
          )}
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
              <Box sx={{ marginRight: '3px' }}>
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
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '5px',
                alignItems: 'center'
              }}
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
              m: '0 0 10px 0',
              borderTop: `1px solid ${color.gray[400]}`,
              borderBottom: `1px solid ${color.gray[400]}`
            }}
          >
            <Button
              onClick={handleClickVote}
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
              <Box
                sx={{
                  marginRight: '3px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
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
              <Box
                sx={{
                  marginRight: '3px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
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
                  sx={{
                    marginRight: '3px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <WifiProtectedSetup />
                </Box>
                <Typography>Share</Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Post;
