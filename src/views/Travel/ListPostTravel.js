import { React, useState, useEffect } from 'react';
import Post from '../../components/Main/Post';
import { Box } from '@mui/material';
import CreatePost from '../../components/ShowCreatePost';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // import locale
import { Dispatch } from 'react';

const ListPostTravel = () => {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(false);
  const qTravel = query(collection(db, 'posts'), where('tag', '==', 'travel'));
  useEffect(() => {
    setLoading(true);
    getDocs(qTravel).then((res) => {
      let arr = [];
      res.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push({
          id: doc.id,
          ...doc.data()
        });
        console.log(doc.data(), '=>', dayjs().format());
      });
      setPosts(arr);
      setLoading(false);
    });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        mt: '30px',
        paddingBottom: '70px'
      }}
    >
      <CreatePost />
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <Post
              key={post?.id}
              content={post?.content?.isContent}
              url={post?.imageUrl?.url}
              tag={post?.tag}
            />
          );
        })}
    </Box>
  );
};

export default ListPostTravel;
