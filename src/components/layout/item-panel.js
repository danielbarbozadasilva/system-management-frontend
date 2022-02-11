import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from '@reach/router'
import { useSelector } from 'react-redux'

import { Menu } from '~/views/admin/index'

const ListMenu = () => {
  const typeUser = useSelector((state) => state.auth.user.typeUser)

  const rotasAutorizadas = Menu.filter((route) =>
    route.authorization.includes(typeUser)
  )
  return (
    <div>
      {rotasAutorizadas.map(({ title, route, icon }, i) => (
        <ListItem button component={Link} to={'/admin' + route} key={i}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      ))}
    </div>
  )
}

export default ListMenu
