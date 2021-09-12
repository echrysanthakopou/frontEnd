import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom'
import UserProfile from './UserProfile';

function refreshPage(){
    window.location.reload();
}
let temp2;
temp2=UserProfile.getName();

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
            <Link to='/xristes'>Λίστα με χρήστες</Link>

        </ListItem>

        <ListItem button>
            <ListItemIcon>
                <ExitToAppIcon/>
            </ListItemIcon>
            <a href='/'>Log Out</a>
            {/*<a onClick={refreshPage}>Log Out</a>*/}
            {/*<ListItemText primary="Lockout" />*/}
        </ListItem>
    </div>
);



export const sideMenuHomePageUser = (

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
                <ExitToAppIcon/>
            </ListItemIcon>
            <a href='/'>Log Out</a>
            {/*<a onClick={refreshPage}>Log Out</a>*/}
            {/*<ListItemText primary="Lockout" />*/}
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>

    </div>
);



