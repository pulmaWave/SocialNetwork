// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDdHzJ7SQOQEqn7d2gyEedU0A6lgbFhSk0',
  authDomain: 'socialnetwork-43186.firebaseapp.com',
  projectId: 'socialnetwork-43186',
  storageBucket: 'socialnetwork-43186.appspot.com',
  messagingSenderId: '355804540045',
  appId: '1:355804540045:web:018a1aeaee4a8db3e8c6c4',
  measurementId: 'G-CZWMGKSQBN'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
console.log(db);
provider.setCustomParameters({ prompt: 'select_account' });
export { db, auth, provider };
