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
import UserProfile from "./UserProfile";
import {pensionCategories,tameia,pension1Doc} from "./constants/reactSelectOptions"

export default function ViewDetails(...pros) {
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
        hidden:{
            visibility: 'hidden',
        },
        red: {
            color: 'red',
        },


    }));

    const classes = useStyles();

    function getData() {
        let temp1 = prosData.name
        axios.post('http://83.212.101.190:8082/findProjectsForUser', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(resp => {


            var dataFiltered = resp.data.filter(function (todo) {
                return todo.permission !== "ONLY READ";
            });

            setTodos(dataFiltered);
            console.log(todos);
            setFlagGetData(true);
        });
    }


    function getStatus() {

        axios.get('http://83.212.101.190:8082/getStatus', {headers: {"Content-Type": "text/plain"}}).then(resp => {

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
        // let temp1 = projectId;
        // axios.post('http://83.212.101.190:8082/findPeopleForProject', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(resp => {
        //
        //     setUsers(resp.data);
        //     console.log(resp.data)
        //     setUserDataFlag(true);
        // });
    }

    function getApplication(projectId) {
        let temp1 = projectId;
        axios.post('http://83.212.101.190:8082/getApplicationById', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(resp => {

            setAppl(resp.data);
            console.log("------------------------------------------------------------------------------------");
            console.log(resp.data);
            setApplFlag(true);
        });
    }
    const [paroxi, setParoxi] = useState(null);

    const [todos, setTodos] = useState(null);
    const [users, setUsers] = useState('');
    const [appl, setAppl] = useState('');
    const [getDataFlag, setFlagGetData] = useState(false);
    const [getUserDataFlag, setUserDataFlag] = useState(false);
    //const [open, setOpen] = React.useState(false);

    const [applFlag, setApplFlag] = useState(false);

    if (applFlag===false)
    {

        var prosData1 = pros[0].match.params;
        let temp1 = prosData1.issueID;

        getApplication(temp1)
    }

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
        axios.post('http://83.212.101.190:8082/applicationCreate', data).then(data => {
            setOpen(true);
        });
    }

    console.log(errors);


    if (getDataFlag === false) {
        //getData();
    }


    if (getStatusDataFlag === false) {
        //getStatus();
    }

    function clickApproved() {
        var prosData1 = pros[0].match.params;
        let temp1 = prosData1.issueID;

        axios.post('http://83.212.101.190:8082/approved', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(data => {

            getApplication(temp1)
            // getMyIssues();
            // setIssuesDataFlag(true);
        });

    }

    function clickDiapproved() {


        var prosData1 = pros[0].match.params;
        let temp1 = prosData1.issueID;


        axios.post('http://83.212.101.190:8082/clickDiapproved', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(data => {

        getApplication(temp1);

        });

    }



    return (

        <form className={classes.paper} onSubmit={handleSubmit(onSubmit)}>

            <h5>Ηλεκτρονική Υπηρεσία Υποβολής Αίτησης Συνταξιοδότησης </h5>

            <Button type="submit" variant="outlined" onClick={clickApproved}> Αποδοχή </Button>
            <Button type="button" variant="outlined" onClick={clickDiapproved}>
                Απόρριψη
            </Button>


            <card>


            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>

            <input className={classes.avatar} type="text" placeholder="Όνομα" disabled={true} defaultValue={appl.name} name="name" ref={register({
                required: '*'
            })} />
            </card>
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" disabled={true} defaultValue={appl.surname}  placeholder="Επίθετο" name="surname" ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" disabled={true} defaultValue={appl.city}  placeholder="Πόλη" name="city"  ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="Νομός" disabled={true} defaultValue={appl.area}   name="area" ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="Οδός " disabled={true} defaultValue={appl.street}  name="street" ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="Αριθμός"  disabled={true} defaultValue={appl.number}  name="number"  ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="Ταχ. Κωδικός" disabled={true} defaultValue={appl.post}   name="post" ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="Σταθερό Τηλέφωνο" disabled={true} defaultValue={appl.numberPhone}   name="numberPhone" ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="Fax"  disabled={true} defaultValue={appl.fax}  name="fax" ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>


            <input className={classes.avatar}   type="text" placeholder="email" disabled={true} defaultValue={appl.email}      name="email" ref={register({
                required: '*'
            })} />


            <input className={classes.avatar}   type="text" placeholder="iban"   disabled={true} defaultValue={appl.iban}   name="iban" ref={register({
                required: '*'
            })} />

            <input className={classes.avatar}    type="text" placeholder="status" disabled={true} defaultValue={appl.status}   name="status" ref={register({
                required: '*'
            })} />

            {/*{getDataFlag === true &&*/}
            {/*<div>*/}
            {/*    <b>Select a project </b>*/}
            {/*    <div className={classes.red}>*/}
            {/*    {errors.projectId && errors.projectId.message}*/}
            {/*    </div>*/}
            {/*    <select className={classes.avatar} name="projectId" ref={register({*/}
            {/*        required: '*'*/}
            {/*    })} onClick={ProjectClick}>*/}

            {/*        /!*<option disabled selected value> -- select an option --</option>*!/*/}
            {/*        <option label=" "></option>*/}
            {/*        {todos.map(todo => (*/}
            {/*            < option value={todo.projectId}>{todo.projectName}</option>*/}
            {/*        ))}*/}
            {/*    </select>*/}


            {/*</div>*/}
            {/*}*/}





            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            {/*{errors.descr && errors.descr.message}*/}
            <input className={classes.avatar} type="text" disabled={true} defaultValue={appl.descr}  placeholder="Περιγραφή" name="descr"  ref={register({
                required: '*',
                // pattern: {
                //     value: /^[A-Z0-9._%+-]$/i,
                //     message: "invalid title"
                // }
            })}/>






            {getStatusDataFlag === true &&
            <div>

                <b>status</b> <div className={classes.red}> {errors.statusId && errors.statusId.message} </div>
                <select className={classes.avatar} name="statusId" ref={register({
                    required: '*'
                })}>
                    {/*<option disabled selected value> -- select an option --</option>*/}
                    <option label=" "></option>
                    {status.map(statusCur => (
                        < option value={statusCur.statusid}>{statusCur.statusDescription}</option>
                    ))}
                </select>
            </div>
            }

            <div className={classes.red}> {errors.type && errors.type.message} </div>
            <select className={classes.avatar}  disabled={true} defaultValue={appl.select}   onChange={event => setParoxi(event.target.value)}
                    name="select"  ref={register({
                required: '*'
            })}  >

                {pensionCategories.map(category => (

                    < option className="aaa"
                             value={category.value}>{category.label}</option>
                ))}

            </select>



            {/*{paroxi === "Σύνταξη λόγω γήρατος" &&*/}
            {/*    <div>*/}

            {/*        <div>*/}

            {/*            <label> Ταυτότητα</label>*/}
            {/*        </div>*/}

            {/*        <div>*/}
            {/*        <input name="name"  type="file" ref={register({*/}
            {/*            required: '*'*/}
            {/*        })}/>>*/}
            {/*        </div>*/}

            {/*        <div>*/}

            {/*            <label> Πιστοποιητικό γέννησης </label>*/}
            {/*        </div>*/}

            {/*        <div>*/}
            {/*        <input name="name"  type="file" ref={register({*/}
            {/*            required: '*'*/}
            {/*        })}/>>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*}*/}

            {/*{paroxi === "Σύνταξη λόγω αναπηρίας" &&*/}
            {/*    <div>*/}

            {/*        <div>*/}

            {/*            <label> Ταυτότητα</label>*/}
            {/*        </div>*/}

            {/*        <div>*/}
            {/*        <input name="name"  type="file" ref={register({*/}
            {/*            required: '*'*/}
            {/*        })}/>>*/}
            {/*        </div>*/}

            {/*        <div>*/}

            {/*            <label> Πιστοποιητικό γέννησης </label>*/}
            {/*        </div>*/}

            {/*        <div>*/}
            {/*        <input name="name"  type="file" ref={register({*/}
            {/*            required: '*'*/}
            {/*        })}/>>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*}*/}

            {/*{paroxi === "Συντάξη χηρείας" &&*/}
            {/*    <div>*/}

            {/*        <div>*/}

            {/*            <label> Ταυτότητα</label>*/}
            {/*        </div>*/}

            {/*        <div>*/}
            {/*        <input name="name"  type="file" ref={register({*/}
            {/*            required: '*'*/}
            {/*        })}/>>*/}
            {/*        </div>*/}

            {/*        <div>*/}

            {/*            <label>  Υπεύθυνη δήλωση</label>*/}
            {/*        </div>*/}

            {/*        <div>*/}
            {/*        <input name="name"  type="file" ref={register({*/}
            {/*            required: '*'*/}
            {/*        })}/>>*/}
            {/*        </div>*/}

            {/*        <div>*/}

            {/*            <label> Πιστοποιητικό γέννησης </label>*/}
            {/*        </div>*/}

            {/*        <div>*/}
            {/*        <input name="name"  type="file" ref={register({*/}
            {/*            required: '*'*/}
            {/*        })}/>>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*}*/}

            <div className={classes.red}> {errors.type && errors.type.message} </div>
            <select className={classes.avatar} disabled={true} defaultValue={appl.selectTameio}
                    name="selectTameio"  ref={register({
                required: '*'
            })}  >

                {tameia.map(category => (

                    < option className="aaa"
                             value={category.value}>{category.label}</option>
                ))}



            </select>


                    {/*<input className={classes.submit} type="submit" />*/}

                    <div>

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Αποθήκευση Αίτησης"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Η αιτηση αποθήκευτηκε!
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