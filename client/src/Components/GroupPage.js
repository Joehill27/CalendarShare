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
import MyEvent from './MyEvent';
import {getGroupEvents} from '../apiCalls/groupAPI';

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
    }

    componentDidMount() 
    {
        let group;
        getGroupEvents(this.state.groupID)
            .then((groupJson) => {
                group = groupJson;
                console.log(group);
                this.setState ({
                    'events' : group
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

    renderEvents()
    {
        if (this.state.events !== '') {
            return (
                this.state.events.map((e, index) => (
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
                                <h3 className="text-white">Events<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text" /></h3>
                            </MDBDropdownToggle>
                        </MDBDropdown>
                    </div>
                </div>
                <div id="future" className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
                    { this.renderEvents() }
                </div>
                <div>
                    <MDBDropdown dropright className="ml-2">
                        <MDBDropdownToggle color="transparent">
                            <h3 className="text-white">Members<MDBIcon icon="sort-amount-down ml-2" className="ml-2 mdb-color-text" /></h3>
                        </MDBDropdownToggle>
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
