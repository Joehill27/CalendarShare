import React, { Fragment } from "react";
import {
  MDBIcon, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, MDBBtn,
  MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalBody,
  MDBModalHeader, MDBInput, MDBModalFooter, MDBCardText
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
// import MyEventList from './MyEventList';
import Navigation from './Navigation';
import MyEvent from './MyEvent';
import Event from './Event';
import Footer from './Footer';
import { getUser, createUserEvent, getUserGroupEvents, setUserGroupEvents, getUserGroupEvents2 } from '../apiCalls/userAPI';
import {
  sortByDateAscending, sortByDateDescending,
  sortByEventType, sortByPastAndFuture
} from '../util/eventHelpers';
import { get } from "mongoose";
import { thisExpression } from "@babel/types";
import one from '../defaultImages/eventPics/1.jpg';
import two from '../defaultImages/eventPics/2.jpg';
import three from '../defaultImages/eventPics/3.jpg';
import four from '../defaultImages/eventPics/4.jpg';
import five from '../defaultImages/eventPics/5.jpg';
import six from '../defaultImages/eventPics/6.jpg';
import seven from '../defaultImages/eventPics/7.jpg';
import eight from '../defaultImages/eventPics/8.jpg';
import nine from '../defaultImages/eventPics/9.jpg';
import ten from '../defaultImages/eventPics/10.jpg';
import eleven from '../defaultImages/eventPics/11.jpg';
import twelve from '../defaultImages/eventPics/12.jpg';

class Home extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('userId') === -1) {
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
      'filterType': '',
      'newEventPic': '',
      'newEventName': '',
      'newEventStart': '',
      'newEventStartTime': '',
      'newEventEnd': '',
      'newEventEndTime': '',
      'newEventAddress': '',
      'newEventZipCode': '',
      'newEventCity': '',
      'newEventCountry': '',
      'newEventType': '',
      'newEventDetails': '',
      'pastEventsSort': '',
      'futureEventsSort': '',
      'groupEventsSort': '',
      'pastEventsFilter': true,
      'futureEventsFilter': '',
      'groupEventsFilter': ''

    };

    this.renderPastEvents = this.renderPastEvents.bind(this);
    this.renderFutureEvents = this.renderFutureEvents.bind(this);
    this.renderGroupEvents = this.renderGroupEvents.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.createEventHandler = this.createEventHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.toggle = this.toggle.bind(this);

  }



  componentDidMount() {
    if (localStorage.getItem('userId') == -1)
      this.props.history.push('/');

    let user;
    getUser(localStorage.getItem('userName'))
      .then((userJson) => {
        user = userJson;
        let allEvents = sortByPastAndFuture(user.events);
        console.log('Here are the future events: ' + allEvents.futureEvents);
        this.setState({
          user: user,
          events: user.events,
          pastEvents: (true) ? sortByDateAscending(allEvents.pastEvents) : sortByDateDescending(allEvents.pastEvents),
          futureEvents: (true) ? sortByDateAscending(allEvents.futureEvents) : sortByDateDescending(allEvents.futureEvents),
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
        // console.log(temp);
        temp.then((result) => {
          // console.log(result);
          this.setState({
            groupEvents: (true) ? sortByDateAscending(result) : sortByDateDescending(result)
          });
        })
      })
  }

  logoutHandler = async () => {
    console.log('Logging out');
    localStorage.setItem('userId', -1);
    localStorage.setItem('user', '');
    this.props.history.push('/');
  };

  renderPastEvents() {
    if (this.state.pastEvents !== '') {
      return (
        this.state.pastEvents.map((e, index) => (
          <MyEvent key={index} event={e} />
        ))
      );
    }
  }

  renderFutureEvents() {
    if (this.state.futureEvents !== '') {
      return (
        this.state.futureEvents.map((e, index) => (
          <MyEvent key={index} event={e} />
        ))
      );
    }
  }

  renderGroupEvents() {
    if (this.state.groupEvents !== '') {
      // console.log(this.state.groupEvents);
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

  changeHandler = (settings) => {
    this.setState({ [settings.target.name]: settings.target.value });
  };

  //Clear New Event on Close

  createEventHandler() {
    //Add event to list
    let event = {
      'start': this.state.newEventStart + 'T' + this.state.newEventStartTime,
      'end': this.state.newEventEnd + 'T' + this.state.newEventEndTime,
      'eventName': this.state.newEventName,
      'eventDetails': this.state.newEventDetails,
      'eventPicture': this.state.newEventPic,
      'eventType': this.state.newEventType,
      'location': {
        'address': this.state.newEventAddress,
        'zipCode': this.state.newEventZipCode,
        'city': this.state.newEventCity,
        country: this.state.newEventCountry
      }

    }
    // console.log(event);
    createUserEvent(localStorage.getItem('userId'), event)
      .then((result) => {
        // console.log('Added event' + JSON.stringify(result));
      })
      .catch((e) => {
        console.log(e);
      });
    this.setState = {
      'newEventName': '',
      'newEventStart': '',
      'newEventStartTime': '',
      'newEventEnd': '',
      'newEventEndTime': '',
      'newEventAddress': '',
      'newEventZipCode': '',
      'newEventCity': '',
      'newEventCountry': '',
      'newEventType': '',
      'newEventDetails': '',
      'newEventPic': ''
    }
  }


  render() {
    const bgNavy = { backgroundColor: '#2E4158' }
    const scrollContainerStyle = { width: "auto", maxHeight: "auto" };
    return (
      <div style={bgNavy}>
        <Navigation imageId={localStorage.getItem('profilePicture')} logoutHandler={this.logoutHandler} />
        <div className="d-flex">
          <div>
            <MDBDropdown dropright className="cardpadding ml-2">
              <MDBDropdownToggle color="transparent">
                <h3 className="text-white">My Events<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text" /></h3>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem header>Sort</MDBDropdownItem>
                <MDBDropdownItem onClick={(meow) => { this.setState({ futureEventsSort: true }); }}>Time<MDBIcon icon="angle-double-up ml-2" className="FilterTypeGreen" /></MDBDropdownItem>
                <MDBDropdownItem onClick={(meow) => { this.setState({ futureEventsSort: false }); }}>Time<MDBIcon icon="angle-double-down ml-2" className="FilterTypeRed" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-up ml-2" className="FilterTypeGreen" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-down ml-2" className="FilterTypeRed" /></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <div>
            <MDBDropdown dropright className="cardpadding m-0" size="sm">
              <MDBDropdownToggle color="transparent">
                <h7 className="text-white"><MDBIcon icon="filter m-0 p-0" className="mdb-color-text" /></h7>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem header>Filter By Event Type</MDBDropdownItem>
                <MDBDropdownItem href="#!">School<MDBIcon icon="school" className="float-right" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Work<MDBIcon icon="business-time" className="float-right" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Sports<MDBIcon icon="football-ball" className="float-right" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Dining<MDBIcon icon="bread-slice" className="float-right" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Other<MDBIcon icon="chevron-circle-down ml-2" className="float-right" /></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBBtn onClick={this.toggle(1)} size="sm" color="dark-green">New</MDBBtn>
          </div>
          <div className="ml-auto">

            <MDBFormInline className="md-form cardpadding pr-3">
              <input className="form-control mr-sm-2 white-text" type="text" placeholder="Search" aria-label="Search" />
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
                <h3 className="text-white">Past Events<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text" /></h3>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem header>Sort</MDBDropdownItem>
                <MDBDropdownItem onClick={(meow) => { this.setState({ eventSortType: 'PastEvent', sortBy: 'Ascending' }); this.sortEvents(); }}>Time<MDBIcon icon="angle-double-up ml-2" className="FilterTypeGreen" /></MDBDropdownItem>
                <MDBDropdownItem onClick={(meow) => { this.setState({ eventSortType: 'PastEvent', sortBy: 'Descending' }); this.sortEvents(); }}>Time<MDBIcon icon="angle-double-down ml-2" className="FilterTypeRed" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-up ml-2" className="FilterTypeGreen" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-down ml-2" className="FilterTypeRed" /></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <div>
            <MDBDropdown dropright className="m-0" size="sm">
              <MDBDropdownToggle color="transparent">
                <h6 className="text-white"><MDBIcon icon="filter m-0 p-0" className="mdb-color-text" /></h6>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem header>Filter By Event Type</MDBDropdownItem>
                <MDBDropdownItem href="#!">School<MDBIcon icon="school" className="float-right" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Work<MDBIcon icon="business-time" className="float-right" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Sports<MDBIcon icon="football-ball" className="float-right" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Dining<MDBIcon icon="bread-slice" className="float-right" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Other<MDBIcon icon="chevron-circle-down ml-2" className="float-right" /></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
        </div>
        <div id="past" className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
          {this.renderPastEvents()}
        </div>
        <div className="d-flex">
          <div>
            <MDBDropdown dropright className="ml-2">
              <MDBDropdownToggle color="transparent">
                <h3 className="text-white">Group Events<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text" /></h3>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem header>Sort</MDBDropdownItem>
                <MDBDropdownItem onClick={(meow) => { this.setState({ eventSortType: 'PastEvent', sortBy: 'Ascending' }); this.sortEvents(); }}>Time<MDBIcon icon="angle-double-up ml-2" className="FilterTypeGreen" /></MDBDropdownItem>
                <MDBDropdownItem onClick={(meow) => { this.setState({ eventSortType: 'PastEvent', sortBy: 'Descending' }); this.sortEvents(); }}>Time<MDBIcon icon="angle-double-down ml-2" className="FilterTypeRed" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-up ml-2" className="FilterTypeGreen" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-down ml-2" className="FilterTypeRed" /></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <div>
            <MDBDropdown dropright className="m-0" size="sm">
              <MDBDropdownToggle color="transparent">
                <h6 className="text-white"><MDBIcon icon="filter m-0 p-0" className="mdb-color-text" /></h6>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem header>Filter By Event Type</MDBDropdownItem>
                <MDBDropdownItem href="#!">School<MDBIcon icon="school" className="float-right" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Work<MDBIcon icon="business-time" className="float-right" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Sports<MDBIcon icon="football-ball" className="float-right" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Dining<MDBIcon icon="bread-slice" className="float-right" /></MDBDropdownItem>
                <MDBDropdownItem href="#!">Other<MDBIcon icon="chevron-circle-down ml-2" className="float-right" /></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
        </div>
        <div id="past" className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
          {this.renderGroupEvents()}
        </div>
        <Footer />
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="med" centered>
          <MDBModalHeader toggle={this.toggle(1)} className="mdb-color darken-2 white-text">Create Event</MDBModalHeader>
          <MDBModalBody>
            <MDBContainer fluid className="">
              <MDBRow>
                <MDBCardText>Choose an Event Picture</MDBCardText>
                <div className="gallery">
                  <img
                    onClick={() => this.setState({ newEventPic: 1 })}
                    className="gallery-item"
                    src={one}
                    height="50"
                    width="50"
                  />
                  <img
                    onClick={() => this.setState({ newEventPic: 2 })}
                    className="gallery-item"
                    src={two}
                    height="50"
                    width="50"
                  />
                  <img
                    onClick={() => this.setState({ newEventPic: 3 })}
                    className="gallery-item"
                    src={three}
                    height="50"
                    width="50"
                  />
                  <img
                    onClick={() => this.setState({ newEventPic: 4 })}
                    className="gallery-item"
                    src={four}
                    height="50"
                    width="50"
                  />
                  <img
                    onClick={() => this.setState({ newEventPic: 5 })}
                    className="gallery-item"
                    src={five}
                    height="50"
                    width="50"
                  />
                  <img
                    onClick={() => this.setState({ newEventPic: 6 })}
                    className="gallery-item"
                    src={six}
                    height="50"
                    width="50"
                  />
                  <img
                    onClick={() => this.setState({ newEventPic: 7 })}
                    className="gallery-item"
                    src={seven}
                    height="50"
                    width="50"
                  />
                  <img
                    onClick={() => this.setState({ newEventPic: 8 })}
                    className="gallery-item"
                    src={eight}
                    height="50"
                    width="50"
                  />
                  <img
                    onClick={() => this.setState({ newEventPic: 9 })}
                    className="gallery-item"
                    src={nine}
                    height="50"
                    width="50"
                  />
                  <img
                    onClick={() => this.setState({ newEventPic: 10 })}
                    className="gallery-item"
                    src={ten}
                    height="50"
                    width="50"
                  />
                  <img
                    onClick={() => this.setState({ newEventPic: 11 })}
                    className="gallery-item"
                    src={eleven}
                    height="50"
                    width="50"
                  />
                  <img
                    onClick={() => this.setState({ newEventPic: 12 })}
                    className="gallery-item"
                    src={twelve}
                    height="50"
                    width="50"
                  />
                </div>
              </MDBRow>
              <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      value={this.state.newEventName}
                      label="Event Name"
                      className="form-control"
                      name="newEventName"
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
                      value={this.state.newEventStart}
                      label="Start Date"
                      className="form-control"
                      name="newEventStart"
                      onChange={this.changeHandler}
                      type="Date"
                      required
                    >
                      <div className="invalid-feedback font-weight-light smallText">Event Date Required</div>
                    </MDBInput>
                  </MDBCol>
                  <MDBCol>
                    <MDBInput
                      value={this.state.newEventStartTime}
                      label="Start Time"
                      className="form-control"
                      name="newEventStartTime"
                      onChange={this.changeHandler}
                      type="time"
                      required
                    >
                      <div className="invalid-feedback font-weight-light smallText">Start Time Required</div>
                    </MDBInput>
                  </MDBCol>

                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      value={this.state.newEventEnd}
                      label="End Date"
                      className="form-control"
                      name="newEventEnd"
                      onChange={this.changeHandler}
                      type="Date"
                      required
                    >
                      <div className="invalid-feedback font-weight-light smallText">Event Date Required</div>
                    </MDBInput>
                  </MDBCol>
                  <MDBCol>
                    <MDBInput
                      value={this.state.newEventEndTime}
                      label="End Time"
                      className="form-control"
                      name="newEventEndTime"
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
                      value={this.state.newEventAddress}
                      label="Address"
                      className="form-control"
                      name="newEventAddress"
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
                      value={this.state.newEventZipCode}
                      label="Zip Code"
                      className="form-control"
                      name="newEventZipCode"
                      onChange={this.changeHandler}
                      type="text"
                      required
                    >
                      <div className="invalid-feedback font-weight-light smallText">Zip Code Required</div>
                    </MDBInput>
                  </MDBCol>
                  <MDBCol>
                    <MDBInput
                      value={this.state.newEventCity}
                      label="City"
                      className="form-control"
                      name="newEventCity"
                      onChange={this.changeHandler}
                      type="text"
                      required
                    >
                      <div className="invalid-feedback font-weight-light smallText">City Required</div>
                    </MDBInput>
                  </MDBCol>
                  <MDBCol>
                    <MDBInput
                      value={this.state.newEventCountry}
                      label="Country"
                      className="form-control"
                      name="newEventCountry"
                      onChange={this.changeHandler}
                      type="text"
                      required
                    >
                      <div className="invalid-feedback font-weight-light smallText">Country Required</div>
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
                      <option value="School">School</option>
                      <option value="Work">Work</option>
                      <option value="Sports">Sports</option>
                      <option value="Dining">Dining</option>
                      <option value="Other">Other</option>

                    </select>
                    <div className="invalid-feedback font-weight-light smallText">Event Type Required</div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      value={this.state.newEventDetails}
                      label="Event Details"
                      className="form-control"
                      name="newEventDetails"
                      onChange={this.changeHandler}
                      type="textarea"
                      required
                    >
                      <div className="invalid-feedback font-weight-light smallText">Event Details Required</div>
                    </MDBInput>
                  </MDBCol>
                </MDBRow>
              </form>
              <MDBModalFooter>
                <MDBBtn color="green" type="submit" onClick={() => { this.createEventHandler(); this.toggle(1) }} >Create</MDBBtn>
                <MDBBtn color="danger" onClick={this.toggle(1)} >Close</MDBBtn>
              </MDBModalFooter>

            </MDBContainer>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}
export default Home;
