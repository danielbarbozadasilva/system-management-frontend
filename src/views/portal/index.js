import Inicio from '~/views/portal/inicio/'
import Produto from '~/views/portal/produto'
import Fornecedor from '~/views/auth/fornecedor_novo'
import Cliente from '~/views/auth/cliente.cliente_novo'
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
    component: Inicio
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
    title: 'Fornecedor_cadastro',
    icons: '',
    route: '/fornecedor_cadastro',
    visibleMenu: true,
    enabled: true,
    component: Fornecedor
  },
  {
    title: 'Cliente_Cadastro',
    icons: '',
    route: '/cliente_cadastro',
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
          {Menu.map(({ component: Component, route }, i) => (
            <Component key={i} path={route} />
          ))}

        </Layout>
      </Router>
    </>
  )
}

export default Portal
