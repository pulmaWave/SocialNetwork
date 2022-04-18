import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import './profile.css';

import AppBar from '../../components/NavBar/AppBar';
import coverPicture from '../../assets/images/coverPhoto.jpg';
import colors from '../../assets/style/GlobalStyles';
import ListPostProfile from '../Profile/ListPostProfile';
import EditIcon from '../../components/icons/PencilSvg';
import UserPlusSvg from '../../components/icons/UserPlusSvg';
import Bio from './Bio';
import EditDetails from './EditDetails';
import EditHobbies from './EditHobbies';
import ShowFriendIcons from '../../components/ShowFriendIcons';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconsBar from '../../theme/IconsBar';
import gift from '../../assets/images/giphy.gif';
import { useParams } from 'react-router-dom';
import { getDocById } from '../../utilities/utilities';

const color = colors.colors;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mb: 480,
      md: 650,
      m900: 900,
      m940: 940,
      large: 1440
    }
  }
});

const Profile = () => {
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

  const handleRequestFriend = async () => {

  }

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
  const coverImage = {
    width: '100%',
    display: 'flex',
    objectFit: 'cover',
    borderRadius: '0 0 10px 10px'
  };
  const profile = {
    display: 'flex',
    justifyContent: 'space-between',
    p: '0 30px',
    position: 'absolute',
    bottom: '-135px',
    width: 'inherit',
    boxSizing: 'border-box',
    [theme.breakpoints.down('m900')]: {
      bottom: '-265px',
      flexDirection: 'column',
      alignItems: 'center',
      p: 'unset'
    }
  };

  const profileHidden = {
    visibility: 'hidden',
    height: '150px',
    [theme.breakpoints.down('m900')]: {
      height: '285px'
    }
  };

  const avatar = {
    borderRadius: '50%',
    border: '4px solid white'
  };
  const avt = {
    display: 'flex',
    width: 168,
    height: 168,
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
    width: '100%',
    p: '5px 10px',
    color: `${color.white}`,
    bgcolor: `${color.main}`,
    textTransform: 'unset',
    ':hover': {
      backgroundColor: `${color.mainHover}`
    }
  };

  const content = {
    display: 'flex',
    justifyContent: 'space-around',
    width: 900,
    [theme.breakpoints.down('m900')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
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
    [theme.breakpoints.down('m900')]: {
      maxWidth: 500
    }
  };

  const postContent = {
    width: '55%',
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <Box>
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
            <img
              src={coverPicture}
              alt="cover photos"
              style={coverImage}
              width="inherit"
              height="350"
            />
          </Box>
          <Box sx={{ position: 'relative', width: '100%' }}>
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
                    <img src={gift} alt="abc" style={avt} />
                  </Box>
                  <Box sx={nameFriends}>
                    <Typography component="div">
                      <Box sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                        {user.userName}
                      </Box>
                    </Typography>
                    <Typography variant="body" component="div">
                      <Box sx={{ textAlign: 'left' }}>( {user.userName} )</Box>
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
                  {checkUser === true ? (
                    <Button sx={btnEditProfile}>
                      <Box
                        sx={{ mr: 1, display: 'flex', alignItems: 'center' }}
                      >
                        <EditIcon fill={color.white} size={16} />
                      </Box>
                      Edit Profile
                    </Button>
                  ) : (
                    <Button sx={btnEditProfile} onClick={handleRequestFriend}>
                      <Box
                        sx={{ mr: 1, display: 'flex', alignItems: 'center' }}
                      >
                        <UserPlusSvg fill={color.white} size={16} />
                      </Box>
                      Add friend
                    </Button>
                  )}
                </Box>
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
        <Box sx={content}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                width: '40%',
                [theme.breakpoints.down('m900')]: {
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
