import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "material-ui/TextField";
import {TextareaAutosize} from "@material-ui/core";
//import { alertActions } from '../_actions';
import {notesCategories} from './constants/reactSelectOptions';
import Select from "@material-ui/core/Select";
import DatePicker from "react-datepicker/es";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright Â© '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    button: {
        backgroundColor: "#7897f4",
    },
    image: {
        backgroundImage: 'url(https://www.krishipanth.com/wp-content/uploads/2019/09/beekeeping-tips-for-september.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
}));

function BeeHiveClick(event) {

    console.log(" Clicked Project");
    console.log(" Clicked Project " + event.target.value);

    // getIns(event.target.value);
    // setProjectId(event.target.value);
    // setBeeSelected(event.target.value);

}


export default function Notes(...pros) {
    var prosData = pros[0];

    const [open, setOpen] = React.useState(false);
    const [openHome, setOpenHome] = React.useState(false);
    const [todos, setTodos] = useState(null);
    const [openInfo, setOpenInfo] = React.useState(false);
    const [selected, setSelected] = React.useState(false);
    const [openCreateNew, setOpenCreateNew] = React.useState(false);

    const [date, setDate] = useState(null);
    const [category, setCategory] = useState(null);
    const [note, setNote] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpenInfo(false);
    };

    function resetClick(event) {
        setbeeHive("");
        setPassValue("");

    }


    const [beeHive, setbeeHive] = useState("");
    const [pass, setPassValue] = useState("");

    function setPass(e) {
        setPassValue(e.target.value);
        console.log("pass " + pass);
    }


    function setEmail(e) {
        setbeeHive(e.target.value);
        console.log("beeHive " + beeHive);

    }

    function getData() {
        let temp1 = prosData.name;

        axios.post('http://83.212.115.193:8082/getNotes', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(resp => {


            var dataFiltered = resp.data;

            setTodos(resp.data);
            console.log(todos);
            //setFlagGetData(true);
        });
    }


    if (open == false) {
        getData();
        setOpen(true);
    }

    const classes = useStyles();


    function handleCloseNewNote() {


        var data1 = {
            "date": date,
            "category": category,
            "notes": note,
            "user": prosData.name
        }

        console.log("Note data " + data1.toString());
        axios.post('http://83.212.115.193:8082/newNote', data1).then(resp => {
            getData();
            //
            //
            //     var dataFiltered = resp.data;
            //
            //     console.log(resp.data);
            //     if (resp.data == "Done") {
            //         console.log("Change 1" + dialMail);
            //         setOpen1(false);
            //         setErrorMessage('');
            //     } else {
            //         setErrorMessage("Ελέγξτε τα στοιχεία τα οποία δόθηκαν");
            //     }
            //     //setFlagGetData(true);
        });

        setOpenCreateNew(false);
    }


    function closeHandle1() {
        setOpenCreateNew(false);
    }

    function select(event) {
        console.log(event.target);
        setTodos(todos.filter(todo => todo.category === event.target.value.value));

    }

    return (


        <form className={classes.form} noValidate>


            <h2 style={{textAlign: 'center', color: 'blue'}}>Λίστα με τα Σημειώσεις </h2>


            <h3 style={{color: 'blue'}}> Λίστα με τα Σημειώσεις

                <Select onChange={select}>

                    {notesCategories.map(todo => (
                        < option className="aaa" value={todo}>{todo.label}</option>
                    ))}

                </Select>

            </h3>


            <button type="button" onClick={(e) => {
                //console.log("id" + row.notes});
                //setSelected(row.notes);
                getData();

            }}> Όλα
            </button>

            {todos && (
                <div>
                    {/*<Title> Επιθεωρήσεις</Title>*/}
                    <Table>
                        <TableHead>
                            <TableRow>

                                <TableCell style={{textAlign: 'center', color: 'blue'}}><h3> Κωδικός</h3></TableCell>
                                <TableCell style={{textAlign: 'center', color: 'blue'}}><h3> Ημερομηνία</h3></TableCell>
                                <TableCell style={{textAlign: 'center', color: 'blue'}}><h3> Κατηγορία</h3></TableCell>
                                <TableCell style={{textAlign: 'center', color: 'blue'}}><h3> Λεπτομέριες</h3>
                                </TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {todos.map(row => (
                                <TableRow align="center" key={row}>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{row.date}</TableCell>
                                    <TableCell align="center">


                                        <Select disabled='true'
                                                defaultValue={row.category}
                                                onChange={select}>
                                            {notesCategories.map(todo => (

                                                < option className="aaa"

                                                         value={todo.value}>{todo.label}</option>


                                            ))}
                                        </Select>
                                    </TableCell>

                                    <TableCell align="center">
                                        {row.notes && (
                                            <button type="button" id={row.notes.valueOf()} onClick={(e) => {
                                                //console.log("id" + row.notes});
                                                setSelected(row.notes);
                                                setOpenInfo(true);

                                            }}>

                                                Πληροφορίες
                                            </button>
                                        )}
                                    </TableCell>


                                    {/*<TableCell> <button>ΔΙΑΓΡΑΦΗ</button></TableCell>*/}
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>

                    <div>

                        <Dialog
                            open={openInfo}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Σημείωση"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">


                                    <TextareaAutosize
                                        hintText="Enter your First Name"
                                        floatingLabelText="First Name"
                                        disabled='true'
                                        defaultValue={selected}
//                                        onChange={(event, newValue) => this.setState({first_name: newValue})}
                                    />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Close
                                </Button>

                            </DialogActions>
                        </Dialog>

                    </div>


                    <div>

                        <Dialog
                            open={openCreateNew}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                            fullWidth={true}


                        >
                            <DialogTitle id="alert-dialog-title">{"Nέα σημείωση"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="form-dialog-title">
                                    <section>
                                        <label style={{textAlign: 'center', color: 'darkblue'}}>Ημερομηνία </label>
                                        <DatePicker

                                            //control={control}

                                            onChange={(value, e) => setDate(value)}
                                            selected={date}
                                            name="basicInfoImerominiaDimiourgia"
                                            className="input"
                                            dateFormat="yyyy-MM-dd"/>

                                    </section>


                                    <section>
                                        <label style={{textAlign: 'center', color: 'darkblue'}}>Κατηγορία </label>


                                        <Select onChange={(event) => setCategory(event.target.value)}>

                                            {notesCategories.map(todo => (
                                                < option className="aaa" value={todo.value}>{todo.label}</option>
                                            ))}

                                        </Select>


                                    </section>

                                    <p/>
                                    <p/>
                                    <p/>
                                    <p/>


                                    <textarea onChange={(event) => setNote(event.target.value)} size name="info"
                                              className="input"/>


                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={closeHandle1} color="primary">
                                    Close
                                </Button>

                                <Button onClick={handleCloseNewNote} color="primary">
                                    Send
                                </Button>

                            </DialogActions>
                        </Dialog>

                    </div>
                </div>
            )
            }


            <button type="button" onClick={(e) => {
                //console.log("id" + row.notes});
                //setSelected(row.notes);
                setOpenCreateNew(true);

            }}> Νέα σημείωση
            </button>

        </form>


    );
}
