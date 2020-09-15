import React from "react";
import classes from "./HoverText.module.css";

const hoverText = (props) => {
  return (
    <a href={props.path} className={classes.a}>
      {props.innerText}
    </a>
  );
};

export default hoverText;
