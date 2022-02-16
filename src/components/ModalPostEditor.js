import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
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
  color: `${color.colors.gray[500]}`,
  bgcolor: `${color.colors.gray[200]}`,
  borderRadius: 5,
  marginLeft: 2,
  width: '100%',
  display: 'flex',
  flex: 1
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

export default function KeepMountedModal() {
  const [isContent, setIsContent] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Assignment = () => {
    return <Typography>Add image</Typography>;
  };

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users'), {
        born: '212312',
        first: 'born',
        last: 'asdasdasdasd',
        full: 'asdasd'
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
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
              Create a post
            </Typography>
          </Box>
          <UserInfo />
          <Box
            component="form"
            sx={{
              display: 'flex',
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
