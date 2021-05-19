import { Switch, Route } from 'react-router'

import PainelLayout from '~/components/layout/layout-painel'

import Inicio from '~/views/portal/inicio/'
import Produto from '~/views/admin/produto'
import Fornecedor from '~/views/admin/fornecedor'

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
    title: 'Fornecedor',
    icons: '',
    route: '/fornecedor',
    visibleMenu: true,
    enabled: true,
    component: Fornecedor
  }
]

const Admin = (props) => {
  return (
    <Switch>
      <PainelLayout>
        {Menu.map((item, i) => (
          <Route
            key={i}
            exact
            path={props.match.path + item.route}
            component={item.component}
          />
        ))}
      </PainelLayout>
    </Switch>
  )
}

export default Admin
