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

//get list collection from firebase
const getCollection = async (collectionName) => {
  try {
    return await getDocs(collection(db, collectionName)).then((res) => {
      let arr = [];
      res.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return arr;
    });
  } catch (err) {
    console.log(err);
  }
};

// add information of user then they logged
const addUser = (uid, userName, email, dateOfBirth, image) => {
  try {
    // add data to firestore
    addDoc(collection(db, 'users'), {
      uid: uid,
      userName: userName ? userName : '',
      email: email ? email : '',
      dateOfBirth: dateOfBirth ? dateOfBirth : '',
      image: image ? image : ''
    }).then(async (res) => {
      console.log('id document add user: ', res.id);
    });
  } catch (err) {
    alert(err);
  }
};

// get list post follow query
const getListQueryPost = (setLoading, setPosts, query) => {
  setLoading(true);
  getDocs(query).then((res) => {
    let arr = [];
    res.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push({
        id: doc.id,
        ...doc.data()
      });
    });
    setPosts(arr);
    console.log('list post travel: ', arr);
    setLoading(false);
  });
};

export { getCollection, addUser, getListQueryPost };
