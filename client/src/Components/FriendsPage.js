import React, { Fragment } from "react";
import { MDBIcon, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline, MDBBtn,
  MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalBody,
  MDBModalHeader, MDBInput  } from 'mdbreact';
  import Navigation from './Navigation';
  import Footer from './Footer';
import MyEvent from "./MyEvent";
import Friend from "./Friend";
import FriendRequest from "./FriendRequest";
import Group from "./Group";
import GroupRequest from "./GroupRequest";
import UserItem from "./UserItem";

  class FriendsPage extends React.Component {
    constructor(props) {
        super(props);

        this.logoutHandler = this.logoutHandler.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('userId') === -1)
            this.props.history.push('/');
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


    constructor(props)
    {
        super(props);

        console.log(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick()
    {
        this.props.history.push('/friend');
    }

    render() {
        const bgNavy = {backgroundColor: '#2E4158'}
        const scrollContainerStyle = { width: "auto", maxHeight: "auto" };
        return(
            <div style={bgNavy}>
                <Navigation imageId={localStorage.getItem('profilePicture') } logoutHandler={this.logoutHandler}/>
                <div className="d-flex">
                <MDBDropdown dropright className="cardpadding ml-2">
                    <MDBDropdownToggle color="transparent">
                        <h3 className="text-white">My Friends<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text"/></h3>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem header>Sort</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Username<MDBIcon icon="sort-alpha-down ml-2" className=""/></MDBDropdownItem>
                        <MDBDropdownItem href="#!">Username<MDBIcon icon="sort-alpha-up ml-2" className=""/></MDBDropdownItem>
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
                                        <UserItem/>
                                        <UserItem/>
                                        <UserItem/>
                                        <UserItem/>
                                        <UserItem/>
                                        <UserItem/>
                                        <UserItem/>
                                        <UserItem/>
                                        <UserItem/>
                                        <UserItem/>
                                        <UserItem/>
                                        <UserItem/>
                                        <UserItem/>
                                        <UserItem/>
                                    </MDBRow>
                                </MDBContainer>
                            </MDBModalBody>
                    </MDBModal>
                </div>
            </div>
                <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
                    <Friend onClick = {this.onClick}/>
                    <Friend/>
                    <Friend/>
                    <Friend/>
                    <Friend/>
                    <Friend/>
                    <Friend/>
                    <Friend/>
                    <Friend/>
                    <Friend/>
                    <Friend/>
                    <Friend/>
                </div>
                <div className="d-flex">
                <MDBDropdown dropright className="pb-3 pt-3">
                    <MDBDropdownToggle color="transparent">
                        <h3 className="text-white">Friend Request<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text"/></h3>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem header>Sort</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Username<MDBIcon icon="sort-alpha-down ml-2" className=""/></MDBDropdownItem>
                        <MDBDropdownItem href="#!">Username<MDBIcon icon="sort-alpha-up ml-2" className=""/></MDBDropdownItem>
                    </MDBDropdownMenu>
                    </MDBDropdown>
                </div>
                <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                </div>
                <Footer/>
            </div>
        );
    }

  } export default FriendsPage;