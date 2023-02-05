import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from '@reach/router'
import { useSelector } from 'react-redux'
import { Menu } from '~/views/admin/index'

const ListMenu = () => {
  const typeUser = useSelector((state) => state.auth.user.typeUser)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  const authorizedRoutes = Menu.filter((route) =>
    route.authorization.includes(typeUser)
  )
  return (
    <div>
      {authorizedRoutes.map(({ title, route, icon }, i) => (
        <ListItem
          button
          component={Link}
          to={'/admin' + route}
          key={i}
          selected={selectedIndex === i}
          onClick={(event) => handleListItemClick(event, i)}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      ))}
    </div>
  )
}

export default ListMenu
