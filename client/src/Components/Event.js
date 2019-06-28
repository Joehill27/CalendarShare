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
                        <MDBCardTitle>Event Name</MDBCardTitle>
                        <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
                        <MDBBtn size="sm" color="mdb-color darken-2" href="#">View</MDBBtn>
                        <MDBBtn size="sm" color="mdb-color darken-2" href="#">Edit</MDBBtn>
                        <MDBBtn className="ml-5" outline size="sm" color="danger"><MDBIcon icon="trash-alt" /></MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}

export default Event;