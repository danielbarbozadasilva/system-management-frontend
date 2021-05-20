import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  More as MoreIcon,
  Apps as MdAppsIcon
} from '@material-ui/icons'
import { Link } from '@reach/router'

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Painel" />
    </ListItem>
    <ListItem button component={Link} to="categoria">
      <ListItemIcon>
        <MdAppsIcon />
      </ListItemIcon>
      <ListItemText primary="Categorias" />
    </ListItem>
    <ListItem button component={Link} to="fornecedor">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Fornecedores" />
    </ListItem>
    <ListItem button component={Link} to="cliente">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Clientes" />
    </ListItem>
    <ListItem button component={Link} to="produto">
      <ListItemIcon>
        <MoreIcon />
      </ListItemIcon>
      <ListItemText primary="Produtos" />
    </ListItem>
  </div>
)
