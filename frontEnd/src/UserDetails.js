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
import UserProfile from './UserProfile';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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

        console.log('---------------------------------------------------------------------------------');

        let temp2;
        temp2=UserProfile.getName();
        console.log('name '+ temp2.valueOf())
        console.log('---------------------------------------------------------------------------------');
        axios.post('http://localhost:8082/findUser', {
            "name": temp2.valueOf(),
        }).then(resp => {
            console.log('............................................................................');

            setUsers(resp.data);
            console.log(resp.data);
            setUserDataFlag(true);
            //setUserDataFlag(true);
        });
    }

    const [todos, setTodos] = useState(null);
    const [users, setUsers] = useState(null);

    const [getUserDataFlag, setUserDataFlag] = useState(false);

    const [status, setStatus] = useState(null);
    const [getStatusDataFlag, setStatusDataFlag] = useState(false);


    const {register, handleSubmit, errors, reset} = useForm();

    console.log(errors);
    //axios.post('http://localhost:5000/users', data.then(r => r))

    //{getUserDataFlag === true &&


    console.log(errors);
    const classes = useStyles();


    if (getUserDataFlag === false) {
        getUser();
    }



    const onSubmit = data => {
        console.log(
            data
            //http://httpbin.org/get
        );
        console.log(
            users
            //http://httpbin.org/get
        );
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post('http://localhost:8082/createuser', users).then(data => {

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
    const [title, setTitle] = useState('');

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

    let temp2;
    temp2=UserProfile.getName();

    return (


        <form onSubmit={handleSubmit(onSubmit)}>


            <div className={classes.paper}>
                <Button type="submit" variant="outlined">Ανανέωση</Button>
                {/*<Button type="button" variant="outlined" onClick={() => resetForm()} color="primary">*/}
                {/*    ΚΑΘΑΡΙΣΜΟΣ*/}
                {/*</Button>*/}
                {/*<Button variant="outlined" onClick={() => getAllIssues()} color="primary">*/}
                {/*    Όλα τα ανοιχτά θέματα*/}
                {/*</Button>*/}

            </div>


<h1 align='center'> Στοιχεία χρήστη</h1>
            {getUserDataFlag === true &&

            <div className={classes.root}>
                <Grid container spacing={3}>

                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <label htmlFor="name">'Ονομα</label>
                            <input id="name" type="text" className={classes.avatar} placeholder='Όναμα' onChange={event => users.name=event.target.value}  defaultValue={users.name} name="name" ref={register}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <label htmlFor="name">Επίθετο</label>
                            <input id="name" type="text" className={classes.avatar} placeholder='Επίθετο' onChange={event => users.surname=event.target.value}  defaultValue={users.surname} name="name" ref={register}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>

                            <label htmlFor="age">Ηλικία</label>
                            <input type="age" className={classes.avatar} onChange={event => users.age=event.target.value} placeholder="Ηλικία" defaultValue={users.age} name="id" ref={register}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>

                            <label htmlFor="age">Φύλο</label>
                            <input type="age" className={classes.avatar} onChange={event => users.gender=event.target.value} placeholder="Φύλο" defaultValue={users.gender} name="id" ref={register}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>


            }




            }
        </form>

    );
}