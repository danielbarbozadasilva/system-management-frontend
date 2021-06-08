import { Button, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link as LinkRoute } from '@reach/router'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    overflowX: 'auto'
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Pagina Inicial
        </Typography>
        <Button variant="outlined" size="small" component={LinkRoute} to="/signin">
          Login
        </Button>
        <Button variant="outlined" size="small" component={LinkRoute} to="/fornecedor_novo">
          Seja um novo fornecedor
        </Button>
      </Toolbar>
      {/* <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Link
          component={LinkRoute}
          color="inherit"
          noWrap
          key="home"
          variant="h6"
          to="/"
          className={classes.toolbarLink}
        >
          Home
        </Link>
        <Link
          component={LinkRoute}
          color="inherit"
          noWrap
          key="home1"
          variant="h6"
          to="/produto"
          className={classes.toolbarLink}
        >
          Produtos
        </Link>
      </Toolbar> */}
    </div>
  )
}

export default Header
