import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';
import Home from './Components/Home';
import App from './App';
import Google from './Components/OAuth/Google';
import Facebook from './Components/OAuth/Facebook';
import Logout from './Components/OAuth/Logout';
import LoginV2 from "./Components/LoginV2";
import CreateAccountV2 from "./Components/CreateAccountV2";
import FriendsPage from "./Components/FriendsPage";
import FriendPage from "./Components/FriendPage";
import GroupsPage from "./Components/GroupsPage";
import GroupPage from  "./Components/GroupPage";

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
                    <Route path = "/loginv2" component={LoginV2} />
                    <Route path = "/createaccountv2" component={CreateAccountV2} />
                    <Route path = "/friends" component={FriendsPage} />
                    <Route path = "/friend" component={FriendPage} />
                    <Route path = "/group" component={GroupPage} />
                    <Route path = "/groups" component={GroupsPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}
