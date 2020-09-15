import React, { Component } from "react";
import classes from "./ModalRetrieve.module.css";
import Spinner from "../../Spinner/Spinner";

class ModalRetrieve extends Component {
  state = {
    itemsShowing: (
      <div>
        <Spinner />
        <h5
          style={{
            position: "relative",
            alignItems: "center",
            fontSize: "1.5rem",
          }}
        >
          Please wait...
        </h5>
      </div>
    ),
  };

  handleClick = () => {
    console.log("clicked");
  };

  componentDidUpdate() {
    const verifiedContent = (
      <div>
        <p className={classes.closeButton} onClick={this.props.closed}>
          x
        </p>
        <h3>
          {" "}
          {this.props.h3text} {this.props.email} <br />
          {this.props.h3text2}
        </h3>
        <button
          type="button"
          className={classes.Button}
          onClick={this.props.closed}
        >
          {this.props.buttonName}
        </button>
      </div>
    );
    if (this.props.show) {
      setTimeout(() => {
        this.setState({ itemsShowing: verifiedContent });
      }, 3000);
    }
  }

  render() {
    const cssClasses = [
      classes.Modal,
      this.props.show ? classes.ModalOpen : classes.ModalClosed,
    ];

    return (
      <div className={cssClasses.join(" ")}>{this.state.itemsShowing}</div>
    );
  }
}

export default ModalRetrieve;
