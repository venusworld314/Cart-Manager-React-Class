import React from "react";
import classes from "./Logo.module.css";

/**
 * @author
 * @function Logo
 **/

const Logo = (props) => {
  return (
    <div className={classes.logo}>
      <p>{props.content}</p>
    </div>
  );
};

export default Logo;
