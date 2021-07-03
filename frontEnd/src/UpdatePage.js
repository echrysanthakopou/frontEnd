import React, {useState} from 'react';
import useForm from 'react-hook-form';
import axios from 'axios';
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";


export default function UpdatePage(...pros) {

    var prosData = pros[0].match.params;

    const [issue, setIssuesData] = useState(null);
    const [getIssueDataFlag, setIssueDataFlag] = useState(false);
    console.log(pros);

    function goBack() {
        window.history.back();
    }


    const getAllIssue = () => {

        let temp1 = prosData.issueID;
        console.log("Temp " + temp1);

        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios.post('http://127.0.0.1:8082/Issue', temp1.toString().valueOf(), {headers: {"Content-Type": "text/plain"}}).then(data => {

            console.log("Receive data")
            console.log(data.data);
            setIssuesData(data.data);
            setIssueDataFlag(true);
            console.log("Receive data " + issue);
            setIssueDataFlag(true);
        });
    };

    if (getIssueDataFlag === false) {
        getAllIssue();
    }


    const [open, setOpen] = React.useState(false);
    console.log("name");
    console.log(prosData.name)

    const resetForm = () => {
        reset();
    };

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
            margin: theme.spacing(3, 2),
            //backgroundColor: theme.palette.secondary.main,
            width: '100%',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
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

    const classes = useStyles();

    function getData() {
        let temp1 = prosData.name
        axios.post('http://127.0.0.1:8082/findProjectsForUser', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(resp => {


            var dataFiltered = resp.data.filter(function (todo) {
                return todo.permission !== "ONLY READ";
            });

            setTodos(dataFiltered);
            console.log(todos);
            setFlagGetData(true);
        });
    }


    function getStatus() {
        let temp1 = "stergios"
        axios.get('http://127.0.0.1:8082/getStatus', {headers: {"Content-Type": "text/plain"}}).then(resp => {

            setStatus(resp.data);
            console.log(status);
            setStatusDataFlag(true);
        });
    }

    function ProjectClick(event) {

        console.log(" Clicked Project");
        console.log(" Clicked Project " + event.target.value);

        getUser(event.target.value);
    }

    function getUser(projectId) {
        let temp1 = projectId;
        axios.post('http://127.0.0.1:8082/findPeopleForProject', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(resp => {

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
    const axios1 = require('axios');

    const handleClose = () => {
        setOpen(false);
    };

    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const {register, handleSubmit, errors, reset} = useForm();
    const onSubmit = data => {
        console.log(
            data
            //http://httpbin.org/get
        );
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post('http://127.0.0.1:8082/updateIssue', data).then(data => {
            setOpen(true);
        });
    }

    console.log(errors);

    if (getDataFlag === false) {
        getData();
    }

    if (getStatusDataFlag === false) {
        getStatus();
    }


    return (


        <form onSubmit={handleSubmit(onSubmit)}>


            <h5>Update Issue</h5>
            <Button type="submit" variant="outlined"> ΑΠΟΣΤΟΛΗ ΑΛΛΑΓΩΝ</Button>
            <Button type="button" variant="outlined" onClick={() => resetForm()} color="primary">
                ΚΑΘΑΡΙΣΜΟΣ
            </Button>

            <Button type="button" variant="outlined" onClick={goBack} color="primary">
                ΕΠΙΣΤΡΟΦΗ
            </Button>

            {getDataFlag === true &&
            <div>
                <b>Select a project </b>
                <div className={classes.red}>
                    {errors.projectId && errors.projectId.message}
                </div>
                <select className={classes.paper} name="projectId" ref={register({
                    required: 'Required',

                })} onClick={ProjectClick}>

                    <option value=""></option>
                    {todos.map(todo => (
                        < option value={todo.projectId}>{todo.projectName}</option>
                    ))}
                </select>

            </div>
            }
            <b>Title</b>
            <input className={classes.paper} type="text" placeholder="title" name="title" ref={register}/>
            <b>Description</b>
            <input className={classes.paper} type="text" placeholder="descr" name="description" ref={register}/>


            {getUserDataFlag === true &&
            <div>
                <b>Assignee</b>
                <select className={classes.paper} name="assignee" ref={register}>

                    {/*<option disabled selected value> -- select an option --</option>*/}
                    <option value="-1"></option>
                    {users.map(user => (
                        < option value={user.userid}>{user.username}</option>
                    ))}
                </select>

            </div>

            }


            {getStatusDataFlag === true &&
            <div>

                <b>status</b>
                <select className={classes.paper} name="statusId" ref={register}>
                    {/*<option disabled selected value> -- select an option --</option>*/}
                    <option value="-1"></option>
                    {status.map(statusCur => (
                        < option value={statusCur.statusid}>{statusCur.statusDescription}</option>
                    ))}
                </select>
            </div>
            }

            <b>Category</b>
            <select className={classes.paper} name="type" ref={register}>
                {/*<option disabled selected value> -- select an option --</option>*/}
                <option value=""></option>
                <option value="error">error</option>
                <option value="improvement"> improvement</option>
                <option value="other"> other</option>
            </select>
            <b>Details</b>
            <input className={classes.paper} type="text" placeholder="otherDetails" name="otherDetails" ref={register}/>

            <div id="div2" className={classes.hidden}>
                <b>creator</b>
                <select className={classes.paper} name="username" ref={register}>
                    <option value={prosData.name}>{prosData.name}</option>
                </select>
                <b>issue ID</b>
                <select className={classes.paper} name="id" ref={register}>
                    <option value={prosData.issueID}>{prosData.issueID}</option>
                </select>
            </div>
            {/*<input className={classes.submit} type="submit" />*/}

            <div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Update an issue"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Issue updated
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" onClick={handleClose} color="primary">
                            Close
                        </Button>

                    </DialogActions>
                </Dialog>

            </div>

        </form>
    );


}