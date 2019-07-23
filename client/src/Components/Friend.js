import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBModal, MDBModalBody,
MDBModalHeader, MDBModalFooter, MDBContainer, MDBRow, MDBInput } from 'mdbreact';
import Image from './Image';
import one from '../defaultImages/userProfilePics/8.png';

class Friend extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        return(
            <div className="card-inline pb-2">
               <MDBCol style={{ maxWidth: "23rem" }}>
                <MDBCard>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md="13">
                                <div className="">
                                <img src={one} className="img-fluid pl-2 pr-2" alt="User" height="157" width="157"/>
                                </div>
                            </MDBCol>
                        </MDBRow>
                        <MDBCardTitle className="text-center pt-1">Username</MDBCardTitle>
                        <div className="pl-1">
                            <MDBBtn onClick = {this.props.onClick} size="sm" color="mdb-color darken-2">View Page</MDBBtn>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol> 
            </div>
        );
    }
} export default Friend;