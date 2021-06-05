import { Router } from '@reach/router'

import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  More as MoreIcon,
  Apps as MdAppsIcon
} from '@material-ui/icons'

import PainelLayout from '~/components/layout/layout-painel'
import Inicio from '~/views/portal/inicio/'
import Produto from '~/views/admin/produto'
import Fornecedor from '~/views/admin/fornecedor'
import Categoria from './categoria/index'
import Cliente from './cliente/index'
import { useSelector } from 'react-redux'


/*1 - Administrador - 2 - Fornecedor*/
export const Menu = [
  {
    title: 'Home',
    icon: <DashboardIcon />,
    route: '/',
    visibleMenu: true,
    enabled: true,
    component: Inicio,
    authorization: [1, 2]
  },
  {
    title: 'Categoria',
    icon: <MdAppsIcon />,
    route: '/categoria',
    visibleMenu: true,
    enabled: true,
    component: Categoria,
    authorization: [2]
  },
  {
    title: 'Produtos',
    icon: <MoreIcon />,
    route: '/produto',
    visibleMenu: true,
    enabled: true,
    component: Produto,
    authorization: [2]
  },
  {
    title: 'Fornecedor',
    icon: <ShoppingCartIcon />,
    route: '/fornecedor',
    visibleMenu: true,
    enabled: true,
    component: Fornecedor,
    authorization: [1]
  },
  {
    title: 'Cliente',
    icon: <PeopleIcon />,
    route: '/cliente',
    visibleMenu: true,
    enabled: true,
    component: Cliente,
    authorization: [2]
  }
]

const Admin = (props) => {
  const tipoUsuario = useSelector((state) => state.auth.usuario.tipoUsuario)
  const rotasAutorizadas = Menu.filter((route) =>
    route.authorization.includes(tipoUsuario)
    // includes = verifica se o dado está dentro de autorization
  )

  const NotFound = () => <h2>Não autorizado</h2>

  return (
    <Router>
      <PainelLayout path="/">
        {rotasAutorizadas.map(({ component: Component, route }, i) => (
          <Component key={i} path={route} />
        ))}
        {/* <NotFound default /> */}
      </PainelLayout>
    </Router>
  )
}

export default Admin
