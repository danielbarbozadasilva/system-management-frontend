import React from 'react'
import { Router, Redirect } from '@reach/router'
import AdminView from '~/views/admin/'
import PortalView from '~/views/portal'
import SignIn from './views/auth/signin'
import { isAuthenticated } from './config/storage'

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (!isAuthenticated()) {
    return <Redirect to="/signin" noThrow />
  }
    // Caso NÃO esteja autendicado retorna um redirect
    /* Ao ADICIONAR noThrow e Redirect ele redirecionará sem usar
         'componentDidCatch'(registra informações de erro) */

  return <Component {...rest} />
}  // Caso LOGADO, INJETO O COMPONENTE

const Routers = () => (
    <>
      <Router>
        {/* <AdminView path="/admin/*" /> */}
    {/* Admin */}
        <SignIn path="/signin" />
        {/* Portal */}
        <PortalView path="/*" />
        <PrivateRoute component={AdminView} path="/admin/*" />
      </Router>
    </>
  )
  
  export default Routers
  


