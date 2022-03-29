import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth();
export const signInWithEmailAndPasswordMethod = (email, password, navigate) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('user id: ', user.uid);
      // save data to localStorage
      localStorage.setItem('userName', user.displayName.toLowerCase());
      localStorage.setItem('uid', user.uid);
      localStorage.setItem('token', user.token);
      navigate('/', { replace: true });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
