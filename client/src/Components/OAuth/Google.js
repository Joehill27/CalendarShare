import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'PATCH, DELETE, POST, GET, OPTIONS';

class Facebook extends Component
{
    constructor()
    {
        super();

        const response = axios.get('/api/google/get', null);
        console.log(response);       
    }
    render()
    {
        return (
            <div>
                <h1>Logging in with Google </h1>
                <a className="home-btn" href="/">Home</a>
            </div>
        );
    }
}

export default Facebook;
