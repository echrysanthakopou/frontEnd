import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from "axios";
import {BrowserRouter as Router} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import  useForm  from 'react-hook-form';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount, owner) {
    return {id, date, name, shipTo, paymentMethod, amount, owner};
}

const rows = [
    createData(0, '16 Mar, 2019', 'Alvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44, 'true'),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99, 'false'),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81, 'false'),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39, 'true'),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79, ' false'),
];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));


export default function ConnectUser(...pros) {

    function clickUpdate(name) {
        console.log(" update" + name);
    }

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
        hidden:{
            visibility: 'hidden',
        },
        red: {
            color: 'red',
        },


    }));



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
        setIssues(newList);

    }

    function getIssues() {

        var prosData = pros[0]
        var temp1 = prosData.name
        console.log(prosData.name)

        axios.post('http://localhost:8082/showUserOpenIssue', temp1.toString().valueOf(), {headers: {"Content-Type": "text/plain"}}).then(resp => {


            setIssues(resp.data);
            console.log(resp.data)
            setIssuesDataFlag(true);
        });
    }

    const [issues, setIssues] = useState(null);

    const [getIssuesDataFlag, setIssuesDataFlag] = useState(false);

    if (getIssuesDataFlag === false) {
        getIssues();
    }
    const classes = useStyles();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <form className={classes.paper} onSubmit={handleSubmit(onSubmit)}>
            <input className={classes.avatar} type="text" placeholder="Όνομα" {...register("Όνομα", {required: true})} />
            <input className={classes.avatar} type="text" placeholder="Επίθετο" {...register("Επίθετο", {})} />
            <input className={classes.avatar} type="text" placeholder="Πόλη" {...register("Πόλη", {})} />
            <input className={classes.avatar} type="text" placeholder="Νομός" {...register("Νομός", {})} />
            <input className={classes.avatar} type="text" placeholder="Οδός " {...register("Οδός ", {})} />
            <input className={classes.avatar} type="text" placeholder="Αριθμός" {...register("Αριθμός", {})} />
            <input className={classes.avatar} type="text" placeholder="Ταχ. Κωδικός" {...register("Ταχ. Κωδικός", {})} />
            <input className={classes.avatar} type="text" placeholder="Σταθερό Τηλέφωνο" {...register("Σταθερό Τηλέφωνο", {})} />
            <input className={classes.avatar} type="text" placeholder="Fax" {...register("Fax", {})} />
            <input className={classes.avatar} type="text" placeholder="email" {...register("email", {})} />

            <input type="submit" />
        </form>
    );
}