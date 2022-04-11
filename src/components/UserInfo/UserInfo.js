import * as React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import colors from '../../assets/style/GlobalStyles';

const color = colors.colors;

const UserInfo = (props) => {
  return (
    <Box>
      <Link to="/profile" style={{ textDecoration: 'none', color: 'unset' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: props.paddingLeft ? props.paddingLeft : '',
            borderRadius: '6px',
            p: '7px',
            ':hover': {
              bgcolor: `${color.btnBgColor}`,
              cursor: 'pointer'
            }
          }}
        >
          <Box
            sx={{
              borderRadius: '50%'
            }}
          >
            <CardMedia
              component="img"
              height="32px"
              image={props.image}
              alt="avatar"
              sx={{ borderRadius: '50%', marginRight: '10px', width: '32px' }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: '15px',
              textTransform: 'capitalize',
              marginLeft: '10px'
            }}
          >
            {props.displayName ? props.displayName : 'User name is loading'}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default UserInfo;
