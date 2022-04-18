import { React, useState, useEffect } from 'react';
import Post from '../../components/Post';
import Loading from '../../layout/Loading';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import Spinner from '../../components/Spinner';
import { db } from '../../config/firebase';
import { getListQueryPost, fetchMoreData } from '../../utilities/utilities';
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

const ListPostTravel = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countPosts, setCountPosts] = useState(0);
  const [lastVisible, setLastVisible] = useState(1);
  const [dataLength, setDataLength] = useState(10);
  const qTravel = query(
    collection(db, 'posts'),
    where('tags', 'array-contains', 'travel'),
    orderBy('createAt', 'desc'),
    limit(10)
  );
  useEffect(() => {
    const getList = async () => {
      const listPost = await getDocs(query(collection(db, 'posts')));
      setCountPosts(listPost.size); //listPost.size is count item in listPost
    };
    getList();
    getListQueryPost(setLoading, setPosts, qTravel);
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
          <InfiniteScroll
            dataLength={dataLength}
            next={fetchMoreData(
              query,
              dataLength,
              setDataLength,
              setLastVisible
            )}
            hasMore={countPosts === posts.length ? false : true}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            loader={<Spinner />}
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            {posts.length > 0 &&
              posts.map((post) => {
                return (
                  <Post
                    id={post?.id}
                    key={post?.id}
                    uidPost={post?.uid}
                    content={post?.content?.isContent}
                    url={post?.imageUrl?.url}
                    tags={post?.tags}
                    voteBy={post?.voteBy}
                    counterVote={post?.counterVote}
                    createAt={post?.createAt}
                  />
                );
              })}
          </InfiniteScroll>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default ListPostTravel;
