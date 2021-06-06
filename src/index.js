import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import GlobalStyled from './config/globalStyle'
import reportWebVitals from './reportWebVitals'
import Routers from './routers'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import ReduxToastr from './components/redux-toastr'
import theme from './plugins/theme'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import CssBaseline from '@material-ui/core/CssBaseline'

const googleFont =
  'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'

ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr />
    <Helmet>
      <link rel="stylesheet" href={googleFont} />
    </Helmet>
    <ThemeProvider theme={theme}>
      <GlobalStyled />
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)


reportWebVitals()
