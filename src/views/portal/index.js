import { Router } from '@reach/router'

import Home from '~/views/portal/home/index'
import PortalProduct from '~/views/portal/product'
import PortalProvider from '~/views/portal/provider'
import SignUpProvider from '~/views/auth/signup-provider'
import SignUpClient from '~/views/auth/signup-client'
import SignIn from '~/views/auth/signin'

import Layout from '~/components/layout/main'

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
  }
]

const Portal = (props) => {
  return (
    <>
      <Router>
        <Layout path='/'>
          {Menu.map(({ component: Component, route, tipo = '' }, i) => (
            <Component key={i} path={route} tipo={tipo} />
          ))}

        </Layout>
      </Router>
    </>
  )
}

export default Portal
