import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const bcrypt = require('bcryptjs');
const emailCheck = require('email-check');

class CreateAccount extends Component {

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: ''
    };

    localStorage.setItem('userId', -1);
    localStorage.setItem('contactId', '');
    localStorage.setItem('contactName', '');
    localStorage.setItem('contactPhone', '');
    localStorage.setItem('contactEmail', '');
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    bcrypt.hash(this.state.password, 10, function(err, hash) {
      console.log(hash);
      var hashedInfo = {
        username: this.state.username,
        password: hash,
        email: this.state.email
      };
      axios.post('/api/user/createAccount', hashedInfo)
      .then(res => console.log(res));
    });
  }


  render() {

    const createAccount = async() => {
      let hash = bcrypt.hashSync(this.state.password, 10);
      var hashedInfo = {
        username: this.state.username,
        password: hash,
        email: this.state.email
      };
      try {
        console.log(hashedInfo);
        return axios.post('/api/user/createAccount', hashedInfo);
      } catch(error) {
        console.log(error);
      }
    }

    const createAccountHandler = async() => {
      const response = await createAccount();
      console.log(response);
      if(response) {
        console.log(response.data.error);
        if(!response.data.error.localeCompare("Account with that username already exists") || 
           !response.data.error.localeCompare("Invalid email address") ||
           !response.data.error.localeCompare("User with email already exists"))
        {
          console.log(response.data.error);
          alert("Account name/email already exists or email is invalid");
          this.props.history.push('/');
          return;
        }

        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('userName', response.data.user.username);
        this.props.history.push('/home');
        window.location.reload();
      } else {
        alert("Unable to create account");
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
          {/* Email */}
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">E-mail</label>
            <input type="email" id="email" className="FormField__Input" placeholder="Enter Your E-mail" name="email" 
            value={this.state.email} onChange={this.handleChange} />
          </div>
          {/* Create Account Button */}
            <button onClick={createAccountHandler} className="FormField__Button mr-20">Create Account</button>
            <Link to="/" className="FormField__Link">I already have an account</Link>
      </div>
    );
  }
}

export default CreateAccount;
