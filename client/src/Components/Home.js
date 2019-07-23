import React, { Fragment } from "react";
import { MDBIcon, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, MDBBtn,
  MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalBody,
  MDBModalHeader, MDBInput  } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import MyEvent from './MyEvent';
import Event from './Event';
import Footer from './Footer';
import {getUser, createUserEvent, getUserGroupEvents, setUserGroupEvents, getUserGroupEvents2} from '../apiCalls/userAPI';
import {sortByDateAscending, sortByDateDescending,
  sortByEventType, sortByPastAndFuture} from '../util/eventHelpers';
import { get } from "mongoose";
import { thisExpression } from "@babel/types";

class Home extends React.Component {
  constructor(props) {
    super(props);
    if(localStorage.getItem('userId') === -1) {
      alert("Attempting to access a page without valid credentials.\nReturning to login page. Please log in to a valid account.");
      this.props.history.push('');
    }
    this.state = {
      modal1: false,
      modal2: false,
      'fetching': true,
      'events': '',
      'pastEvents': '',
      'futureEvents': '',
      'groupEvents': '',
      'eventSortType': 'MyEvent',
      'sortBy': '',
      'filterType': ''
      //Can add filtering for each list to state
    };

    
    

    this.renderPastEvents = this.renderPastEvents.bind(this);
    this.renderFutureEvents = this.renderFutureEvents.bind(this);
    this.renderGroupEvents = this.renderGroupEvents.bind(this);
    this.sortEvents = this.sortEvents.bind(this);

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
        futureEvents: allEvents.futureEvents
      });
    })
    .catch((err) => {
      console.log(err);
    })
    

    getUser(localStorage.getItem('userName'))
    .then((userJson) => {
      user = userJson;
      setUserGroupEvents(user);
    })

    getUser(localStorage.getItem('userName'))
    .then((userJson) => {
      var temp = getUserGroupEvents2(userJson)
      console.log(temp);
      temp.then((result) => {
        console.log(result);
        this.setState({
          groupEvents: result,
        });
      })
    })
  }

