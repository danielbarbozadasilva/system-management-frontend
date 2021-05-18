import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import '../src/assets/css/style.css';
import GlobalStyle from './config/globalStyle';
import { Helmet } from 'react-helmet';
/* Routers */
import Routers from './routers';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './plugins/theme'
import CssBaseline from '@material-ui/core/CssBaseline';
const googleFont = 'https://fonts.googleapis.com/css2?family=Lato&display=swap';

/* Conecto o meu react no redux */


ReactDOM.render(
  <Provider store={store}>
    <Helmet>
      <link rel="stylesheet" href={googleFont} />
    </Helmet>
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    <CssBaseline />
      <Routers />
    </ThemeProvider >
  </Provider>,
  document.getElementById('root')
);


