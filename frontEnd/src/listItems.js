import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom'

export const sideMenuHomePage = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <Link to='/listIssues'>Home</Link>
            {/*<ListItemText primary="Home Page" />*/}
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SearchIcon/>
            </ListItemIcon>
            <Link to='/schedule'>Λίστα φοιτητών</Link>
            {/*<ListItemText primary="Search Issues" />*/}
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AddIcon/>
            </ListItemIcon>
            <Link to='/create'>Δημιουργία νέου χρήστη</Link>
            {/*<ListItemText primary="Create Issues" />*/}
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ExitToAppIcon/>
            </ListItemIcon>
            <a href="http://127.0.0.1/Skyroof">Log Out</a>
            {/*<ListItemText primary="Lockout" />*/}
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>

    </div>
);
