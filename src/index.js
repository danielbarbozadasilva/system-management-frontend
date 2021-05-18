import React from 'react';
import ReactDOM from 'react-dom';
import '../src/assets/css/style.css';
import GlobalStyle from './config/globalStyle';

/* Conecto o meu react no redux */
import { Provider } from 'react-redux';

/* Routers */
import Routers from './routers';

import store from './store';

ReactDOM.render(
    <Provider store={store}>
      <GlobalStyle />
      <Routers />
    </Provider>,
  document.getElementById('root')
);


