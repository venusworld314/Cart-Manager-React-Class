import React, { Component } from "react";
import classes from "./UploadImage.module.css";

import { connect } from "react-redux";
import * as actionTypes from "../../../store/actionTypes";

import firebase from "../../../containers/firebase/firebase";

class UploadImage extends Component {
  state = {
    imageLoaded: false,
    imgSrc: this.props.avatar,
    progress: 0,
    url: null,
    imageUrl: this.props.avatarURL,
  };

  showPreview = (event) => {
    try {
      const imagePure = event.target.files[0];
      let src = URL.createObjectURL(imagePure);
      this.setState({ imageLoaded: true, imgSrc: src }, () => {
        // this.props.updateImage(this.state.imgSrc);
        try {
          const uploadObject = firebase.updateImage(
            imagePure,
            imagePure.name,
            this.props.userEmail
          );
          try {
            uploadObject.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress: progress });
              },
              (error) => {
                console.log(error);
              },
              () => {
                firebase.storage
                  .ref("images/" + this.props.userEmail)
                  .child(imagePure.name)
                  .getDownloadURL()
                  .then((url) => {
                    this.setState({ url: url }, () =>
                      // this.props.updateImage(this.state.imgSrc, this.state.url)
                      this.props.updateImage(this.state.url, this.state.url)
                    );
                  });
              }
            );
          } catch (error) {
            alert(error);
          }
        } catch (error) {
          alert(error);
        }
      });
    } catch (error) {
      // console.log(error);
      console.log("Need to choose an image");
    }
  };

  render() {
    if (this.state.url) {
      console.log(`This is the image url: ${this.state.url}`);
    }
    return (
      <div className={classes.center}>
        <div className={classes.formInput}>
          <div className={classes.preview}>
            <img
              src={
                this.props.avatarURL ? this.props.avatarURL : this.state.imgSrc
              }
              alt="avatarImg"
              id="file-ip-1-preview"
            />
          </div>
          {this.props.uploadAvatar ?
            <>
            <label htmlFor="file-ip-1">
              <i className="fas fa-edit"></i>
            </label>
            <input
              type="file"
              id="file-ip-1"
              accept="image/*"
              onChange={(event) => this.showPreview(event)}
            /></> : null }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // This is unused
    loggedIn: state.authenticated,
    avatar: state.userInfo.avatarImg,
    userEmail: state.userInfo.email,
    avatarURL: state.userInfo.avatarURL,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // This is unused
    authenticateUser: () => dispatch({ type: actionTypes.AUTHENTICATE }),
    unauthenticateUser: () => dispatch({ type: actionTypes.UNAUTHENTICATE }),
    updateImage: (imagePassed, imageUrl) =>
      dispatch({
        type: actionTypes.IMAGEUPDATE,
        imageLoaded: imagePassed,
        imageURL: imageUrl,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);
