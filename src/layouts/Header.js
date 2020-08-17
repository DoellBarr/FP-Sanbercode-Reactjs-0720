//React Component

import React, {useContext} from 'react';
import clsx from 'clsx';
import {UserContext} from '../context/UserContext'
import { makeStyles, useTheme } from '@material-ui/core/styles';

//Component Header
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

//Icon & List
import {Menu,
  ChevronRight,
  ChevronLeft,
  Home,
  PersonPin,
  ListRounded,
  Create,
  ExitToApp,
  AccountCircle,
  RateReview,
  PersonAdd,
  VpnKey,
  } from '@material-ui/icons'
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeft from '@material-ui/icons/ChevronLeft';
// import ChevronRight from '@material-ui/icons/ChevronRight';
// import AccountCircle from '@material-ui/icons/AccountCircle'
// import ModeCommentRounded from '@material-ui/icons/ModeCommentRounded'
// import Dashboard from '@material-ui/icons/Dashboard'
// import Home from '@material-ui/icons/Home'
// import PersonPin from '@material-ui/icons/PersonPin'
// import ListRounded from '@material-ui/icons/ListRounded'
// import Create from '@material-ui/icons/Create'
// import ExitToApp from '@material-ui/icons/ExitToApp'

//component
import Section from './Section'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


export default function PersistentDrawerLeft() {

  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props}/>
  }

  const [user, setUser] = useContext(UserContext)
  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("user")
  }

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Sanbercode
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItemLink href = "/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemLink>
        <ListItemLink href = "/about">
          <ListItemIcon>
            <PersonPin />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItemLink>
        <ListItemLink href = "/movie">
          <ListItemIcon>
            <ListRounded />
          </ListItemIcon>
          <ListItemText primary="Movie List" />
        </ListItemLink>
        <ListItemLink href = "/game">
          <ListItemIcon>
            <ListRounded />
          </ListItemIcon>
          <ListItemText primary="Game List" />
        </ListItemLink>
        <ListItemLink href = "/movie_review">
          <ListItemIcon>
            <RateReview />
          </ListItemIcon>
          <ListItemText primary="Movie Review" />
        </ListItemLink>
        </List>
        <Divider />
        <List>
         {user &&  <ListItemLink href = "/movies">
          <ListItemIcon>
            <Create />
          </ListItemIcon>
          <ListItemText primary="Movie Edit" />
        </ListItemLink>}
        {user && <ListItemLink href = "/games">
          <ListItemIcon>
            <Create />
          </ListItemIcon>
          <ListItemText primary="Game Edit" />
        </ListItemLink>}
       {user === null && <ListItemLink href = "/login">
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItemLink>}
        {user && <ListItemLink onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemLink>}
        {user && <ListItemLink href = "/change_password">
          <ListItemIcon>
            <VpnKey />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItemLink>}
        <Divider/>
        <ListItemLink href = "/register">
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItemLink>

        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography component="p">
          <Section/>
        </Typography>
      </main>
    </div>
    </>
  );
}
