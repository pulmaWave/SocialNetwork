import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CardMedia,
  Divider,
  getFormLabelUtilityClasses,
  Typography
} from '@mui/material';
import './profile.css';

import AppBar from '../../components/NavBar/AppBar';
import colors from '../../assets/style/GlobalStyles';
import ListPostProfile from '../Profile/ListPostProfile';
import EditIcon from '../../components/icons/PencilSvg';
import UserPlusSvg from '../../components/icons/UserPlusSvg';
import MailSvg from '../../components/icons/MailSvg';
import Bio from './Bio';
import EditDetails from './EditDetails';
import EditHobbies from './EditHobbies';
import ShowFriendIcons from '../../components/ShowFriendIcons';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconsBar from '../../theme/IconsBar';
import gift from '../../assets/images/giphy.gif';
import { Link, Outlet, useParams } from 'react-router-dom';
import { getDocById } from '../../utilities/utilities';
import { arrayUnion, arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ScrollToTop from '../../components/ScrollToTop';
import Male from '../../assets/images/avtdefault.jpg';
import coverPicture from '../../assets/images/coverPhoto.jpg';

const color = colors.colors;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mb: 480,
      md: 650,
      m900: 900,
      m920: 920,
      m940: 940,
      large: 1440
    }
  }
});

// Begin Post component: render list posts profile and information of user
const content = {
  display: 'flex',
  justifyContent: 'space-around',
  width: 900,
  [theme.breakpoints.down('m920')]: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'unset'
  }
};

const contentLeft = {
  position: 'sticky',
  top: '80px',
  height: 'fit-content',
  mb: '15px'
};

const introduce = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  borderRadius: '5px',
  height: 'fit-content',
  boxShadow: 3,
  mt: '20px',
  p: '15px',
  boxSizing: 'border-box',
  bgcolor: `${color.white}`,
  [theme.breakpoints.down('m920')]: {
    maxWidth: 500
  }
};

const postContent = {
  width: '55%',
  display: 'flex',
  justifyContent: 'center'
};

const Posts = () => {
  const params = useParams();
  const userId = params.userId;
  const [user, setUser] = useState('');
  const [checkUser, setCheckUser] = useState(false);
  const uidLogged = localStorage.getItem('uid');
  useEffect(() => {
    getDocById('users', userId).then((data) => {
      setUser(data);
    });
    if (userId === uidLogged) {
      setCheckUser(true);
    } else setCheckUser(false);
  }, [userId]);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        bgcolor: `${color.bgcolor}`
      }}
    >
      <Box sx={content}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              width: '40%',
              [theme.breakpoints.down('m920')]: {
                width: 'unset'
              }
            }}
          >
            <Box sx={contentLeft}>
              <Box sx={introduce}>
                <Typography component="div">
                  <Box
                    sx={{
                      fontSize: 18,
                      fontWeight: 'bold'
                    }}
                  >
                    Intro
                  </Box>
                </Typography>
                <Bio check={checkUser} />
                <EditDetails check={checkUser} />
                <EditHobbies check={checkUser} />
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
        <Box sx={postContent}>
          <ListPostProfile user={userId} check={checkUser} />
        </Box>
      </Box>
    </Box>
  );
};

// Begin Friends component
const container = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  justifyContent: 'space-between',
  width: 900,
  p: '16px',
  my: '20px',
  borderRadius: '8px',
  border: `0.5px solid ${color.btnBgColor}`,
  bgcolor: `${color.white}`
  // [theme.breakpoints.down('m900')]: {
  //   width: 'unset'
  // }
};

const container2 = {
  display: 'flex',
  justifyContent: 'center',
  width: 900,
  p: '16px',
  my: '20px',
  borderRadius: '8px',
  border: `0.5px solid ${color.btnBgColor}`,
  bgcolor: `${color.white}`
};

const btnConfirm = {
  lineHeight: 'unset',
  px: '25px',
  color: `${color.white}`,
  textTransform: 'unset',
  bgcolor: `${color.main}`,
  ':hover': {
    backgroundColor: `${color.mainHover}`
  }
};
const btnCategory = {
  lineHeight: 'unset',
  px: '25px',
  color: `${color.color}`,
  textTransform: 'unset',
  bgcolor: `${color.btnBgColor}`,
  ':hover': {
    backgroundColor: `${color.hoverBtnBgColor}`
  }
};

