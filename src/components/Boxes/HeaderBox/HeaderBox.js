import React, { Component } from "react";
import user from "../../../assets/header/user.svg";
import logout from "../../../assets/header/logout.svg";
import edit from "../../../assets/header/edit.svg";
import classes from "./HeaderBox.module.css";

import Logo from "../../UI/Logo/Logo";
// import UploadImage from '../../UI/UploadImage/UploadImage';
import Button from '../../UI/Button/Button'

class HeaderBox extends Component {
  render() {
    let buttonClasses = [classes.ButtonBar, classes.hideBtn];
    if (this.props.buttonShow) {
      buttonClasses.pop();
    }

    return (
      <div className={classes.HeaderBox}>
        <img
          src={this.props.avatar}
          alt="avatar"
          className={classes.HeaderBoxImg}
        />
        <Logo content={this.props.userFullName} />
        <p>Hi, My name is <strong>{this.props.userFullName}</strong></p>
        {/* <div className={buttonClasses.join(" ")}>
          <a onClick={this.props.editProfile}>
            <img src={edit} alt="edit" className={classes.ButtonBarImg} />
            Edit Profile
          </a>
          <span>|</span>
          <a onClick={this.props.logOut}>
            <img src={logout} alt="logout" className={classes.ButtonBarImg} />
            Logout
          </a>
        </div> */}
      </div>
    );
  }
}

export default HeaderBox;
