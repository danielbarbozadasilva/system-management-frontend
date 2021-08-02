import InicioPortal from '~/views/portal/inicio/index'
import ProdutoPortal from '~/views/portal/produto'
import FornecedorPortal from '~/views/portal/fornecedor'
import Fornecedor from '~/views/auth/singup-fornecedor'
import Cliente from '~/views/auth/singup-cliente'
import SignIn from '~/views/auth/signin'
import { Router } from '@reach/router'

import Layout from '~/components/layout'

const Menu = [
  {
    title: 'Home',
    icons: '',
    route: '/',
    visibleMenu: true,
    enabled: true,
    component: InicioPortal
  },
  {
    title: 'Produtos',
    icons: '',
    route: '/produto',
    visibleMenu: true,
    enabled: true,
    component: ProdutoPortal
  },
  {
    title: 'ViewsProduto',
    icons: '',
    route: '/produto/categoria/:id',
    tipo:'categoria',
    visibleMenu: true,
    enabled: true,
    component: ProdutoPortal
  },
  {
    title: 'ViewsProdutoFornec',
    icons: '',
    route: '/produto/fornecedor/:id',
    tipo: 'fornecedor',
    visibleMenu: true,
    enabled: true,
    component: ProdutoPortal
  },
  {
    title: 'ViewsFornecedor',
    icons: '',
    route: '/fornecedor',
    visibleMenu: true,
    enabled: true,
    component: FornecedorPortal
  },
  {
    title: 'FornecedorCadastro',
    icons: '',
    route: '/fornecedorcadastro',
    visibleMenu: true,
    enabled: true,
    component: Fornecedor
  },
  {
    title: 'ClienteCadastro',
    icons: '',
    route: '/clientecadastro',
    visibleMenu: true,
    enabled: true,
    component: Cliente
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
        <Layout path="/">
          {Menu.map(({ component: Component, route, tipo="" }, i) => (
            <Component key={i} path={route} tipo={tipo} />
          ))}

        </Layout>
      </Router>
    </>
  )
}

export default Portal
