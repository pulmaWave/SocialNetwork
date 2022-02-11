import React from 'react';
import './App.css';

import Homepage from './views/homepage.js';
import colors from './assets/style/GlobalStyles';

const color = colors.colors;

function App() {
  return (
    <div className="App" style={{backgroundColor: `${color.gray[100]}`}}>
      <Homepage />
    </div>
  );
}

export default App;
