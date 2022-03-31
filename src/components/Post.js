import { React, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import {
  CheckBoxOutlineBlank,
  LocalFireDepartment,
  Sms,
  WifiProtectedSetup
} from '@mui/icons-material';

import UserPost from './UserPost';
import colors from '../assets/style/GlobalStyles';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getDocById } from '../utilities/utilities';

const color = colors.colors;
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mb: 480,
      md: 650,
      large: 1440
    }
  }
});

const voted = { color: `${color.main}` };
const none = { color: `${color.gray[500]}` };

const btnPost = {
  width: '33%',
  color: 'unset',
  textTransform: 'unset',
  m: '5px 0',
  p: '5px 0',
  ':hover': {
    backgroundColor: `${color.gray[200]}`
  }
};

const verticalAlign = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const mrIcons = {
  marginRight: '3px',
  display: 'flex',
  alignItems: 'center'
};

const uid = localStorage.getItem('uid');

const Post = ({
  content,
  url,
  checkVote,
  comment,
  tags,
  id,
  voteBy,
  counterVote
}) => {
  const [vote, setVote] = useState();
  const [counterVotePost, setCounterVotePost] = useState();
  const contentRef = doc(db, 'posts', id);
  useEffect(() => {
    getDocById('posts', id).then(async (data) => {
      const counterVote = data.voteBy.length;
      const voted = await data.voteBy.some((value) => value === uid);
      setVote(voted);
      setCounterVotePost(counterVote);
    });
  }, []);

  const handleClickVote = async () => {
    const data = await getDocById('posts', id);
    const counterVote = data.voteBy.length;
    setCounterVotePost(counterVote);
    // check uid (user) vote yet?
    const voted = await data.voteBy.some((value) => value === uid);

    // update vote and counter vote of post
    if (!voted) {
      await updateDoc(contentRef, {
        voteBy: arrayUnion(uid),
        counterVote: counterVote + 1
      });
      setVote(!vote);
      const data = await getDocById('posts', id);
      setCounterVotePost(data.counterVote);
    } else {
      await updateDoc(contentRef, {
        voteBy: arrayRemove(uid),
        counterVote: counterVote - 1
      });
      setVote(!vote);
      const data = await getDocById('posts', id);
      setCounterVotePost(data.counterVote);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: 600,
          [theme.breakpoints.down('large')]: {
            width: 500,
            maxWidth: '90vw'
          },
          border: `${color.gray[100]} 1px solid`,
          borderRadius: '5px',
          [theme.breakpoints.down('mb')]: {
            borderRadius: 'unset',
            maxWidth: '99vw'
          },
          paddingBottom: '10px',
          boxShadow: 1,
          backgroundColor: `${color.white}`
        }}
      >
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              p: '12px 15px'
            }}
          >
            <UserPost />
          </Box>
        </ThemeProvider>
        <Box>
          <Typography
            component="div"
            sx={{
              marginBottom: '10px',
              padding: '0 15px',
              wordBreak: 'break-word'
            }}
          >
            <Box sx={{ fontSize: 15 }}>{content}</Box>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px',
              mb: '10px',
              color: `${color.sky[800]}`
            }}
          >
            <LocalOfferIcon sx={{ width: '18px', height: '18px', mr: '3px' }} />
            <Typography>:</Typography>
            <Box
              sx={{
                display: 'flex'
              }}
            >
              {tags.length > 0 &&
                tags.map((tag, index) => {
                  return (
                    <Typography
                      key={index}
                      component="div"
                      sx={{
                        ml: '10px',
                        bgcolor: `${color.main}`,
                        color: `${color.white}`,
                        padding: '0 10px',
                        borderRadius: '50px',
                        fontStyle: 'italic'
                      }}
                    >
                      <Box sx={{ fontSize: 15 }}>{tag}</Box>
                    </Typography>
                  );
                })}
            </Box>
          </Box>
          {url && (
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  borderTop: `0.5px solid ${color.gray[300]}`,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={url}
                  alt="images"
                  style={{
                    display: 'flex',
                    objectFit: 'contain',
                    cursor: 'pointer',
                    maxWidth: '90%'
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
                <LocalFireDepartment sx={voted} />
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
                <Box sx={{ fontSize: 15 }}>{counterVotePost}</Box>
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
                <Box sx={{ fontSize: 15 }}>1456 comment</Box>
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
                <Box sx={{ fontSize: 15 }}>3421 share</Box>
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              m: '0 0 10px 0',
              borderTop: `1px solid ${color.gray[300]}`,
              borderBottom: `1px solid ${color.gray[300]}`
            }}
          >
            <Button onClick={handleClickVote} sx={btnPost}>
              <Box sx={verticalAlign}>
                <LocalFireDepartment sx={vote ? voted : none} />
              </Box>
              <Typography component="div">
                <Box sx={{ fontSize: 15 }}>vote</Box>
              </Typography>
            </Button>
            <Button sx={btnPost}>
              <Box sx={verticalAlign}>
                <Box sx={mrIcons}>
                  <Sms sx={none} />
                </Box>
              </Box>
              <Typography component="div">
                <Box sx={{ fontSize: 15 }}>Comment</Box>
              </Typography>
            </Button>
            <Button sx={btnPost}>
              <Box sx={verticalAlign}>
                <Box sx={mrIcons}>
                  <WifiProtectedSetup sx={none} />
                </Box>
                <Typography component="div">
                  <Box sx={{ fontSize: 15 }}>Share</Box>
                </Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Post;
