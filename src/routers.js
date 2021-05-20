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
  return <Component {...rest} />
}

const Routers = () => (
  <>
    <Router>
      <SignIn path="signin" />
      {/* Portal */}
      <PortalView path="/*" />
      {/* Admin */}
      <PrivateRoute component={AdminView} path="/admin/*" />
    </Router>
  </>
)

export default Routers
