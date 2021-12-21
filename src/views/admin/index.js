import { Router } from '@reach/router'

import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  More as MoreIcon,
  Apps as MdAppsIcon
} from '@material-ui/icons'

import PainelLayout from '~/components/layout/layout-painel'
import Inicio from '~/views/admin/inicio/inicio'
import Produto from '~/views/admin/produto/index'
import Fornecedor from '~/views/admin/fornecedor'
import Categoria from './categoria/index'
import Cliente from './cliente/index'
import { useSelector } from 'react-redux'
import Curtida from '~/views/admin/curtida'

/* 1 - Administrador 2 - Fornecedor 3 - Cliente */
export const Menu = [
  {
    title: 'Home',
    icon: <DashboardIcon />,
    route: '/',
    visibleMenu: true,
    enabled: true,
    component: Inicio,
    authorization: [1, 2, 3]
  },
  {
    title: 'Categoria',
    icon: <MdAppsIcon />,
    route: '/category',
    visibleMenu: true,
    enabled: true,
    component: Categoria,
    authorization: [1]
  },
  {
    title: 'Produtos',
    icon: <MoreIcon />,
    route: '/product',
    visibleMenu: true,
    enabled: true,
    component: Produto,
    authorization: [2, 3]
  },
  {
    title: 'Fornecedor',
    icon: <ShoppingCartIcon />,
    route: '/provider',
    visibleMenu: true,
    enabled: true,
    component: Fornecedor,
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
    title: 'Cliente',
    icon: <PeopleIcon />,
    route: '/client',
    visibleMenu: true,
    enabled: true,
    component: Cliente,
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
      <PainelLayout path="/">
        {rotasAutorizadas.map(({ component: Component, route }, i) => (
          <Component key={i} path={route} />
        ))}
        <NotFound default />
      </PainelLayout>
    </Router>
  )
}

export default Admin
