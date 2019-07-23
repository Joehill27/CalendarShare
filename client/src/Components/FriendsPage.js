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

  class FriendsPage extends React.Component {

    render() {
        const bgNavy = {backgroundColor: '#2E4158'}
        const scrollContainerStyle = { width: "auto", maxHeight: "auto" };
        return(
            <div style={bgNavy}>
                <Navigation imageId={localStorage.getItem('profilePicture')}/>
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
                    <MDBFormInline className="md-form cardpadding pr-3">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        <MDBBtn outline color="white" size="sm" type="submit" className="mr-auto">
                            Search
                        </MDBBtn>
                    </MDBFormInline>
                </div>
            </div>
                <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
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