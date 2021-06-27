import React, {useState} from 'react';
import useForm from 'react-hook-form'

import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function (...pros) {
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





    const { handleSubmit, reset} = useForm();


    const classes = useStyles();



    const onSubmit = data => {
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios.post('http://localhost:8082/issueQuery', data).then(data => {
            console.log(data.data);
            setIssuesData(data.data);
            setIssuesDataFlag(true);
        });
    };


    function clickdelete(row) {
        console.log(" delete  " + row);


        axios.post('http://localhost:8082/delete', row.valueOf(), {headers: {"Content-Type": "text/plain"}});

        var newList = issues.filter(function (todo) {
            let a1 = todo.issueId;
            let a2 = row;
            var lp = a1 - a2;
            console.log(" " + todo.issueId + " " + row + lp);
            return lp !== 0;
        });

        newList.filter(function (todo) {
            console.log(" " + todo.issueId);
            return true;
        });

        console.log("New " + newList);

        setIssuesData(newList);
    }

    const [issues, setIssuesData] = useState(null);
    const [getIssuesDataFlag, setIssuesDataFlag] = useState(false);



    const getMyIssues = () => {

        let temp1 = prosData.name;
        console.log("Temp " + temp1);
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        var data =
            axios.post('http://localhost:8082/getApplication', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(data => {

                console.log('---------------------------------------------------------------------------------------------------------');
                console.log(data.data);
                setIssuesData(data.data);
                setIssuesDataFlag(true);
            });
    };


    return (


        <form onSubmit={handleSubmit(onSubmit)}>

            <div className={classes.paper}>

                <Button variant="outlined" color="primary" href="#outlined-buttons" onClick={() => getMyIssues()}
                        color="primary">
                    Όλα τα ανοιχτά μου θέματα
                </Button>
            </div>

            {getIssuesDataFlag === true &&
            <div>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Όνομα</TableCell>
                            <TableCell>Επίθετο</TableCell>
                            <TableCell>Κατηγορία</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {issues.map(row => (
                            <TableRow key={row.city}>

                                <TableCell>
                                            {row.name}
                                </TableCell>

                                <TableCell>
                                            {row.surname}
                                </TableCell>

                                <TableCell>
                                            {row.select}</TableCell>
                                <TableCell>

                                            <button>
                                                <Link to={'/update/' + row.issueId + '/' + pros[0].name}>Update</Link>
                                            </button>

                                </TableCell>

                                <TableCell>
                                    {row.permission === "READ CREATE UPDATE DELETE" &&
                                    <button type="button" id={row.issueId} onClick={(e) => {
                                        console.log("id" + e.target.id);
                                        if (window.confirm('Are you sure you wish to delete this item?')) clickdelete(e.target.id)
                                    }}>
                                        delete
                                    </button>
                                    }
                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>
            }
        </form>

    );
}