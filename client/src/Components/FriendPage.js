import React, { Fragment, Component } from "react";
import {
	MDBCol,
	MDBContainer,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavbarToggler,
	MDBCollapse,
	MDBNavItem,
	MDBNavLink,
	MDBIcon,
	MDBBtn,
	MDBRow,
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem,
	MDBModalFooter,
	MDBCardText,
	MDBInput
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import MyEvent from './MyEvent';
import GroupItem from './GroupItem';
import Event from './Event';
import Footer from './Footer';
import { getUser, createUserEvent, getUserGroupEvents, setUserGroupEvents, getUserGroupEvents2 } from '../apiCalls/userAPI';
import {
    sortByDateAscending, sortByDateDescending,
    sortByEventType, sortByPastAndFuture
} from '../util/eventHelpers';
import { get } from "mongoose";
import { thisExpression } from "@babel/types";
import Image from './Image';

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
            'bio': 'TODO: Make bio a thing in the database',
            'country': 'TODO: Make country a thing in the database',
            'city': 'TODO: Make city a thing in the database'
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

    renderGroups() {
        if (this.state.groups !== '') {
            return (
                this.state.groups.map((e, index) => (
                    <GroupItem key={index} event={e} />
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
                        <h2> {''}</h2>
                        <h3> {'______________________________________________________________________________________________________________'}</h3>
                        <h5> {'______________________________________________________________________________________________________________'}</h5>
                        <MDBDropdownToggle nav caret onClick={this.toggle(1)}>
                            <Image imageId={this.state.imageId} />
                            <span float="right">{this.state.userName}</span>
                        </MDBDropdownToggle>

                        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
                            <MDBModalHeader toggle={this.toggle(1)}>{this.state.userName}</MDBModalHeader>
                            <MDBModalBody>
                                <MDBContainer fluid className="">
                                    <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBInput value={this.state.bio} />
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBInput value={this.state.country}/>
                                            </MDBCol>
                                            <MDBCol>
                                                <MDBInput value={this.state.city}/>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>
                                </MDBContainer>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="danger" onClick={this.toggle(1)}> Close </MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </div>
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
            </div>

        );
    }
}

export default FriendPage;