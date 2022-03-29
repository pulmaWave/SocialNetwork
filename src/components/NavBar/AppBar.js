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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconsBar from '../../theme/IconsBar';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchModal from '../../components/SearchModal';

// import Tabs from '../Tabs';
import colors from '../../assets/style/GlobalStyles';
const color = colors.colors;

const theme = createTheme({
  breakpoints: {
    values: {
      mb: 480,
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

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      console.log('token', token);
      navigate('/sign-in', { replace: true });
    }
  });

  const handleMenuSignOut = () => {
    localStorage.removeItem('token');
    signOut(auth)
      .then(() => {
        navigate('/sign-in');
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  return (
    <Box>
      <AppBar sx={{ backgroundColor: `${color.white}` }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            bgcolor: `${color.main}`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '400px' }}>
            <ThemeProvider theme={theme}>
              <IconButton
                size="medium"
                edge="start"
                color="primary"
                aria-label="open drawer"
                sx={{
                  mr: 2,
                  color: `${color.white}`,
                  [theme.breakpoints.down('mb')]: {
                    mr: 'unset'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Box sx={{ width: '100%' }}>
                <SearchModal />
              </Box>
            </ThemeProvider>
          </Box>
          <Box
            sx={{
              color: `${color.gray[500]}`,
              width: '100%',
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center'
            }}
          >
            <IconsBar color={`${color.white}`} />
          </Box>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                width: 400,
                [theme.breakpoints.down('mb')]: {
                  width: 'fit-content'
                }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <IconButton
                  size="medium"
                  aria-label="show 4 new mails"
                  color="primary"
                >
                  <Badge badgeContent={4} color="error">
                    <Link to="/messages" style={{ display: 'flex' }}>
                      <MailIcon
                        fontSize="medium"
                        sx={{ color: `${color.white}` }}
                      />
                    </Link>
                  </Badge>
                </IconButton>
                <IconButton
                  size="medium"
                  aria-label="show 17 new notifications"
                  color="primary"
                >
                  <Badge badgeContent={17} color="error">
                    <Link to="/notification" style={{ display: 'flex' }}>
                      <NotificationsIcon
                        fontSize="medium"
                        sx={{ color: `${color.white}` }}
                      />
                    </Link>
                  </Badge>
                </IconButton>
                <IconButton
                  size="medium"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="primary"
                >
                  <KeyboardArrowDownIcon
                    fontSize="medium"
                    sx={{ color: `${color.white}` }}
                  />
                </IconButton>
              </Box>
            </Box>
          </ThemeProvider>
        </Toolbar>
        <Box
          sx={{
            backgroundColor: 'white',
            display: { xs: 'none', md: 'none' },
            [theme.breakpoints.down('md')]: {
              display: 'flex'
            },
            [theme.breakpoints.down('mb')]: {
              display: 'none'
            },
            justifyContent: 'center'
          }}
        >
          <IconsBar color={`${color.main}`} />
        </Box>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
