import { Button, Link, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    // justifyContent: "space-between",
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
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
        <Button variant="outlined" size="small">
          Login
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Link
          color="inherit"
          noWrap
          key="home"
          variant="h6"
          href="/"
          className={classes.toolbarLink}
        >
          Home
        </Link>
        <Link
          color="inherit"
          noWrap
          key="home1"
          variant="h6"
          href="/"
          className={classes.toolbarLink}
        >
          Sobre
        </Link>
        <Link
          color="inherit"
          noWrap
          key="home2"
          variant="h6"
          href="/"
          className={classes.toolbarLink}
        >
          Contato
        </Link>
      </Toolbar>
    </div>
  )
}

export default Header
