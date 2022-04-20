import { ConstructionOutlined } from '@mui/icons-material';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  onSnapshot,
  query,
  where,
  documentId,
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
    console.log('error: ', err);
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

const fetchMoreData = async (
  query,
  setLastVisible,
  dataLength,
  setDataLength
) => {
  const data = await getDocs(query);
  let arr = [];
  data.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arr.push({
      id: doc.id,
      ...doc.data()
    });
  });
  // send data to store redux
  // dispatch(addMorePost(arr));
  // set index previous post
  setLastVisible(data.docs[data.docs.length - 1]);
  // set count posts wanna display
  setDataLength(dataLength + 10);
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

const getDocByIds = async (collections, ids) => {
  const noteSnapshot = await getDocs(
    query(collection(db, 'users'), where(documentId(), 'in', ids))
  );
  console.log('noteSnapshot', noteSnapshot.docs);
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
  onSnapshot(subColRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        arr.push({
          id: change.doc.id,
          ...change.doc.data()
        });
      }
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
  getSubColRTime,
  fetchMoreData,
  getDocByIds
};
