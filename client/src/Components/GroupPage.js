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
import Navigation from './Navigation';
import Friend from "./Friend";

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
            groupName: 'TODO: Add groupname'
        };
    }

    componentDidMount() {
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
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
                </div>
                <div>
                    <MDBDropdown dropright className="ml-2">
                        <MDBDropdownToggle color="transparent">
                            <h3 className="text-white">Members<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text" /></h3>
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
            </div>

        );
    }
}

export default GroupPage;
