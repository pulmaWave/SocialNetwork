import { React, useState, useEffect } from 'react';
import Post from '../../components/Post';
import Loading from '../../layout/Loading';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addListPost } from '../../redux/action/actions';
import { listPostSelector } from '../../redux/selector';
// import { getCollection } from '../../utilities/utilities';
import ShowCreatePost from '../../components/ShowCreatePost';

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
  const dispatch = useDispatch();
  // get list post from redux
  const listPosted = useSelector(listPostSelector)['items'] || [];

  useEffect(() => {
    setLoading(true);
    getDocs(collection(db, 'posts')).then((res) => {
      let arr = [];
      res.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push({
          id: doc.id,
          ...doc.data()
        });
      });
      //send data to store redux
      dispatch(addListPost(arr));
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
          <ShowCreatePost />
          {listPosted.length > 0 &&
            listPosted.map((post) => {
              return (
                <Post
                  id={post?.id}
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

export default ListPost;
