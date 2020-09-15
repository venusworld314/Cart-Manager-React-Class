import React, { Component } from "react";
// import user from '../../../assets/header/user.svg';
// import classes from './HeaderBox.module.css';
import classes from "./LinkBoxEdit.module.css";
import BlackButtonEdit from "../../../UI/Button/BlackButton/BlackButtonEdit/BlackButtonEdit";
import facebook from "../../../../assets/icons/facebook.svg";
import instagram from "../../../../assets/icons/instagram.svg";
import linkedin from "../../../../assets/icons/linkedin.svg";
import mail from "../../../../assets/icons/mail.svg";
import phoneNumber from "../../../../assets/icons/phoneNumber.svg";
import snapchat from "../../../../assets/icons/snapchat.svg";
import soundcloud from "../../../../assets/icons/soundcloud.svg";
import tiktok from "../../../../assets/icons/tiktok.svg";
import twitter from "../../../../assets/icons/twitter.svg";
import url from "../../../../assets/icons/url.svg";
import youtube from "../../../../assets/icons/youtube.svg";
import github from "../../../../assets/icons/github.svg";

class LinkBoxEdit extends Component {
  loadImage = (imageType) => {
    let imageLoad = null;
    switch (imageType) {
      case "facebook":
        imageLoad = facebook;
        break;
      case "instagram":
        imageLoad = instagram;
        break;
      case "linkedin":
        imageLoad = linkedin;
        break;
      case "mail":
        imageLoad = mail;
        break;
      case "phoneNumber":
        imageLoad = phoneNumber;
        break;
      case "soundcloud":
        imageLoad = soundcloud;
        break;
      case "snapchat":
        imageLoad = snapchat;
        break;
      case "tiktok":
        imageLoad = tiktok;
        break;
      case "twitter":
        imageLoad = twitter;
        break;
      case "youtube":
        imageLoad = youtube;
        break;
      case "github":
        imageLoad = github;
        break;
      default:
        imageLoad = url;
    }
    return imageLoad;
  };

  render() {
    return (
      <div className={classes.LinkBoxEdit}>
        <img src={this.loadImage(this.props.iconType)} alt="url" />
        <h2>{this.props.content}</h2>
        {!this.props.forMobile ?
          <div className={classes.buttonBar}>
            <BlackButtonEdit
              iconClass="fas fa-arrow-up"
              clicked={this.props.btnUpClicked}
            />
            <BlackButtonEdit
              deleteButton={true}
              iconClass="fas fa-trash"
              clicked={this.props.deleteClicked}
            />
            <BlackButtonEdit
              iconClass="fas fa-arrow-down"
              clicked={this.props.btnDownClicked}
            />
          </div> : null
        }
      </div>
    );
  }
}

export default LinkBoxEdit;
