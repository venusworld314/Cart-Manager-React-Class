import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import waveImg from "../../assets/wave.png";
import background from "../../assets/bg.svg";
import flagEngland from '../../assets/flag/flag_enlish.png'
import flagVietnam from '../../assets/flag/flag_vietnam.png'
import classes from "./Account.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import RetrieveAccount from "./RetrieveAccount/RetrieveAccount";

function Account() {
    const location = useLocation();

    const [optionEn, setOptionEn] = useState(false);
    const [optionVietnam, setOptionVietnam] = useState(true);

    const handleEnOption = () => {
      setOptionEn(true);
      setOptionVietnam(false);
    }

    const handleVietOption = () => {
      setOptionEn(false);
      setOptionVietnam(true);
    }

    return (
      <div className={classes.container}>
        <div className={classes.accountTopBar}>
          <div classeName={classes.languageOption}>
            <ButtonGroup size="large" color="primary" className={classes.langOptionButtonGroup}>
              <Button className={optionEn ? classes.langOptionButtonClicked : classes.langOptionButton} onClick={handleEnOption}>
                <img className={classes.flagEngland} src={flagEngland} alt="flagEngland"></img>English
              </Button>
              <Button className={optionVietnam? classes.langOptionButtonClicked : classes.langOptionButton} onClick={handleVietOption}>
                <img className={classes.flagVietnam} src={flagVietnam} alt="flagVietnam"></img>Vietnamese
              </Button>
            </ButtonGroup>
          </div>
          <h5>
            <b>
            {/* {location.pathname.includes('login') ? 'Sign In to your account' : 
              location.pathname.includes('retrieve') ? 'Enter your email to receive a password reset link' : 'Create Your On-Card'} */}
            {location.pathname.includes('login') ? 'Đăng Nhập Tài Khoản On-Card Của Bạn' : 
              location.pathname.includes('retrieve') ? 'Enter your email to receive a password reset link' : 'Tạo Tài Khoản On-Card Của Bạn'}
            </b>
          </h5>
        </div>
        <Switch>
          <Route path='/retrieve' component={RetrieveAccount} />
          <Route path='/login' component={SignIn} />
          <Route path='/loading' component={Spinner} />
          <Route path='/' component={SignUp} />
        </Switch>
      </div>
    );
}

export default Account;
