import React, { Fragment } from "react";
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


    render() {
        const bgNavy = {backgroundColor: '#2E4158'}
        const scrollContainerStyle = { width: "auto", maxHeight: "auto" };
        return(
            <div>
                <h1> hi </h1>
            </div>
        );
    }

  } export default GroupPage;
