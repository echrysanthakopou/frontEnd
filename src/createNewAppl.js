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


export default function CreateNewAppl(...pros) {
    const [open, setOpen] = React.useState(false);
    console.log("name");
    var prosData = pros[0]
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
            margin: theme.spacing(3, 3),
            // display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            font: 20,
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

    const classes = useStyles();

    function getData() {
        let temp1 = prosData.name
        axios.post(process.env.REACT_APP_BACKEND_URL + '/findProjectsForUser', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(resp => {


            var dataFiltered = resp.data.filter(function (todo) {
                return todo.permission !== "ONLY READ";
            });

            setTodos(dataFiltered);
            console.log(todos);
            setFlagGetData(true);
        });
    }


    function getStatus() {
        axios.get(process.env.REACT_APP_BACKEND_URL + '/getStatus', {headers: {"Content-Type": "text/plain"}}).then(resp => {

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
        axios.post(process.env.REACT_APP_BACKEND_URL + '/findPeopleForProject', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(resp => {

            setUsers(resp.data);
            console.log(resp.data)
            setUserDataFlag(true);
        });
    }

    const [todos, setTodos] = useState(null);
    const [users, setUsers] = useState(null);
    const [getDataFlag, setFlagGetData] = useState(false);
    const [getUserDataFlag, setUserDataFlag] = useState(false);
    //const [open, setOpen] = React.useState(false);

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
        axios.post(process.env.REACT_APP_BACKEND_URL + '/create', data).then(data => {
            setOpen(true);
        });
    }

    console.log(errors);


    return (

        <form className={classes.paper} onSubmit={handleSubmit(onSubmit)}>
            <Button type="submit" variant="outlined">ΔΗΜΙΟΥΡΓΙΑ</Button>
            <Button type="button" variant="outlined" onClick={() => resetForm()} color="primary">
                ΚΑΘΑΡΙΣΜΟΣ
            </Button>


            <div className={classes.red}>
                {errors.city && errors.city.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="Όνομα φοιτητή" name="username" ref={register({
                required: 'Required',

            })}/>

            <div className={classes.red}>
                {errors.personalIncome && errors.personalIncome.message}
            </div>
            <input className={classes.avatar} type="text" name="password" placeholder="Κωδικός"
                   ref={register({
                       required: 'Required',

                   })}/>




        </form>
    );
}