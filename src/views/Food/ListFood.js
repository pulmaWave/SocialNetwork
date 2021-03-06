import { React, useState, useEffect } from 'react';
import Post from '../../components/Post';
import Loading from '../../layout/Loading';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getListQueryPost } from '../../utilities/utilities';
import InfiniteScroll from 'react-infinite-scroll-component';

const theme = createTheme({
  breakpoints: {
    values: {
      mb: 480,
      m600: 600,
      md: 900
    }
  }
});

const ListFood = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(1);
  const [dataLength, setDataLength] = useState(10);
  const qFood = query(
    collection(db, 'posts'),
    where('tags', 'array-contains', 'food'),
    orderBy('createAt', 'desc')
  );
  useEffect(() => {
    getListQueryPost(setLoading, setPosts, qFood);
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
          {posts.length > 0 &&
            posts.map((post) => {
              return (
                <Post
                  id={post?.id}
                  uidPost={post?.uid}
                  key={post?.id}
                  content={post?.content?.isContent}
                  url={post?.imageUrl?.url}
                  tags={post?.tags}
                  voteBy={post?.voteBy}
                  counterVote={post?.counterVote}
                  createAt={post?.createAt}
                />
              );
            })}
        </Box>
      )}
    </ThemeProvider>
  );
};

export default ListFood;
