import React, {useState} from 'react';
import useForm from 'react-hook-form'

import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import UserProfile from './UserProfile';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {pensionCategories} from "./constants/reactSelectOptions";
import {filo} from "./constants/reactSelectOptions"

export default function (...pros) {

    //User name Deprecated

    var prosData1 = pros[0];
    var prosData = prosData1[0];
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


    function getStatus() {
        axios.get(process.env.REACT_APP_BACKEND_URL + '/getStatus', {headers: {"Content-Type": "text/plain"}}).then(resp => {

            setStatus(resp.data);
            console.log(status);
            setStatusDataFlag(true);
        });
    }

    function getUser() {


        console.log('---------------------------------------------------------------------------------');

        var prosData1 = pros[0].match.params;
        let temp1 = prosData1.issueID;
        console.log('---------------------------------------------------------------------------------');
        axios.post(process.env.REACT_APP_BACKEND_URL + '/findUser', {
            "name": temp1.valueOf(),
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
    //axios.post('http://83.212.101.190:5000/users', data.then(r => r))

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
        axios.post(process.env.REACT_APP_BACKEND_URL + '/createuser', users).then(data => {

            console.log(data.data);
            setIssuesData(data.data);
            setIssuesDataFlag(true);
        });
    };

    function clickUpdate(name) {
        console.log(" update" + name);
    }

    function clickdelete(row) {
        console.log(" delete  " + row);


        //if (confirm("Issue is about ot delete.Are you sure ?")) {
        axios.post(process.env.REACT_APP_BACKEND_URL + '/delete', row.valueOf(), {headers: {"Content-Type": "text/plain"}});

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

        axios.post(process.env.REACT_APP_BACKEND_URL + '/showOpenIssues', temp1.toString().valueOf(), {headers: {"Content-Type": "text/plain"}}).then(data => {

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
            axios.post(process.env.REACT_APP_BACKEND_URL + '/getApplication', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(data => {

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






            {getUserDataFlag === true  &&

            <div className={classes.paper}>
                {/*<Button type="submit" variant="outlined">Ανανέωση</Button>*/}
                {/*<Button type="button" variant="outlined" onClick={() => resetForm()} color="primary">*/}
                {/*    ΚΑΘΑΡΙΣΜΟΣ*/}
                {/*</Button>*/}
                {/*<Button variant="outlined" onClick={() => getAllIssues()} color="primary">*/}
                {/*    Όλα τα ανοιχτά θέματα*/}
                {/*</Button>*/}


                <h1 align='center'> Στοιχεία χρήστη</h1>

                <Grid container spacing={3}>

                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <label htmlFor="name">'Ονομα</label>
                            <input  disabled={true} id="name" type="text" className={classes.avatar} placeholder='Όναμα' onChange={event => users.name=event.target.value}  defaultValue={users.name} name="name" ref={register}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <label htmlFor="name">Επίθετο</label>
                            <input disabled={true} id="name" type="text" className={classes.avatar} placeholder='Επίθετο' onChange={event => users.surname=event.target.value}  defaultValue={users.surname} name="name" ref={register}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>

                            <label htmlFor="age">Ηλικία</label>
                            <input disabled={true}  type="date" className={classes.avatar} onChange={event => users.age=event.target.value} placeholder="Ηλικία" defaultValue={users.age} name="id" ref={register}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>

                            <label htmlFor="age">Φύλο</label>
                            <select disabled={true}  ype="age" className={classes.avatar} onChange={event => users.gender=event.target.value} placeholder="Φύλο" defaultValue={users.gender} name="id" ref={register}>

                                {/*<option disabled selected value> -- select an option --</option>*/}

                                {filo.map(category => (

                                    < option className="aaa"
                                             value={category.value}>{category.label}</option>
                                ))}
                            </select>

                            {/*<input type="age" className={classes.avatar} onChange={event => users.gender=event.target.value} placeholder="Φύλο" defaultValue={users.gender} name="id" ref={register}/>*/}
                        </Paper>
                    </Grid>


                    <Grid item xs={6}>
                        <Paper className={classes.paper}>

                            <label htmlFor="age">ΑΦΜ</label>
                            <input disabled={true}  type="age" className={classes.avatar} onChange={event => users.afm=event.target.value} placeholder="ΑΦΜ" defaultValue={users.afm} name="id" ref={register}/>
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>
                        <Paper className={classes.paper}>

                            <label htmlFor="age">ΑΜΚΑ</label>
                            <input disabled={true} type="age" className={classes.avatar} onChange={event => users.amka=event.target.value} placeholder="ΑΜΚΑ" defaultValue={users.amka} name="id" ref={register}/>
                        </Paper>
                    </Grid>

                </Grid>
            </div>


            }






        </form>

    );
}