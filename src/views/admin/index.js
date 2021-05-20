import { Router } from '@reach/router'

import PainelLayout from '~/components/layout/painelLayout.js'
import Inicio from '~/views/portal/inicio/'
import Produto from '~/views/admin/produto'
import Fornecedor from '~/views/admin/fornecedor'
import Categoria from './categoria/index'
import Cliente from './cliente/index'

const Menu = [
  {
    title: 'Home',
    icons: '',
    route: '/',
    visibleMenu: true,
    enabled: true,
    component: Inicio
  },
  {
    title: 'Categoria',
    icons: '',
    route: '/categoria',
    visibleMenu: true,
    enabled: true,
    component: Categoria
  },
  {
    title: 'Produtos',
    icons: '',
    route: '/produto',
    visibleMenu: true,
    enabled: true,
    component: Produto
  },
  {
    title: 'Fornecedor',
    icons: '',
    route: '/fornecedor',
    visibleMenu: true,
    enabled: true,
    component: Fornecedor
  },
  {
    title: 'Cliente',
    icons: '',
    route: '/cliente',
    visibleMenu: true,
    enabled: true,
    component: Cliente
  }
]

const Admin = (props) => {
  return (
    <Router>
      <PainelLayout path="/">
        {Menu.map(({ component: Component, route }, i) => (
          <Component key={i} path={route} />
        ))}
      </PainelLayout>
    </Router>
  )
}

export default Admin
