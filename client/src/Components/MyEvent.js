import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBModal, MDBModalBody,
MDBModalHeader, MDBModalFooter, MDBContainer, MDBRow, MDBInput } from 'mdbreact';
import Image from './Image';

class MyEvent extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
            modal1: false,
            modal2: false,
            eventId : this.props.eventId,
            eventName: this.props.eventName,
            eventStart: this.props.eventStart,
            eventEnd: this.props.eventEnd,
            eventType: this.props.eventType,
            eventDetails: this.props.eventDetails,
            eventImageID: this.props.imageId,
            eventAddress: this.props.eventAddress,
            eventZipCode: this.props.eventZipCode,
            eventCounrty: this.props.eventCounrty,
            eventCity: this.props.eventCity
        }
        
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
      };

    changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    };


    render() {
        return (
            <MDBCol style={{ maxWidth: "23rem" }}>
                <MDBCard>
                    <MDBCardBody>
                        <MDBRow>
                        <MDBCol md="13">
                            <div className="rounded mx-auto d-block img-fluid mt-0 mb-2">
                                <Image imageId={this.state.eventPicture} type={'event'}/>
                            </div>
                        </MDBCol>
                        </MDBRow>
                        <MDBCardTitle>Event Name</MDBCardTitle>
                        <MDBCardText><MDBIcon icon="calendar-day" className="mr-2"/>{this.state.eventStart}</MDBCardText>
                        <MDBCardText><MDBIcon icon="calendar-day" className="mr-2"/>{this.state.eventEnd}</MDBCardText>
                        <MDBCardText><MDBIcon icon="users" className="mr-2"/>Event Group</MDBCardText>
                        <MDBCardText><MDBIcon icon="info-circle" className="mr-2"/>{this.state.eventDetails}</MDBCardText>
                        <MDBBtn size="sm" color="mdb-color darken-2" onClick={this.toggle(1)}>View</MDBBtn>
                            <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
                                <MDBModalHeader toggle={this.toggle(1)} className="mdb-color darken-2 white-text">Event Name</MDBModalHeader>
                                <MDBModalBody>
                                    <MDBCardText><MDBIcon icon="calendar-day" className="mr-2"/>Date</MDBCardText>                                    
                                    <MDBCardText><MDBIcon icon="clock" className="mr-2"/>Time</MDBCardText>
                                    <MDBCardText><MDBIcon icon="clipboard-list" className="mr-2"/>Event Type</MDBCardText>
                                    <MDBCardText><MDBIcon icon="info-circle" className="mr-2"/>Details</MDBCardText>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="danger" onClick={this.toggle(1)}>Close</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                        <MDBBtn size="sm" color="mdb-color darken-2" onClick={this.toggle(2)}>Edit</MDBBtn>
                            <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} size="lg" centered>
                                    <MDBModalHeader toggle={this.toggle(2)} className="mdb-color darken-2 white-text">Edit [Event Name]</MDBModalHeader>
                                    <MDBModalBody>
                                        <MDBContainer fluid className="">
                                            <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                                                <MDBRow>
                                                    <MDBCol>
                                                        <MDBInput
                                                            value={this.state.eventName}
                                                            label="Event Name" 
                                                            className="form-control"
                                                            name="eventName"
                                                            onChange={this.changeHandler}
                                                            type="text"
                                                            required
                                                            >
                                                            <div className="invalid-feedback font-weight-light smallText">Event Name Required</div>
                                                        </MDBInput>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol>
                                                        <MDBInput
                                                            value={this.state.eventDate}
                                                            label="Event Date" 
                                                            className="form-control"
                                                            name="eventDate"
                                                            onChange={this.changeHandler}
                                                            type="Date"
                                                            required
                                                        >
                                                        <div className="invalid-feedback font-weight-light smallText">Event Date Required</div>
                                                        </MDBInput>
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <MDBInput
                                                            value={this.state.eventStart}
                                                            label="Start Time" 
                                                            className="form-control"
                                                            name="eventStart"
                                                            onChange={this.changeHandler}
                                                            type="time"
                                                            required
                                                        >
                                                        <div className="invalid-feedback font-weight-light smallText">Start Time Required</div>
                                                        </MDBInput>
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <MDBInput
                                                            value={this.state.eventEnd}
                                                            label="End Time" 
                                                            className="form-control"
                                                            name="eventEnd"
                                                            onChange={this.changeHandler}
                                                            type="time"
                                                            required
                                                        >
                                                        <div className="invalid-feedback font-weight-light smallText">End Time Required</div>
                                                        </MDBInput>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol>
                                                        <MDBInput
                                                            value={this.state.eventAddress}
                                                            label="Address" 
                                                            className="form-control"
                                                            name="eventAddress"
                                                            onChange={this.changeHandler}
                                                            type="text"
                                                            required
                                                            >
                                                            <div className="invalid-feedback font-weight-light smallText">Address Required</div>
                                                        </MDBInput>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol>
                                                        <MDBInput
                                                            value={this.state.eventZipCode}
                                                            label="Zip Code" 
                                                            className="form-control"
                                                            name="eventZipCode"
                                                            onChange={this.changeHandler}
                                                            type="text"
                                                            required
                                                            >
                                                            <div className="invalid-feedback font-weight-light smallText">Zip Code Required</div>
                                                        </MDBInput>
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <MDBInput
                                                            value={this.state.eventCity}
                                                            label="City" 
                                                            className="form-control"
                                                            name="eventCity"
                                                            onChange={this.changeHandler}
                                                            type="text"
                                                            required
                                                            >
                                                            <div className="invalid-feedback font-weight-light smallText">City Required</div>
                                                        </MDBInput>
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <MDBInput
                                                            value={this.state.eventCounrty}
                                                            label="Counrty" 
                                                            className="form-control"
                                                            name="eventCounrty"
                                                            onChange={this.changeHandler}
                                                            type="text"
                                                            required
                                                            >
                                                            <div className="invalid-feedback font-weight-light smallText">Counrty Required</div>
                                                        </MDBInput>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol md="6">
                                                        <label className="medText grey-text font-weight-light ml-1">Event Type</label>
                                                        <select 
                                                            className="browser-default custom-select" 
                                                            name="eventType"
                                                            required
                                                        >

                                                            <option value="">Choose Event Type</option>
                                                            <option value="Sporting">Sporting</option>
                                                            <option value="Music">Music</option>
                                                        </select>
                                                        <div className="invalid-feedback font-weight-light smallText">Event Type Required</div>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol>
                                                        <MDBInput
                                                            value={this.state.eventDetails}
                                                            label="Event Details" 
                                                            className="form-control"
                                                            name="eventDetails"
                                                            onChange={this.changeHandler}
                                                            type="textarea"
                                                            rows="3"
                                                            required
                                                        >
                                                        <div className="invalid-feedback font-weight-light smallText">Event Details Required</div>
                                                        </MDBInput>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol className="ml-auto" md="4">
                                                    <MDBBtn color="mdb-color darken-2" type="submit" onclick={this.submitHandler} className="ml-auto">Save</MDBBtn>
                                                    <MDBBtn color="danger" onClick={this.toggle(2)} className="ml-auto">Close</MDBBtn>
                                                    </MDBCol>
                                                </MDBRow>
                                            </form>
                                        </MDBContainer>
                                    </MDBModalBody>
                                </MDBModal>
                        <MDBBtn className="ml-5" outline size="sm" color="danger"><MDBIcon icon="trash-alt" /></MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}

export default MyEvent;