import React, { Component } from "react";
import classes from "./SimpleTextBox.module.css";

class Modal extends Component {
  updateInput = (event) => {
    this.props.urlEntered(event.target.value);
  };

  render() {
    let cssClasses = [classes.input];

    return (
      <input
        type="text"
        placeholder={this.props.textHolder}
        className={cssClasses}
        onChange={(event) => this.updateInput(event)}
      ></input>
    );
  }
}

export default Modal;
