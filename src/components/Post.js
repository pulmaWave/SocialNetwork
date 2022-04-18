import { React, useEffect, useState, useRef } from 'react';
import { Box, Button, CardMedia } from '@mui/material';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import {
  LocalFireDepartment,
  Sms,
  WifiProtectedSetup
} from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Camera from '../components/icons/CameraSvg';

import UserPost from './UserPost';
import colors from '../assets/style/GlobalStyles';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { getDocById, getSubColRTime } from '../utilities/utilities';
import moment from 'moment';
import Male from '../assets/images/avatarMale.jpg';
import Female from '../assets/images/girl.png';
import { Link } from 'react-router-dom';

const color = colors.colors;
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mb: 480,
      md: 650
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

const Comment = (props) => {
  const [user, setUser] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      getDocById('users', props.uid).then((data) => {
        setLoading(true);
        setUser(data);
      });
    } catch (error) {
      console.log('get doc by id error', error);
    }
  }, [props.uid]);
  return (
    <Box sx={{ p: '10px 20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Link
          to={`/profile=${props.uid}`}
          style={{
            textDecoration: 'none',
            color: 'unset',
            '&:hover': {
              cursor: 'pointer',
              textDecoration: 'underline'
            }
          }}
        >
          <CardMedia
            component="img"
            height="32px"
            image={user.image}
            onLoad={() => {
              setLoaded(true);
            }}
            alt="avatar"
            sx={
              loaded
                ? { borderRadius: '50%', marginRight: '10px', width: '32px' }
                : { display: 'none' }
            }
          />
          {loaded ? null : (
            <CardMedia
              component="img"
              height="32px"
              image={user.gender === 'male' ? Male : Female}
              alt="avatar"
              sx={{ borderRadius: '50%', marginRight: '10px', width: '32px' }}
            />
          )}
        </Link>
        <Box
          sx={{
            p: '8px 12px',
            width: '100%',
            borderRadius: '18px',
            bgcolor: `${color.bgcolor}`
          }}
        >
          <Link
            to={`/profile=${props.uid}`}
            style={{
              textDecoration: 'none',
              color: 'unset',
              '&:hover': {
                cursor: 'pointer'
              }
            }}
          >
            <Typography component="div">
              <Box
                sx={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  ':hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {user.userName}
              </Box>
            </Typography>
          </Link>
          <Typography component="div">
            <Box sx={{ fontSize: '15px', wordBreak: 'break-word' }}>
              {props.comment}
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const uid = localStorage.getItem('uid');

const Post = ({
  content,
  url,
  tags,
  id,
  voteBy,
  counterVote,
  createAt,
  uidPost
}) => {
  let postTime = moment(createAt.seconds * 1000)
    .startOf('seconds')
    .fromNow();
  let textInput = useRef(null);
  const [vote, setVote] = useState();
  const [counterVotePost, setCounterVotePost] = useState();
  const [commentAct, setCommentAct] = useState(false);
  const [commentMessage, setCommentMessage] = useState('');
  const [listCmt, setListCmt] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const contentRef = doc(db, 'posts', id);
  const avt = localStorage.getItem('avt');
  useEffect(() => {
    getDocById('posts', id).then(async (data) => {
      const counterVote = data.voteBy.length;
      const voted = await data.voteBy.some((value) => value === uid);
      setVote(voted);
      setCounterVotePost(counterVote);
    });
  }, [id]);

  useEffect(() => {
    //show 1 comment then page render
    const subColRef = query(
      collection(db, 'posts', `${id}`, 'comments'),
      orderBy('createAt', 'asc'),
      limit(1)
    );
    // getSubCollection(subColRef, setListCmt);
    getDocs(subColRef).then((res) => {
      let arr = [];
      res.forEach((doc) => {
        arr.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setListCmt(arr);
    });
  }, []);

  const handleClickVote = async () => {
    const data = await getDocById('posts', id);
    const counterVote = data.voteBy.length;
    setCounterVotePost(counterVote);
    // check uid (user) vote yet?
    const voted = await data.voteBy.some((value) => value === uid);
    setVote(!vote);
    // update vote and counter vote of post
    if (!voted) {
      await updateDoc(contentRef, {
        voteBy: arrayUnion(uid),
        counterVote: counterVote + 1
      });
      const data = await getDocById('posts', id);
      setCounterVotePost(data.counterVote);
    } else {
      await updateDoc(contentRef, {
        voteBy: arrayRemove(uid),
        counterVote: counterVote - 1
      });
      const data = await getDocById('posts', id);
      setCounterVotePost(data.counterVote);
    }
  };

  // handle button comment
  const handleBtnCmt = async () => {
    setCommentAct(true);
    setTimeout(() => {
      textInput.current.focus();
    }, 100);
    const subColRef = query(
      collection(db, 'posts', `${id}`, 'comments'),
      orderBy('createAt', 'asc')
    );
    // getSubCollection(subColRef, setListCmt);
    getSubColRTime(subColRef, setListCmt);
  };

  // event post comment
  const handleComment = async () => {
    try {
      await addDoc(collection(db, `posts/${id}/comments`), {
        comment: { commentMessage },
        createAt: serverTimestamp(),
        uid: { uid }
      });
    } catch (error) {
      console.log(error);
    }
  };
  // handle post comment
  const handleKeyDownCmt = (event) => {
    // handle press enter event
    if (event.key === 'Enter' && !event.shiftKey) {
      // disable newline when press enter and still allow shift + enter
      // to add new line in input base
      event.preventDefault();
      // check value input comment # null
      if (commentMessage !== '') {
        //post comment
        handleComment();
        //clear input comment
        setCommentMessage('');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: 500,
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
            <UserPost time={postTime} uidPost={uidPost} />
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
          {tags.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                mb: '10px',
                color: `${color.sky[800]}`
              }}
            >
              <LocalOfferIcon
                sx={{ width: '18px', height: '18px', mr: '3px' }}
              />
              <Typography>:</Typography>
              <Box
                sx={{
                  display: 'flex'
                }}
              >
                {tags.length > 0 &&
                  tags.map((tag, index) => {
                    return (
                      <Link
                        to={`/${tag}`}
                        style={{ textDecoration: 'none', color: 'unset' }}
                      >
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
                      </Link>
                    );
                  })}
              </Box>
            </Box>
          )}
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
        <Box>
          {listCmt.length > 0 &&
            listCmt.map((data) => {
              return (
                <Comment
                  key={data.id}
                  uid={data.uid.uid}
                  userName="Lucas Nguyen"
                  comment={data.comment.commentMessage}
                />
              );
            })}
        </Box>
        <Box sx={commentAct ? boxShow : boxNone}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <CardMedia
              component="img"
              height="32px"
              image={avt}
              onLoad={() => {
                setLoaded(true);
              }}
              alt="avatar"
              sx={
                loaded
                  ? { borderRadius: '50%', marginRight: '10px', width: '32px' }
                  : { display: 'none' }
              }
            />
            {loaded ? null : (
              <CardMedia
                component="img"
                height="32px"
                image={Male}
                alt="avatar"
                sx={{ borderRadius: '50%', marginRight: '10px', width: '32px' }}
              />
            )}
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
                onKeyDown={handleKeyDownCmt}
                onChange={(event) => {
                  setCommentMessage(event.target.value);
                }}
                value={commentMessage}
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
