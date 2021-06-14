import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom'
import {browserHistory} from 'react-router'

export const sideMenuHomePage = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
        <Link to='/listIssues'>Αρχική σελίδα</Link>
      {/*<ListItemText primary="Home Page" />*/}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
        <Link to='/schedule'>Αναζήτηση</Link>
      {/*<ListItemText primary="Search Issues" />*/}
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
        <Link to='/create'>Δημιουργία νέου αιτήματος</Link>

    </ListItem>

      <ListItem button>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
        <Link to='/paroxes'>Διαθέσιμα πακέτα</Link>

    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
        <a href="http://127.0.0.1/Skyroof" >Log Out</a>
      {/*<ListItemText primary="Lockout" />*/}
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>

  </div>
);
