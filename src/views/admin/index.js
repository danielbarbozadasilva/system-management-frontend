import { Router } from '@reach/router'
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  More as MoreIcon,
  Apps as MdAppsIcon
} from '@material-ui/icons'
import PanelLayout from '~/components/layout/layout-panel'
import Home from '~/views/admin/home/index'
import Product from '~/views/admin/product/index'
import Provider from '~/views/admin/provider'
import Category from './category/index'
import Client from './client/index'
import { useSelector } from 'react-redux'
import Like from '~/views/admin/like'

export const Menu = [
  {
    title: 'home',
    icon: <DashboardIcon />,
    route: '/',
    visibleMenu: true,
    enabled: true,
    component: Home,
    authorization: [1, 2, 3]
  },
  {
    title: 'category',
    icon: <MdAppsIcon />,
    route: '/category',
    visibleMenu: true,
    enabled: true,
    component: Category,
    authorization: [1]
  },
  {
    title: 'products',
    icon: <MoreIcon />,
    route: '/product',
    visibleMenu: true,
    enabled: true,
    component: Product,
    authorization: [2, 3]
  },
  {
    title: 'provider',
    icon: <ShoppingCartIcon />,
    route: '/provider',
    visibleMenu: true,
    enabled: true,
    component: Provider,
    authorization: [1]
  },
  {
    title: 'Curtidas',
    icon: <MoreIcon />,
    route: '/like',
    visibleMenu: true,
    enabled: true,
    component: Like,
    authorization: [2, 3]
  },
  {
    title: 'client',
    icon: <PeopleIcon />,
    route: '/client',
    visibleMenu: true,
    enabled: true,
    component: Client,
    authorization: [1]
  }
]

const Admin = (props) => {
  const typeUser = useSelector((state) => state.auth.user.typeUser)
  const rotasAutorizadas = Menu.filter((route) =>
    route.authorization.includes(typeUser)
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
