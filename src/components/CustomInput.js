import * as React from 'react';
import { Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Camera from '../components/icons/CameraSvg';
import colors from '../assets/style/GlobalStyles';

const color = colors.colors;

const CustomizedInputBase = (handleBtnCmt) => {
  let textInput = React.useRef(null);
  return (
    <Box
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        borderRadius: '50px',
        bgcolor: `${color.bgcolor}`
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: '15px' }}
        placeholder="Write something now"
        inputProps={{ 'aria-label': 'search google maps' }}
        inputRef={textInput}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton sx={{ p: '10px' }}>
        <Camera fill={color.iconNotSvg} size={16} />
      </IconButton>
    </Box>
  );
};

export default CustomizedInputBase;
