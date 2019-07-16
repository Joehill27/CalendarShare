import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const bcrypt = require('bcryptjs');

axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'PATCH, DELETE, POST, GET, OPTIONS';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loggedIn: 'false'
    };

    localStorage.setItem('userId', -1);
    localStorage.setItem('contactId', '');
    localStorage.setItem('contactName', '');
    localStorage.setItem('contactPhone', '');
    localStorage.setItem('contactEmail', '');
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    // localStorage.setItem('userId', 0);
    const login = async() => {
      var blank = {
        username: this.state.username,
        password: '',
        loggedIn: this.state.loggedIn
      };
      try {
        var res = await axios.post('/api/user/login', blank);
        if(bcrypt.compareSync(this.state.password, res.data.user.password))
        {
          return res;
        } else {
          alert("Invalid Username/Password");
        }
      } catch (error) {
        console.log(error);
      }
    }

    const loginHandler = async() => {
      const response = await login();
      console.log(response);
      if(response) {
        localStorage.setItem('userId', response.data.user._id);
        delete response.data.user.password;
        localStorage.setItem('user', response.data.user);
        this.props.history.push('/home');
        window.location.reload();
      }
  }


    return (
      <div className="FormCenter">
          {/* Usermane */}
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">Username</label>
            <input type="text" id="username" className="FormField__Input" placeholder="Enter Your Username" name="username"
            value={this.state.username} onChange={this.handleChange} />
          </div>
          {/* Password */}
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">Password</label>
            <input type="password" id="password" className="FormField__Input" placeholder="Enter Your Password" name="password"
            value={this.state.password} onChange={this.handleChange} />
          </div>
          {/* Login Button */}
          <div className="FormField">
            <button onClick={loginHandler} className="FormField__Button mr-20">Login</button>
            <Link  to="/createAccount" className="FormField__Link">Create an account</Link>
          </div>
          <div>
            <h1> Or login using... </h1>
            <a className="google-btn" href="/auth/google">Google+</a>
            <h1/>
            <a className="facebook-btn" href="/auth/facebook">Facebook</a>
          </div>
      </div>
    );
  }
}

export default Login;
