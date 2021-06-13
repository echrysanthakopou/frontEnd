import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import {Link} from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function (...pros) {
    function clickdelete(row) {
        console.log(" delete  " + row);

        setOpen(false);

        //if (confirm("Issue is about ot delete.Are you sure ?")) {
        axios.post('http://localhost:8083/delete', row.valueOf(), {headers: {"Content-Type": "text/plain"}});


    }

    var prosData = pros[0];
    const useStyles = makeStyles(theme => ({
        root: {
            height: '100vh',
        },
        button: {
            backgroundColor: "#7897f4",
        },
        image: {
            backgroundImage: 'url(https://images.unsplash.com/photo-1462396240927-52058a6a84ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        paper: {
            margin: theme.spacing(2, 2),
            // display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(3, 2),
            //backgroundColor: theme.palette.secondary.main,
            width: '100%',
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            backgroundColor: "#7897f4",
            width: '100%',
        },
        hidden: {
            visibility: 'hidden',
        },
        red: {
            color: 'red',
        },
    }));

    //const classes = useStyles();

    console.log("Version with the arguments");
    var prosData = pros[0]

    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState();
    const getMyIssues = () => {

        let temp1 = prosData.name;
        console.log("Temp " + temp1);
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        var data =
            axios.post('http://localhost:8083/students').then(data => {

                console.log(data.data);
                setData(data.data);
                setOpen(true);
            });
    };

    if (open === false) {
        getMyIssues();
    }

    return (

        <div> User {prosData.name}


            {open === true &&

            <div>
                <Title>Open Issues</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>

                            <TableCell>Id</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Αριθμός αδερφών</TableCell>
                            <TableCell>Εισόδημα προσώπικο</TableCell>
                            <TableCell>Πόλη </TableCell>
                            <TableCell>Εισόδημα γονέων </TableCell>
                            <TableCell>Email </TableCell>
                            <TableCell>Delete </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>


                        {data.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.numberofbbrothers}</TableCell>
                                <TableCell>{row.incomepersonal}</TableCell>
                                <TableCell>{row.town}</TableCell>
                                <TableCell>{row.parentincome}</TableCell>
                                <TableCell>{row.email}</TableCell>

                                <TableCell>
                                    <button type="button" id={row.username} onClick={(e) => {
                                        console.log("id" + e.target.id);
                                        if (window.confirm('Are you sure you wish to delete this item?')) clickdelete(e.target.id)
                                    }}>
                                        delete
                                    </button>

                                </TableCell>
                                {/*<TableCell> <button>ΔΙΑΓΡΑΦΗ</button></TableCell>*/}
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>

            }

        </div>


    );
}