import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const sha256 = require('js-sha256');

class CreateAccount extends Component {

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      uppercase: 'red',
      lowercase: 'red',
      number: 'red',
      symbol: 'red',
      length: 'red',
      passconfirm: 'red',
      checkPass: '',
      passconfirmed: '0',
      email: '',
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
    }, function() {
      if(name == "password" || name == "checkPass")
        this.setState({ passconfirmed: '1' })
      
      // Check that the password meets our requirements
      var password = this.state.password;
      if(password.match(/[A-Z]/g) != null) this.setState({uppercase: 'green'}); // We have an uppercase
      else this.setState({uppercase: 'red', passconfirmed: '0'});
      if(password.match(/[a-z]/g) != null) this.setState({lowercase: 'green'}); // We have a lowercase
      else this.setState({lowercase: 'red', passconfirmed: '0'});
      if(password.match(/\d+/g) != null) this.setState({number: 'green'}); // We have a number
      else this.setState({number: 'red', passconfirmed: '0'});
      if(password.match(/[^\s\w]/g) != null) this.setState({symbol: 'green'}); // We have a symbol
      else this.setState({symbol: 'red', passconfirmed: '0'});
      if((password.length >= 8 && password.length <= 20)) this.setState({length: 'green'}); // We have correct length
      else this.setState({length: 'red', passconfirmed: '0'});
      var matches = password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])\S{8,20}$/g);
      if(matches == null) console.log("Password does not meet requirements");

      // Checking that confirmation works
      if(this.state.checkPass == this.state.password) this.setState({ passconfirm: 'green' });
      else this.setState({ passconfirm: 'red', passconfirmed: '0' });
    });
  }

  render() {
    const createAccount = async() => {
      if(this.state.passconfirmed == '1')
      {
        var toHash = this.state.username + this.state.password + this.state.username;
        var hash = sha256(toHash);
        var hashedInfo = {
          username: this.state.username,
          password: hash,
          checkPass: '',
          email: this.state.email
        };
        try {
          console.log(hashedInfo);
          return axios.post('/api/user/createAccount', hashedInfo);
        } catch(error) {
          console.log(error);
        }
      } else alert("Your password is wrong");
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
            <label className="FormField__Label" htmlFor="password">Password (Requirements)</label>
            <p style={{ marginTop: '-.75em', marginBot: '-1.5em', color: this.state.uppercase }}>Uppercase Letter</p>
            <p style={{ marginTop: '-1.5em', marginBot: '-1.5em', color: this.state.lowercase }}>Lowercase Letter</p>
            <p style={{ marginTop: '-1.5em', marginBot: '-1.5em', color: this.state.number }}>Number</p>
            <p style={{ marginTop: '-1.5em', marginBot: '-1.5em', color: this.state.symbol }}>Symbol</p>
            <p style={{ marginTop: '-1.5em', marginBot: '-1.5em', color: this.state.length }}>Between 8 and 20 characters</p>
            <p style={{ marginTop: '-1.5em', marginBot: '-1.5em', color: this.state.passconfirm }}>Password and confirmation match</p>
            <input type="password" id="password" className="FormField__Input" placeholder="Enter Your Password" name="password" 
            value={this.state.password} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">Confirm Password</label>
            <input type="password" id="passwordConfirm" className="FormField__Input" placeholder="Confirm Your Password" name="checkPass" 
            value={this.state.checkPass} onChange={this.handleChange} />
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
