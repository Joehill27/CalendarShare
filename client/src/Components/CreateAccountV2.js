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
                                <div style={{overflow: 'hidden'}}>
                                    <p style={{ float: 'left', marginTop: '0em', marginBot: '0em', color: this.state.uppercase }}>Uppercase Letter</p>
                                    <p style={{ float: 'right', marginTop: '0em', marginBot: '0em', color: this.state.lowercase }}>Lowercase Letter</p>
                                    <p style={{ float: 'left', marginTop: '1.25em', marginBot: '0em', color: this.state.number }}>Number</p>
                                    <p style={{ float: 'right', marginTop: '1.25em', marginBot: '0em', color: this.state.symbol }}>Symbol</p>
                                    <p style={{ float: 'left', marginTop: '0em', marginBot: '0em', color: this.state.length }}>Between 8 and 20 characters</p>
                                    <p style={{ float: 'right', marginTop: '0em', marginBot: '0em', color: this.state.passconfirm }}>Confirmation match</p>
                                </div>

                                <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password" required />

                                <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Confirm Password" required />

                                <input type="email" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Email" required />

                                <MDBBtn outline color="primary">Create Account</MDBBtn>

                                <p class="white-text">Have an account?
                        <a href="/loginv2"> Sign In</a>
                                </p>

                                {/* <p class="white-text">or sign in with:</p>

                    <MDBBtn outline color="cyan"><MDBIcon fab icon="google pr-2"/>Google</MDBBtn>
                    <MDBBtn outline color="cyan"><MDBIcon fab icon="facebook-square pr-2"/>Facebook</MDBBtn> */}
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default CreateAccountV2;