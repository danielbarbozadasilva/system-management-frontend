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
import ClientLike from '~/views/admin/like/client/index'
import ProviderLike from '~/views/admin/like/provider/index'
import ProviderEvaluete from '~/views/admin/provider/evalueted'
import Error404 from '../error/404/index'

export const Menu = [
  {
    title: 'Início',
    icon: <DashboardIcon />,
    route: '/',
    visibleMenu: true,
    enabled: true,
    component: Home,
    authorization: [1, 2, 3]
  },
  {
    title: 'Categorias',
    icon: <MdAppsIcon />,
    route: '/category',
    visibleMenu: true,
    enabled: true,
    component: Category,
    authorization: [1]
  },
  {
    title: 'Produtos',
    icon: <MoreIcon />,
    route: '/product',
    visibleMenu: true,
    enabled: true,
    component: Product,
    authorization: [2]
  },
  {
    title: 'Fornecedores',
    icon: <ShoppingCartIcon />,
    route: '/provider',
    visibleMenu: true,
    enabled: true,
    component: Provider,
    authorization: [1]
  },
  {
    title: 'Avaliar Fornecedor',
    icon: <ShoppingCartIcon />,
    route: '/providerevaluete',
    visibleMenu: true,
    enabled: true,
    component: ProviderEvaluete,
    authorization: [3]
  },
  {
    title: 'Curtidas fornecedor',
    icon: <MoreIcon />,
    route: '/listlikeprovider',
    visibleMenu: true,
    enabled: true,
    component: ProviderLike,
    authorization: [2]
  },
  {
    title: 'Curtidas cliente',
    icon: <MoreIcon />,
    route: '/listlikeclient',
    visibleMenu: true,
    enabled: true,
    component: ClientLike,
    authorization: [3]
  },
  {
    title: 'Clientes',
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

  return (
    <Router>
      <PanelLayout path="/">
        {rotasAutorizadas.map(({ component: Component, route }, i) => (
          <Component key={i} path={route} />
        ))}
        <Error404 default />
      </PanelLayout>
    </Router>
  )
}

export default Admin
