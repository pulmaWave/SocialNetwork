import {
  Box,
  InputBase,
  Typography,
  CardMedia,
  IconButton
} from '@mui/material';
import { React, useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import avtDef from '../assets/images/avtdefault.jpg';
import SendSvg from '../components/icons/PlainSvg';
import { colors } from '../assets/style/GlobalStyles';
import './Chat.css';
import { Link } from 'react-router-dom';

function Chat({ socket, username, room }) {
  const [loaded, setLoaded] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const uidLogged = localStorage.getItem('uid');
  const img = localStorage.getItem('imgUserReceiver');
  const displayName = localStorage.getItem('userNameReceiver');
  const uidReceiver = localStorage.getItem('uidUserReceiver');
  const author = localStorage.getItem('userName');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const abc = () => {
    console.log('listMsChat', messageList);
    console.log('socket', socket);
  };

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        receiver: uidReceiver,
        authorUid: uidLogged,
        author: author,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes()
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      console.log('list chat', messageList);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  // set background color for author
  const you = {
    p: '8px 12px',
    maxWidth: '70%',
    borderRadius: '18px',
    bgcolor: `${colors.main}`
  };

  // set background color for receive
  const other = {
    p: '8px 12px',
    maxWidth: '70%',
    borderRadius: '18px',
    bgcolor: `${colors.bgcolor}`
  };

  // set text color and font weight bold for author 
  const youText = {
    color: `${colors.white}`,
    fontSize: '15px',
    fontWeight: 'bold'
  };

  // set content color for author
  const youTextCt = {
    color: `${colors.white}`,
    fontSize: '15px',
    wordBreak: 'break-word'
  };

  // set font weight bold for receiver
  const otherText = {
    fontSize: '15px',
    fontWeight: 'bold'
  };

  const otherTextCt = {
    fontSize: '15px',
    wordBreak: 'break-word'
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          boxShadow: 1,
          boxSizing: 'border-box',
          width: '70%',
          position: 'fixed',
          top: 0,
          bgcolor: 'white',
          p: '5px 10px',
          zIndex: 9
        }}
      >
        <Link
          to={`/profile=${uidReceiver}`}
          style={{
            textDecoration: 'none',
            color: 'unset',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              width: 'fit-content',
              display: 'flex',
              alignItems: 'center',
              p: '5px 10px',
              ':hover': {
                bgcolor: `${colors.bgcolor}`
              }
            }}
          >
            <CardMedia
              component="img"
              height="32"
              image={img}
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
            <Typography component="div" sx={{ fontSize: 15, ml: '10px' }}>
              {displayName}
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box
        sx={{
          height: 'calc(100vh - 102px)',
          width: '100%',
          pl: '10px'
        }}
      >
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <Box
                key={index}
                className="message"
                id={uidLogged === messageContent.author ? 'you' : 'other'}
                sx={{}}
              >
                <Box sx={{ my: 1 }}>
                  <Box
                    sx={
                      uidLogged === messageContent.authorUid
                        ? {
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-end'
                          }
                        : {
                            display: 'flex',
                            alignItems: 'flex-start'
                          }
                    }
                  >
                    <Link
                      to={`/`}
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
                        image={avtDef}
                        onLoad={() => {
                          setLoaded(true);
                        }}
                        alt="avatar"
                        sx={
                          loaded
                            ? {
                                borderRadius: '50%',
                                marginRight: '10px',
                                width: '32px'
                              }
                            : { display: 'none' }
                        }
                      />
                      {loaded ? null : (
                        <CardMedia
                          component="img"
                          height="32px"
                          image={avtDef}
                          alt="avatar"
                          sx={{
                            borderRadius: '50%',
                            marginRight: '10px',
                            width: '32px'
                          }}
                        />
                      )}
                    </Link>
                    <Box
                      sx={uidLogged === messageContent.authorUid ? you : other}
                    >
                      <Link
                        to={`/profile=123`}
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
                            sx={
                              uidLogged === messageContent.authorUid
                                ? youText
                                : otherText
                            }
                          >
                            {messageContent.author}
                          </Box>
                        </Typography>
                      </Link>
                      <Typography component="div">
                        <Box
                          sx={
                            uidLogged === messageContent.authorUid
                              ? youTextCt
                              : otherTextCt
                          }
                        >
                          {messageContent.message.replaceAll('\\n', '\n')}
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </ScrollToBottom>
      </Box>
      <Box
        sx={{
          boxShadow: ' 0 -1px 1px -1px gray',
          boxSizing: 'border-box',
          width: '70%',
          position: 'fixed',
          bottom: 0,
          bgcolor: 'white'
        }}
      >
        <Box
          sx={{
            maxHeight: '150px',
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            boxShadow: 1,
            p: '10px 20px'
          }}
        >
          <InputBase
            multiline
            maxRows={4}
            type="text"
            value={currentMessage}
            placeholder="Type something now"
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={handleKeyPress}
            sx={{
              border: '0.5px solid gray',
              borderRadius: '18px',
              p: '4px 10px 5px',
              flex: 1,
              fontSize: 15
            }}
          />
          <IconButton onClick={abc}>
            <SendSvg fill={colors.main} size={20} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Chat;
