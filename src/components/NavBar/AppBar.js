import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconsBar from '../../theme/IconsBar';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import Tabs from '../Tabs';
import colors from '../../assets/style/GlobalStyles';
const color = colors.colors;

const theme = createTheme({
  breakpoints: {
    values: {
      w600: 600,
      md: 900,
      menu: 1150
    }
  }
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));


export default function PrimarySearchAppBar() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuSignOut = () => {
    localStorage.removeItem('token');
    signOut(auth)
      .then(() => {
        console.log('logged out');
        navigate('/sign-in');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // React.useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token === null) {
  //     console.log('token', token);
  //     navigate('/sign-in', { replace: true });
  //   }
  // });

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Setting</MenuItem>
      <MenuItem onClick={(handleMenuClose, handleMenuSignOut)}>
        Log out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right'
  //     }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right'
  //     }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //     <MenuItem>
  //       <IconButton size="large" aria-label="show 4 new mails" color="inherit">
  //         <Badge badgeContent={4} color="error">
  //           <MailIcon sx={{ width: '40px', height: '40px' }} />
  //         </Badge>
  //       </IconButton>
  //       <p>Messages</p>
  //     </MenuItem>
  //     <MenuItem>
  //       <IconButton
  //         size="large"
  //         aria-label="show 17 new notifications"
  //         color="inherit"
  //       >
  //         <Badge badgeContent={17} color="error">
  //           <NotificationsIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Notifications</p>
  //     </MenuItem>
  //     <MenuItem onClick={handleProfileMenuOpen}>
  //       <IconButton
  //         size="large"
  //         aria-label="account of current user"
  //         aria-controls="primary-search-account-menu"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <AccountCircle />
  //       </IconButton>
  //       <p>Profile</p>
  //     </MenuItem>
  //   </Menu>
  // );

  return (
    <Box>
      <AppBar sx={{ backgroundColor: `${color.white}` }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '400px' }}>
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="open drawer"
              sx={{ mr: 2, color: `${color.gray[500]}` }}
            >
              <MenuIcon />
            </IconButton>
            <ThemeProvider theme={theme}>
              <Search
                sx={{
                  borderRadius: 5,
                  color: `${color.gray[500]}`,
                  backgroundColor: `${color.gray[100]}`
                }}
              >
                <SearchIconWrapper sx={{ left: 0, right: 0 }}>
                  <SearchIcon />
                </SearchIconWrapper>
                <Button
                  sx={{
                    width: 'inherit',
                    borderRadius: 5,
                    padding: '10px 20px 25px 20px',
                  }}
                />
              </Search>
            </ThemeProvider>
          </Box>
          <Box
            sx={{
              color: `${color.gray[500]}`,
              width: '100%',
              display: { xs: 'none', md: 'block' }
            }}
          >
            <IconsBar />
            {/* <Tabs /> */}
          </Box>
          <Box sx={{ width: 400 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="primary"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon
                    fontSize="large"
                    sx={{ color: `${color.gray[500]}` }}
                  />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="primary"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon
                    fontSize="large"
                    sx={{ color: `${color.gray[500]}` }}
                  />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="primary"
              >
                <KeyboardArrowDownIcon
                  fontSize="large"
                  sx={{ color: `${color.gray[500]}` }}
                />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'none' },
                justifyContent: 'end'
              }}
            >
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                sx={{ fontSize: '40px', color: `${color.gray[500]}` }}
              >
                <MoreIcon
                  sx={{ fontSize: '40px', color: `${color.gray[500]}` }}
                />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {renderMenu}
    </Box>
  );
}
