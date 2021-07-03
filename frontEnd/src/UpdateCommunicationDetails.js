import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";

import useForm from 'react-hook-form';

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));


export default function UpdateCommunicationDetails(...pros) {
    const {register, handleSubmit, errors, reset} = useForm();

    const onSubmit = data => {
        console.log(
            data
            //http://httpbin.org/get
        );
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post('http://83.212.101.19:8082/updateDetail', data).then(data => {
            setOpen(true);
        });
    }
    var prosData = pros[0]
    var temp1 = prosData.name
    console.log(prosData.name)

    function clickUpdate(name) {
        console.log(" update" + name);
    }

    function clickdelete(row) {
        console.log(" delete  " + row);


        axios.post('http://83.212.101.19:8082/delete', row.valueOf(), {headers: {"Content-Type": "text/plain"}});
        var newList = issues.filter(function (todo) {
            let a1 = todo.issueId;
            let a2 = row;
            var lp = a1 - a2;
            console.log(" " + todo.issueId + " " + row + lp);
            return lp !== 0;
        });
        setIssues(newList);
    }

    function getIssues() {
        var prosData = pros[0]
        var temp1 = prosData.name
        console.log(prosData.name)
        axios.post('http://83.212.101.19:8083/getData', temp1.toString().valueOf(), {headers: {"Content-Type": "text/plain"}}).then(resp => {
            setIssues(resp.data);
            console.log(resp.data)
            setIssuesDataFlag(true);
        });
    }

    const [open, setOpen] = React.useState(false);
    const [issues, setIssues] = useState(null);

    const [getIssuesDataFlag, setIssuesDataFlag] = useState(false);

    if (getIssuesDataFlag === false) {
        getIssues();
    }
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    return (


        <React.Fragment>
            {getIssuesDataFlag === true &&

            <div>
                <Table size="small">
                    <TableHead>
                        <TableRow>

                            <TableCell>Id</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Id φοιτητή </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>


                        {issues.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.score}</TableCell>
                                <TableCell>{row.approved}</TableCell>
                                <TableCell>{row.totalNumber}</TableCell>
                                {/*<TableCell> <button>ΔΙΑΓΡΑΦΗ</button></TableCell>*/}
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>
            }

            <div className={classes.seeMore}>
            </div>
        </React.Fragment>
    );
}