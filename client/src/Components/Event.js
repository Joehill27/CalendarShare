import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon } from 'mdbreact';

class Event extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <MDBCol style={{ maxWidth: "23rem" }}>
                <MDBCard>
                    <MDBCardBody>
                        <MDBCol md="13">
                            <MDBCardImage src="https://mdbootstrap.com/img/Others/documentation/forest-sm-mini.jpg" className="rounded mx-auto d-block img-fluid mt-0 mb-2" alt="aligment" />
                        </MDBCol>
                        <MDBCardTitle>Event Name</MDBCardTitle>
                        <MDBCardText><MDBIcon icon="calendar-day" className="mr-2"/>June 7, 2019 9:00 AM - 12:00 PM</MDBCardText>
                        <MDBCardText><MDBIcon icon="users" className="mr-2"/>Event Group</MDBCardText>
                        <MDBCardText><MDBIcon icon="info-circle" className="mr-2"/>Event Summary</MDBCardText>
                        <MDBBtn size="sm" color="mdb-color darken-2" href="#">View</MDBBtn>
                        <MDBBtn size="sm" color="green darken-4" href="#">Join</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}

export default Event;