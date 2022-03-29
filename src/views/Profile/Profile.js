import React from 'react';
import { Box, Button, Typography } from '@mui/material';
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

const color = colors.colors;

const Profile = () => {
  const header = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 940
  };
  const coverPhoto = {
    display: 'flex',
    justifyContent: 'center'
  };
  const coverImage = {
    width: '940px',
    height: '350px',
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
    boxSizing: 'border-box'
  };

  const profileHidden = {
    visibility: 'hidden',
    height: '150px'
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
    pb: '4px'
  };
  const editProfile = {
    display: 'flex',
    justifyContent: 'flex-end'
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
    width: 900
  };

  const wrapContentLeft = {};

  const contentLeft = {
    position: 'sticky',
    top: '80px',
    height: 'fit-content'
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
            <img src={coverPicture} alt="cover photos" style={coverImage} />
          </Box>
          <Box sx={{ position: 'relative', width: '100%' }}>
            <Box sx={profile}>
              <Box sx={{ display: 'flex' }}>
                <Box sx={avatar}>
                  <img src={avatarPr} alt="abc" style={avt} />
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
          <Box sx={{ width: '40%' }}>
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
          <Box sx={postContent}>
            <ListPost />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
