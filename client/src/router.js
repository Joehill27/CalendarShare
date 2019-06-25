import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';
import EventList from './Components/EventList';
// import CreateContact from './CreateContact';
// import EditContact from './EditContact';
import Home from './App';

//Commented out to give example of how routes should be written
export default() => {
    return(
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path = "/createAccount" component={CreateAccount} />
                    <Route path = "/login" component={Login} />
                    <Route path = "/eventList" component={EventList} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}