import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './profile.css';

import AppBar from '../../components/NavBar/AppBar';
import coverPicture from '../../assets/images/coverPhoto.jpg';
import avatarPr from '../../assets/images/avt.jpg';
import colors from '../../assets/style/GlobalStyles';
import ListPost from '../Home/ListPost';
import EditIcon from '../../components/icons/PencilSvg';
import Bio from './Bio';
import EditDetails from './EditDetails';
import EditHobbies from './EditHobbies';
import ShowFriendIcons from '../../components/ShowFriendIcons';
import video1 from '../../assets/React App - Google Chrome 2022-02-09 12-02-34.mp4';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconsBar from '../../theme/IconsBar';
import gift from '../../assets/images/giphy.gif';

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

  const wrapContentLeft = {};

  const contentLeft = {
    position: 'sticky',
    top: '80px',
    height: 'fit-content',
    mb: '15px'
  };

  const introduce = {
    borderRadius: '5px',
    height: 'fit-content',
    boxShadow: 3,
    mt: '20px',
    p: '15px',
    boxSizing: 'border-box',
    bgcolor: `${color.white}`,
    ':-webkit-scrollbar': {
      display: 'none'
    },
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
                    <Typography variant="h4" component="div">
                      <Box sx={{ fontWeight: 'bold' }}>Nguyễn Công Thịnh</Box>
                    </Typography>
                    <Typography variant="body" component="div">
                      <Box sx={{ textAlign: 'left' }}>( Bunmamkey )</Box>
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
                  <Button sx={btnEditProfile}>
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <EditIcon fill={color.white} size={16} />
                    </Box>
                    Edit Profile
                  </Button>
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
                  <Bio />
                  <EditDetails />
                  <EditHobbies />
                </Box>
              </Box>
            </Box>
          </ThemeProvider>
          <Box sx={postContent}>
            <ListPost />
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
