import * as React from 'react';
import { Box, Typography, CardMedia, Button, IconButton } from '@mui/material';
import colors from '../assets/style/GlobalStyles';
import avtDef from '../assets/images/avtdefault.jpg';
import CloseSvg from '../components/icons/CloseSvg';
import MinimizeSvg from '../components/icons/MinimizeSvg';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPopUp } from '../redux/action/actions';
import { popUpSelector } from '../redux/selector';

const SERVER = 'http://localhost:8080';
// const socket = io.connect(SERVER);

const color = colors.colors;
const uidLogged = localStorage.getItem('uid');

const PopupChat = (props) => {
  const [loaded, setLoaded] = React.useState(false);
  const popup = Object.values(useSelector(popUpSelector));
  const [listChat, setListChat] = React.useState(popup);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setListChat(popup);
  }, [popup]);

  const closePopupChat = () => {
    const arr = [...listChat].filter((v) => v.uid !== props.uid);
    console.log('arr', arr);
    dispatch(setPopUp(arr));
  };

  const hide = {
    display: 'none'
  };

  const info = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    bgcolor: `${color.white}`,
    color: `${color.iconNotSvg}`,
    p: 1,
    borderRadius: '10px 10px 0 0',
    borderBottom: `0.5px solid ${color.bgcolor}`,
    boxShadow: ' rgba(0, 0, 0, 0.24) 3px 3px 8px'
  };

  const container = {
    borderRadius: '50%',
    border: `0.5px solid ${color.btnBgColor}`,
    width: 330,
    height: 440
  };

  return (
    <Box sx={container}>
      <Box sx={info}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Link
            to={`/profile=HImZtCzqpafGNw6LrauUVmRHvlI2`}
            style={{ textDecoration: 'none', color: 'unset' }}
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
          </Link>
          <Typography component="div">
            <Box sx={{ fontSize: 15, ml: '5px', color: `${color.color}` }}>
              {props.displayName}
            </Box>
          </Typography>
        </Box>
        <Box>
          <IconButton sx={{ color: `${color.iconNotSvg}` }}>
            <MinimizeSvg fill={`${color.main}`} size={16} />
          </IconButton>
          <IconButton
            sx={{ color: `${color.iconNotSvg}` }}
            onClick={closePopupChat}
          >
            <CloseSvg fill={`${color.main}`} size={16} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          p: '5px 10px 10px 10px',
          bgcolor: `${color.white}`,
          height: '100%',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
        }}
      ></Box>
    </Box>
  );
};

export default PopupChat;
