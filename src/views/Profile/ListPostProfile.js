import { React, useState, useEffect } from 'react';
import Post from '../../components/Post';
import Loading from '../../layout/Loading';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getDocs, collection, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addListPostProfile } from '../../redux/action/actions';
import { listPostProfileSelector } from '../../redux/selector';
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

const ListPostProfile = ({ check, user }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // get list post from redux
  const listPosted = useSelector(listPostProfileSelector)['items'] || [];
  useEffect(() => {
    setLoading(true);
    try {
      getDocs(
        query(
          collection(db, 'posts'),
          where('uid', '==', user),
          orderBy('createAt', 'desc')
        )
      ).then((res) => {
        let arr = [];
        res.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          arr.push({
            id: doc.id,
            ...doc.data()
          });
        });
        //send data to store redux
        dispatch(addListPostProfile(arr));
        setLoading(false);
      });
    } catch (error) {
      console.log('err get post by id');
    }
  }, [user]);

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
              // mt: '80px'
            },
            [theme.breakpoints.down('m600')]: {
              // mt: '50px'
            },
            [theme.breakpoints.down('mb')]: {
              mt: 'unset'
            }
          }}
        >
          {check && <ShowCreatePost />}
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
        </Box>
      )}
    </ThemeProvider>
  );
};

export default ListPostProfile;
