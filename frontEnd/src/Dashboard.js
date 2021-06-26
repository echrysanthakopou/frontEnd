import React from 'react';
import clsx from 'clsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import UpdatePage from "./UpdatePage";
import ImgMediaCard from "./CardMedia";
import UserProfile from './UserProfile';
import UserDetails from "./UserDetails";
import Notes from "./Notes";
import PostsCreate from "./postCreate";
import Search from "./Search"
import {secondaryListItems, sideMenuHomePage} from './listItems';

function name() {
    return UserProfile.getName();
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        marginTop: '30'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    logo: {
        maxWidth: "40px",
        marginLeft: -35
    },
}));


export default function Dashboard(pros) {

    const [searchData, setSearchData] = React.useState(null);
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    console.log(pros.name);


    return (


        <BrowserRouter>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon/>

                        </IconButton>
                        <Typography align="center" component="h1" variant="h6" color="inherit" noWrap
                                    className={classes.title}>
                            Υπηρεσίες Κοινωνικών Ασφαλίσεων

                        </Typography>

                        <Toolbar>
                            <img align="left"
                                 src={"https://thumbs.dreamstime.com/b/happy-retirement-nursing-home-logo-elderly-couple-holding-cane-retired-hands-walking-standing-side-view-old-people-care-172473884.jpg"}
                                 alt="logo" className={classes.logo}/>
                        </Toolbar>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>{sideMenuHomePage}</List>
                    <Divider/>
                    <List>{secondaryListItems}</List>
                </Drawer>


                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>

                        <card>
                            <Switch>

                                <Route path='/schedule' render={(props) => <Search {...pros} isAuthed={true}/>}/>//
                                component={Search}/>
                                <Route path='/create' render={(props) => <PostsCreate {...pros}
                                                                                      isAuthed={true}/>}/> //component={PostsCreate}/>
                                <Route path='/homePage' render={(props) => <UserDetails {...pros}
                                                                                        isAuthed={true}/>}/> //component={PostsCreate}/>
                                <Route path='/home' render={(props) => <UserDetails {...pros}
                                                                                    isAuthed={true}/>}/> //component={PostsCreate}/>
                                <Route path='/update/:issueID/:name' component={UpdatePage}/>} />
                                //component={PostsCreate}/>
                                <Route path='/paroxes' render={(props) => <ImgMediaCard {...pros} isAuthed={true}/>}/>//
                                component={Search}/>
                                <Route path='/notes' render={(props) => <Notes {...pros} isAuthed={true}/>}/>//
                                component={Search}/>

                                <Route path='/' render={(props) => <UserDetails {...pros}
                                                                                isAuthed={true}/>}/> //component={PostsCreate}/>


                            </Switch>
                        </card>

                    </Container>
                </main>


                <div className="footer">Footer</div>
            </div>

        </BrowserRouter>


    );
}