import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom'

function refreshPage(){
    window.location.reload();
}

export const sideMenuHomePage = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <Link to='/homePage'>Αρχική σελίδα</Link>
            {/*<ListItemText primary="Home Page" />*/}
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SearchIcon/>
            </ListItemIcon>
            <Link to='/schedule'>Αναζήτηση</Link>
            {/*<ListItemText primary="Search Issues" />*/}
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AddIcon/>
            </ListItemIcon>
            <Link to='/create'>Δημιουργία νέου αιτήματος</Link>

        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <AddIcon/>
            </ListItemIcon>
            <Link to='/paroxes'>Διαθέσιμα πακέτα</Link>

        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <AddIcon/>
            </ListItemIcon>
            <Link to='/notes'>Σημειώσεις</Link>

        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ExitToAppIcon/>
            </ListItemIcon>
            <a onClick={refreshPage}>Log Out</a>
            {/*<ListItemText primary="Lockout" />*/}
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>

    </div>
);
