import React from 'react';
import {ThemeProvider} from 'styled-components'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store';

const theme = {
  primaryColor: 'hsl(180, 29%, 50%)',
  background: 'hsl(180, 52%, 96%)',
  gray: 'hsl(180, 8%, 52%)',
  darkerGray: 'hsl(180, 14%, 20%)',
  mobile: '375px',
  desktop: '144px'
 

}

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <ThemeProvider theme = {theme}>
   <App />
   </ThemeProvider>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


