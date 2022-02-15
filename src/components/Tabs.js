import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

export default function ColorTabs() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="red"
        aria-label="secondary tabs example"
      >
        <Link to="/">
          <Tab value="one" label="Item One" />
        </Link>
        <Link to="/travel">
          <Tab value="two" label="Item Two" />
        </Link>
        <Tab value="three" label="Item Three" />
      </Tabs>
    </Box>
  );
}
