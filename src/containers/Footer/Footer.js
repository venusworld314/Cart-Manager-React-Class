import React, { Component } from "react";
import classes from './Footer.module.css'; 
import logo from '../../assets/logo.svg'; 

import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";

class Footer extends Component{
  render(){
    return (
      <div className={!this.props.loggedIn ? classes.footerContainer : `${classes.footerContainer} ${classes.WhiteGreyBackground}`}>
        <div className={classes.leftCol}>
            <img src={logo} alt="" className={classes.logo} />
            <div className={classes.socialMedia}>
                <a><i className="fab fa-facebook-f"></i></a>
                <a ><i className="fab fa-twitter"></i></a>
                <a ><i className="fab fa-instagram"></i></a>
                <a ><i className="fab fa-youtube"></i></a>
                <a ><i className="fab fa-linkedin-in"></i></a>
            </div>
            <p className={classes.rightsText}>© 2020 Copyright By On-Card All Rights Reserved.</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      loggedIn: state.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // This is unused
    authenticateUser: () => dispatch({ type: actionTypes.AUTHENTICATE }),
    unauthenticateUser: () => dispatch({ type: actionTypes.UNAUTHENTICATE }),
    logOutResetStore: () => dispatch({ type: actionTypes.LOGOUT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);