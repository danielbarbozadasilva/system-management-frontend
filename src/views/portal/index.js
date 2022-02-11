import Home from '~/views/portal/home/index'
import PortalProduct from '~/views/portal/product'
import PortalProvider from '~/views/portal/provider'
import Provider from '~/views/auth/signup-provider'
import Client from '~/views/auth/signup-client'
import SignIn from '~/views/auth/signin'
import { Router } from '@reach/router'

import Layout from '~/components/layout'

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
    title: 'providersubscription',
    icons: '',
    route: '/registrationprovider',
    visibleMenu: true,
    enabled: true,
    component: Provider
  },
  {
    title: 'clientsubscription',
    icons: '',
    route: '/registrationclient',
    visibleMenu: true,
    enabled: true,
    component: Client
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
