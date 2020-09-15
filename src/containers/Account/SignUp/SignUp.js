import React, { Component } from "react";
import classes from "./SignUp.module.css";
import TextBox from "../../../components/UI/TextBox/TextBox";
import HoverText from "../../../components/UI/HoverText/HoverText";
// import Button from "../../../components/UI/Button/Button";
import ModalRetrieve from "../../../components/UI/Modal/ModalRetrieve/ModalRetrieve";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";

import Button from '@material-ui/core/Button';

import firebase from "../../firebase/firebase";

class SignUp extends Component {
  state = {
    email: {
      value: null,
    },
    userName: {
      value: null,
    },
    password: {
      value: null,
    },
    passwordConfirm: {
      value: null,
    },
    validation: {
      errorEmail: null,
      errorUserName: null,
      errorPassword: null,
      errorPasswordConfirm: null,
    },
    error: false,
    userNumber: 2,
    modalIsOpen: false,
    buttonClicked: false,
  };

  handleChange = (event, boxType) => {
    switch (boxType) {
      case "email":
        this.setState({ email: { value: event.target.value } });
        break;
      case "userName":
        this.setState({ userName: { value: event.target.value } });
        break;
      case "password":
        this.setState({ password: { value: event.target.value } });
        break;
      case "passwordConfirm":
        this.setState({ passwordConfirm: { value: event.target.value } });
        break;
      default:
        console.log("No textbox type passed");
        break;
    }
  };

  formValidation() {
    let errorEmail = null,
      errorUserName = null,
      errorPassword = null,
      errorPasswordConfirm = null;

    // email validation:
    if (this.state.email.value === null || this.state.email.value === "") {
      errorEmail = "*Field Required !";
    } else {
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(this.state.email.value) === false) {
        errorEmail = "*Invalid email!";
      }
    }

    if (
      this.state.userName.value === null ||
      this.state.userName.value === ""
    ) {
      errorUserName = "*Field Required !";
    }

    if (
      this.state.password.value === null ||
      this.state.password.value === ""
    ) {
      errorPassword = "*Field Required !";
    }

    if (this.state.password.value !== this.state.passwordConfirm.value) {
      errorPasswordConfirm = "*Password Not Matching";
    } else if (
      this.state.passwordConfirm.value === null ||
      this.state.passwordConfirm.value === ""
    ) {
      errorPasswordConfirm = "*Field Required !";
    }

    // Updating states to store errors
    // There is a lag in setState so have to use the
    // 2nd argument function to execute the next code
    this.setState(
      {
        validation: {
          errorEmail: errorEmail,
          errorUserName: errorUserName,
          errorPassword: errorPassword,
          errorPasswordConfirm: errorPasswordConfirm,
        },
      },
      () => {
        // console.log(this.state.validation);
        if (
          this.state.validation.errorEmail ||
          this.state.validation.errorUserName ||
          this.state.validation.errorPassword ||
          this.state.validation.errorPassword ||
          this.state.validation.errorPasswordConfirm
        ) {
          this.setState({ error: true });
        } else {
          this.registerUser();
        }
      }
    );
  }

  registerClicked = () => {
    this.formValidation();
  };

  async registerUser() {
    const serialNo = `${this.state.email.value[0]}${this.state.email.value[1]}${
      this.state.userNumber + 1
    }`;
    try {
      await firebase.register(
        this.state.email.value,
        this.state.password.value,
        this.state.userName.value
      );
      await firebase.addUser(
        this.state.userName.value,
        this.state.email.value,
        this.state.userNumber + 1,
        serialNo
      );
      await firebase.addUserIndex(this.state.email.value, serialNo);
      firebase.incrementUsers(this.state.userNumber);
      this.sendVerificationEmail();
      this.showModal();
    } catch (error) {
      alert(error.message);
    }
  }

  componentDidMount() {
    firebase.getUserNumber().on("value", (snap) => {
      this.setState({ userNumber: snap.val() });
    });
  }

  onSubmitHandler = () => {
    console.log("Submitted dawg !!");
  };

  sendVerificationEmail = () => {
    const user = firebase.auth.currentUser;
    user
      .sendEmailVerification()
      .then(function () {
        console.log("email sent dawg !");
      })
      .catch(function (error) {
        alert(error);
      });
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, buttonClicked: true });
  };

  /*
    <TextBox
      error={this.state.validation.errorSerialNo}
      iconClasses='fas fa-qrcode'
      textboxName='On-Card Serial Number'
      inputType='text'
      changed={(event) => this.handleChange(event, "serialNo")}
    />
  */

  render() {
    if (this.state.buttonClicked) {
      this.props.history.push("/login");
    }

    return (
      <div className={classes.loginContent}>
        <form onSubmit={this.onSubmitHandler}>
          <TextBox
            error={this.state.validation.errorEmail}
            iconClasses="fas fa-envelope"
            textboxName="Email"
            inputType="email"
            changed={(event) => this.handleChange(event, "email")}
          />
          <TextBox
            error={this.state.validation.errorUserName}
            iconClasses="fas fa-user"
            // textboxName="Username (visible on Profile)"
            textboxName="Tên Người Dùng"
            inputType="text"
            changed={(event) => this.handleChange(event, "userName")}
          />
          <TextBox
            error={this.state.validation.errorPassword}
            iconClasses="fas fa-lock"
            // textboxName="Password"
            textboxName="Mật Khẩu"
            inputType="password"
            changed={(event) => this.handleChange(event, "password")}
          />
          <TextBox
            error={this.state.validation.errorPasswordConfirm}
            iconClasses="fas fa-lock"
            // textboxName="Confirm Your Password"
            textboxName="Xác Nhận Mật Khẩu"
            inputType="password"
            changed={(event) => this.handleChange(event, "passwordConfirm")}
          />
          {/* <Button
            styling="btn1 btnUp"
            buttonText="Create Your Profile"
            clicked={this.registerClicked}
          /> */}
          <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.signUpButton}
              onClick={this.registerClicked}
              >
              {/* Create Your Profile */}
              Đăng Ký
          </Button>
          <div className={classes.hoverTextArea}>
            {/* <HoverText innerText="Return to Sign in." path="/login" /> */}
            <HoverText innerText="Đăng Nhập" path="/login" />
          </div>
        </form>
        <ModalRetrieve
          show={this.state.modalIsOpen}
          closed={this.closeModal}
          h3text="Register Successfully."
          h3text2="Please Check Your Email For Account Verification !"
          // buttonName="Go To Sign in"
          buttonName="Đăng Nhập"
        />
        <Backdrop show={this.state.modalIsOpen} />
      </div>
    );
  }
}

export default SignUp;
