import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBModal, MDBModalBody,
MDBModalHeader, MDBModalFooter, MDBContainer, MDBRow, MDBInput } from 'mdbreact';
import Image from './Image';
import one from '../defaultImages/userProfilePics/8.png';

class Friend extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            modal1: false,
            userName: 'testUsername'
        }

        this.toggle = this.toggle.bind(this);
        this.doSomething = this.doSomething.bind(this);
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    doSomething() {
        console.log('clicked 27');
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
                                <img src={one} className="img-fluid pl-3 pr-2" alt="User" height="162" width="162"/>
                                </div>
                            </MDBCol>
                        </MDBRow>
                        <MDBCardTitle className="text-center pt-1">{this.state.userName}</MDBCardTitle>
                        <div className="pl-1">
                            <MDBBtn onClick={console.log('I need this to call my doSomething() function')} size="sm" color="mdb-color darken-2" >View Page</MDBBtn>
                            <MDBBtn color="transparent" className="p-1 m-0" onClick={this.toggle(1)}><MDBIcon icon="trash-alt" className="red-text py-1 px-1"/></MDBBtn>
                            <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered size="sm">
                            <MDBModalHeader toggle={this.toggle(1)} className="danger-color-dark white-text">Remove Friend</MDBModalHeader>
                                    <MDBModalBody>
                                        <MDBContainer fluid>
                                            <MDBRow>
                                                <MDBCol>
                                                <MDBBtn size="sm" color="danger">Remove</MDBBtn>
                                                <MDBBtn size="sm" color="mdb-color darken-2" onClick={this.toggle(1)}>Cancel</MDBBtn>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBContainer>
                                    </MDBModalBody>
                        </MDBModal>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol> 
            </div>
        );
    }
} export default Friend;