import React, { Component } from "react";
// import user from '../../../assets/header/user.svg';
// import classes from './HeaderBox.module.css';
import classes from "./LinkBox.module.css";
import facebook from "../../../assets/icons/facebook.svg";
import instagram from "../../../assets/icons/instagram.svg";
import linkedin from "../../../assets/icons/linkedin.svg";
import mail from "../../../assets/icons/mail.svg";
import phoneNumber from "../../../assets/icons/phoneNumber.svg";
import snapchat from "../../../assets/icons/snapchat.svg";
import soundcloud from "../../../assets/icons/soundcloud.svg";
import tiktok from "../../../assets/icons/tiktok.svg";
import twitter from "../../../assets/icons/twitter.svg";
import url from "../../../assets/icons/url.svg";
import youtube from "../../../assets/icons/youtube.svg";
import github from "../../../assets/icons/github.svg";

class LinkBox extends Component {
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

  onClickHandler = () => {
    switch (this.props.iconType) {
      case "mail":
        window.open("mailto:" + this.props.url);
        break;
      case "phoneNumber":
        window.open = "tel:" + this.props.url;
        break;
      default:
        try {
          window.open(this.props.url);
        } catch {
          alert("Please Try Again !");
        }
        break;
    }
  };

  render() {
    return (
      <div className={classes.LinkBox} onClick={this.onClickHandler}>
        <img src={this.loadImage(this.props.iconType)} alt="url" />
        <h2>{this.props.content}</h2>
      </div>
    );
  }
}

export default LinkBox;
