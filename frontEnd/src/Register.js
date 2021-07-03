import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import SignloginInSide from "./SignInSide";
import ReactDOM from "react-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import App from "./App";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Or Create your Own theme:
const theme = createMuiTheme({
    palette: {
        background: {
            default: "#e4f0e2"
        }
    }
});


const strongRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password2: '',
            open: false,
            errorMessage: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
    }

    handleClick(event, role) {
        var apiBaseUrl = "http://83.212.101.19:8082";
        // console.log("values in register handler",role);
        var self = this;

        if (this.state.password !== this.state.password2) {
            this.setState({errorMessage: "Οι κωδικοί που δώσατε δεν ταιριάζουν."});
        }
        else if ( !strongRegex.test(this.state.password2) ){

            this.setState({errorMessage: "O κωδικός που δώσατε δεν είναι αρκετά ισχυρός."});
        }

        else if (!this.state.email.includes('@')) {

            this.setState({errorMessage: "Το mail που δώσατε δεν είναι έγκυρο."});
        } else
            {
            var payload = {
                "name": this.state.first_name,
                "surname": this.state.last_name,
                "email": this.state.email,
                "password": this.state.password,
                "role": role
            }
            axios.post( 'http://83.212.101.19:8082/createuser', payload);

            console.log(payload);
            const rootElement = document.getElementById("root");
            ReactDOM.render(<App  />, document.getElementById('root'));


        }

    }

    returnBack(event, role) {
                   ReactDOM.render(<App  />, document.getElementById('root'));
        }


    handleClose() {
        this.setState({open: false});
    }



    render() {
        // console.log("props",this.props);
        var userhintText, userLabel;
        if (this.props.role === "student") {
            userhintText = "Enter your Student Id";
            userLabel = "Student Id";
        } else {
            userhintText = "Enter your Teacher Id";
            userLabel = "Teacher Id";
        }
        userhintText = "Enter your UserName";
        userLabel = "Email";

        return (
            <div>
                <MuiThemeProvider theme={theme}>

                    <div align="center">
                        <AppBar
                            title="Εγγραφή"
                        />

                        <p/>

                        <label color={'red'}> {this.state.errorMessage} </label>
                        <p/>
                        <TextField
                            hintText="Εισαγωγή ονόματος "
                            floatingLabelText="Όνομα"
                            onChange={(event, newValue) => this.setState({first_name: newValue})}
                        />
                        <br/>


                        <TextField
                            hintText="Εισαγώγη επιθέτου "
                            floatingLabelText="Επίθετο"
                            onChange={(event, newValue) => this.setState({last_name: newValue})}
                        />
                        <br/>

                        <TextField
                            hintText={userhintText}
                            floatingLabelText={userLabel}
                            onChange={(event, newValue) => this.setState({email: newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Εισαγώγη κωδικού"
                            floatingLabelText="Κωδικός"
                            onChange={(event, newValue) => this.setState({password: newValue})}
                        />
                        <br/>

                        <TextField
                            type="password"
                            hintText="Εισαγώγη κωδικού"
                            floatingLabelText="Πληκτρολογήστε  το κωδικό"
                            onChange={(event, newValue) => this.setState({password2: newValue})}
                        />
                        <br/>
                        <RaisedButton label="Επιστρόφη" primary={true} style={style}
                                      onClick={(event) => this.returnBack(event, this.props.role)}/>

                        <RaisedButton label="Υποβολή" primary={true} style={style}
                                      onClick={(event) => this.handleClick(event, this.props.role)}/>

                    </div>
                </MuiThemeProvider>

                <div>

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
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
                            <Button onClick={this.handleClose} color="primary">
                                Close
                            </Button>

                        </DialogActions>
                    </Dialog>

                </div>
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default Register;