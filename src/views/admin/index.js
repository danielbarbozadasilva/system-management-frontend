import { Router } from '@reach/router'

import PainelLayout from '~/components/layout/layout-painel'
import Inicio from '~/views/portal/inicio/'
import Produto from '~/views/admin/produto/index'
import Fornecedor from '~/views/admin/fornecedor'
import Categoria from './categoria/index'
import Cliente from './cliente/index'

const Menu = [
  {
    title: 'Home',
    icons: '',
    route: '/',
    // Chama a rota '/'
    visibleMenu: true,
    enabled: true,
    component: Inicio
    // Chama o componente 'Inicio' que criei em inicio/index;
  },
  {
    title: 'Categoria',
    icons: '',
    route: '/categoria',
    // Chama a rota de  categoria '/categoria'
    visibleMenu: true,
    enabled: true,
    component: Categoria
    // Chama o componente 'Categoria' que criei em categoria/index;
  },
  {
    title: 'Produtos',
    icons: '',
    route: '/produto',
    // Chama a rota de produto '/produto';
    visibleMenu: true,
    enabled: true,
    component: Produto
    // Chama o componente 'Produto' que criei em produto/index;
  },
  {
    title: 'Fornecedor',
    icons: '',
    route: '/fornecedor',
    // Chama a rota de 'Fornecedor' '/fornecedor'
    visibleMenu: true,
    enabled: true,
    component: Fornecedor
    // Chama o componente 'Fornecedor' que criei em fornecedor/index;
  },
  {
    title: 'Cliente',
    icons: '',
    route: '/cliente',
    // Chama a rota de cliente '/cliente'
    visibleMenu: true,
    enabled: true,
    component: Cliente
    // Chama o componente 'Cliente' que criei em cliente/index;
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
