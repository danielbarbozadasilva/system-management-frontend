import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import Routers from './routers'
import { Helmet } from 'react-helmet'
import ReduxToastr from './components/redux-toastr'
import './assets/css/style.css'
import GlobalStyle from './config/globalStyled'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

import { ThemeProvider } from 'styled-components'
import theme from './plugins/theme'

const googleFontGreatVibes =
  'https://fonts.googleapis.com/css2?family=Cormorant:wght@300&family=Great+Vibes&display=swap'

ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr />
    <ThemeProvider theme={theme}>
      <Helmet>
        <link rel="stylesheet" href={googleFontGreatVibes} />
      </Helmet>
      <GlobalStyle />
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
