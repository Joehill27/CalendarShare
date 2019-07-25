import React from "react";
import {
    MDBCol,
    MDBContainer,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBIcon,
    MDBBtn,
    MDBRow,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBModalFooter
} from 'mdbreact';

import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBInput } from 'mdbreact';
import one from '../defaultImages/userProfilePics/8.png';
import Navigation from './Navigation';
import Friend from "./Friend";
import MyEvent from './MyEvent';
import UserItem from './UserItem';
import { getGroupEvents, getMembers } from '../apiCalls/groupAPI';
import { get } from "https";
import { getUser, getUserById } from "../apiCalls/userAPI";

class GroupPage extends React.Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('userId') === -1) {
            alert("Attempting to access a page without valid credentials.\nReturning to login page. Please log in to a valid account.");
            this.props.history.push('');
        }

        console.log(this.props.location.state);

        this.state = {
            modal1: false,
            modal2: false,
            group: '',
            groupName: this.props.location.state.groupName,
            groupID: this.props.location.state.groupID,
            members: '',
            groupRequests: '',
            events: '',
            groupPicture: ''
        };

        this.renderEvents = this.renderEvents.bind(this);
        this.renderMembers = this.renderMembers.bind(this);
    }

    componentDidMount() {
        let group, user;
        getGroupEvents(this.state.groupID)
            .then((groupJson) => {
                group = groupJson;
                this.setState({
                    'events': group
                });
            })

        getMembers(this.state.groupID)
            .then((groupJson) => {
                group = groupJson;
                this.setState({
                    'members': group
                });
                
                if(this.state.members)
                {
                    getUserById(this.state.members[0]._id)
                        .then((userJson) => {
                            user = userJson;
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            })
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    renderEvents() {
        if (this.state.events) {
            return (
                this.state.events.map((e, index) => (
                    <MyEvent key={index} event={e} />
                ))
            );
        }
    }

    renderMembers() {
        if (this.state.members) {
            console.log(this.state.members);
            return (
                this.state.members.map((e, index) => (
                    <Friend key={index} userName={e} />
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
                        <h3> {'_________'}</h3>
                        <h5> {'_________'}</h5>
                        <MDBDropdownToggle nav caret onClick={this.toggle(1)}>
                            {/* <Image imageId={this.state.imageId} /> */}
                            <span float="right">{this.state.groupName}</span>
                        </MDBDropdownToggle>

                        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
                            <MDBModalHeader toggle={this.toggle(1)}>{this.state.groupName}</MDBModalHeader>
                            <MDBModalBody>
                                <MDBContainer fluid className="">
                                    <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                                        <MDBRow>
                                            <MDBCol>
                                                {/* <MDBInput value={this.state.bio} /> */}
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                {/* <MDBInput value={this.state.country}/> */}
                                            </MDBCol>
                                            <MDBCol>
                                                {/* <MDBInput value={this.state.city}/> */}
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
                                <h3 className="text-white">Events</h3>
                            </MDBDropdownToggle>
                        </MDBDropdown>
                    </div>
                </div>
                <div id="future" className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
                    {this.renderEvents()}
                </div>
                <div>
                    <MDBDropdown dropright className="ml-2">
                        <MDBDropdownToggle color="transparent">
                            <h3 className="text-white">Members</h3>
                        </MDBDropdownToggle>
                    </MDBDropdown>
                </div>

                <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
                    { this.renderMembers() }
                </div>
            </div>

        );
    }
}

export default GroupPage;
