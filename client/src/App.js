import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import './App.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Icon from '../src/img/whatsapp-logo.png';

import Login from "./Components/Login";
import CreateAccount from "./Components/CreateAccount";

axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'PATCH, DELETE, POST, GET, OPTIONS';

class App extends Component {

  // here is our UI
  render() {
    return (
      <Router>
      <div className="App">

        <div className="App__Aside">
        <img className="Center" src={Icon} width='40%' height='auto'/>
        </div>

        <div className="App__Form">
          
          <div className="PageSwitcher">
            <NavLink to="/login" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Login</NavLink>
            <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Create Account</NavLink>
          </div>

          <div className="FormTitle">
            <NavLink to="/login" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Login</NavLink> or 
            <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Create Account</NavLink>
          </div>
        
          <Route exact path="/" component={CreateAccount}></Route>
          <Route path="/login" component={Login}></Route>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
