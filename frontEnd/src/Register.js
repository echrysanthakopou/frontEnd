import React, { Component } from 'react';
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
import Grid from "@material-ui/core/Grid";

// import Login from './Login';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            password2:'',
            open:false,
            errorMessage:''
        }
    }
    componentWillReceiveProps(nextProps){
        console.log("nextProps",nextProps);
    }
    handleClick(event,role){
        var apiBaseUrl = "http://127.0.0.1:8082";
        // console.log("values in register handler",role);
        var self = this;

        if (this.state.password!==this.state.password2)
        {
            this.setState({errorMessage:"Οι κωδικοί που δώσατε δεν ταιριάζουν."});
        }
        else if (!this.state.email.includes('@')) {

            this.setState({errorMessage:"Το mail που δώσατε δεν είναι έγκυρο."});
        }
        else  //To be done:check for empty values before hitting submit
        //if(this.state.first_name.length>0 && this.state.last_name.length>0 && this.state.email.length>0 && this.state.password.length>0)
        {
            var payload={
                "name": this.state.first_name,
                "surname": this.state.last_name,
                "email":this.state.email,
                "password":this.state.password,
                "role":role
            }
            axios.post(apiBaseUrl+'/createuser', payload);

            console.log(payload);
            const rootElement = document.getElementById("root");
            ReactDOM.render(<SignloginInSide/>, rootElement);

                // .then(function (response) {
                //     console.log(response);
                //     // if(response.data.code === 200) {
                //     //     //  console.log("registration successfull");
                //     //     var loginscreen = [];
                //     //     // loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
                //     //     // var loginmessage = "Not Registered yet.Go to registration";
                //     //     // self.props.parentContext.setState({loginscreen:loginscreen,
                //     //     //     loginmessage:loginmessage,
                //     //     //     buttonLabel:"Register",
                //     //     // //     isLogin:true
                //     //     // }
                //     // });
                //     }
                //     else{
                //         console.log("some error ocurred",response.data.code);
                //     }
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });
        // }
        // else{
        //     alert("Input field value is missing");
         }

    }

    handleClose()
    {
        this.setState({open:false});
    }
    render() {
        // console.log("props",this.props);
        var userhintText,userLabel;
        if(this.props.role === "student"){
            userhintText="Enter your Student Id";
            userLabel="Student Id";
        }
        else{
            userhintText="Enter your Teacher Id";
            userLabel="Teacher Id";
        }
        userhintText="Enter your UserName";
        userLabel="Email";

        return (
            <div>
                <MuiThemeProvider>

                    <div align="center">
                        <AppBar
                            title="Register"
                        />

                        <p/>

                        <label color={'red'} > {this.state.errorMessage} </label>
                        <p/>
                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange = {(event,newValue) => this.setState({first_name:newValue})}
                        />
                        <br/>


                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange = {(event,newValue) => this.setState({last_name:newValue})}
                        />
                        <br/>


                        {/*<TextField*/}
                        {/*    hintText="Enter your Last Name"*/}
                        {/*    floatingLabelText="Last Name"*/}
                        {/*    onChange = {(event,newValue) => this.setState({last_name:newValue})}*/}
                        {/*/>*/}
                        {/*<br/>*/}
                        <TextField
                            hintText={userhintText}
                            floatingLabelText={userLabel}
                            onChange = {(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <TextField
                        type = "password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
                        <br/>

                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password2:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
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