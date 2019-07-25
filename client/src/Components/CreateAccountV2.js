import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBFooter, MDBIcon } from 'mdbreact';
import Footer from './Footer';
const Logo = require('../img/calendarlogo.png')

class CreateAccountV2 extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            uppercase: 'white',
            lowercase: 'white',
            number: 'white',
            symbol: 'white',
            length: 'white',
            passconfirm: 'white',
            checkPass: '',
            passconfirmed: '0',
            email: '',
            open: true,
            matches: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        }, function () {
            if (name === "password" || name === "checkPass")
                this.setState({ passconfirmed: '1' })

            // Check that the password meets our requirements
            var password = this.state.password;
            if (password.match(/[A-Z]/g) != null) this.setState({ uppercase: '#2E4158' }); // We have an uppercase
            else this.setState({ uppercase: 'white', passconfirmed: '0' });
            if (password.match(/[a-z]/g) != null) this.setState({ lowercase: '#2E4158' }); // We have a lowercase
            else this.setState({ lowercase: 'white', passconfirmed: '0' });
            if (password.match(/\d+/g) != null) this.setState({ number: '#2E4158' }); // We have a number
            else this.setState({ number: 'white', passconfirmed: '0' });
            if (password.match(/[^\s\w]/g) != null) this.setState({ symbol: '#2E4158' }); // We have a symbol
            else this.setState({ symbol: 'white', passconfirmed: '0' });
            if ((password.length >= 8 && password.length <= 20)) this.setState({ length: '#2E4158' }); // We have correct length
            else this.setState({ length: 'white', passconfirmed: '0' });
            var matches = password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])\S{8,20}$/g);
            if (matches == null) {
                console.log("Password does not meet requirements");
                this.setState({ matches: false });
            }
            else this.setState({ matches: true });

            // Checking that confirmation works
            if (this.state.checkPass === this.state.password) this.setState({ passconfirm: '#2E4158' });
            else this.setState({ passconfirm: 'white', passconfirmed: '0' });

            if(this.state.checkPass === this.state.password && this.state.matches === true) this.setState({ open: false });
            else this.setState({ open: true });
        });
    }

    render() {
        const bgNavy = { backgroundColor: '#2E4158' }
        return (
            <div style={bgNavy} class="paddingt paddingb">
                <MDBContainer>
                    <MDBRow >
                        <MDBCol>
                        <h1><img className="Center" src={Logo} width='40%' height='auto'/></h1>

                        </MDBCol>
                        <MDBCol class="">
                            <form class="text-center" action="#!">

                                <p class="h4 mb-4 white-text">Create Account</p>

                                <input type="text" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="Username" required />
                                {this.state.open ?
                                    <div> <h4 style={{ color: 'white' }}> Password Requirements </h4> </div>
                                    : null
                                }
                                {this.state.open ?
                                    <div class="grid-container" style={{ display: 'inline-grid', 'grid-template-columns': 'auto auto auto', padding: '10px' }}>
                                        <div class="grid-item" style={{ 'font-size': '18px', padding: '2px' }}>
                                            <p style={{ color: this.state.uppercase, marginTop: '1.0em' }}>Uppercase</p>
                                        </div>
                                        <div class="grid-item" style={{ 'font-size': '18px', padding: '2px' }}>
                                            <p style={{ color: this.state.lowercase, marginTop: '1.0em' }}>Lowercase</p>
                                        </div>
                                        <div class="grid-item" style={{ 'font-size': '18px', padding: '2px' }}>
                                            <p style={{ color: this.state.number, marginTop: '1.0em' }}>Number</p>
                                        </div>
                                        <div class="grid-item" style={{ 'font-size': '18px', padding: '2px' }}>
                                            <p style={{ color: this.state.symbol, marginTop: '1.0em' }}>Symbol</p>
                                        </div>
                                        <div class="grid-item" style={{ 'font-size': '18px', padding: '2px' }}>
                                            <p style={{ color: this.state.length, marginTop: '1.0em' }}>Between 8 and 20</p>
                                        </div>
                                        <div class="grid-item" style={{ 'font-size': '18px', padding: '2px' }}>
                                            <p style={{ color: this.state.passconfirm, marginTop: '1.0em' }}>Confirmation</p>
                                        </div>
                                    </div>
                                    : null
                                }

                                <input type="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Enter Your Password" name="password"
                                    value={this.state.password} onChange={this.handleChange} />

                                <input type="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Confirm Password" name="checkPass"
                                    value={this.state.checkPass} onChange={this.handleChange} />

                                <input type="email" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Email" name="email"
                                    value={this.state.email} onChange={this.handleChange} />

                                <MDBBtn outline color="primary">Create Account</MDBBtn>

                                <p class="white-text">Have an account?
                                    <a href="/loginv2"> Sign In</a>
                                </p>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default CreateAccountV2;