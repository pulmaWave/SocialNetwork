import { React, useEffect, useState, useRef } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import {
  CheckBoxOutlineBlank,
  LocalFireDepartment,
  Sms,
  TextSnippetOutlined,
  WifiProtectedSetup
} from '@mui/icons-material';
import CustomInput from '../components/CustomInput';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Camera from '../components/icons/CameraSvg';

import UserPost from './UserPost';
import colors from '../assets/style/GlobalStyles';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getDocById } from '../utilities/utilities';
import moment from 'moment';

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

const voted = { color: `${color.mainRed}` };
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

const boxNone = {
  display: 'none'
};

const boxShow = {
  display: 'block',
  p: '10px 20px'
};

const fillComment = {
  p: '10px',
  borderRadius: '50px'
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
  counterVote,
  createAt
}) => {
  let postTime = moment(createAt.seconds * 1000)
    .startOf('seconds')
    .toNow();
  let textInput = useRef(null);
  const [vote, setVote] = useState();
  const [counterVotePost, setCounterVotePost] = useState();
  const [commentAct, setCommentAct] = useState(false);
  const contentRef = doc(db, 'posts', id);
  const avt = localStorage.getItem('avt');
  useEffect(() => {
    getDocById('posts', id).then(async (data) => {
      const counterVote = data.voteBy.length;
      const voted = await data.voteBy.some((value) => value === uid);
      setVote(voted);
      setCounterVotePost(counterVote);
    });
    // get information user
    getDocById('users', uid).then(async (data) => {
      localStorage.setItem('avt', data.image);
    });
  }, [id]);

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

  // handle button comment
  const handleBtnCmt = () => {
    setCommentAct(true);
    setTimeout(() => {
      textInput.current.focus();
    }, 100);
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
            <UserPost time={postTime} />
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
            <Button sx={btnPost} onClick={handleBtnCmt}>
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
        <Box sx={commentAct ? boxShow : boxNone}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <img
              src={avt}
              alt="avatar"
              width="32"
              height="32"
              style={{ borderRadius: '50%', marginRight: '10px' }}
            />
            {/* <CustomInput
              placeholder="Write something"
              handleBtnCmt={handleBtnCmt}
            /> */}
            <Box
              sx={{
                p: '2px 4px',
                display: 'flex',
                width: '100%',
                borderRadius: '18px',
                bgcolor: `${color.bgcolor}`
              }}
            >
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  fontSize: '15px',
                  with: '100%',
                  height: 'fit-content'
                }}
                placeholder="Write something now"
                inputProps={{ 'aria-label': 'Write something now' }}
                inputRef={textInput}
                multiline
              />
              {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton sx={{ p: '10px' }}>
                  <Camera fill={color.iconNotSvg} size={16} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Post;
