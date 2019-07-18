import React, { Fragment } from "react";
import { MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, MDBBtn, MDBContainer, MDBRow, 
  MDBCol } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import MyEvent from './MyEvent';
import Event from './Event';
import Footer from './Footer';
import {convertBinaryToImage} from '../util/imageHelpers';
import {getUser} from '../apiCalls/userAPI';
import Image from './Image';

class Home extends React.Component {
  constructor(props) {
    super(props);
    if(localStorage.getItem('userId') == -1) {
      alert("Attempting to access a page without valid credentials.\nReturning to login page. Please log in to a valid account.");
      this.props.history.push('');
    }
  }

  componentDidMount() {
    let user = getUser(localStorage.getItem('userName'));

    this.setState({'user': user, fetchingImage: false});
}

  renderEvents(props) {
    return (
      <div>
        {props.events.map((Event, index) => (
          <Event key={index} Event={Event} />
        ))}
      </div>
    );
  }

  render() {
    const bgNavy = {backgroundColor: '#2E4158'}
    const scrollContainerStyle = { width: "auto", maxHeight: "auto" };
    return (
      <div style={bgNavy}>
        <Navigation imageId={'10'}/>
        <div className="d-flex">
          <div>
            <MDBDropdown dropright className="cardpadding ml-2">
              <MDBDropdownToggle color="transparent">
                <h3 className="text-white">My Events<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text"/></h3>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem header>Sort</MDBDropdownItem>
                <MDBDropdownItem href="#!">Time<MDBIcon icon="angle-double-up ml-2" className="green-text"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Time<MDBIcon icon="angle-double-down ml-2" className="red-text"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-up ml-2" className="green-text"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-down ml-2" className="red-text"/></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <div>
            <MDBDropdown dropright className="cardpadding m-0" size="sm">
              <MDBDropdownToggle color="transparent">
                <h6 className="text-white"><MDBIcon icon="filter m-0 p-0" className="mdb-color-text"/></h6>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem header>Filter</MDBDropdownItem>
                <MDBDropdownItem href="#!">High Priority<MDBIcon icon="chevron-circle-up ml-2" className="red-text"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Medium Priority<MDBIcon icon="chevron-circle-right ml-2" className="orange-text"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Low Priority<MDBIcon icon="chevron-circle-down ml-2" className="green-text"/></MDBDropdownItem>
                <MDBDropdownItem header>Event Type</MDBDropdownItem>
                <MDBDropdownItem href="#!">Place Holder<MDBIcon icon="chevron-circle-down ml-2" className="green-text"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Place Holder<MDBIcon icon="chevron-circle-down ml-2" className="green-text"/></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <div className="ml-auto">
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
        <div className="d-flex">
          <div>
            <MDBDropdown dropright className="ml-2">
              <MDBDropdownToggle color="transparent">
                <h3 className="text-white">Group Events<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text"/></h3>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem header>Sort</MDBDropdownItem>
                <MDBDropdownItem href="#!">Time<MDBIcon icon="angle-double-up ml-2" className="green-text"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Time<MDBIcon icon="angle-double-down ml-2" className="red-text"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-up ml-2" className="green-text"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-down ml-2" className="red-text"/></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <div>
            <MDBDropdown dropright className="m-0" size="sm">
              <MDBDropdownToggle color="transparent">
                <h6 className="text-white"><MDBIcon icon="filter m-0 p-0" className="mdb-color-text"/></h6>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem header>Event Type</MDBDropdownItem>
                <MDBDropdownItem href="#!">Place Holder<MDBIcon icon="chevron-circle-down ml-2" className="green-text"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Place Holder<MDBIcon icon="chevron-circle-down ml-2" className="green-text"/></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
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
        <div className="d-flex">
          <div>
            <MDBDropdown dropright className="ml-2">
              <MDBDropdownToggle color="transparent">
                <h3 className="text-white">Past Events<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text"/></h3>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                  <MDBDropdownItem header>Sort</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Time<MDBIcon icon="angle-double-up ml-2" className="green-text"/></MDBDropdownItem>
                  <MDBDropdownItem href="#!">Time<MDBIcon icon="angle-double-down ml-2" className="red-text"/></MDBDropdownItem>
                  <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-up ml-2" className="green-text"/></MDBDropdownItem>
                  <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-down ml-2" className="red-text"/></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <div>
            <MDBDropdown dropright className="m-0" size="sm">
              <MDBDropdownToggle color="transparent">
                <h6 className="text-white"><MDBIcon icon="filter m-0 p-0" className="mdb-color-text"/></h6>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem header>Event Type</MDBDropdownItem>
                <MDBDropdownItem href="#!">Place Holder<MDBIcon icon="chevron-circle-down ml-2" className="green-text"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Place Holder<MDBIcon icon="chevron-circle-down ml-2" className="green-text"/></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
        </div>
        <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
          <Image type={'event'} imageId={'5'} ></Image>
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
