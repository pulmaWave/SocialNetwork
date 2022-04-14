import { React, useEffect, useState } from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import Male from '../assets/images/avatarMale.jpg';
import Female from '../assets/images/girl.png';
import colors from '../assets/style/GlobalStyles';
import EarthSvg from '../components/icons/EarthSvg';
import { getDocById } from '../utilities/utilities';
import { Link, useParams } from 'react-router-dom';

const color = colors.colors;

const UserPost = (props) => {
  // const displayName = localStorage.getItem('userName');
  const [user, setUser] = useState('');
  useEffect(() => {
    getDocById('users', props.uidPost).then((data) => {
      setUser(data);
    });
  }, [props.uidPost]);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Link
        to={`/profile=${props.uidPost}`}
        style={{ textDecoration: 'none', color: 'unset' }}
      >
        <Box
          sx={{
            borderRadius: '50%',
            cursor: 'pointer',
            ':hover': {
              boxShadow: 4
            },
            marginRight: '5px'
          }}
        >
          <CardMedia
            component="img"
            height="40px"
            image={Male}
            alt="avatar"
            sx={{ borderRadius: '50%', width: '40px' }}
          />
        </Box>
      </Link>
      <Box sx={{ marginLeft: '10px' }}>
        <Typography
          component="div"
          sx={{
            textTransform: 'capitalize',
            fontWeight: 'bold',
            cursor: 'pointer',
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          <Link
            to={`/profile=${props.uidPost}`}
            style={{ textDecoration: 'none', color: 'unset' }}
          >
            <Box sx={{ fontSize: 15 }}>{user ? user.userName : 'loading'}</Box>
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component="div">
            <Box sx={{ fontSize: 13, color: `${color.gray[500]}`, mr: '5px' }}>
              {props.time}
            </Box>
          </Typography>
          <EarthSvg fill={color.icons} size={12} />
        </Box>
      </Box>
    </Box>
  );
};

export default UserPost;
