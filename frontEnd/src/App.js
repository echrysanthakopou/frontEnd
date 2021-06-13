import React, {Component} from 'react';

import './App.css';
import SignInSide from "./SignInSide"
import ReactDOM from "react-dom";


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


        //this.a=new Login();
        //return this.a.render();

        //ReactDOM.render( <PostCreate />, document.getElementById('root'));

        ReactDOM.render(<SignInSide {...this.pros} />, document.getElementById('root'));

        // <SingInSide pros={this.pros}/>
        //ReactDOM.render( <SignInSide />, document.getElementById('root'));
        /*
    return (
         <div>
             <Sidebar />SignInSide
         </div>
     )*/


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
                                    o
                                </td>
                            </tr>
                        ))}

                    </div>

                </div>
            </table>
        );
        //*/
    }

}

export default App;
