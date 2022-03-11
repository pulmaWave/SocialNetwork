import React from 'react';
import logo from '../../assets/images/1.jpg';
import colors from '../../assets/style/GlobalStyles.js';
import { styled } from '@mui/system';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const navbar = () => {
  const color = colors.colors;

  const Logo = styled('div')({
    backgroundImage: `url(${logo})`,
    width: '40px',
    height: '40px',
    borderRadius: '50px',
    display: 'flex',
    objectFit: 'cover'
  });

  return (
    <div
      style={{
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: '#fff'
      }}
    >
      <div className="logo">
        <Logo alt="logo app" />
      </div>
      <InputBase
        placeholder="Search on Social network"
        sx={{
          border: '1px solid grey',
          boxShadow: 1,
          backgroundColor: `${color.blue[50]}`,
          borderRadius: 5,
          p: '0 10px',
          marginLeft: '10px'
        }}
      />
    </div>
  );
};

export default navbar;
