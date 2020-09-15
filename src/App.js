import React, { Component } from "react";
import "./App.css";
import Account from "./containers/Account/Account";
import { Route, Switch } from "react-router-dom";
import MainPage from "./containers/MainPage/MainPage";
import ViewPage from './containers/ViewPage/ViewPage';
import EditProfile from './containers/EditProfile/EditProfile';
import Footer from './containers/Footer/Footer'; 
import AppBar from './containers/AppBar/AppBar';

import { connect } from "react-redux";
import * as actionTypes from "./store/actionTypes";

class App extends Component {

  render() {
    return (
      <div className='App'>
        {this.props.loggedIn ? <AppBar></AppBar> : null}
        {/* <AppBar></AppBar> */}
        <Switch>
          <Route path='/profile/edit' component={EditProfile} />
          <Route path='/view/' component={ViewPage} />
          <Route path='/profile/' component={MainPage} />
          <Route path='/' component={Account} />
        </Switch>
        <Footer></Footer>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
