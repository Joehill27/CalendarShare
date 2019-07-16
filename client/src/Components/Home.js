import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView, MDBScrollbar, MDBSmoothScroll } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import Event from './Event';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const bgNavy = {backgroundColor: '#2E4158'}
    const scrollContainerStyle = { width: "auto", maxHeight: "auto" };
    return (
      <div style={bgNavy}>  
      <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
        <Navigation/>
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
      </div>
      <div>-</div>
      <div className="scrolling-wrapper-flexbox scrollbar scrollbar-primary" style={scrollContainerStyle}>
        <Navigation/> 
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
        <div class="card-inline cardpadding"><h2><Event/></h2></div>
      </div>
      <div>-</div>
      </div>
    );
  }
}

export default Home;
