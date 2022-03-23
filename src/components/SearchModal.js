import * as React from 'react';
import { styled, Box } from '@mui/system';
import Button from '@mui/material/Button';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import colors from '../assets/style/GlobalStyles';
// import SearchBar from '../components/SearchBar';
import { Paper, InputBase, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const color = colors.colors;

const theme = createTheme({
  breakpoints: {
    values: {
      mb: 480,
      m600: 600,
      md: 900
    }
  }
});

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

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

const style = {
  borderRadius: '5px',
  height: 500,
  [theme.breakpoints.down('mb')]: {
    height: '100%',
    borderRadius: 'unset'
  },
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 1
};

const searchModal = {
  display: 'flex',
  p: '15px 15px 15px 0',
  [theme.breakpoints.up('mb')]: {
    p: '15px'
  },
  [theme.breakpoints.down('mb')]: {
    borderBottom: `1px solid ${color.stone[200]}`
  }
};

export default function SearchModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Search
        sx={{
          borderRadius: 5,
          color: `${color.gray[500]}`,
          backgroundColor: `${color.white}`,
          width: '100%'
        }}
      >
        <SearchIconWrapper sx={{ left: 0, right: 0 }}>
          <SearchIcon />
          Search
        </SearchIconWrapper>
        <Button
          onClick={handleOpen}
          sx={{
            width: 'inherit',
            borderRadius: 5,
            padding: '10px 20px 25px 20px'
          }}
        />
      </Search>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          {/* search modal */}
          <Box sx={searchModal}>
            <IconButton
              open={open}
              onClick={handleClose}
              sx={{ display: { mb: 'none' } }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <Paper
              component="form"
              sx={{
                width: '100%',
                borderRadius: '25px',
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                bgcolor: `${color.gray[100]}`
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Something"
                inputProps={{ 'aria-label': 'search something' }}
              />
              <IconButton type="submit" sx={{ p: '7px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
        </Box>
      </StyledModal>
    </div>
  );
}
