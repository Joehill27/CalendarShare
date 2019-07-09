import React from 'react';
import { MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import MyEvent from './MyEvent';
import Event from './Event';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const bgNavy = {backgroundColor: '#2E4158'}
    const scrollContainerStyle = { width: "auto", maxHeight: "auto" };
    return (
      <div style={bgNavy}>
        <div>
          <MDBDropdown dropright className="cardpadding ml-2">
            <MDBDropdownToggle color="transparent">
             <h3 className="text-white">Past Events<MDBIcon icon="sort-amount-down" className="ml-2 mdb-color-text"/></h3>
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem href="#!">Action</MDBDropdownItem>
              <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
              <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
              <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
      </div>
      <Navigation/>
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
             <h3 className="text-white">Group Events<MDBIcon icon="sort-amount-down" className="ml-2 mdb-color-text"/></h3>
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem href="#!">Action</MDBDropdownItem>
              <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
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
             <h3 className="text-white">Past Events<MDBIcon icon="sort-amount-down" className="ml-2 mdb-color-text"/></h3>
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem href="#!">Action</MDBDropdownItem>
              <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
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
      </div>
    );
  }
}

export default Home;