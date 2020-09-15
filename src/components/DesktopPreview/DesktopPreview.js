import React, { Component } from "react";
import classes from "./DesktopPreview.module.css";
import BlackButton from "../UI/Button/BlackButton/BlackButton";
import LinkBoxEdit from "../../components/Boxes/LinkBox/LinkBoxEdit/LinkBoxEdit";
import Backdrop from "../UI/Backdrop/Backdrop";
import Modal from "../UI/Modal/Modal";
import ModalRetrieve from "../UI/Modal/ModalRetrieve/ModalRetrieve";
import UploadImage from '../UI/UploadImage/UploadImage';
import Typography from '@material-ui/core/Typography';

import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";

import firebase from "../../containers/firebase/firebase";

class DesktopPreview extends Component {
    state = {
        modalIsOpen: false,
        modalRetrieveIsOpen: false,
        email: "trung28899@gmail.com",
        socialMediaList: this.props.accountList,
    };

    addObject = (accountType, url) => {
        let addObject = null;
        switch (accountType) {
        case "Facebook":
            addObject = { title: accountType, icon: "facebook", url: url };
            break;
        case "Instagram":
            addObject = { title: accountType, icon: "instagram", url: url };
            break;
        case "Linkedin":
            addObject = { title: accountType, icon: "linkedin", url: url };
            break;
        case "Email":
            addObject = { title: accountType, icon: "mail", url: url };
            break;
        case "Phone Number":
            addObject = { title: accountType, icon: "phoneNumber", url: url };
            break;
        case "Snapchat":
            addObject = { title: accountType, icon: "snapchat", url: url };
            break;
        case "Soundcloud":
            addObject = { title: accountType, icon: "soundcloud", url: url };
            break;
        case "Tiktok":
            addObject = { title: accountType, icon: "tiktok", url: url };
            break;
        case "Twitter":
            addObject = { title: accountType, icon: "twitter", url: url };
            break;
        case "URL":
            addObject = { title: accountType, icon: "url", url: url };
            break;
        case "Youtube":
            addObject = { title: accountType, icon: "youtube", url: url };
            break;
        case "Github":
            addObject = { title: accountType, icon: "github", url: url };
            break;
        default:
            addObject = { title: accountType, icon: "url", url: url };
        }
        return addObject;
    };

    copyLink = () => {

    }

  render() {
    let listItems = null;

    if (this.state.socialMediaList) {
      listItems = this.state.socialMediaList.map((value, index) => {
        return (
          <LinkBoxEdit
            key={index}
            content={value.title}
            iconType={value.icon}
            forMobile={true}
          />
        );
      });
    }

    // this.swap(values, 1, 3);
    // console.log(values);
    // // values.splice(index,1);
    // values.splice(2,1);
    // console.log(values);
    return (
      <div className={classes.SocialMediaList}>
        <Typography className={classes.accountUrlArea}>
          My Flowpage: <span className={classes.accountUrl}>flow.page/lukasconn221</span>
          <BlackButton
            content="Copy"
            iconClass="fas fa-copy"
            clicked={this.copyLink}
          />
        </Typography>
        <br />
        <div className={classes.previewPhoneArea}>
          <UploadImage uploadAvatar={false} />
          {listItems}
        </div>

        <Backdrop
          show={this.state.modalIsOpen || this.state.modalRetrieveIsOpen}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataObject: state,
    accountList: state.userInfo.socialMediaList
      ? state.userInfo.socialMediaList
      : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFullNameBio: (fullName, bio) =>
      dispatch({
        type: actionTypes.UPDATEFULLNAMEANDBIO,
        valFullName: fullName,
        valBio: bio,
      }),
    updateSocialMediaList: (accountList) =>
      dispatch({
        type: actionTypes.UPDATESOCIALMEDIA,
        socialMediaListValue: accountList,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesktopPreview);