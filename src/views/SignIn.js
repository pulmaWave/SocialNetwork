import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LinkNormal from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';

import firebase from '../config/firebase';

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const handlerGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlerFacebookSignIn = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    // const accessToken = localStorage.getItem('accessToken');

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('accessToken', user.multiFactor.user.accessToken);
        navigate('/', { replace: true });
      }
    });
  });

  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken !== null) {
      console.log('accessToken', accessToken);
      navigate('/', { replace: true });
      console.log(window.location.href);
    }
  });

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password')
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={handlerGoogleSignIn}
            >
              Sign in with google
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={handlerFacebookSignIn}
            >
              Sign in with facebook
            </Button>
            <Grid container>
              <Grid item xs>
                <LinkNormal href="#" variant="body2">
                  Forgot password?
                </LinkNormal>
              </Grid>
              <Grid item>
                <Link to="/sign-up">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
