import { Router } from '@reach/router'

import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  More as MoreIcon,
  Apps as MdAppsIcon
} from '@material-ui/icons'

import PanelLayout from '~/components/layout/layout-panel'
import home from '~/views/admin/home/home'
import Produto from '~/views/admin/product/index'
import provider from '~/views/admin/provider'
import category from './category/index'
import client from './client/index'
import { useSelector } from 'react-redux'
import Curtida from '~/views/admin/like'

/* 1 - Administrador 2 - provider 3 - client */
export const Menu = [
  {
    title: 'home',
    icon: <DashboardIcon />,
    route: '/',
    visibleMenu: true,
    enabled: true,
    component: home,
    authorization: [1, 2, 3]
  },
  {
    title: 'category',
    icon: <MdAppsIcon />,
    route: '/category',
    visibleMenu: true,
    enabled: true,
    component: category,
    authorization: [1]
  },
  {
    title: 'products',
    icon: <MoreIcon />,
    route: '/product',
    visibleMenu: true,
    enabled: true,
    component: Produto,
    authorization: [2, 3]
  },
  {
    title: 'provider',
    icon: <ShoppingCartIcon />,
    route: '/provider',
    visibleMenu: true,
    enabled: true,
    component: provider,
    authorization: [1]
  },
  {
    title: 'Curtidas',
    icon: <MoreIcon />,
    route: '/like',
    visibleMenu: true,
    enabled: true,
    component: Curtida,
    authorization: [2, 3]
  },
  {
    title: 'client',
    icon: <PeopleIcon />,
    route: '/client',
    visibleMenu: true,
    enabled: true,
    component: client,
    authorization: [1]
  }
]

const Admin = (props) => {
  const tipoUsuario = useSelector((state) => state.auth.usuario.tipoUsuario)
  const rotasAutorizadas = Menu.filter((route) =>
    route.authorization.includes(tipoUsuario)
  )

  const NotFound = () => <h2>Não autorizado</h2>

  return (
    <Router>
      <PanelLayout path="/">
        {rotasAutorizadas.map(({ component: Component, route }, i) => (
          <Component key={i} path={route} />
        ))}
        <NotFound default />
      </PanelLayout>
    </Router>
  )
}

export default Admin
