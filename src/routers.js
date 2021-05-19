import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import AdminView from '~/views/admin/'
import PortalView from '~/views/portal/'
import SignIn from '~/views/auth/signin'

import history from './config/history'

const Routers = () => (
  <>
    <Router history={history}>
      <Switch>
        {/* PORTAL */}
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/" component={PortalView} />
        {/* ADMIN */}
        <Route path="/admin" component={AdminView} />
      </Switch>
    </Router>
  </>
)

export default Routers
