import React, { Fragment } from "react";
import { MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import MyEvent from './MyEvent';
import Event from './Event';
import Footer from './Footer';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const bgNavy = {backgroundColor: '#2E4158'}
    const scrollContainerStyle = { width: "auto", maxHeight: "auto" };
    return (
      <div style={bgNavy}>
        <Navigation/>
        <div className="d-flex justify-content-between">
          <div>
            <MDBDropdown dropright className="cardpadding ml-2">
              <MDBDropdownToggle color="transparent">
              <h3 className="text-white">My Events<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text"/></h3>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem href="#!">Time<MDBIcon icon="angle-double-up ml-2" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Time<MDBIcon icon="angle-double-down ml-2" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <div>
          <MDBFormInline className="md-form cardpadding pr-3">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
          <MDBBtn outline color="white" size="sm" type="submit" className="mr-auto">
            Search
          </MDBBtn>
          </MDBFormInline>
          </div>
      </div>
      <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
        <div class="card-inline "><h2><MyEvent/></h2></div>
        <div class="card-inline"><h2><MyEvent/></h2></div>
        <div class="card-inline"><h2><MyEvent/></h2></div>
        <div class="card-inline"><h2><MyEvent/></h2></div>
        <div class="card-inline"><h2><MyEvent/></h2></div>
        <div class="card-inline"><h2><MyEvent/></h2></div>
        <div class="card-inline"><h2><MyEvent/></h2></div>
      </div>
      <div>
        <MDBDropdown dropright className="ml-2">
          <MDBDropdownToggle color="transparent">
            <h3 className="text-white">Group Events<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text"/></h3>
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem href="#!">Time<MDBIcon icon="angle-double-up ml-2" /></MDBDropdownItem>
            <MDBDropdownItem href="#!">Time<MDBIcon icon="angle-double-down ml-2" /></MDBDropdownItem>
            <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
            <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>
      <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
        <div class="card-inline"><h2><Event/></h2></div>
        <div class="card-inline"><h2><Event/></h2></div>
        <div class="card-inline"><h2><Event/></h2></div>
        <div class="card-inline"><h2><Event/></h2></div>
        <div class="card-inline"><h2><Event/></h2></div>
        <div class="card-inline"><h2><Event/></h2></div>
        <div class="card-inline"><h2><Event/></h2></div>
      </div>
      <div>
        <MDBDropdown dropright className="ml-2">
          <MDBDropdownToggle color="transparent">
            <h3 className="text-white">Past Events<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text"/></h3>
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem href="#!">Time<MDBIcon icon="angle-double-up ml-2" className="green-text"/></MDBDropdownItem>
            <MDBDropdownItem href="#!">Time<MDBIcon icon="angle-double-down ml-2" /></MDBDropdownItem>
            <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
            <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>
      <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
        <div class="card-inline"><h2><MyEvent/></h2></div>
        <div class="card-inline"><h2><MyEvent/></h2></div>
        <div class="card-inline"><h2><MyEvent/></h2></div>
        <div class="card-inline"><h2><MyEvent/></h2></div>
        <div class="card-inline"><h2><MyEvent/></h2></div>
        <div class="card-inline"><h2><MyEvent/></h2></div>
        <div class="card-inline"><h2><MyEvent/></h2></div>
      </div>
      <Footer/>
      </div>
    );
  }
}

export default Home;