import React from "react";
import {
    MDBIcon, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, MDBBtn,
    MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalBody,
    MDBModalHeader, MDBInput
} from 'mdbreact';
import Navigation from './Navigation';
import Footer from './Footer';
import Friend from "./Friend";
import FriendRequest from "./FriendRequest";
import UserItem from "./UserItem";
import { getUser } from "../apiCalls/userAPI";

class FriendsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'userName': this.props.location.state.userName,
            'friends': ''
        };

        this.logoutHandler = this.logoutHandler.bind(this);
        this.renderFriends = this.renderFriends.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('userId') === -1)
            this.props.history.push('/');

        getUser(this.state.userName)
            .then((userJson) => {
                let user = userJson;
                this.setState({
                    friends: user.friends
                });
                console.log(this.state.friends);
            })
    }

    logoutHandler = async () => {
        console.log('Logging out');
        localStorage.setItem('userId', -1);
        localStorage.setItem('user', '');
        this.props.history.push('/');
    };

    state = {
        modal1: false,
        searchTerm: ""
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    renderFriends() {
        if (this.state.friends !== '') {
            console.log(this.state.friends);
            return (
                this.state.friends.map((e, index) => (
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
                <Navigation imageId={localStorage.getItem('profilePicture')} logoutHandler={this.logoutHandler} />
                <div className="d-flex">
                    <MDBDropdown dropright className="cardpadding ml-2">
                        <MDBDropdownToggle color="transparent">
                            <h3 className="text-white">My Friends<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text" /></h3>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem header>Sort</MDBDropdownItem>
                            <MDBDropdownItem href="#!">Username<MDBIcon icon="sort-alpha-down ml-2" className="" /></MDBDropdownItem>
                            <MDBDropdownItem href="#!">Username<MDBIcon icon="sort-alpha-up ml-2" className="" /></MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>

                    <div className="ml-auto">
                        <div className="md-form cardpadding pr-3">
                            <MDBBtn outline color="dark-green" size="sm" className="mr-auto" onClick={this.toggle(1)}>
                                Add Friends
                        </MDBBtn>
                        </div>
                        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered size="med">
                            <MDBModalHeader toggle={this.toggle(1)} className="success-color-dark white-text">Search Users</MDBModalHeader>
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
                                    </MDBRow>
                                </MDBContainer>
                            </MDBModalBody>
                        </MDBModal>
                    </div>
                </div>
                <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
                    { this.renderFriends() }
                </div>
                <div className="d-flex">
                    <MDBDropdown dropright className="pb-3 pt-3">
                        <MDBDropdownToggle color="transparent">
                            <h3 className="text-white">Friend Request<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text" /></h3>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem header>Sort</MDBDropdownItem>
                            <MDBDropdownItem href="#!">Username<MDBIcon icon="sort-alpha-down ml-2" className="" /></MDBDropdownItem>
                            <MDBDropdownItem href="#!">Username<MDBIcon icon="sort-alpha-up ml-2" className="" /></MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </div>
                <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
                    <FriendRequest />
                    <FriendRequest />
                    <FriendRequest />
                    <FriendRequest />
                    <FriendRequest />
                    <FriendRequest />
                    <FriendRequest />
                    <FriendRequest />
                    <FriendRequest />
                    <FriendRequest />
                    <FriendRequest />
                </div>
                <Footer />
            </div>
        );
    }

} export default FriendsPage;