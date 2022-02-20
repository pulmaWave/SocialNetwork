import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { collection, addDoc } from 'firebase/firestore';
import {
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
} from '../config/firebase';
import color from '../assets/style/GlobalStyles';
import UserInfo from '../components/UserInfo/UserInfo';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: `${color.colors.white}`,
  boxShadow: 24,
  minWidth: '600px',
  minHeight: '400px',
  outline: 'none',
  borderRadius: '7px',
  p: '10px'
};

const buttonModal = {
  fontSize: '16px',
  textTransform: 'capitalize',
  color: `${color.colors.gray[600]}`,
  bgcolor: `${color.colors.gray[200]}`,
  borderRadius: 10,
  marginLeft: 2,
  px: 2,
  width: '100%',
  height: '-webkit-fill-available',
  display: 'flex',
  ':hover': {
    bgcolor: `${color.colors.gray[300]}`
  }
};

const buttonPost = {
  fontSize: '16px',
  fontWeight: 'bold',
  width: '100%',
  bgcolor: `${color.colors.blue[500]}`,
  padding: '10px',
  borderRadius: '5px',
  outline: 'none',
  border: 'none',
  textAlign: 'center',
  textTransform: 'capitalize',
  marginTop: 'auto',
  color: `${color.colors.white}`,
  ':hover': {
    bgcolor: `${color.colors.blue[500]}`
  }
};

const buttonPostDisable = {
  fontSize: '16px',
  fontWeight: 'bold',
  width: '100%',
  color: `${color.colors.gray[400]}`,
  bgcolor: `${color.colors.gray[200]}`,
  padding: '10px',
  borderRadius: '5px',
  outline: 'none',
  border: 'none',
  textAlign: 'center',
  cursor: 'not-allowed',
  marginTop: 'auto'
};

const Input = styled('input')({
  display: 'none'
});

export default function KeepMountedModal() {
  const [isContent, setIsContent] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  //Display a preview of the image using the URL object
  React.useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // upload file to storage
  // const storageRef = ref(storage, `images/${selectedImage.name}`);
  // const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  const Assignment = () => {
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
          <Button variant="contained" component="span">
            Image
          </Button>
        </label>
      </>
    );
  };

  /* function to add new task to firestore */
  const handleSubmit = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `${selectedImage.name}`);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, selectedImage).then(() => {
      // uploaded success
      console.log('Uploaded a blob or file!');
      getDownloadURL(ref(storage, `${selectedImage.name}`))
        .then((url) => {
          // `url` is the download URL for `${selectedImage.name}`

          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open('GET', url);
          // send request get url from storage
          xhr.send();
          console.log('url from storage:  ', url);
          try {
            // add data to firestore
            addDoc(collection(db, 'posts', 'all', 'something'), {
              content: { isContent },
              tag: 'travel',
              imageUrl: { imageUrl },
              url: { url }
            });
          } catch (err) {
            alert(err);
          }
        })
        .catch((error) => {
          // Handle any errors
        });
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Button onClick={handleOpen} sx={buttonModal}>
        Hi There, what is going on here?
      </Button>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box>
            <Typography
              component="div"
              variant="h5"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                borderBottom: `1px solid ${color.colors.gray[400]}`,
                fontWeight: 'bold',
                p: '10px 0',
                marginBottom: 2
              }}
            >
              Create post
            </Typography>
          </Box>
          <UserInfo />
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              objectFit: 'content',
              height: 300,
              overflowX: 'hidden',
              overflowY: 'scroll',
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
          <Assignment />
          {isContent ? (
            <Button fullWidth sx={buttonPost} onClick={handleSubmit}>
              Post
            </Button>
          ) : (
            <button style={buttonPostDisable}>Post</button>
          )}
        </Box>
      </Modal>
    </div>
  );
}
