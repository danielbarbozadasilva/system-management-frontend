import { Router, Redirect } from '@reach/router'

import Layout from '~/components/layout/main'
import Home from '~/views/portal/home/index'
import PortalProduct from '~/views/portal/product'
import PortalProvider from '~/views/portal/provider'
import SignUpProvider from '~/views/auth/signup/provider/index'
import SignUpClient from '~/views/auth/signup/client/index'
import SignIn from '~/views/auth/signin/index'
import Analysis from '../auth/analysis/index'
import Error403 from '../error/403/index'
import Error404 from '../error/404/index'
import Error500 from '../error/500/index'

const Menu = [
  {
    title: 'home',
    icons: '',
    route: '/',
    visibleMenu: true,
    enabled: true,
    component: Home
  },
  {
    title: 'products',
    icons: '',
    route: '/product',
    visibleMenu: true,
    enabled: true,
    component: PortalProduct
  },
  {
    title: 'viewProduct',
    icons: '',
    route: '/product/category/:id',
    tipo: 'category',
    visibleMenu: true,
    enabled: true,
    component: PortalProduct
  },
  {
    title: 'viewProductProvider',
    icons: '',
    route: '/product/provider/:id',
    tipo: 'provider',
    visibleMenu: true,
    enabled: true,
    component: PortalProduct
  },
  {
    title: 'viewProvider',
    icons: '',
    route: '/provider',
    visibleMenu: true,
    enabled: true,
    component: PortalProvider
  },
  {
    title: 'registrationprovider',
    icons: '',
    route: '/registrationprovider',
    visibleMenu: true,
    enabled: true,
    component: SignUpProvider
  },
  {
    title: 'registrationclient',
    icons: '',
    route: '/registrationclient',
    visibleMenu: true,
    enabled: true,
    component: SignUpClient
  },
  {
    title: 'SignIn',
    icons: '',
    route: '/signin',
    visibleMenu: true,
    enabled: true,
    component: SignIn
  },
  {
    title: 'Analysis',
    icons: '',
    route: '/analysis',
    visibleMenu: true,
    enabled: true,
    component: Analysis
  },
  {
    title: 'NotAuthorized',
    icons: '',
    route: '/error403',
    visibleMenu: true,
    enabled: true,
    component: Error403
  },
  {
    title: 'NotFound',
    icons: '',
    route: '/error404',
    visibleMenu: true,
    enabled: true,
    component: Error404
  },
  {
    title: 'InternalServerError',
    icons: '',
    route: '/error500',
    visibleMenu: true,
    enabled: true,
    component: Error500
  }
]

const Portal = (props) => {
  return (
    <>
      <Router>
        <Layout path="/">
          {Menu.map(({ component: Component, route, type = '' }, i) => (
            <Component key={i} path={route} type={type} />
          ))}
          <Redirect from="/*" to="/error404" noThrow />
        </Layout>
      </Router>
    </>
  )
}

export default Portal
