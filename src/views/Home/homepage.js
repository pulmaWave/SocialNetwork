import React, { useEffect, useState } from 'react';
import AppBar from '../../components/NavBar/AppBar';
import Main from '../../components/Main/Main';
import IconsBar from '../../theme/IconsBar';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import colors from '../../assets/style/GlobalStyles';
import ScrollToTop from '../../components/ScrollToTop';
import { useSelector } from 'react-redux';
import PopupChat from '../../components/PopupChat';
import { popUpSelector } from '../../redux/selector';

const color = colors.colors;

const theme = createTheme({
  breakpoints: {
    values: {
      mb: 480,
      md: 900
    }
  }
});

const Homepage = () => {
  const popUpRedux = useSelector(popUpSelector);
  const [popup, setPopup] = useState(popUpRedux);

  useEffect(() => {
    setPopup(Object.values(popUpRedux));
  }, [popUpRedux]);
  return (
    <Box>
      <ScrollToTop />
      <Box sx={{ marginBottom: '65px' }}>
        <AppBar />
      </Box>
      <Box>
        <Main />
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
      <Box
        sx={{
          position: 'relative',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            position: 'fixed',
            bottom: 0,
            right: 0
          }}
        >
          {popup.length > 0 &&
            popup.map((chat) => {
              return (
                <PopupChat
                  key={chat.uid}
                  uid={chat.uid}
                  displayName={chat.displayName}
                  image={chat.image}
                />
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
