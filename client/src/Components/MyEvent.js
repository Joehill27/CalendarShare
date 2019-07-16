import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBModal, MDBModalBody,
MDBModalHeader, MDBModalFooter, MDBContainer, MDBRow, MDBInput } from 'mdbreact';

class MyEvent extends React.Component {

    state = {
        modal1: false,
        modal2: false,
        eventName: {
            value: "",
            valid: false
        }
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }


    render() {
        return (
            <MDBCol style={{ maxWidth: "23rem" }}>
                <MDBCard>
                    <MDBCardBody>
                        <MDBCol md="13">
                            <img src="https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.jpg" className="rounded mx-auto d-block img-fluid mt-0 mb-2" alt="aligment" />
                        </MDBCol>
                        <MDBCardTitle>Event Name</MDBCardTitle>
                        <MDBCardText><MDBIcon icon="calendar-day" className="mr-2"/>June 7, 2019 9:00 AM - 12:00 PM</MDBCardText>
                        <MDBCardText><MDBIcon icon="users" className="mr-2"/>Event Group</MDBCardText>
                        <MDBCardText><MDBIcon icon="info-circle" className="mr-2"/>Event Summary</MDBCardText>
                        <MDBBtn size="sm" color="mdb-color darken-2" onClick={this.toggle(1)}>View</MDBBtn>
                            <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
                                <MDBModalHeader toggle={this.toggle(1)}>Event Name</MDBModalHeader>
                                <MDBModalBody>
                                    Place Holder
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={this.toggle(1)}>Close</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                        <MDBBtn size="sm" color="mdb-color darken-2" onClick={this.toggle(2)}>Edit</MDBBtn>
                            <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} centered>
                                    <MDBModalHeader toggle={this.toggle(2)}>Edit [Event Name]</MDBModalHeader>
                                    <MDBModalBody>
                                        <MDBContainer fluid className="">
                                            <form>
                                                <MDBRow>
                                                    <MDBCol>
                                                        <MDBInput
                                                            label="Event Name" 
                                                            className={this.state.eventName.valid ? "form-control is-valid" : "form-control is-invalid"}
                                                            name="eventName"
                                                            onChange={this.changeHandler}
                                                            type="text"
                                                            required
                                                            >
                                                            <div className="valid-feedback">Valid</div>
                                                            <div className="valid-feedback">invalid</div>
                                                        </MDBInput>
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <MDBInput label="Time" outline />
                                                    </MDBCol>
                                                </MDBRow>
                                            </form>
                                        </MDBContainer>
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn color="mdb-color darken-2">Save</MDBBtn>
                                        <MDBBtn color="danger" onClick={this.toggle(2)}>Cancel</MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
                        <MDBBtn className="ml-5" outline size="sm" color="danger"><MDBIcon icon="trash-alt" /></MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}

export default MyEvent;