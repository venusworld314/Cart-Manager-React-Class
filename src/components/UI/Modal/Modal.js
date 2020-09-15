import React, { Component } from "react";
import classes from "./Modal.module.css";
import DropDownList from "../DropDownList/DropDownList";
import SimpleTextBox from "../TextBox/SimpleTextBox/SimpleTextBox";

class Modal extends Component {
  state = {
    accountType: null,
    url: null,
  };

  handleClick = () => {
    if (!this.state.url) {
      alert("Please enter url to add your account !");
    } else {
      this.props.clicked(this.state.accountType, this.state.url);
    }
  };

  accountTypeChosen = (dataFromChild) => {
    this.setState({ accountType: dataFromChild });
  };

  getUrl = (dataFromChild) => {
    this.setState({ url: dataFromChild });
  };

  render() {
    const cssClasses = [
      classes.Modal,
      this.props.show ? classes.ModalOpen : classes.ModalClosed,
    ];
    return (
      <div className={cssClasses.join(" ")}>
        <p className={classes.closeButton} onClick={this.props.closed}>
          x
        </p>
        <h3>
          {" "}
          {this.props.h3text} {this.props.email} <br />
          {this.props.h3text2}
        </h3>
        <DropDownList optionChosen={this.accountTypeChosen} />
        <SimpleTextBox
          urlEntered={this.getUrl}
          textHolder="Enter URL / Phone Number"
        />
        <button
          type="button"
          className={classes.Button}
          onClick={this.handleClick}
        >
          {this.props.buttonName}
        </button>
      </div>
    );
  }
}

export default Modal;
