import React, {useState} from 'react';
import useForm from 'react-hook-form'

import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import Title from "./Title";
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

    //const classes = useStyles();

    console.log("name");
    var prosData = pros[0]

    function getData() {
        let temp1 = prosData.name
        axios.post('http://localhost:8082/findProjectsForUser', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(resp => {

            setTodos(resp.data);
            console.log(todos)
            setFlagGetData(true);
        });
    }


    function getStatus() {
        let temp1 = "stergios"
        axios.get('http://localhost:8082/getStatus', {headers: {"Content-Type": "text/plain"}}).then(resp => {

            setStatus(resp.data);
            console.log(status);
            setStatusDataFlag(true);
        });
    }

    function getUser() {
        let temp1 = "stergios"
        axios.get('http://localhost:8082/getAllPersons').then(resp => {

            setUsers(resp.data);
            console.log(resp.data)
            setUserDataFlag(true);
        });
    }

    const [todos, setTodos] = useState(null);
    const [users, setUsers] = useState(null);
    const [getDataFlag, setFlagGetData] = useState(false);
    const [getUserDataFlag, setUserDataFlag] = useState(false);

    const [status, setStatus] = useState(null);
    const [getStatusDataFlag, setStatusDataFlag] = useState(false);


    const {register, handleSubmit, errors, reset} = useForm();

    console.log(errors);
    //axios.post('http://localhost:5000/users', data.then(r => r))

    //{getUserDataFlag === true &&


    console.log(errors);
    const classes = useStyles();

    if (getDataFlag === false) {
        getData();
    }

    if (getUserDataFlag === false) {
        getUser();
    }

    if (getStatusDataFlag === false) {
        getStatus();
    }

    const onSubmit = data => {
        console.log(
            data
            //http://httpbin.org/get
        );
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post('http://localhost:8082/issueQuery', data).then(data => {

            console.log(data.data);
            setIssuesData(data.data);
            setIssuesDataFlag(true);
        });
    }

    function clickUpdate(name) {
        console.log(" update" + name);
    }

    function clickdelete(row) {
        console.log(" delete  " + row);


        //if (confirm("Issue is about ot delete.Are you sure ?")) {
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
        //
        // } else {
        //    // txt = "You pressed Cancel!";
        // }

        let temp1 = prosData.name


    }

    const [issues, setIssuesData] = useState(null);
    const [getIssuesDataFlag, setIssuesDataFlag] = useState(false);

    const resetForm = () => {
        reset();
    };

    const getAllIssues = () => {

        let temp1 = prosData.name;
        console.log("Temp " + temp1);

        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios.post('http://localhost:8082/showOpenIssues', temp1.toString().valueOf(), {headers: {"Content-Type": "text/plain"}}).then(data => {

            console.log(data.data);
            setIssuesData(data.data);
            setIssuesDataFlag(true);
        });
    };


    const getMyIssues = () => {

        let temp1 = prosData.name;
        console.log("Temp " + temp1);
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        var data =
            axios.post('http://localhost:8082//showUserOpenIssue', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(data => {

                console.log(data.data);
                setIssuesData(data.data);
                setIssuesDataFlag(true);
            });
    };


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.paper}>
                <Button type="submit" variant="outlined">ΑΝΑΖΗΤΗΣΗ</Button>
                <Button type="button" variant="outlined" onClick={() => resetForm()} color="primary">
                    ΚΑΘΑΡΙΣΜΟΣ
                </Button>
                <Button variant="outlined" onClick={() => getAllIssues()} color="primary">
                    Όλα τα ανοιχτά θέματα
                </Button>
                <Button variant="outlined" color="primary" href="#outlined-buttons" onClick={() => getMyIssues()}
                        color="primary">
                    Όλα τα ανοιχτά μου θέματα
                </Button>
            </div>

            {getDataFlag === true &&
            <div>
                <b>Select a project </b>
                <div className={classes.red}>
                    {errors.projectId && errors.projectId.message}
                </div>
                <select className={classes.avatar} name="projectId" ref={register({
                    required: 'Required',
                    // pattern: {
                    //     value: /^[A-Z0-9._%+-]$/i,
                    //     message: "invalid title"
                    // }
                })}>
                    {/*<option disabled selected value> -- select an option -- </option>*/}
                    <option label=" "></option>
                    {todos.map(todo => (
                        < option value={todo.projectId}>{todo.projectName}</option>
                    ))}
                </select>

            </div>
            }

            <input type="text" className={classes.avatar} placeholder="Τίτλος" name="title" ref={register}/>
            {getUserDataFlag === true &&
            <div>
                <b>assignor</b>
                <div className={classes.red}>
                    {errors.assignor && errors.assignor.message}
                </div>

                <select className={classes.avatar} name="assignor" ref={register({
                    required: 'Required',
                    // pattern: {
                    //     value: /^[A-Z0-9._%+-]$/i,
                    //     message: "invalid title"
                    // }
                })}>
                    {/*<option disabled selected value> -- select an option -- </option>*/}
                    <option label=" "></option>
                    {users.map(user => (
                        < option value={user.userid}>{user.username}</option>
                    ))
                    }
                </select>

            </div>
            }


            {getUserDataFlag === true &&
            <div>
                <b>assignee</b>
                <div className={classes.red}>
                    {errors.assignee && errors.assignee.message}
                </div>
                <select className={classes.avatar} name="assignee" ref={register({
                    required: 'Required',
                    // pattern: {
                    //     value: /^[A-Z0-9._%+-]$/i,
                    //     message: "invalid title"
                    // }
                })}>
                    {/*<option disabled selected value> -- select an option -- </option>*/}
                    <option label=" "></option>
                    {users.map(user => (
                        < option value={user.userid}>{user.username}</option>
                    ))}
                </select>

            </div>

            }
            <b>category</b>
            <div className={classes.red}>
                {errors.issueType && errors.issueType.message}
            </div>
            <select className={classes.avatar} name="issueType" ref={register({
                required: 'Required',
                // pattern: {
                //     value: /^[A-Z0-9._%+-]$/i,
                //     message: "invalid title"
                // }
            })}>
                {/*<option disabled selected value> -- select an option -- </option>*/}
                <option label=" "></option>
                <option value="error">error</option>
                <option value="improvement"> improvement</option>
                <option value="other"> other</option>
            </select>


            {getStatusDataFlag === true &&
            <div>

                <b>status</b>
                <div className={classes.red}>
                    {errors.statusId && errors.statusId.message}
                </div>
                <select className={classes.avatar} name="statusId" ref={register({
                    required: 'Required',
                    // pattern: {
                    //     value: /^[A-Z0-9._%+-]$/i,
                    //     message: "invalid title"
                    // }
                })}>
                    {/*<option disabled selected value> -- select an option -- </option>*/}
                    <option label=" "></option>
                    {status.map(statusCur => (
                        < option value={statusCur.statusid}>{statusCur.statusDescription}</option>
                    ))}
                </select>
            </div>
            }

            <input type="text" className={classes.avatar} placeholder="Άλλες πληροφορίες" name="Άλλες πληροφορίες"
                   ref={register}/>

            <div id="div2" className={classes.hidden}>
                <b>creator</b>
                <select className={classes.avatar} name="username" ref={register}>
                    <option value={prosData.name}>{prosData.name}</option>
                </select>
            </div>

            {getIssuesDataFlag === true &&
            <div>
                <Title>Open Issues</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Έργο</TableCell>
                            <TableCell>Τίτλος</TableCell>
                            <TableCell>Εντολοδόχος</TableCell>
                            <TableCell>Κατάσταση</TableCell>
                            <TableCell>Κατηγορία </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {issues.map(row => (
                            <TableRow key={row.issueId}>
                                <TableCell>{row.projectTitle}</TableCell>
                                <TableCell>{row.issueTitle}</TableCell>
                                <TableCell>{row.assignor}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>
                                    {row.permission === "READ CREATE UPDATE" &&

                                        <button>
                                        <Link to={'/update/' + row.issueId + '/' + pros[0].name}>Update</Link>
                                    </button>
                                    }
                                    {row.permission === "READ CREATE UPDATE DELETE" &&

                                    <button>
                                        <Link to={'/update/' + row.issueId + '/' + pros[0].name}>Update </Link>
                                    </button>
                                        }
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