renderPastEvents() {
  if(this.state.pastEvents !== ''){
    return (
        this.state.pastEvents.map((e, index) => (
          <MyEvent key={index} event={e} />
        ))
    );
  }
}  

  renderFutureEvents() {
    if(this.state.futureEvents !== ''){
      return (
          this.state.futureEvents.map((e, index) => (
            <MyEvent key={index} event={e} />
          ))
      );
    }
  }

  renderGroupEvents() {
    if(this.state.groupEvents !== ''){
      console.log(this.state.groupEvents);
      return (
          this.state.groupEvents.map((e, index) => (
            <Event key={index} event={e} />
          ))
      );
    }
  }

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
        [modalNumber]: !this.state[modalNumber]
    });
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

  sortEvents() {
    console.log('Sorting...');
    let type = this.state.eventSortType;
    let sortBy = this.state.sortBy;
    let result;
    switch(type) {
      case 'MyEvent': {
        result = (sortBy == 'Ascending') ?
          sortByDateAscending(this.state.futureEvents) :
          sortByDateDescending(this.state.futureEvents);
        this.setState({
          futureEvents: result
        });
        this.renderFutureEvents();
        break;
      }
      case 'PastEvent': {
        result = (sortBy == 'Ascending') ?
          sortByDateAscending(this.state.pastEvents) :
          sortByDateDescending(this.state.pastEvents);
          this.setState({
            pastEvents: result
          });
          this.renderPastEvents();
          break;
      }
      case 'GroupEvent': {
        result = (sortBy == 'Ascending') ?
          sortByDateAscending(this.state.groupEvents) :
          sortByDateDescending(this.state.groupEvents);
        this.setState({
          groupEvents: result
        });
        this.renderGroupEvents();
        break;
      }
      default: 
        console.log('Nothing');
    }
  }

  render() {
    const bgNavy = {backgroundColor: '#2E4158'}
    const scrollContainerStyle = { width: "auto", maxHeight: "auto" };
    return (
      <div style={bgNavy}>
        <Navigation imageId={localStorage.getItem('profilePicture')}/>
        <div className="d-flex">
          <div>
            <MDBDropdown dropright className="cardpadding ml-2">
              <MDBDropdownToggle color="transparent">
                <h3 className="text-white">My Events<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text"/></h3>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem header>Sort</MDBDropdownItem>
                <MDBDropdownItem onClick={(meow) => {this.setState({eventSortType: 'MyEvent', sortBy: 'Ascending'}); this.sortEvents(); }}>Time<MDBIcon icon="angle-double-up ml-2" className="FilterTypeGreen"/></MDBDropdownItem>
                <MDBDropdownItem onClick={(meow) => {this.setState({eventSortType: 'MyEvent', sortBy: 'Descending'}); this.sortEvents(); }}>Time<MDBIcon icon="angle-double-down ml-2" className="FilterTypeRed"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-up ml-2" className="FilterTypeGreen"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-down ml-2" className="FilterTypeRed"/></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <div>
            <MDBDropdown dropright className="cardpadding m-0" size="sm">
              <MDBDropdownToggle color="transparent">
                <h7 className="text-white"><MDBIcon icon="filter m-0 p-0" className="mdb-color-text"/></h7>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem header>Filter By Event Type</MDBDropdownItem>
                <MDBDropdownItem href="#!">School<MDBIcon icon="school" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Work<MDBIcon icon="business-time" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Sports<MDBIcon icon="football-ball" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Place Holder<MDBIcon icon="chevron-circle-down ml-2" className="green-text"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Place Holder<MDBIcon icon="chevron-circle-down ml-2" className="green-text"/></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBBtn onClick={this.toggle(1)}size="sm" color="dark-green">New</MDBBtn>
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
        <div id="future" className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
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
                <MDBDropdownItem onClick={(meow) => {this.setState({eventSortType: 'GroupEvent', sortBy: 'Ascending'}); this.sortEvents(); }}>Time<MDBIcon icon="angle-double-up ml-2" className="FilterTypeGreen"/></MDBDropdownItem>
                <MDBDropdownItem onClick={(meow) => {this.setState({eventSortType: 'GroupEvent', sortBy: 'Descending'}); this.sortEvents(); }}>Time<MDBIcon icon="angle-double-down ml-2" className="FilterTypeRed"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-up ml-2" className="FilterTypeGreen"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-down ml-2" className="FilterTypeRed"/></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <div>
            <MDBDropdown dropright className="m-0" size="sm">
              <MDBDropdownToggle color="transparent">
                <h6 className="text-white"><MDBIcon icon="filter m-0 p-0" className="mdb-color-text"/></h6>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
              <MDBDropdownItem header>Filter By Event Type</MDBDropdownItem>
              <MDBDropdownItem href="#!">School<MDBIcon icon="school" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Work<MDBIcon icon="business-time" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Sports<MDBIcon icon="football-ball" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Eating Out<MDBIcon icon="bread-slice" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Misc<MDBIcon icon="chevron-circle-down ml-2" className="float-right"/></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
        </div>
        <div id="group" className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
          {this.renderGroupEvents()}
        </div>
        <div className="d-flex">
          <div>
            <MDBDropdown dropright className="ml-2">
              <MDBDropdownToggle color="transparent">
                <h3 className="text-white">Past Events<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text"/></h3>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
              <MDBDropdownItem href="#!">School<MDBIcon icon="school" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Work<MDBIcon icon="business-time" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Sports<MDBIcon icon="football-ball" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Eating Out<MDBIcon icon="bread-slice" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Misc<MDBIcon icon="chevron-circle-down ml-2" className="float-right"/></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <div>
            <MDBDropdown dropright className="m-0" size="sm">
              <MDBDropdownToggle color="transparent">
                <h6 className="text-white"><MDBIcon icon="filter m-0 p-0" className="mdb-color-text"/></h6>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
              <MDBDropdownItem header>Filter By Event Type</MDBDropdownItem>
                <MDBDropdownItem href="#!">School<MDBIcon icon="school" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Work<MDBIcon icon="business-time" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Sports<MDBIcon icon="football-ball" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Eating Out<MDBIcon icon="bread-slice" className="float-right"/></MDBDropdownItem>
                <MDBDropdownItem href="#!">Misc<MDBIcon icon="chevron-circle-down ml-2" className="float-right"/></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
        </div>
        <div id="past" className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>        
          {this.renderPastEvents()}
        </div>
        <Footer/>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="med" centered>
                                    <MDBModalHeader toggle={this.toggle(1)} className="mdb-color darken-2 white-text">Create Event</MDBModalHeader>
                                    <MDBModalBody>
                                        <MDBContainer fluid className="">
                                            <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                                                <MDBRow>
                                                    <MDBCol>
                                                        <MDBInput
                                                            value={''}
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
                                                            value={''}
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
                                                            value={''}
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
                                                            value={''}
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
                                                            value={''}
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
                                                            value={''}
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
                                                            value={''}
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
                                                            value={''}
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
                                                            value={''}
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
                                                    <MDBBtn color="mdb-color darken-2" type="submit" onclick={this.updateHandler} className="ml-auto">Save</MDBBtn>
                                                    <MDBBtn color="danger" onClick={this.toggle(1)} className="ml-auto">Close</MDBBtn>
                                                    </MDBCol>
                                                </MDBRow>
                                            </form>
                                        </MDBContainer>
                                    </MDBModalBody>
                                </MDBModal>
      </div>
    );
  }
}

export default Home;
