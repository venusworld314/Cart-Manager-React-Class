import React, { Component } from "react";
import classes from "./SignIn.module.css";
import TextBox from "../../../components/UI/TextBox/TextBox";
import HoverText from "../../../components/UI/HoverText/HoverText";
import firebase from "../../firebase/firebase";
import Button from '@material-ui/core/Button';

import ModalRetrieve from "../../../components/UI/Modal/ModalRetrieve/ModalRetrieve";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";

import GoogleIcon from "../../../assets/icons/icon_google.png";
import FacebookIcon from "../../../assets/icons/icon_facebook_1.png";

import { connect } from "react-redux";
import * as actionTypes from "../../../store/actionTypes";
import * as actionCreators from "../../../store/actionCreators";

class SignIn extends Component {
  state = {
    email: {
      value: null,
    },
    password: {
      value: null,
    },
    buttonClicked: false,
    validation: {
      errorEmail: null,
      errorPassword: null,
    },
    error: false,
    modalIsOpen: false,
  };

  handleChange(event, boxType) {
    switch (boxType) {
      case "email":
        this.setState({ email: { value: event.target.value } });
        break;

      case "password":
        this.setState({ password: { value: event.target.value } });
        break;

      default:
        console.log("No textbox type passed");
        break;
    }
  }

  // buttonClickedHandler > formValidation > login
  buttonClickedHandler = () => {
    console.log('click');
    // Have to do this due to setState taking a while to load
    this.setState({ buttonClicked: true }, () => {
      this.formValidation();
    });
  };

  handleSignInFacebook = () => {

  }

  handleSignInGoogle = () => {
    
  }

  formValidation = () => {
    let errorEmail = null,
      errorPassword = null;

    if (this.state.email.value === null || this.state.email.value === "") {
      errorEmail = "*Field Required !";
    }

    if (
      this.state.password.value === null ||
      this.state.password.value === ""
    ) {
      errorPassword = "*Field Required !";
    }

    this.setState(
      {
        validation: {
          errorEmail: errorEmail,
          errorPassword: errorPassword,
        },
      },
      () => {
        if (
          this.state.validation.errorEmail ||
          this.state.validation.errorPassword
        ) {
          this.setState({ error: true });
        } else {
          this.login();
        }
      }
    );
  };

  async login() {
    let userUrl = null;
    const urlString = document.location.href;
    const subString = urlString.substring(0, urlString.indexOf("/login"));
    if (this.state.buttonClicked) {
      try {
        await firebase.login(this.state.email.value, this.state.password.value);
        userUrl = this.exactString(this.state.email.value);
        await this.props.getInfoAfterLoggedIn(subString, userUrl);
        this.props.authenticateUser();
        this.props.history.push("/profile/" + userUrl);
      } catch (error) {
        alert(error.message);
      }
    }
  }

  exactString = (stringVal) => {
    let subString1 = stringVal.substring(0, stringVal.indexOf("."));
    let subString2 = stringVal.substring(
      stringVal.indexOf(".") + 1,
      stringVal.length
    );
    const exactedString = subString1 + subString2;

    return exactedString;
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
    this.setState({ buttonClicked: true });
  };

  render() {
    const h2Class = [classes.title];

    return (
      <div className={classes.loginContent}>
        <form>
          {/* <img src={avatar} alt="avatar" /> */}
          {/* <h2 className={h2Class}>Sign In</h2> */}
          <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.signInFacebookButton}
              onClick={this.handleSignInFacebook}
              >
              <img src={FacebookIcon} className={classes.iconFacebook} alt="FacebookIcon" />
              Sign In With Facebook
          </Button>
          <Button
              fullWidth
              variant="contained"
              color="default"
              className={classes.signInGoogleButton}
              onClick={this.handleSignInGoogle}
              >
              <img src={GoogleIcon} className={classes.iconGoogle} alt="GoogleIcon" />
              Sign In With Google
          </Button>
          <TextBox
            error={this.state.validation.errorEmail}
            iconClasses="fas fa-envelope"
            textboxName=" Email"
            inputType="text"
            changed={(event) => this.handleChange(event, "email")}
          />
          <TextBox
            error={this.state.validation.errorPassword}
            iconClasses="fas fa-lock"
            // textboxName="Password"
            textboxName="Mật Khẩu"
            inputType="password"
            changed={(event) => this.handleChange(event, "password")}
          />
          <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.signInButton}
              onClick={this.buttonClickedHandler}
              >
              {/* Sign In */}
              Đăng Nhập
          </Button>
          <div className={classes.hoverTextArea}>
            {/* <HoverText innerText="Forgot Your Password ?" path="/retrieve" />
            <HoverText innerText="Sign Up Here" path="/" /> */}
            <HoverText innerText="Quên Mật Khẩu ? Nhấn Vào Đây ?" path="/retrieve" />
            <HoverText innerText="Đăng Ký Tài Khoản" path="/" />
          </div>
          {/* <Button styling="btn1 btnUp" buttonText="Sign Up Here" path="/" /> */}

          <ModalRetrieve
            show={this.state.modalIsOpen}
            closed={this.closeModal}
          />
          <Backdrop show={this.state.modalIsOpen} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // This is unused
    loggedIn: state.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: () => dispatch({ type: actionTypes.AUTHENTICATE }),
    getInfoAfterLoggedIn: (currentPage, userKey) =>
      dispatch(actionCreators.pullInfo(currentPage, userKey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
