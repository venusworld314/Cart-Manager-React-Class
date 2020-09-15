import React, { Component } from "react";
import classes from "./RetrieveAccount.module.css";
import avatar from "../../../assets/logo.svg";
import TextBox from "../../../components/UI/TextBox/TextBox";
// import Button from "../../../components/UI/Button/Button";
import firebase from "../../firebase/firebase";
import ModalRetrieve from "../../../components/UI/Modal/ModalRetrieve/ModalRetrieve";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import HoverText from "../../../components/UI/HoverText/HoverText";

import Button from '@material-ui/core/Button';

import { Redirect, Switch } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: null,
    buttonClicked: false,
    validation: {
      errorEmail: null,
    },
    error: false,
    modalIsOpen: false,
    redirect: false,
  };

  componentDidUpdate() {
    if (this.state.buttonClicked) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 8500);
    }
  }

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
    this.setState({ buttonClicked: true });
  };

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  retrieveButtonHandler = () => {
    // this.showModal();
    // this.setState({validation: {errorEmail: null}}, () => this.formValidation());
    this.formValidation();
  };

  // See documentation:
  // https://firebase.google.com/docs/auth/web/manage-users
  retrieveAccount = () => {
    firebase.auth
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.showModal();
      })
      .catch(function (error) {
        alert(error);
      });
  };

  formValidation() {
    let errorEmail = null;

    // email validation:
    if (this.state.email === null || this.state.email === "") {
      errorEmail = "*Field Required !";
    } else {
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(this.state.email) === false) {
        errorEmail = "*Invalid email!";
      }
    }

    this.setState(
      {
        validation: {
          errorEmail: errorEmail,
        },
      },
      () => {
        if (this.state.validation.errorEmail !== null) {
          this.setState({ error: true });
        } else {
          this.setState({ buttonClicked: true }, () => {
            this.retrieveAccount();
          });
        }
      }
    );
  }

  render() {
    return (
      <div className={classes.loginContent}>
        <form>
          {/* <img src={avatar} alt="avatar" />
          <h2>Forgot Your Password ?</h2> */}
          <h3 className={classes.subText}>
            Enter your email, we'll send you an email shortly about your account
            information
          </h3>
          <TextBox
            error={this.state.error ? this.state.validation.errorEmail : null}
            iconClasses="fas fa-envelope"
            textboxName="Enter Your Email"
            inputType="text"
            changed={(event) => this.handleChange(event)}
          />

          {/* <Button
            styling="btn1 btnUp"
            buttonText="Retrieve Account"
            clicked={this.retrieveButtonHandler}
          /> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.signUpButton}
            onClick={this.retrieveButtonHandler}
            >
            Retrieve Account
          </Button>
          <div className={classes.hoverTextArea}>
            {/* <HoverText innerText="Return to Login." path="/login" /> */}
            <HoverText innerText="Đăng Nhập" path="/login" />
          </div>
          {/* <Button styling="btn1" buttonText="Return to Login" path="/login" /> */}

          <ModalRetrieve
            show={this.state.modalIsOpen}
            closed={this.closeModal}
            email={this.state.email}
            h3text="An email has been sent to"
            h3text2="Please Check Your Email !"
            buttonName="Dismiss"
          />
          <Backdrop show={this.state.modalIsOpen} />

          <Switch>
            {this.state.redirect ? (
              <Redirect from="/retrieve" to="/login" />
            ) : null}
          </Switch>
        </form>
      </div>
    );
  }
}

export default SignIn;
