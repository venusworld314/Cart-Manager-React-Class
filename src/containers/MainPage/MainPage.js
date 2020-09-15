import React, { Component } from "react";
import HeaderBox from "../../components/Boxes/HeaderBox/HeaderBox";
import classes from "./MainPage.module.css";
import LinkBox from "../../components/Boxes/LinkBox/LinkBox";
import Button from '@material-ui/core/Button';

import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import { Redirect } from "react-router";

import firebase from "../firebase/firebase";

class MainPage extends Component {
  state = {
    keyString: null,
    userInfo: null,
  };

  logoutHandler = () => {
    this.props.unauthenticateUser();
    this.props.logOutResetStore();
    this.props.history.replace("/login");
  };

  editProfileHandler = () => {
    this.props.history.replace("/profile/edit");
  };

  extractString = (stringVal) => {
    const extractedString = stringVal.substring(
      stringVal.indexOf("e/") + 2,
      stringVal.length
    );
    return extractedString;
  };

  componentDidMount() {
    const keyString = this.extractString(this.props.history.location.pathname);
    const dataRetrieved = firebase.getRealtimeInfo(keyString);
    dataRetrieved.on("value", (snap) => {
      this.setState({ keyString: keyString, userInfo: snap.val() });
    });
  }

  render() {
    let listItems = null;
    if (this.props.userInformation.socialMediaList) {
      listItems = this.props.userInformation.socialMediaList.map(
        (value, index) => {
          return (
            <LinkBox
              iconType={value.icon}
              content={value.title}
              url={value.url}
              key={value.title}
            />
          );
        }
      );
    }

    if (this.props.loggedIn) {
      return (
        <div className={classes.MainPage}>
          {/* <img className={classes.wave} src={waveImg} alt="wave"></img> */}
          <HeaderBox
            buttonShow={true}
            // editProfile={this.editProfileHandler}
            // logOut={this.logoutHandler}
            avatar={
              this.props.userInformation.avatarURL === ""
                ? this.props.userInformation.avatarImg
                : this.props.userInformation.avatarURL
            }
            userFullName={this.props.userInformation.fullName}
            userBio={this.props.userInformation.bio}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.editProfileButton}
            onClick={this.editProfileHandler}
            >
            <i className="fas fa-edit"></i> 
            {/* Edit Profile */} Chỉnh Sửa Trang
          </Button>
          {listItems}
        </div>
      );
    } else {
      return <Redirect from="/profile" to="/login" />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authenticated,
    // loggedIn: true,
    userInformation: state.userInfo,
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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
