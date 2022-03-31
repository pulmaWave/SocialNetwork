import * as React from 'react';
import * as dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addOnePost } from '../redux/action/actions';
import { setTagPost } from '../redux/selector';
import { doc, getDoc } from 'firebase/firestore';

import { collection, addDoc } from 'firebase/firestore';
import {
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
} from '../config/firebase';
import colors from '../assets/style/GlobalStyles';
import UserInfo from '../components/UserInfo/UserInfo';
import Chip from './Chip';
import { getDocById } from '../utilities/utilities';

const color = colors.colors;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mb: 480,
      md: 650
    }
  }
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: `${color.white}`,
  boxShadow: 24,
  minWidth: '480px',
  outline: 'none',
  borderRadius: '7px',
  p: '10px',
  [theme.breakpoints.down('md')]: {
    height: '98vh'
  },
  [theme.breakpoints.down('mb')]: {
    width: '96vw',
    minWidth: 'unset',
    minHeight: 'unset'
  }
};

const buttonModal = {
  fontSize: '16px',
  textTransform: 'capitalize',
  color: `${color.gray[600]}`,
  bgcolor: `${color.gray[200]}`,
  borderRadius: 10,
  marginLeft: 2,
  px: 2,
  width: '100%',
  height: '-webkit-fill-available',
  display: 'flex',
  ':hover': {
    bgcolor: `${color.gray[300]}`
  }
};

const buttonPost = {
  fontSize: '16px',
  fontWeight: 'bold',
  width: '100%',
  bgcolor: `${color.main}`,
  padding: '5px',
  borderRadius: '5px',
  outline: 'none',
  border: 'none',
  textAlign: 'center',
  textTransform: 'capitalize',
  marginTop: 'auto',
  color: `${color.white}`,
  ':hover': {
    bgcolor: `${color.blue[500]}`
  }
};

const buttonPostDisable = {
  fontSize: '16px',
  fontWeight: 'bold',
  width: '100%',
  color: `${color.gray[400]}`,
  bgcolor: `${color.gray[200]}`,
  padding: '10px',
  borderRadius: '5px',
  outline: 'none',
  border: 'none',
  textAlign: 'center',
  cursor: 'not-allowed',
  marginTop: 'auto'
};

const btnModalClose = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: `${color.gray[200]}`,
  ':hover': {
    backgroundColor: `${color.gray[700]}`
  }
};

// handle hover button create post
function MouseOVer(event) {
  event.target.style.background = `${color.gray[400]}`;
}
function MouseOut(event) {
  event.target.style.background = `${color.gray[200]}`;
}

const Input = styled('input')({
  display: 'none'
});

export default function KeepMountedModal() {
  const textInput = React.useRef(null);
  const [isContent, setIsContent] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const dispatch = useDispatch();

  //list tag from redux
  const tags = useSelector(setTagPost);
  //Display a preview of the image using the URL object
  React.useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  // handle open, close create post
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ButtonImage = () => {
    return (
      <>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
          <Button
            variant="contained"
            component="span"
            sx={{ bgcolor: `${color.main}` }}
          >
            Image
          </Button>
        </label>
      </>
    );
  };

  // get one post from firestore
  const getPost = async (id) => {
    const noteSnapshot = await getDoc(doc(db, 'posts', id));
    if (noteSnapshot.exists()) {
      return noteSnapshot.data();
    } else {
      console.log("Note doesn't exist");
    }
  };
  // add post to firestore
  const addPost = (imgUrl) => {
    try {
      // add data to firestore
      addDoc(collection(db, 'posts'), {
        uid: localStorage.getItem('uid'),
        content: { isContent },
        tags: Object.values(tags),
        imageUrl: imgUrl ? { url: imgUrl } : '',
        voteBy: [],
        counterVote: 0
      }).then(async (res) => {
        const newPost = await getDocById('posts', res.id);
        dispatch(addOnePost({ id: res.id, ...newPost }));
      });
    } catch (err) {
      alert(err);
    }
  };

  /* function to add new task to firestore */
  const handleSubmit = (e) => {
    handleClose();
    e.preventDefault();
    // post with image
    if (selectedImage) {
      const storageRef = ref(storage, `${selectedImage.name}`);
      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, selectedImage).then(() => {
        // uploaded success
        getDownloadURL(ref(storage, `${selectedImage.name}`))
          .then((url) => {
            // `url` is the download URL for `${selectedImage.name}`
            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            // xhr.onload = (event) => {
            //   const blob = xhr.response;
            // };
            xhr.open('GET', url);
            // send request get url from storage
            xhr.send();
            // create a post width image (url of image)
            addPost(url);
            // clear content of post
            setSelectedImage(null);
            setImageUrl(null);
            setIsContent('');
            textInput.current.value = '';
          })
          .catch((error) => {
            // Handle any errors
          });
      });
    } else {
      //create a post without image
      addPost('');
      // clear content of post
      setIsContent('');
      textInput.current.value = '';
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Button onClick={handleOpen} sx={buttonModal}>
        How are you today?
      </Button>
      <ThemeProvider theme={theme}>
        <Modal keepMounted open={open} onClose={handleClose}>
          <Box sx={style}>
            <Box>
              {/* <IconButton open={open} onClick={handleClose}>
                <ChevronLeftIcon />
              </IconButton> */}
              <Typography
                component="div"
                variant="h5"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  borderBottom: `1px solid ${color.gray[400]}`,
                  fontWeight: 'bold',
                  pb: '10px',
                  marginBottom: 2
                }}
              >
                Create post
              </Typography>
              <button
                open={open}
                onClick={handleClose}
                style={btnModalClose}
                onMouseOver={MouseOVer}
                onMouseOut={MouseOut}
              >
                X
              </button>
            </Box>
            <UserInfo paddingLeft={'10px'} />
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                objectFit: 'content',
                overflowX: 'hidden',
                overflowY: 'scroll',
                maxHeight: '300px',
                '& .MuiTextField-root': { m: 1, width: '100%' }
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="What is going on here?"
                inputRef={textInput}
                onChange={(event) => {
                  setIsContent(event.target.value);
                }}
                sx={{
                  outline: 'none',
                  border: 'none',
                  '&hover:': {
                    outline: 'none'
                  }
                }}
              />
              {imageUrl && selectedImage && (
                <Box mt={2} textAlign="center">
                  <img src={imageUrl} alt={selectedImage.name} height="300px" />
                </Box>
              )}
            </Box>
            <ButtonImage />
            <Chip />
            {isContent || (imageUrl && selectedImage) ? (
              <Button fullWidth sx={buttonPost} onClick={handleSubmit}>
                Post
              </Button>
            ) : (
              <button style={buttonPostDisable}>Post</button>
            )}
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}
