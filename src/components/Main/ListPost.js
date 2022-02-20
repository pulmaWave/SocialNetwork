import React from 'react';
import Post from './Post';
import { Box } from '@mui/material';

import ShowCreatePost from '../../components/ShowCreatePost';
import { db } from '../../config/firebase'; // update with your path to firestore config
import { doc, getDoc } from 'firebase/firestore';

const ListPost = () => {
  const listId = { id: 'xgX64X6Sn5fjjuiMMQ7T' };
  const getNote = async (id) => {
    const noteSnapshot = await getDoc(doc(db, 'users', id));
    if (noteSnapshot.exists()) {
      console.log('getDOc from firebase', noteSnapshot.data());
      return noteSnapshot.data();
    } else {
      console.log("Note doesn't exist");
    }
  };
  getNote(listId.id);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        mt: '30px',
        paddingBottom: '20px'
      }}
    >
      <ShowCreatePost />
      <Post />
      <Post />
      <Post />
      <Post />
    </Box>
  );
};

export default ListPost;
