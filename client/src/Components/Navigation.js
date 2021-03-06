import React from 'react';
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
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from './Image';
import one from '../defaultImages/userProfilePics/1.png';
import two from '../defaultImages/userProfilePics/2.png';
import three from '../defaultImages/userProfilePics/3.png';
import four from '../defaultImages/userProfilePics/4.png';
import five from '../defaultImages/userProfilePics/5.png';
import six from '../defaultImages/userProfilePics/6.png';
import seven from '../defaultImages/userProfilePics/7.png';
import eight from '../defaultImages/userProfilePics/8.png';
import nine from '../defaultImages/userProfilePics/9.png';
import ten from '../defaultImages/userProfilePics/10.png';
import eleven from '../defaultImages/userProfilePics/11.png';
import twelve from '../defaultImages/userProfilePics/12.png';
import thirteen from '../defaultImages/userProfilePics/13.png';
import fourteen from '../defaultImages/userProfilePics/14.png';
import fifteen from '../defaultImages/userProfilePics/15.png';
import sixteen from '../defaultImages/userProfilePics/16.png';
import { updateProfilePicture, updateUserSettings } from '../apiCalls/userAPI';

class Navigation extends React.Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);

		this.state = {
			collapse: false,
			modal1: false,
			profilePicture: localStorage.getItem('profilePicture'),
			bio: localStorage.getItem('bio'),
			country: localStorage.getItem('country'),
			city: localStorage.getItem('city'),
			userName: localStorage.getItem('userName')
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.setState({
			collapse: !this.state.collapse
		});
	}

	componentDidMount() {
		if (this.state.userId === -1) {
			this.props.history.push('/');
			return;
		}
	}

	toggle = (nr) => () => {
		let modalNumber = 'modal' + nr;
		this.setState({
			[modalNumber]: !this.state[modalNumber]
		});
	};

	changeProfilePic = async (newId) => {
		localStorage.setItem('profilePicture', newId);
		updateProfilePicture(localStorage.getItem('userId'), newId)
			.then(() => this.setState({ profilePicture: newId }))
			.then(window.location.reload());
	};

	updateSettings = async () => {
		let settings = {
			bio: this.state.bio,
			city: this.state.city,
			country: this.state.country
		};
		localStorage.setItem('bio', this.state.bio);
		localStorage.setItem('city', this.state.city);
		localStorage.setItem('country', this.state.country);


		updateUserSettings(localStorage.getItem('userId'), settings)
			.then(this.toggle(1))
			.then(this.changeProfilePic(this.state.profilePicture));
	};

	changeHandler = (settings) => {
		this.setState({ [settings.target.name]: settings.target.value });
	};

	render() {
		const { match, location, history } = this.props;

		const bgNavy = { backgroundColor: '#2E4158' };
		const container = { height: 1300 };
		return (
			<div>
				<Router>
					<header>
						<MDBNavbar style={bgNavy} dark expand="md" scrolling fixed="top">
							<MDBNavbarBrand href="/home">
								<strong>Home</strong>
							</MDBNavbarBrand>
							<MDBNavbarToggler onClick={this.onClick} />
							<MDBCollapse isOpen={this.state.collapse} navbar>
								<MDBNavbarNav left>
									<MDBNavItem>
										<MDBNavLink to={{
											pathname: '/friends',
											state: { userName: this.state.userName }
										}}>Friends</MDBNavLink>
									</MDBNavItem>
									<MDBNavItem>
										<MDBNavLink to={{
											pathname: '/groups',
											state: { userName: this.state.userName }
										}}>Groups</MDBNavLink>
									</MDBNavItem>
									{/* <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <span><MDBIcon icon="bell" className="mr-1" /></span>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem href="#!">Friends</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Groups</MDBDropdownItem>
                        <MDBDropdownItem href="#!">New Events</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem> */}
								</MDBNavbarNav>
								<MDBNavbarNav right>
									<MDBNavItem>
										<MDBDropdown>
											<MDBDropdownToggle nav caret>
												<Image imageId={this.props.imageId} />
												<span float="right">{localStorage.getItem('userName')}</span>
											</MDBDropdownToggle>
											<MDBDropdownMenu>
												<MDBDropdownItem onClick={this.toggle(1)}>
													<div className="userDropdown">
														Settings
														<MDBIcon icon="cog" className="mdb-color-text ml-2" />
													</div>
												</MDBDropdownItem>
												<MDBDropdownItem onClick={this.props.logoutHandler}>
													Sign Out
													<MDBIcon icon="sign-out-alt" className="text-danger ml-2" />
												</MDBDropdownItem>
											</MDBDropdownMenu>
										</MDBDropdown>
									</MDBNavItem>
								</MDBNavbarNav>
							</MDBCollapse>
						</MDBNavbar>
						<MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
							<MDBModalHeader toggle={this.toggle(1)}>Settings</MDBModalHeader>
							<MDBModalBody>
								<MDBCardText>Choose a Profile Picture</MDBCardText>
								<div className="gallery">
									<img
										onClick={() => this.setState({ profilePicture: '1' })}
										className="gallery-item"
										src={one}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '2' })}
										className="gallery-item"
										src={two}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '3' })}
										className="gallery-item"
										src={three}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '4' })}
										className="gallery-item"
										src={four}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '5' })}
										className="galley-item"
										src={five}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '6' })}
										className="gallery-item"
										src={six}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '7' })}
										className="gallery-item"
										src={seven}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '8' })}
										className="gallery-item"
										src={eight}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '9' })}
										className="gallery-item"
										src={nine}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '10' })}
										className="gallery-item"
										src={ten}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '11' })}
										className="gallery-item"
										src={eleven}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '12' })}
										className="gallery-item"
										src={twelve}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '13' })}
										className="gallery-item"
										src={thirteen}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '14' })}
										className="gallery-item"
										src={fourteen}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '15' })}
										className="gallery-item"
										src={fifteen}
										height="50"
										width="50"
									/>
									<img
										onClick={() => this.setState({ profilePicture: '16' })}
										className="gallery-item"
										src={sixteen}
										height="50"
										width="50"
									/>
								</div>
								<MDBContainer fluid className="">
									<form className="needs-validation" onSubmit={this.submitHandler} noValidate>
										<MDBRow>
											<MDBCol>
												<MDBInput
													value={this.state.bio}
													label="Bio"
													className="form-control"
													name="bio"
													onChange={this.changeHandler}
													type="text"
													required
												/>
											</MDBCol>
										</MDBRow>
										<MDBRow>
											<MDBCol>
												<MDBInput
													value={this.state.city}
													label="City"
													className="form-control"
													name="city"
													onChange={this.changeHandler}
													type="text"
													required
												/>
											</MDBCol>
											<MDBCol>
												<MDBInput
													value={this.state.country}
													label="Country"
													className="form-control"
													name="country"
													onChange={this.changeHandler}
													type="text"
													required
												/>
											</MDBCol>
										</MDBRow>
									</form>
								</MDBContainer>
							</MDBModalBody>
							<MDBModalFooter>
								<MDBBtn color="green" onClick={() => this.updateSettings()}>
									Update
								</MDBBtn>
								<MDBBtn color="danger" onClick={this.toggle(1)}>
									Close
								</MDBBtn>
							</MDBModalFooter>
						</MDBModal>
					</header>
				</Router>
			</div>
		);
	}
}

export default withRouter(Navigation);
