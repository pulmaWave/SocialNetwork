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
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getCollection, addUser } from '../utilities/utilities';
import colors from '../assets/style/GlobalStyles';

const color = colors.colors;
const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      console.log('token page  signIn', token);
      navigate('/', { replace: true });
    }
  });

  async function googleHandler() {
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        const userList = await getCollection('users');
        const userExist = userList.every((acc) => acc.uid !== user.uid);
        try {
          if (userExist === true) {
            // userExist  === true but actually user not exist =)) it's real
            addUser(user.uid, user.displayName, user.email, user.photoURL);
          }
        } catch (error) {
          console.log(error);
        }
        // save data to localStorage
        localStorage.setItem('userName', user.displayName.toLowerCase());
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('token', token);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error.message);
      });
  }

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
          <Avatar sx={{ m: 1, bgcolor: `${color.main}` }}>
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
              sx={{
                mt: 2,
                mb: 1,
                bgcolor: `${color.main}`,
                '&:hover': {
                  bgcolor: `${color.sky[900]}`
                }
              }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                bgcolor: `${color.main}`,
                '&:hover': {
                  bgcolor: `${color.sky[900]}`
                }
              }}
              onClick={googleHandler}
            >
              Sign in with google
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
