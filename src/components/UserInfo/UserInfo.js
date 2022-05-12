import * as React from 'react';
import { Box, Typography, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import colors from '../../assets/style/GlobalStyles';
import avtDef from '../../assets/images/avtdefault.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { setPopUp } from '../../redux/action/actions';
import { popUpSelector } from '../../redux/selector';

const color = colors.colors;

const UserInfo = (props) => {
  const [loaded, setLoaded] = React.useState(false);
  const dispatch = useDispatch();
  const list = useSelector(popUpSelector);
  const [listChat, setListChat] = React.useState(list);

  const joinChat = () => {
    dispatch(
      setPopUp([
        {
          displayName: props.displayName,
          image: props.image,
          uid: props.uid
        }
      ])
    );
    console.log('list chat: ', listChat);
    // socket.emit('join chat', uidLogged);
  };

  const btn = {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: props.paddingLeft ? props.paddingLeft : '',
    borderRadius: '6px',
    p: '7px',
    ':hover': {
      bgcolor: `${color.btnBgColor}`,
      cursor: 'pointer'
    }
  };

  return (
    <Box>
      <Link
        to={props.link}
        style={{ textDecoration: 'none', color: 'unset' }}
        onClick={joinChat}
      >
        <Box sx={btn}>
          <Box
            sx={{
              borderRadius: '50%'
            }}
          >
            <CardMedia
              component="img"
              height="32"
              image={props.image}
              onLoad={() => {
                setLoaded(true);
              }}
              alt="avatar"
              sx={
                loaded
                  ? {
                      borderRadius: '50%',
                      width: '32px',
                      objectFit: 'cover'
                    }
                  : { display: 'none' }
              }
            />
            {loaded ? null : (
              <CardMedia
                component="img"
                height="32"
                image={avtDef}
                alt="avatar"
                sx={{
                  borderRadius: '50%',
                  width: '32px',
                  objectFit: 'cover'
                }}
              />
            )}
          </Box>
          <Typography
            sx={{
              fontSize: '15px',
              textTransform: 'capitalize',
              marginLeft: '10px'
            }}
          >
            {props.displayName ? props.displayName : 'User name is loading'}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default UserInfo;
