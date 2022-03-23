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
import {
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db } from '../config/firebase';

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

  const addUser = (uid) => {
    try {
      // add data to firestore
      addDoc(collection(db, 'users'), {
        uid: uid,
        email: '',
        password: '',
        image: ''
      }).then(async (res) => {
        console.log('uid: ', res.id);
      });
    } catch (err) {
      alert(err);
    }
  };

  // get UserId from firestore
  const getUserId = async (uid) => {
    let arr = [];
    try {
      // const data = await getDocs(
      //   query(collection(db, 'users'), where('uid', '==', uid))
      // );
      //   console.log('data ', data)

      return await getDocs(collection(db, 'users')).then((res) => {
        let arr = [];
        res.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          arr.push({
            id: doc.id,
            ...doc.data()
          });
        });
        console.log('arr: ', arr);
        return arr;
      });

      // if (data) {
      //   data.forEach((doc) => {
      //     // arr.push({
      //     //   id: doc.id,
      //     //   ...doc.data()
      //     // });
      //     console.log('doc.data(): ', doc.data());
      //   });
      //   console.log('arr: ', arr);
      //   // return arr;
      // }
    } catch (err) {
      console.log(err);
    }
  };

  async function googleHandler() {
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const userExist = await getUserId(user.uid);
        console.log('user exist: ', userExist);
        if (user.uid !== userExist[0].uid) {
          addUser(user.uid);
        } else {
          console.log('user exist');
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
