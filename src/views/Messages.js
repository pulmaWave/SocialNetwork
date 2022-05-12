import * as React from 'react';
import { Box, CardMedia, Divider, Typography } from '@mui/material';
import avtDef from '../assets/images/avtdefault.jpg';
import { Link, Outlet } from 'react-router-dom';
import { colors } from '../assets/style/GlobalStyles';
import { useSelector } from 'react-redux';
import { friendsSelector } from '../redux/selector';
import io from 'socket.io-client';
import Chat from '../components/Chat';
import { getDocById } from '../utilities/utilities';

const SERVER = 'http://localhost:8080';

const socket = io.connect(SERVER);

const uidLogged = localStorage.getItem('uid');
socket.on('connect', () => {
  socket.emit('userId', uidLogged);
});

socket.on('receiveId', (data) => {
  console.log(data);
});

socket.on('users', (data) => {
  console.log(data);
});
function App() {
  const [username, setUsername] = React.useState('');
  const [room, setRoom] = React.useState('');
  const [showChat, setShowChat] = React.useState(true);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

const NoMessage = () => {
  const container2 = {
    display: 'flex',
    justifyContent: 'center',
    p: '16px',
    borderRadius: '8px',
    border: `0.5px solid ${colors.btnBgColor}`,
    bgcolor: `${colors.white}`
  };
  return (
    <Box sx={container2}>
      <Typography component="div">
        <Box
          sx={{
            fontSize: 20,
            fontWeight: 'bold',
            color: `${colors.iconNotSvg}`
          }}
        >
          No message to show
        </Box>
      </Typography>
    </Box>
  );
};

const UserInfo = (props) => {
  const [loaded, setLoaded] = React.useState(false);

  // join chat with user id
  const joinChat = () => {
    socket.emit('joinChat', props.uid);
  };

  const saveUserReceiver = () => {
    localStorage.setItem('userNameReceiver', props.displayName);
    localStorage.setItem('uidUserReceiver', props.uid);
    localStorage.setItem('imgUserReceiver', props.image);
    joinChat();
  };

  //Css
  const btn = {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: props.paddingLeft ? props.paddingLeft : '',
    borderRadius: '6px',
    p: '7px',
    ':hover': {
      bgcolor: `${colors.btnBgColor}`,
      cursor: 'pointer'
    }
  };
  return (
    <Box>
      <Link
        to={props.link}
        style={{ textDecoration: 'none', color: 'unset' }}
        onClick={saveUserReceiver}
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
      {/* {popup ? <PopupChat popup={popup} /> : ''} */}
    </Box>
  );
};

const Messages = () => {
  const listFr = Object.values(useSelector(friendsSelector));
  const [friends, setFriends] = React.useState(listFr);
  React.useEffect(() => {
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
    getUsersFriend(uidLogged);
  }, []);

  // css
  const left = { width: '30%' };

  const right = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh  ', width: '100%' }}>
      <Box sx={left}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1
          }}
        >
          <Box>
            <Typography component="div">
              <Box sx={{ fontSize: 20, fontWeight: 'bold' }}>Chat</Box>
            </Typography>
          </Box>
          <Box>
            <Typography
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ...
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          {friends.map((item) => {
            return (
              <UserInfo
                key={item.uid}
                uid={item.uid}
                image={item.image}
                displayName={item.userName}
                link={`/messages/${item.uid}`}
              />
            );
          })}
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={right}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Messages;
export { NoMessage, App };
