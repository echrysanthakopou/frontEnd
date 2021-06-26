import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dashboard from './Dashboard'
import axios from "axios";
import Register from "./Register";
import ReactDOM from "react-dom";
import UserProfile from './UserProfile';

//import { alertActions } from '../_actions';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright Â© '}
            <Link color="inherit" href="https://github.com/echrysanthakopou/">
                My Github account
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
        backgroundImage: 'url(https://cintra.co.uk/wp-content/uploads/2019/02/Pensions.jpg)',
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


export default function SignloginInSide(...pros) {

    const [open, setOpen] = React.useState(false);
    const [openHome, setOpenHome] = React.useState(false);
    const [sign, setSign] = React.useState(false);
    const [mail1, setEmail1] = React.useState('');
    const [forgot, setForgot]= React.useState(false);
    const [mail, setMail] = useState("");
    const [pass, setPassValue] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function resetClick(event) {
        setMail("");
        setPassValue("");
    }

    function setPass(e) {
        setPassValue(e.target.value);
        console.log("pass " + pass);
    }


    function setEmailReset(e) {
        setEmail1(e.target.value);
        console.log("mail " + mail);

    }


    function setEmailT(e) {
        setMail(e.target.value);
        console.log("mail " + mail);

    }

    function signUp() {
        setSign(true);
        const rootElement = document.getElementById("root");
        ReactDOM.render(<Register/>, rootElement);
    }

    function handleCloseForgot() {
        setForgot(false);

        console.log("-----" + mail1);
    }

    function forgotClicked() {
        setForgot(true);
    }


    function handleClick(event) {
        console.log(" email" + mail + " password " + pass);
        let data = "{\"username\":\"" + mail + "\", \"pswd\": \"" + pass + "\"}";

        console.log(data);
        UserProfile.setName(mail);
        axios.post('http://localhost:8082/login', {
            "name": mail,
            "password": pass
        })
            .then((data) => {

                console.log(data.data);
                if (data.data === "Login Successful!") {
                    console.log("Logged in");

                    setOpenHome(true);
                    setOpen(false);
                    pros.name = mail;
                } else {

                    console.log("Error during the login");
                    setOpen(true);
                    setOpenHome(false);

                }
            })
            .catch(console.log)

    }
    const classes = useStyles();
    return (

        <div>
            {openHome === false &&
            <div>


                <Grid container component="main" className={classes.root}>
                    <CssBaseline/>
                    <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="Email"
                                    name="userName"
                                    autoComplete="email1"
                                    autoFocus
                                    onChange={setEmailT}
                                    //value={mail}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={pass}
                                    onChange={setPass}
                                    autoComplete="current-password"
                                />

                                <Button label="Submit" primary={true} className={classes.submit}
                                        onClick={(event) => handleClick(event)}>Sing In</Button>

                                <Button label="Clear" primary={true} className={classes.submit}
                                        onClick={(event) => resetClick(event)}>reset</Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#"  onClick={forgotClicked} variant="body2">
                                            Forgot password?
                                        </Link>

                                    </Grid>
                                    <Grid item>
                                        <Link href="#"  onClick={signUp} variant="body2">
                                            Sign Up
                                        </Link>

                                    </Grid>
                                </Grid>
                                <Box mt={5}>
                                    <Copyright/>
                                </Box>
                            </form>
                        </div>

                        <div>

                            <Dialog
                                open={forgot}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Login to the app"}</DialogTitle>
                                <DialogContent>



                                    <TextField
                                        type = "text"
                                        hintText="Enter your Password"
                                        floatingLabelText="Password"
                                        onChange = {setEmailReset}

                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userName"
                                        label="email"
                                        name="email"

                                    />

                                    {/*<TextField*/}
                                    {/*    hintText="Enter your email"*/}
                                    {/*    floatingLabelText="Mail"*/}
                                    {/*    onChange = {(event,newValue) => this.setState({first_name:newValue})}*/}
                                    {/*/>*/}


                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseForgot} color="primary">
                                        Close
                                    </Button>

                                </DialogActions>
                            </Dialog>

                        </div>

                        <div>

                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Login to the app"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Error during the login
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Close
                                    </Button>

                                </DialogActions>
                            </Dialog>

                        </div>

                    </Grid>
                </Grid>
            </div>
            }

            {openHome === true &&
            <div>
                <Dashboard name={mail}/>
            </div>
            }


            {sign === true &&
            <div>

            </div>
            }

        </div>
    );
}
