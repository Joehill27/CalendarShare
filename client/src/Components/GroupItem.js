import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBModal, MDBModalBody,
MDBModalHeader, MDBModalFooter, MDBContainer, MDBRow, MDBInput } from 'mdbreact';
import Image from './Image';
import one from '../defaultImages/userProfilePics/8.png';

class GroupItem extends React.Component {

    state = {
        modal1: false
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    render() {
        return(
            <div className="pl-3 pb-3">
                <MDBCard>
                    <MDBCardBody className="px-3 py-1">
                        <MDBRow>
                            <MDBCol md="20">
                                <div className="d-flex justify-content-between">
                                    <div className="mr-auto">
                                        <img src={one} className="ml-2 my-0" alt="User" height="55" width="55"/>
                                    </div>
                                    <div>
                                        <MDBCardTitle className="useritempadding pr-5 pl-2 pb-0">GroupName</MDBCardTitle>
                                    </div>
                                    <div className="m1-auto">
                                        <MDBBtn color="white" className="px-3 mt-1"><MDBIcon icon="check" className="green-text p-0 my-0 mx-1 mr-2"/>Join Group</MDBBtn>
                                    </div>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </div>
        );
    }
} export default GroupItem;