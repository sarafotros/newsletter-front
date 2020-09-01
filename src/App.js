import React from 'react';
import { CssBaseline } from '@material-ui/core'
import ThemeProvider from './components/ThemeProvider'
import './App.css';
import MasterLayout from './screens/MasterLayout'


function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
    <MasterLayout/>
    </ThemeProvider>
 
  );
}

export default App;
