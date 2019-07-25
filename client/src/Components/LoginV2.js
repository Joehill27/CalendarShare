import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBFooter, MDBIcon } from 'mdbreact';
const Logo = require('../img/calendarlogo.png')

class LoginV2 extends Component {

    render() {
        const bgNavy = {backgroundColor: '#2E4158'}
        return (
            <div style={bgNavy} class="paddingt paddingb">
            <MDBContainer>
            <MDBRow >
                <MDBCol>
                <img className="Center" src={Logo} width='40%' height='auto'/>
                </MDBCol>
                <MDBCol class="">
                <form class="text-center" action="#!">

                    <p class="h4 mb-4 white-text">Sign In</p>

                    <input type="text" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="Username" required/>

                    <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password" required/>

                    <div class="d-flex justify-content-around">
                        <div>
                            <a href="">Forgot password?</a>
                        </div>
                    </div>
                    <MDBBtn outline color="primary">sign in</MDBBtn>

                    <p class="white-text">Not a member?
                        <a href="/createaccountv2"> Create Account</a>
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

export default LoginV2;