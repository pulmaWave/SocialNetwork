// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDMlt0fw4K6RbDSArqWJ2swlksQWF-GjE4',
  authDomain: 'social-network-c70bf.firebaseapp.com',
  projectId: 'social-network-c70bf',
  storageBucket: 'social-network-c70bf.appspot.com',
  messagingSenderId: '97491422198',
  appId: '1:97491422198:web:6e03be8e079c500ac515d7',
  measurementId: 'G-BC3DW7NX6G'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
