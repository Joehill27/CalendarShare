import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';
import Home from './Components/Home';
import App from './App';
import Google from './Components/OAuth/Google';
import Facebook from './Components/OAuth/Facebook';
import Logout from './Components/OAuth/Logout';

export default() => {
    return(
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path = "/createAccount" component={CreateAccount} />
                    <Route path = "/login" component={Login} />
                    <Route path = "/home" component={Home} />
                    <Route path = "/auth/google" component={Google} />
                    <Route path = "/auth/facebook" component={Facebook} />
                    <Route path = "/auth/logout" component={Logout} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}