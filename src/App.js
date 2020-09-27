import React from 'react';
import { CssBaseline } from '@material-ui/core'
import ThemeProvider from './components/ThemeProvider'
import theme from './theme/theme'
import './App.css';
import MasterLayout from './screens/MasterLayout'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MasterLayout/>
    </ThemeProvider>
  );
}

export default App;
