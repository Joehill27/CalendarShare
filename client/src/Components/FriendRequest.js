import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBModal, MDBModalBody,
MDBModalHeader, MDBModalFooter, MDBContainer, MDBRow, MDBInput } from 'mdbreact';
import Image from './Image';
import one from '../defaultImages/userProfilePics/8.png';

class FriendRequest extends React.Component {

    render() {
        return(
            <div className="card-inline pb-2">
               <MDBCol style={{ maxWidth: "23rem" }}>
                <MDBCard>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md="13">
                                <div className="">
                                <img src={one} className="img-fluid pl-3" alt="User" height="157" width="157"/>
                                </div>
                            </MDBCol>
                        </MDBRow>
                        <MDBCardTitle className="text-center pt-1">Username</MDBCardTitle>
                        <MDBBtn size="sm" color="dark-green"><MDBIcon icon="check" /></MDBBtn>
                        <MDBBtn size="sm" color="danger"><MDBIcon icon="times" /></MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol> 
            </div>
        );
    }
} export default FriendRequest;