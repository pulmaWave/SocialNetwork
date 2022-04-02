import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../config/firebase';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  setDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore';

import { db } from '../config/firebase';
import { display } from '@mui/system';

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
const addUser = (uid, displayName, email, image, dateOfBirth) => {
  try {
    // add data to firestore
    setDoc(doc(db, 'users', uid), {
      uid: uid,
      userName: displayName ? displayName : '',
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
    setLoading(false);
  });
};

// get one post from firestore
const getDocById = async (collection, id) => {
  const noteSnapshot = await getDoc(doc(db, collection, id));
  if (noteSnapshot.exists()) {
    return noteSnapshot.data();
  } else {
    console.log("Note doesn't exist");
  }
};

export { getCollection, addUser, getListQueryPost, getDocById };
