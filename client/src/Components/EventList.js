import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

class EventList extends Component
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
            <div classname = "App">
                <h1> Hello </h1>
            </div>
        );
    }
}

export default EventList;