const FriendRequests = () => {
  const params = useParams();
  const userId = params.userId;
  const [friendReq, setFriendReq] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const uidLogged = localStorage.getItem('uid');

  // get all users in list add friend requests of one user
  const getUsersFriendRequests = async (uidLogged) => {
    let arr = [];
    const data = await getDocById('users', uidLogged);
    let i = 0;
    const length = data.friendReq.length;
    for (i; i < length; i++) {
      let users = await getDocById('users', data.friendReq[i].uid); // get information of user
      arr.push(users);
    }
    setFriendReq(arr);
  };

  useEffect(() => {
    // check role edit
    if (uidLogged === userId) {
      getUsersFriendRequests(uidLogged);
    } else {
      getUsersFriendRequests(userId);
    }
  }, [uidLogged]);

  const handleConfirmFriendReq = async (uid) => {
    const myFriendReq = [...friendReq];
    let arr = myFriendReq.filter(function (value, index, arr) {
      return value.uid !== uid;
    });
    try {
      // remove user in friend requests to firestore
      await updateDoc(doc(db, 'users', userId), {
        friendReq: arrayRemove({ uid: uid })
      }).then(() => {
        try {
          // add friend to friends on firestore
          updateDoc(doc(db, 'users', userId), {
            friends: arrayUnion({ uid: uid })
          }).then(() => {
            try {
              // add friend succeeded
              updateDoc(doc(db, 'users', uid), {
                friends: arrayUnion({ uid: uidLogged })
              });
            } catch (err) {
              alert(err);
            }
          });
        } catch (err) {
          alert(err);
        }
      });
    } catch (err) {
      alert('do not removed', err);
    }
    setFriendReq(arr);
  };

  const handleDeleteFriendReq = async (uid) => {
    const myFriendReq = [...friendReq];
    let arr = myFriendReq.filter(function (value, index, arr) {
      return value.uid !== uid;
    });
    try {
      // remove user to firestore
      await updateDoc(doc(db, 'users', userId), {
        friendReq: arrayRemove({ uid: uid })
      });
    } catch (err) {
      alert('do not removed', err);
    }
    setFriendReq(arr);
  };

  return (
    <>
      {friendReq.length > 0 ? (
        <Box sx={container}>
          {friendReq.map((data, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  width: 'calc(50% - 40px)',
                  borderRadius: '8px',
                  border: `0.5px solid ${color.btnBgColor}`,
                  p: '16px'
                }}
              >
                <Box
                  sx={{
                    width: 'calc(20% + 32px)',
                    borderRadius: '8px',
                    border: `0.5px solid ${color.btnBgColor}`,
                    mr: '15px',
                    cursor: 'pointer'
                  }}
                >
                  <Link
                    to={`/profile=${data.uid}`}
                    style={{ textDecoration: 'none', color: 'unset' }}
                  >
                    <CardMedia
                      component="img"
                      height="100%"
                      image={data.image}
                      onLoad={() => {
                        setLoaded(true);
                      }}
                      alt="avatar"
                      sx={
                        loaded
                          ? {
                              borderRadius: '8px',
                              width: '100%',
                              objectFit: 'cover'
                            }
                          : { display: 'none' }
                      }
                    />
                    {loaded ? null : (
                      <CardMedia
                        component="img"
                        height="100%"
                        image={Male}
                        alt="avatar"
                        sx={{
                          borderRadius: '8px',
                          width: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    )}
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Link
                    to={`/profile=${data.uid}`}
                    style={{ textDecoration: 'none', color: 'unset' }}
                  >
                    <Typography component="div">
                      <Box sx={{ fontSize: 15, fontWeight: 'bold' }}>
                        {data.userName}
                      </Box>
                      <Box sx={{ fontSize: 13 }}>(2 mutual friends)</Box>
                    </Typography>
                  </Link>
                  <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Button
                      sx={btnConfirm}
                      onClick={() => handleConfirmFriendReq(data.uid)}
                    >
                      Confirm
                    </Button>
                    <Button
                      sx={btnCategory}
                      onClick={() => handleDeleteFriendReq(data.uid)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box sx={container2}>
          <Typography component="div">
            <Box
              sx={{
                fontSize: 20,
                fontWeight: 'bold',
                color: `${color.iconNotSvg}`
              }}
            >
              Friend request not available
            </Box>
          </Typography>
        </Box>
      )}
    </>
  );
};

// Begin Friends component
const Friends = () => {
  const params = useParams();
  const userId = params.userId;
  const [friends, setFriends] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const uidLogged = localStorage.getItem('uid');

  // get all users in list add friend requests of one user
  const getUsersFriend = async (uidLogged) => {
    let arr = [];
    const data = await getDocById('users', uidLogged);
    let i = 0;
    const length = data.friends.length;
    for (i; i < length; i++) {
      let users = await getDocById('users', data.friends[i].uid); // get information of user
      arr.push(users);
    }
    setFriends(arr);
  };
  useEffect(() => {
    // check role edit
    if (uidLogged === userId) {
      getUsersFriend(uidLogged);
    } else {
      getUsersFriend(userId);
    }
  }, [uidLogged]);

  const handleDeleteFriend = async (uid) => {
    const myFriendReq = [...friends];
    let arr = myFriendReq.filter(function (value, index, arr) {
      return value.uid !== uid;
    });
    try {
      // remove user to firestore
      await updateDoc(doc(db, 'users', userId), {
        friends: arrayRemove({ uid: uid })
      }).then(() => {
        try {
          // add data to firestore
          updateDoc(doc(db, 'users', uid), {
            friends: arrayRemove({ uid: uidLogged })
          });
        } catch (err) {
          alert(err);
        }
      });
    } catch (err) {
      alert('do not removed', err);
    }
    setFriends(arr);
  };

  return (
    <>
      {friends.length > 0 ? (
        <Box sx={container}>
          {friends.map((data, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  width: 'calc(50% - 40px)',
                  borderRadius: '8px',
                  border: `0.5px solid ${color.btnBgColor}`,
                  p: '16px'
                }}
              >
                <Box
                  sx={{
                    width: 'calc(20% + 32px)',
                    borderRadius: '8px',
                    border: `0.5px solid ${color.btnBgColor}`,
                    mr: '15px',
                    cursor: 'pointer'
                  }}
                >
                  <Link
                    to={`/profile=${data.uid}`}
                    style={{ textDecoration: 'none', color: 'unset' }}
                  >
                    <CardMedia
                      component="img"
                      height="100%"
                      image={data.image}
                      onLoad={() => {
                        setLoaded(true);
                      }}
                      alt="avatar"
                      sx={
                        loaded
                          ? {
                              borderRadius: '8px',
                              width: '100%',
                              objectFit: 'cover'
                            }
                          : { display: 'none' }
                      }
                    />
                    {loaded ? null : (
                      <CardMedia
                        component="img"
                        height="100%"
                        image={Male}
                        alt="avatar"
                        sx={{
                          borderRadius: '8px',
                          width: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    )}
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Link
                    to={`/profile=${data.uid}`}
                    style={{ textDecoration: 'none', color: 'unset' }}
                  >
                    <Typography component="div">
                      <Box sx={{ fontSize: 15, fontWeight: 'bold' }}>
                        {data.userName}
                      </Box>
                      <Box sx={{ fontSize: 13 }}>(2 mutual friends)</Box>
                    </Typography>
                  </Link>
                  <Box>
                    {/* check role edit */}
                    {uidLogged === userId ? (
                      <Button
                        sx={btnCategory}
                        onClick={() => handleDeleteFriend(data.uid)}
                      >
                        Unfriend
                      </Button>
                    ) : (
                      ''
                    )}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box sx={container2}>
          <Typography component="div">
            <Box
              sx={{
                fontSize: 20,
                fontWeight: 'bold',
                color: `${color.iconNotSvg}`
              }}
            >
              No friends to show
            </Box>
          </Typography>
        </Box>
      )}
    </>
  );
};

// Begin Photos component
const Photos = () => {
  return (
    <Box sx={container2}>
      <Typography component="div">
        <Box
          sx={{
            fontSize: 20,
            fontWeight: 'bold',
            color: `${color.iconNotSvg}`
          }}
        >
          No photos to show
        </Box>
      </Typography>
    </Box>
  );
};

const Profile = () => {
  const params = useParams();
  const userId = params.userId;
  const [friendRequest, setFriendRequest] = useState(false);
  const [friend, setFriend] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadedAvt, setLoadedAvt] = useState(false);
  const [user, setUser] = useState('');
  const [checkUser, setCheckUser] = useState(false);
  const uidLogged = localStorage.getItem('uid');

  useEffect(() => {
    getDocById('users', userId).then((data) => {
      setUser(data);
    });
    if (userId === uidLogged) {
      setCheckUser(true);
    } else setCheckUser(false);
    getDocById('users', uidLogged).then((data) => {
      setFriend(data.friends);
      let i = 0;
      let length = data.friends.length;
      for (i; i < length; i++) {
        if (userId === data.friends[i].uid) {
          setIsFriend(true);
          break;
        } else {
          setIsFriend(false);
        }
      }
    });
  }, [userId]);

  const handleAddFriend = async () => {
    setFriendRequest(true);
    try {
      // add data to firestore
      await updateDoc(doc(db, 'users', userId), {
        friendReq: arrayUnion({ uid: uidLogged })
      });
    } catch (err) {
      alert(err);
    }
  };

  const showFriendRequests = async () => {};
  const handleCancelRequestFriend = async () => {
    setFriendRequest(false);
  };

  const handleBtnMessage = async () => {};

  const header = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 940,
    [theme.breakpoints.down('m940')]: {
      width: '98vw'
    },
    [theme.breakpoints.down('mb')]: {
      width: 'inherit'
    }
  };

  const coverPhoto = {
    display: 'flex',
    justifyContent: 'center'
  };

  const wrapper = {
    position: 'absolute',
    bottom: '-180px',
    width: '100%',
    [theme.breakpoints.down('m900')]: { bottom: '-310px' }
  };

  const profile = {
    display: 'flex',
    justifyContent: 'space-between',
    p: '0 30px',
    width: 'inherit',
    boxSizing: 'border-box',
    [theme.breakpoints.down('m900')]: {
      flexDirection: 'column',
      alignItems: 'center',
      p: 'unset'
    }
  };

  const profileHidden = {
    visibility: 'hidden',
    height: '185px',
    [theme.breakpoints.down('m900')]: {
      height: '315px'
    }
  };

  const avatar = {
    borderRadius: '50%',
    border: '4px solid white'
  };

  const coverImage = {
    width: '100%',
    display: 'flex',
    objectFit: 'cover',
    borderRadius: '0 0 10px 10px'
  };

  const avt = {
    display: 'flex',
    objectFit: 'cover',
    borderRadius: '100%'
  };
  const nameFriends = {
    ml: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    pb: '4px',
    [theme.breakpoints.down('m900')]: {
      ml: 'unset',
      alignItems: 'center',
      p: '10px'
    }
  };
  const editProfile = {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('m900')]: {
      mt: 1
    }
  };

  const btnEditProfile = {
    width: 'fit-content',
    p: '5px 10px',
    color: `${color.white}`,
    bgcolor: `${color.main}`,
    textTransform: 'unset',
    ':hover': {
      backgroundColor: `${color.mainHover}`
    }
  };

  const btnCategory = {
    color: `${color.color}`,
    textTransform: 'unset',
    ':hover': {
      backgroundColor: `${color.hoverBtnBgColor}`
    }
  };

  const btnMessage = {
    width: 'fit-content',
    p: '5px 10px',
    color: `${color.color}`,
    bgcolor: `${color.btnBgColor}`,
    textTransform: 'unset',
    ':hover': {
      backgroundColor: `${color.hoverBtnBgColor}`
    }
  };

  return (
    <Box>
      <ScrollToTop />
      <AppBar />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          borderBottom: `1px solid ${color.btnBgColor}`
        }}
      >
        <Box sx={header}>
          <Box sx={coverPhoto}>
            <CardMedia
              component="img"
              height="350"
              image={coverPicture}
              onLoad={() => {
                setLoaded(true);
              }}
              alt="avatar"
              sx={loaded ? coverImage : { display: 'none' }}
            />
            {loaded ? null : (
              <CardMedia
                component="img"
                height="350"
                image={coverPicture}
                alt="avatar"
                sx={coverImage}
              />
            )}
          </Box>
          <Box sx={{ position: 'relative', width: '100%' }}>
            <Box sx={wrapper}>
              <Box sx={profile}>
                <ThemeProvider theme={theme}>
                  <Box
                    sx={{
                      display: 'flex',
                      [theme.breakpoints.down('m900')]: {
                        flexDirection: 'column',
                        alignItems: 'center'
                      }
                    }}
                  >
                    <Box sx={avatar}>
                      <CardMedia
                        component="img"
                        height="168"
                        image={user.image}
                        onLoad={() => {
                          setLoadedAvt(true);
                        }}
                        alt="avatar"
                        sx={loadedAvt ? avt : { display: 'none' }}
                      />
                      {loadedAvt ? null : (
                        <CardMedia
                          component="img"
                          height="168"
                          image={Male}
                          alt="avatar"
                          sx={avt}
                        />
                      )}
                    </Box>
                    <Box sx={nameFriends}>
                      <Typography component="div">
                        <Box sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                          {user.userName}
                        </Box>
                      </Typography>
                      <Typography variant="body" component="div">
                        <Box sx={{ textAlign: 'left' }}>
                          ( {user.userName} )
                        </Box>
                      </Typography>
                      <ShowFriendIcons />
                    </Box>
                  </Box>
                </ThemeProvider>
                <Box sx={editProfile}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'end'
                    }}
                  >
                    {checkUser ? (
                      <Button sx={btnEditProfile}>
                        <Box
                          sx={{ mr: 1, display: 'flex', alignItems: 'center' }}
                        >
                          <EditIcon fill={color.white} size={16} />
                        </Box>
                        Edit Profile
                      </Button>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {isFriend ? (
                          <Button sx={btnEditProfile}>
                            <Box
                              sx={{
                                mr: 1,
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <UserPlusSvg fill={color.white} size={16} />
                            </Box>
                            <Typography component="div">
                              <Box sx={{ fontSize: 15 }}>Friend</Box>
                            </Typography>
                          </Button>
                        ) : (
                          <Box>
                            {friendRequest ? (
                              <Button
                                sx={btnMessage}
                                onClick={handleCancelRequestFriend}
                              >
                                <Box
                                  sx={{
                                    mr: 1,
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <UserPlusSvg fill={color.white} size={16} />
                                </Box>
                                <Typography component="div">
                                  <Box sx={{ fontSize: 15 }}>
                                    Cancel request
                                  </Box>
                                </Typography>
                              </Button>
                            ) : (
                              <Button
                                sx={btnEditProfile}
                                onClick={handleAddFriend}
                              >
                                <Box
                                  sx={{
                                    mr: 1,
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <UserPlusSvg fill={color.white} size={16} />
                                </Box>
                                <Typography component="div">
                                  <Box sx={{ fontSize: 15 }}>Add friend</Box>
                                </Typography>
                              </Button>
                            )}
                          </Box>
                        )}
                        <Button sx={btnMessage} onClick={handleBtnMessage}>
                          <Box
                            sx={{
                              mr: 1,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <MailSvg fill={color.color} size={16} />
                          </Box>
                          <Typography component="div">
                            <Box sx={{ fontSize: 15 }}>Message</Box>
                          </Typography>
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ m: '20px 30px 8px 30px' }} />
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  p: '0 30px'
                }}
              >
                <Link
                  to={`/profile=${userId}`}
                  style={{ textDecoration: 'none', color: 'unset' }}
                >
                  <Button sx={btnCategory}>Posts</Button>
                </Link>
                <Link
                  to={`/profile=${userId}/friends`}
                  style={{ textDecoration: 'none', color: 'unset' }}
                >
                  <Button sx={btnCategory}>Friends</Button>
                </Link>
                {checkUser && (
                  <Link
                    to={`/profile=${userId}/friends/requests`}
                    style={{ textDecoration: 'none', color: 'unset' }}
                  >
                    <Button sx={btnCategory} onClick={showFriendRequests}>
                      Friend requests
                    </Button>
                  </Link>
                )}
                <Link
                  to={`/profile=${userId}/photos`}
                  style={{ textDecoration: 'none', color: 'unset' }}
                >
                  <Button sx={btnCategory}>Photos</Button>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box sx={profileHidden}></Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: `${color.bgcolor}`
        }}
      >
        <Outlet />
      </Box>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            boxShadow: ' 0 -1px 1px -1px gray',
            boxSizing: 'border-box',
            width: '100%',
            position: 'fixed',
            bottom: 0,
            left: 0,
            display: 'none',
            backgroundColor: 'white',
            justifyContent: 'center',
            [theme.breakpoints.down('mb')]: {
              display: 'flex'
            }
          }}
        >
          <IconsBar
            colorActive={`${color.main}`}
            color={`${color.gray[600]}`}
          />
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default Profile;
export { Posts, FriendRequests, Friends, Photos };
