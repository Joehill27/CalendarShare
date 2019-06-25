import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';
import Home from './Components/Home';
import App from './App';

export default() => {
    return(
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path = "/createAccount" component={CreateAccount} />
                    <Route path = "/login" component={Login} />
                    <Route path = "/home" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}