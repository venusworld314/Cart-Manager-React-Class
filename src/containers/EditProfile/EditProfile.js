import React, { Component } from "react";
// import HeaderBox from '../../components/Boxes/HeaderBox/HeaderBox';
import classes from "./EditProfile.module.css";
// import LinkBox from '../../components/Boxes/LinkBox/LinkBox';
import BlackButton from "../../components/UI/Button/BlackButton/BlackButton";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BasicInfo from "../../components/BasicInfo/BasicInfo";
import SocialMediaList from "../../components/SocialMediaList/SocialMediaList";
import DesktopPreviewMedia from "../../components/DesktopPreview/DesktopPreview";
import MobilePreviewMedia from "../../components/MobilePreview/MobilePreview";

import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import { Redirect } from "react-router";

class EditProfile extends Component {
  state = {
    showPreview: false,
    checkedTabValue: 1,
  };

  // viewPageHandler = () => {
  //   this.props.history.replace("/profile");
  // };

  handleChangeTab = (event, newValue) => {
    this.setState({
      checkedTabValue: newValue,
    })
  }

  logoutHandler = () => {
    this.props.unauthenticateUser();
    this.props.logOutResetStore();
    this.props.history.replace("/login");
  };

  handlePreview = () => {
    console.log('hello');
    this.setState({
      showPreview: true,
    })
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className={classes.EditProfile}>
          {!this.state.showPreview ?
            <>
            <div className={classes.profileEditArea}>
              <div className={classes.profileTab}>
                <Paper square>
                  <Tabs
                    value={this.state.checkedTabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChangeTab}
                  >
                    <Tab label="Manage Link" />
                    <Tab label="Eidt Profile" />
                  </Tabs>
                </Paper>
              </div>
              <div className={classes.accountUrlArea}>
                <Typography className={classes.accountUrlArea}>
                  <span className={classes.accountUrl}>flow.page/lukasconn221</span>
                  <BlackButton
                    content="Copy"
                    iconClass="fas fa-copy"
                    clicked={this.copyLink}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.previewButton}
                    onClick={this.handlePreview}
                    >
                    Preview
                  </Button>
                </Typography>
              </div>
              {this.state.checkedTabValue === 1 ?
                <BasicInfo /> : <SocialMediaList />
              }
            </div>
            <div className={classes.profilePreviewArea}>
              <DesktopPreviewMedia />
            </div>
            </> :
            <div className={classes.mobilePreviewArea}>
              <MobilePreviewMedia></MobilePreviewMedia>
            </div>}
        </div>
      );
    } else {
      return <Redirect from="/profile/edit" to="/login" />;
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
