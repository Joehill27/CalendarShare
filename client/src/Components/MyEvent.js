import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBModal, MDBModalBody,
MDBModalHeader, MDBModalFooter, MDBContainer, MDBRow, MDBInput } from 'mdbreact';
import Image from './Image';
import {convertDateToFormat} from '../util/eventHelpers';

class MyEvent extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
            modal1: false,
            modal2: false
        }
        
    }

    componentDidMount() {

        let startString = convertDateToFormat(this.props.eventStart);
        let endString = convertDateToFormat(this.props.eventEnd);

        this.setState({
            eventId : this.props.eventId,
            eventName: this.props.eventName,
            // eventStart: this.props.eventStart,
            eventStart: startString,
            eventEnd: endString,
            eventType: this.props.eventType,
            eventDetails: this.props.eventDetails,
            eventImageID: this.props.imageId,
        });
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
                        <MDBCol md="13">
                            <div className="rounded mx-auto d-block img-fluid mt-0 mb-2" alt="aligment">
                                <Image imageId={this.state.eventPicture} type={'event'}/>
                            </div>
                        </MDBCol>
                        <MDBCardTitle>{this.state.eventName}</MDBCardTitle>
                        <MDBCardText><MDBIcon icon="calendar-day" className="mr-2"/>{this.state.eventStart}</MDBCardText>
                        <MDBCardText><MDBIcon icon="calendar-day" className="mr-2"/>{this.state.eventEnd}</MDBCardText>
                        <MDBCardText><MDBIcon icon="info-circle" className="mr-2"/>{this.state.eventDetails}</MDBCardText>
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
                            <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} size="lg" centered>
                                    <MDBModalHeader toggle={this.toggle(2)}>Edit [Event Name]</MDBModalHeader>
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
                                                    <label className="font-weight-light medText grey-text">Event Type</label>
                                                    <div className="custom-control custom-radio">
                                                        <input
                                                            value="Sporting"
                                                            onChange={this.changeHandler}
                                                            type="radio"
                                                            className="custom-control-input"
                                                            id="customControlValidation1"
                                                            name="eventType"
                                                            required
                                                        />
                                                        <label
                                                            className="custom-control-label medText paddingTop font-weight-light"
                                                            htmlFor="customControlValidation1"
                                                        >
                                                            Sporting
                                                        </label>
                                                    </div>
                                                    <div className="custom-control custom-radio ">
                                                        <input
                                                            value="Music"
                                                            onChange={this.changeHandler}
                                                            type="radio"
                                                            className="custom-control-input"
                                                            id="customControlValidation2"
                                                            name="eventType"
                                                            required
                                                        />
                                                        <label
                                                            className="custom-control-label medText paddingTop font-weight-light"
                                                            htmlFor="customControlValidation2"
                                                        >
                                                             Music
                                                        </label>
                                                        <div className="invalid-feedback font-weight-light smallText">Event Type Required</div>
                                                    </div>
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