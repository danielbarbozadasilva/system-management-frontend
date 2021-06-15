// imports
import React from 'react'
import { Router, Redirect } from '@reach/router'
// views
import ViewPortal from '~/views/portal'
import ViewAdmin from '~/views/admin/'
import { isAuthenticated } from './config/storage'

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (!isAuthenticated()) {
    return <Redirect to="/signin" noThrow />
  }
  // Caso NÃO esteja autendicado retorna um redirect
  /* Ao ADICIONAR noThrow e Redirect ele redirecionará sem usar
         'componentDidCatch'(registra informações de erro) */

  return <Component {...rest} />
} // Caso LOGADO, INJETO O COMPONENTE

const Routers = () => (
  <>
    <Router>
      <ViewPortal path="/*" />
      <PrivateRoute component={ViewAdmin} path="/admin/*" />
    </Router>
  </>
)

export default Routers
