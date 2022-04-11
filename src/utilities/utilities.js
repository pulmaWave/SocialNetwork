import {
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  onSnapshot
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

//get sub collection
// collection/document/sub_collection
const getSubCollection = async (subColRef, setSubClt) => {
  // const subColRef = collection(db, collectionName, document, subCollection);
  getDocs(subColRef).then((res) => {
    let arr = [];
    res.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push({
        id: doc.id,
        ...doc.data()
      });
    });
    setSubClt(arr);
  });
};
const getSubColRTime = async (subColRef, setSubClt) => {
  // const subColRef = collection(db, collectionName, document, subCollection);
  let arr = [];
  onSnapshot(subColRef, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      arr.push({
        id: doc.id,
        ...doc.data()
      });
    });
    setSubClt(arr);
  });
};

export {
  getCollection,
  addUser,
  getListQueryPost,
  getDocById,
  getSubCollection,
  getSubColRTime
};
