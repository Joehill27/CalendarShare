import React from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBBtn,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBFormInline } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
      };
      this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
        collapse: !this.state.collapse,
      });
  }

  render() {
    const bgNavy = {backgroundColor: '#2E4158'}
    const container = {height: 1300}
    return(
      <div>
        <Router>
          <header>
            <MDBNavbar style={bgNavy} dark expand="md" scrolling fixed="top">
              <MDBNavbarBrand href="/">
                  <strong>Home</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={ this.onClick } />
              <MDBCollapse isOpen = { this.state.collapse } navbar>
                <MDBNavbarNav left>
                  <MDBNavItem>
                      <MDBNavLink to="#">Friends</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                      <MDBNavLink to="#">Groups</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <span>User Name</span>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem href="#!">Settings<MDBIcon icon="cog" className="mdb-color-text ml-2" /></MDBDropdownItem>
                        <MDBDropdownItem href="#!">Sign Out<MDBIcon icon="sign-out-alt" className="red-text ml-2" /></MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
        </Router>
      </div>
    );
  }
}

export default Navigation;