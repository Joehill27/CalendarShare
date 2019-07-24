import React, { Fragment } from "react";
<<<<<<< HEAD
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

class GroupPage extends React.Component {
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
            'filterType': ''
            //Can add filtering for each list to state
        };

        this.toggle = this.toggle.bind(this);
=======
import { MDBIcon, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, MDBBtn,
  MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalBody,
  MDBModalHeader, MDBInput  } from 'mdbreact';
import Navigation from './Navigation';
import Footer from './Footer';
import Group from "./Group";
import GroupRequest from "./GroupRequest";
import GroupItem from "./GroupItem";

  class GroupPage extends React.Component {

    state = {
        modal1: false,
        searchTerm: ""
>>>>>>> c77fabb013924f1400c5b56a91de44234e70d60f
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

<<<<<<< HEAD
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
                <div>
                    <h1> This is where we'll put their bio and shit </h1>
                </div>
            </div>

        );
    }
}

export default GroupPage;
=======
    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {
        const bgNavy = {backgroundColor: '#2E4158'}
        const scrollContainerStyle = { width: "auto", maxHeight: "auto" };
        return(
            <div style={bgNavy}>
                <Navigation imageId={localStorage.getItem('profilePicture')}/>
                <div className="d-flex">
                <MDBDropdown dropright className="cardpadding ml-2">
                    <MDBDropdownToggle color="transparent">
                        <h3 className="text-white">My Groups<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text"/></h3>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem header>Sort</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Group Name<MDBIcon icon="sort-alpha-down ml-2" className=""/></MDBDropdownItem>
                        <MDBDropdownItem href="#!">Group Name<MDBIcon icon="sort-alpha-up ml-2" className=""/></MDBDropdownItem>
                    </MDBDropdownMenu>
                    </MDBDropdown>
                
                <div className="ml-auto">
                    <div className="md-form cardpadding pr-3">
                        <MDBBtn outline color="dark-green" size="sm" className="mr-auto" onClick={this.toggle(1)}>
                            Search Groups
                        </MDBBtn>
                    </div>
                    <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
                        <MDBModalHeader toggle={this.toggle(1)} className="success-color-dark white-text">Search Groups</MDBModalHeader>
                            <MDBModalBody>
                                <MDBContainer fluid>
                                    <MDBRow>
                                        <MDBCol>
                                            <MDBInput
                                                value={this.state.searchTerm}
                                                label="Search"
                                                name="searchTerm"
                                                onChange={this.changeHandler}
                                                type="text"
                                                >
                                            </MDBInput>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <GroupItem/>
                                        <GroupItem/>
                                        <GroupItem/>
                                        <GroupItem/>
                                        <GroupItem/>
                                        <GroupItem/>
                                        <GroupItem/>
                                        <GroupItem/>
                                        <GroupItem/>
                                        <GroupItem/>
                                        <GroupItem/>
                                        <GroupItem/>
                                        <GroupItem/>
                                        <GroupItem/>
                                    </MDBRow>
                                </MDBContainer>
                            </MDBModalBody>
                    </MDBModal>
                </div>
            </div>
                <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
                    <Group/>
                    <Group/>
                    <Group/>
                    <Group/>
                    <Group/>
                    <Group/>
                    <Group/>
                    <Group/>
                    <Group/>
                    <Group/>
                    <Group/>
                    <Group/>
                </div>
                <div className="d-flex">
                <MDBDropdown dropright className="pb-3 pt-3">
                    <MDBDropdownToggle color="transparent">
                        <h3 className="text-white">Group Invites<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text"/></h3>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem header>Sort</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Username<MDBIcon icon="sort-alpha-down ml-2" className=""/></MDBDropdownItem>
                        <MDBDropdownItem href="#!">Username<MDBIcon icon="sort-alpha-up ml-2" className=""/></MDBDropdownItem>
                    </MDBDropdownMenu>
                    </MDBDropdown>
                </div>
                <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
                    <GroupRequest/>
                    <GroupRequest/>
                    <GroupRequest/>
                    <GroupRequest/>
                    <GroupRequest/>
                    <GroupRequest/>
                    <GroupRequest/>
                    <GroupRequest/>
                    <GroupRequest/>
                    <GroupRequest/>
                    <GroupRequest/>
                </div>
                <Footer/>
            </div>
        );
    }

  } export default GroupPage;
>>>>>>> c77fabb013924f1400c5b56a91de44234e70d60f
