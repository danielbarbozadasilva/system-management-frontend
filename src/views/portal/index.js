import { Redirect, Switch } from 'react-router'
import Route from '~/config/route'
import Inicio from '~/views/portal/inicio/index'
import Produto from '~/views/portal/produto'

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
  console.log('props portal', props)
  return (
    <Switch>
      {Menu.map((item, i) => (
        <Route
          key={i}
          exact
          path={props.match.path + item.route}
          component={item.component}
        />
      ))}
      <Route path="*" render={() => <Redirect to="/admin" />} />
    </Switch>
  )
}

export default Portal
