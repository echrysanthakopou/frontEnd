import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RaisedButton from "material-ui/RaisedButton";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import PostsCreate from "./postCreate";
import axios from "axios";
//import { alertActions } from '../_actions';

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
    button:{
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
    const [openHome,setOpenHome] = React.useState(false);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function resetClick(event){
     setMail("");
     setPassValue("");

    }
    function handleClick(event){

        console.log(" email" +mail+ " password "+ pass  );
        let data= "{\"username\":\""+mail+ "\", \"pswd\": \"" +pass + "\"}";

        setOpenHome(true);
        console.log(data);
        axios.post('http://localhost:8082/login',  {
            "username": mail,
            "pswd": pass
        })
            .then((data) => {
                //this.setState({todos: data})
                console.log(data.data)
                if (data.data==="Login Successful!")
                {
                    console.log("Logged in")
                    //pros.user="hi";
                    setOpenHome(true);
                    pros.name=mail;
                    // ReactDOM.render( <Dashboard  />, document.getElementById('root'));
                }
                else
                {
                    console.log("Error during the login")
                    setOpen(true);
                }
            })
            .catch(console.log)
    }



    const [mail, setMail] = useState("");
    const [pass,setPassValue]=useState("");
    function setPass(e) {
        setPassValue(e.target.value);
        console.log("pass "+pass);
    }


    function setEmail(e) {
        setMail(e.target.value);
        console.log("mail "+mail);

    }

    const classes = useStyles();

    return (

<div>
    {openHome === false &&
    <div>


        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
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
                            label="User Name"
                            name="userName"
                            autoComplete="email"
                            autoFocus
                            onChange={setEmail}
                            value={mail}
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button label="Submit" primary={true} className={classes.submit}
                                onClick={(event) => handleClick(event)}>Sing In</Button>

                        <Button label="Clear" primary={true} className={classes.submit}
                                onClick={(event) => resetClick(event)}>reset</Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>



            <div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Login to Skyroof"}</DialogTitle>
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
</div>
    );
}