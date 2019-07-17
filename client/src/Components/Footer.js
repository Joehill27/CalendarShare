import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

  render () {
    const bgNavy = {backgroundColor: '#2E41582'}
      return(
        <MDBFooter style={bgNavy} className="font-small pt-3 mt-3">
        <MDBContainer fluid className="text-center text-md-left">
            <MDBRow>
            <MDBCol md="5">
                <h5 className="title pt-5">Back to Top</h5>
            </MDBCol>
            <MDBCol md="6">
                <h5 className="title">Sections</h5>
                <ul>
                <li className="list-unstyled">
                    <a href="#!">My Events</a>
                </li>
                <li className="list-unstyled">
                    <a href="#!">Group Eents</a>
                </li>
                <li className="list-unstyled">
                    <a href="#!">Past Events</a>
                </li>
                </ul>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright: <a href="/home">Calendar Share</a>
            </MDBContainer>
        </div>
        </MDBFooter>
        );
    }
}

export default Footer;