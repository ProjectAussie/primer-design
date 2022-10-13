import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { yellow, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: blue[500]
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App />
    </ThemeProvider>);