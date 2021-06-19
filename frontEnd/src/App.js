import React , { Component } from 'react';

import './App.css';
import SignInSide from "./SignInSide"


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import SingInSide from './SignInSide'
import LoginPage from "./SignInSide";
import PostCreate from "./postCreate";


class App extends Component {


    state = {
        todos: []
    }

    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then((data) => {
                this.setState({todos: data})
                console.log(this.state.todos)
            })
            .catch(console.log)
    }

    render() {
         ReactDOM.render( <SignInSide {...this.pros} />, document.getElementById('root'));
        return (
            <table>
                <tr>
                <th> 1</th>
                <th>2</th>
                </tr>
            <div className="container">
                <div className="col-xs-12">
                        {this.state.todos.map((todo) => (
                            <tr>

                                    <td className="card-title">{todo.title}</td>
                                    <td className="card-subtitle mb-2 text-muted">
                                        o</td>
                            </tr>
                        ))}

                </div>

            </div>
            </table>
        );
    }
}

export default App;
