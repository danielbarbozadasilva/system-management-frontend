import Inicio from '~/views/portal/inicio/'
import Produto from '~/views/portal/produto'
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
