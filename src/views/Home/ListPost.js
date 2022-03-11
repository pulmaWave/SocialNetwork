import { React, useState, useEffect } from 'react';
import Post from '../../components/Main/Post';
import { Box } from '@mui/material';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addListPost } from '../../redux/action/actions';
import { listPostSelector } from '../../redux/selector';
import ShowCreatePost from '../../components/ShowCreatePost';

const ListPost = () => {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(false);
  const dispatch = useDispatch();
  // get list post from redux
  const listPosted = useSelector(listPostSelector)["items"] || [];
  console.log('list post from redux: ', listPosted);

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
      //console.log(arr)
      dispatch(addListPost(arr));
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
        paddingBottom: '20px'
      }}
    >
      <ShowCreatePost />
      {listPosted.length > 0 &&
        listPosted.map((post) => {
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

export default ListPost;
