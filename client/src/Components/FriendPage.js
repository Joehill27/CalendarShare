import React, { Fragment, Component } from "react";
import {
    MDBIcon, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, MDBBtn,
    MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalBody,
    MDBModalHeader, MDBInput
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
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

class FriendPage extends React.Component {
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
            'groups': '',
            'eventSortType': 'MyEvent',
            'sortBy': '',
            'filterType': '',
            'userName': 'admin',
            'bio': ''
            //Can add filtering for each list to state
        };

        this.toggle = this.toggle.bind(this);
        this.renderFutureEvents = this.renderFutureEvents.bind(this);
    }

    componentDidMount() {
        let user;
        getUser(this.state.userName)
            .then((userJson) => {
                user = userJson;
                let allEvents = sortByPastAndFuture(user.events);
                this.setState({
                    user: user,
                    events: user.events,
                    pastEvents: allEvents.pastEvents,
                    futureEvents: allEvents.futureEvents,
                    groups: user.groups
                });
            })
            .catch((err) => {
                console.log(err);
            })


        getUser(this.state.userName)
            .then((userJson) => {
                user = userJson;
                setUserGroupEvents(user);
            })

        getUser(this.state.userName)
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

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
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

    renderGroups() 
    {
        if (this.state.groups !== '') {
            return (
                this.state.groups.map((e, index) => (
                    <MyEvent key={index} event={e} />
                ))
            );
        }
    }

    render() {
        const bgNavy = { backgroundColor: '#2E4158' }
        const scrollContainerStyle = { width: "auto", maxHeight: "auto" };
        return (
            <div style={bgNavy}>
                <div className="d-flex">
                    <Navigation imageId={localStorage.getItem('profilePicture')} />
                    <div>
                        <MDBDropdown dropright className="cardpadding ml-2">
                            <MDBDropdownToggle color="transparent">
                                <h3 className="text-white">Events<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text" /></h3>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem header>Sort</MDBDropdownItem>
                                <MDBDropdownItem onClick={(meow) => { this.setState({ eventSortType: 'MyEvent', sortBy: 'Ascending' }); this.sortEvents(); }}>Time<MDBIcon icon="angle-double-up ml-2" className="FilterTypeGreen" /></MDBDropdownItem>
                                <MDBDropdownItem onClick={(meow) => { this.setState({ eventSortType: 'MyEvent', sortBy: 'Descending' }); this.sortEvents(); }}>Time<MDBIcon icon="angle-double-down ml-2" className="FilterTypeRed" /></MDBDropdownItem>
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
                                <MDBDropdownItem href="#!">Eating Out<MDBIcon icon="bread-slice" className="float-right" /></MDBDropdownItem>
                                <MDBDropdownItem href="#!">Misc<MDBIcon icon="chevron-circle-down ml-2" className="float-right" /></MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </div>
                </div>
                <div id="future" className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
                    {this.renderFutureEvents()}
                </div>
                <div>
                    <MDBDropdown dropright className="ml-2">
                        <MDBDropdownToggle color="transparent">
                            <h3 className="text-white">Groups<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text" /></h3>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem header>Sort</MDBDropdownItem>
                            <MDBDropdownItem onClick={(meow) => { this.setState({ eventSortType: 'GroupEvent', sortBy: 'Ascending' }); this.sortEvents(); }}>Time<MDBIcon icon="angle-double-up ml-2" className="FilterTypeGreen" /></MDBDropdownItem>
                            <MDBDropdownItem onClick={(meow) => { this.setState({ eventSortType: 'GroupEvent', sortBy: 'Descending' }); this.sortEvents(); }}>Time<MDBIcon icon="angle-double-down ml-2" className="FilterTypeRed" /></MDBDropdownItem>
                            <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-up ml-2" className="FilterTypeGreen" /></MDBDropdownItem>
                            <MDBDropdownItem href="#!">Location<MDBIcon icon="angle-double-down ml-2" className="FilterTypeRed" /></MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </div>
                <div id="group" className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
                    {this.renderGroups()}
                </div>
                <div>
                    <h1> This is where we'll put their bio and shit </h1>
                </div>
            </div>

        );
    }
}

export default FriendPage;