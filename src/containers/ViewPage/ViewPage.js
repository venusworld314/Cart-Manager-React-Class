import React, { Component } from "react";
import HeaderBox from "../../components/Boxes/HeaderBox/HeaderBox";
import classes from "./ViewPage.module.css";
import LinkBox from "../../components/Boxes/LinkBox/LinkBox";
import Button from '@material-ui/core/Button';

import { connect } from "react-redux";
import * as actionCreators from "../../store/actionCreators";

import firebase from "../firebase/firebase";

class MainPage extends Component {
  state = {
    objectVal: null,
  };

  getKeyString = () => {
    const fullUrl = window.location.href;
    const subString = fullUrl.substring(
      fullUrl.indexOf("/view/") + 6,
      fullUrl.length
    );
    return subString;
  };

  componentDidMount() {
    const indexString = this.getKeyString();
    const indexingObject = firebase.getKeyStringByIndex(indexString);
    try {
      indexingObject.on("value", (snap) => {
        let keyValue = snap.val();
        this.props.getInfoView(keyValue);
      });
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const listItems = this.props.userInformation.socialMediaList.map(
      (value) => {
        return (
          <LinkBox
            iconType={value.icon}
            content={value.title}
            url={value.url}
            key={value.url}
          />
        );
      }
    );
    return (
      <div className={classes.ViewPage}>
        {/* <img className={classes.wave} src={waveImg} alt="wave"></img> */}
        <HeaderBox
          buttonShow={false}
          avatar={this.props.userInformation.avatarImg}
          userFullName={this.props.userInformation.fullName}
          userBio={this.props.userInformation.bio}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.editProfileButton}
          onClick={this.editProfileHandler}
          >
          <i className="fas fa-edit"></i> Edit Profile
        </Button>
        {listItems}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authenticated,
    userInformation: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoView: (keyString) => {
      dispatch(actionCreators.pullInfoView(keyString));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
