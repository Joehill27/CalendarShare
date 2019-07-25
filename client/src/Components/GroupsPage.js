import React from "react";
import { MDBIcon, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn,
  MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalBody,
  MDBModalHeader, MDBInput  } from 'mdbreact';
import Navigation from './Navigation';
import Footer from './Footer';
import Group from "./Group";
import GroupRequest from "./GroupRequest";
import GroupItem from "./GroupItem";
import { getUser } from "../apiCalls/userAPI";

  class GroupsPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modal1: false,
            searchTerm: "",
            groupRequests: '',
            groups: ''
        }

        this.logoutHandler = this.logoutHandler.bind(this);
        this.renderGroupInvites = this.renderGroupInvites.bind(this);
    }

    componentDidMount()
    {
        let user;
        getUser(this.props.location.state.userName)
            .then((userJson) => {
                user = userJson;
                this.setState({
                    groups: user.groups,
                    groupRequests: user.groupRequests
                });

                console.log(this.state);
            })
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

    logoutHandler = async () => {
        console.log('Logging out');
        localStorage.setItem('userId', -1);
        localStorage.setItem('user', '');
        this.props.history.push('/');
      }

    renderGroups()
    {
        if (this.state.groups != '')
        {
            console.log(this.state.groups);
            return (
                this.state.groups.map((e, index) => (
                    <Group logoutHandler={this.logoutHandler} key={index} groupName={e} />
                ))
            );
        }
    }

    renderGroupInvites()
    {
        if (this.state.groupRequests !== '') {
            console.log(this.state.groupRequests);
            return (
                this.state.groupRequests.map((e, index) => (
                    <GroupRequest logoutHandler={this.logoutHandler} key={index} groupName={e} />
                ))
            );
        }
    }


    render() {
        const bgNavy = {backgroundColor: '#2E4158'}
        const scrollContainerStyle = { width: "auto", maxHeight: "auto" };
        return(
            <div style={bgNavy}>
                <Navigation logoutHandler={this.logoutHandler} imageId={localStorage.getItem('profilePicture')}/>
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
                                    </MDBRow>
                                </MDBContainer>
                            </MDBModalBody>
                    </MDBModal>
                </div>
            </div>
                <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
                    { this.renderGroups() }
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
                    { this.renderGroupInvites() }
                </div>
                <Footer/>
            </div>
        );
    }

  } export default GroupsPage;
