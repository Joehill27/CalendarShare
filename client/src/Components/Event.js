import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon, MDBModal, MDBModalBody,
    MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {convertDateToFormat} from '../util/eventHelpers';
import Image from './Image';
import {createUserEvent} from '../apiCalls/userAPI';


class Event extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
            modal1: false,
            render: true
        }
        
    }

    componentDidMount() {
        let event = this.props.event;
        if(event){
            console.log('Here is the event'+ JSON.stringify(event));

            let startString = convertDateToFormat(event.start);
            let endString = convertDateToFormat(event.end);

            this.setState({
                'eventId' : event._id,
                'eventName': event.eventName,
                'eventStart': startString,
                'eventEnd': endString,
                'eventType': event.eventType,
                'eventDetails': event.eventDetails,
                'eventImageID': event.imageId
            });
        }
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    joinHandler = event => {
        createUserEvent(localStorage.getItem('userId', event))
        .then((event) => {
            console.log('Added event' + event);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    render() {
        const {render} = this.state.render;
        if(render === false) return null;

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
                                <MDBModalHeader toggle={this.toggle(1)} className="mdb-color darken-2 white-text">{this.state.eventName}</MDBModalHeader>
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
                        <MDBBtn size="sm" color="green darken-4" href="#">Join</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}

export default Event;