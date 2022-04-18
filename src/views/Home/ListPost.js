import { React, useState, useEffect } from 'react';
import Post from '../../components/Post';
import Loading from '../../layout/Loading';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  getDocs,
  collection,
  orderBy,
  query,
  limit,
  startAfter
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addListPost, addMorePost } from '../../redux/action/actions';
import { listPostSelector } from '../../redux/selector';
import ShowCreatePost from '../../components/ShowCreatePost';
import Spinner from '../../components/Spinner';
import { getDocById } from '../../utilities/utilities';
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

const ListPost = () => {
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(1);
  const [dataLength, setDataLength] = useState(4);
  const [countPosts, setCountPosts] = useState(0);
  const dispatch = useDispatch();
  // get list post from redux
  const listPosted = useSelector(listPostSelector)['items'] || [];

  useEffect(() => {
    // get 4 posts from posts collection
    const getList = async () => {
      const listPost = await getDocs(query(collection(db, 'posts')));
      setCountPosts(listPost.size); //listPost.size is count item in listPost

      const documents = await getDocs(
        query(collection(db, 'posts'), orderBy('createAt', 'desc'), limit(4))
      );
      let arr = [];
      documents.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push({
          id: doc.id,
          ...doc.data()
        });
      });
      // send data to store redux
      dispatch(addListPost(arr));
      setLoading(false);
      // set index previous post
      setLastVisible(documents.docs[documents.docs.length - 1]);
    };
    setLoading(true);
    getList();
    //get information user
    getDocById('users', localStorage.getItem('uid')).then((data) => {
      localStorage.setItem('avt', data.image);
    });
    return () => {
      getList();
    };
  }, []);

  // fetch more data from firestore
  const fetchMoreData = async () => {
    const next = await getDocs(
      query(
        collection(db, 'posts'),
        orderBy('createAt', 'desc'),
        startAfter(lastVisible),
        limit(4)
      )
    );
    let arr = [];
    next.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push({
        id: doc.id,
        ...doc.data()
      });
    });
    // send data to store redux
    dispatch(addMorePost(arr));
    // set index previous post
    setLastVisible(next.docs[next.docs.length - 1]);
    // set count posts wanna display
    setDataLength(dataLength + 4);
  };

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
          <ShowCreatePost />
          <InfiniteScroll
            dataLength={dataLength}
            next={fetchMoreData}
            hasMore={countPosts === listPosted.length ? false : true}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            loader={<Spinner />}
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            {listPosted.length > 0 &&
              listPosted.map((post) => {
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
          </InfiniteScroll>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default ListPost;
