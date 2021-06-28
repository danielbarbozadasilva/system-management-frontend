import React from 'react'
import { Router, Redirect } from '@reach/router'
import AdminView from '~/views/admin/'
import PortalView from '~/views/portal'
import SignIn from './views/auth/signin'
import { isAuthenticated } from './config/storage'
import FornecedorNovo from '~/views/auth/singup-fornecedor'
import ClientNovo from '~/views/auth/singup-cliente'

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (!isAuthenticated()) {
    return <Redirect to="/signin" noThrow />
  }
  return <Component {...rest} />
}

const Routers = () => (
  <>
    <Router>
      <SignIn path="signin" />
      <FornecedorNovo path="singup-fornecedor" />
      <ClientNovo path="singup-cliente" />
      <PortalView path="/*" />
      <PrivateRoute component={AdminView} path="/admin/*" />
    </Router>
  </>
)

export default Routers
