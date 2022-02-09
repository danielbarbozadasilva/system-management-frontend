import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import Routers from './routers'
import ReduxToastr from './components/redux-toastr'
import './assets/css/style.css'
import GlobalStyle from './config/globalStyled'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr />
    <GlobalStyle />
    <CssBaseline />
    <Routers />
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
