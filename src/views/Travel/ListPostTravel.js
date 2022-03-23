import { React, useState, useEffect } from 'react';
import Post from '../../components/Main/Post';
import Loading from '../../layout/Loading';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CreatePost from '../../components/ShowCreatePost';
import { getDocs, collection, query, where, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // import locale

const theme = createTheme({
  breakpoints: {
    values: {
      mb: 480,
      m600: 600,
      md: 900
    }
  }
});

const ListPostTravel = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const qTravel = query(
    collection(db, 'posts'),
    where('tag', '==', 'travel'),
    limit(10)
  );
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
      });
      setPosts(arr);
      setLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            mt: '20px',
            paddingBottom: '20px',
            [theme.breakpoints.down('md')]: {
              mt: '80px'
            },
            [theme.breakpoints.down('m600')]: {
              mt: '50px'
            },
            [theme.breakpoints.down('mb')]: {
              mt: 'unset'
            }
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
      )}
    </ThemeProvider>
  );
};

export default ListPostTravel;
