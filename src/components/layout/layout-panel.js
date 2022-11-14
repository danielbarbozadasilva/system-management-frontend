import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'
import { logoutAction } from '~/store/auth/auth.action'
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  AccountCircle as AccountCircleIcon,
  ChevronLeft as ChevronLeftIcon,
  PowerSettingsNew
} from '@material-ui/icons/'
import ListMenu from './item-panel'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'

const drawerWidth = 240

export default function Dashboard (props) {
  const { name, typeUser } = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const userDefinition = {
    1: {
      title: 'Administrador',
      color: '#4E6062'
    },
    2: {
      title: 'Fornecedor',
      color: '#163D5C'
    },
    3: {
      title: 'Cliente',
      color: '#4B3204'
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    toolbar: {
      paddingRight: 24,
      backgroundColor: typeUser ? userDefinition[typeUser].color : '#666',
      color: '#fff'
    },
    toolbarText: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      [theme.breakpoints.down('md')]: {
        width: 0
      }
    },
    menuButton: {
      marginRight: 36
    },
    menuButtonHidden: {
      display: 'none'
    },
    title: {
      flexGrow: 1
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      [theme.breakpoints.down('md')]: {
        width: '100vw'
      }
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: 0,
      [theme.breakpoints.down('md')]: {
        width: 0
      }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto'
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column'
    },
    fixedHeight: {
      height: 240
    },
    depositContext: {
      flex: 1
    },
    user: {
      padding: theme.spacing(1),
      display: 'flex',
      alignItems: 'center'

    },
    userIcon: {
      margin: theme.spacing(1),
      color: '#fff'
    }
  }))

  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(!open)
  }
  
  const handleDrawerClose = () => {
    setOpen(false)
  }

  function handleLogout () {
    dispatch(logoutAction())
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='absolute'
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={classes.menuButton}
          >
            {!open ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            {typeUser ? userDefinition[typeUser].title : ''}
          </Typography>
          <Typography
            component='h4'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.user}
          >
            <AccountCircleIcon className={classes.userIcon} />
            {name}
            <Button onClick={handleLogout}>
              <PowerSettingsNew className={classes.userIcon} />
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <Divider />
        <Toolbar className={classes.toolbar}>
          <div className={classes.toolbarText}>Menu Principal</div>
          <div className={classes.toolbarIcon} />
          <Hidden smUp>
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
          </Hidden>
        </Toolbar>
        <Divider />
        <List>
          <ListMenu />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='xl' className={classes.container}>
          <>{props.children}</>
        </Container>
      </main>
    </div>
  )
}
