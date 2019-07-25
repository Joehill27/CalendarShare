import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBFooter, MDBIcon } from 'mdbreact';
import Footer from './Footer';

class CreateAccountV2 extends Component {

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
            if (password.match(/[A-Z]/g) != null) this.setState({ uppercase: 'green' }); // We have an uppercase
            else this.setState({ uppercase: 'red', passconfirmed: '0' });
            if (password.match(/[a-z]/g) != null) this.setState({ lowercase: 'green' }); // We have a lowercase
            else this.setState({ lowercase: 'red', passconfirmed: '0' });
            if (password.match(/\d+/g) != null) this.setState({ number: 'green' }); // We have a number
            else this.setState({ number: 'red', passconfirmed: '0' });
            if (password.match(/[^\s\w]/g) != null) this.setState({ symbol: 'green' }); // We have a symbol
            else this.setState({ symbol: 'red', passconfirmed: '0' });
            if ((password.length >= 8 && password.length <= 20)) this.setState({ length: 'green' }); // We have correct length
            else this.setState({ length: 'red', passconfirmed: '0' });
            var matches = password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])\S{8,20}$/g);
            if (matches == null) console.log("Password does not meet requirements");

            // Checking that confirmation works
            if (this.state.checkPass === this.state.password) this.setState({ passconfirm: 'green' });
            else this.setState({ passconfirm: 'red', passconfirmed: '0' });
        });
    }

    render() {
        const bgNavy = { backgroundColor: '#2E4158' }
        return (
            <div style={bgNavy} class="paddingt paddingb">
                <MDBContainer>
                    <MDBRow >
                        <MDBCol>
                            <h1>Site Logo</h1>
                        </MDBCol>
                        <MDBCol class="">
                            <form class="text-center p-5" action="#!">

                                <p class="h4 mb-4 white-text">Create Account</p>

                                <input type="text" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="Username" required />
                                <div> <h4 style={{ color: 'white' }}> Password Requirements </h4> </div>
                                <div class="grid-container" style={{ display: 'inline-grid', 'grid-template-columns': 'auto auto auto', padding: '10px' }}>
                                    <div class="grid-item" style={{ 'font-size': '18px', padding: '2px', border: '1px solid rgba(0, 0, 0, 0.8)' }}>
                                        <p style={{ color: this.state.uppercase, marginTop: '1.0em' }}>Uppercase</p>
                                    </div>
                                    <div class="grid-item" style={{ 'font-size': '18px', padding: '2px', border: '1px solid rgba(0, 0, 0, 0.8)' }}>
                                        <p style={{ color: this.state.lowercase, marginTop: '1.0em' }}>Lowercase</p>
                                    </div>
                                    <div class="grid-item" style={{ 'font-size': '18px', padding: '2px', border: '1px solid rgba(0, 0, 0, 0.8)' }}>
                                        <p style={{ color: this.state.number, marginTop: '1.0em' }}>Number</p>
                                    </div>
                                    <div class="grid-item" style={{ 'font-size': '18px', padding: '2px', border: '1px solid rgba(0, 0, 0, 0.8)' }}>
                                        <p style={{ color: this.state.symbol, marginTop: '1.0em' }}>Symbol</p>
                                    </div>
                                    <div class="grid-item" style={{ 'font-size': '18px', padding: '2px', border: '1px solid rgba(0, 0, 0, 0.8)' }}>
                                        <p style={{ color: this.state.length, marginTop: '1.0em' }}>Between 8 and 20</p>
                                    </div>
                                    <div class="grid-item" style={{ 'font-size': '18px', padding: '2px', border: '1px solid rgba(0, 0, 0, 0.8)' }}>
                                        <p style={{ color: this.state.passconfirm, marginTop: '1.0em' }}>Confirmation</p>
                                    </div>
                                </div>

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