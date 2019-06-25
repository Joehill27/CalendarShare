import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component
{
    constructor()
    {
        super();

        this.state =
        {
            name: ' ',
            time: 0
        };
    }

    render()
    {
        return (
            <div className="App">
                <div className="App__ContactPage" height = "auto">
                    <div className="PageSwitcher">
                        <NavLink exact to="/" className="PageSwitcher__Item--Logout">Logout</NavLink>
                    </div>
                    
                    <div>
                        <h1> Hello </h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
