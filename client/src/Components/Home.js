import React, { Fragment } from "react";
import { MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, MDBBtn, MDBContainer, MDBRow, 
  MDBCol } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import MyEvent from './MyEvent';
import Event from './Event';
import Footer from './Footer';
import {getUser, createUserEvent, getUserGroupEvents} from '../apiCalls/userAPI';
import {sortByDateAscending, sortByDateDescending,
  sortByEventType, sortByPastAndFuture} from '../util/eventHelpers';
import Image from './Image';

class Home extends React.Component {
  constructor(props) {
    super(props);
    if(localStorage.getItem('userId') == -1) {
      alert("Attempting to access a page without valid credentials.\nReturning to login page. Please log in to a valid account.");
      this.props.history.push('');
    }
    this.state = {
      'fetching': true,
      'events': '',
      'pastEvents': '',
      'futureEvents': '',
      'groupEvents': ''
    };

    this.renderPastEvents = this.renderPastEvents.bind(this);
    this.renderFutureEvents = this.renderFutureEvents.bind(this);
    this.renderGroupEvents = this.renderGroupEvents.bind(this);


  }

  componentDidMount() {
    let user;
    getUser(localStorage.getItem('userName'))
    .then((userJson) => {
      user = userJson;
      let allEvents = sortByPastAndFuture(user.events);
      this.setState({
        user: user,
        events: user.events,
        pastEvents: allEvents.pastEvents,
        futureEvents: allEvents.futureEvents,
      });
    }).then((blankety) => {
      getUserGroupEvents(user)
      .then(groupEvents => {
        this.setState({
          groupEvents: groupEvents,
          fetching: false
        });
      })
    })
    .catch((err) => {
      console.log(err);
    })
    
}

renderPastEvents() {
  if(this.state.pastEvents != ''){
    return (
        this.state.pastEvents.map((e, index) => (
          <MyEvent key={index} event={e} />
        ))
    );
  }
}  

  renderFutureEvents() {
    if(this.state.futureEvents != ''){
      return (
          this.state.futureEvents.map((e, index) => (
            <MyEvent key={index} event={e} />
          ))
      );
    }
  }

  renderGroupEvents() {
    if(this.state.groupEvents != ''){
      return (
          //TODO change this.state.events to this.state.groupEvents and have it work
          this.state.events.map((e, index) => (
            <Event key={index} event={e} />
          ))
      );
    }
  }

  createEventHandler = event => {
    createUserEvent(localStorage.getItem('userId', event))
        .then((event) => {
            console.log('Added event' + event);
        })
        .catch((e) => {
            console.log(e);
        });
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
          {this.renderFutureEvents()}
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
          {this.renderGroupEvents()}
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
          {this.renderPastEvents()}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Home;
