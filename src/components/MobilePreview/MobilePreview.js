import React, { Component } from "react";
import classes from "./MobilePreview.module.css";
import LinkBoxEdit from "../../components/Boxes/LinkBox/LinkBoxEdit/LinkBoxEdit";
import UploadImage from '../UI/UploadImage/UploadImage';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";

class MobilePreviewSocical extends Component {

    state = {
        modalIsOpen: false,
        modalRetrieveIsOpen: false,
        email: "trung28899@gmail.com",
        socialMediaList: this.props.accountList,
    };

    handleEdit = () => {
        // this.props.history.replace("/profile/edit");
    }

  render() {
    let listItems = null;

    if (this.state.socialMediaList) {
      listItems = this.state.socialMediaList.map((value, index) => {
        return (
          <LinkBoxEdit
            key={index}
            content={value.title}
            iconType={value.icon}
            forMobile={true}
          />
        );
      });
    }

    return (
      <div className={classes.mobileSocialMediaList}>
        <Typography className={classes.moblieToolBar}>
            <span className={classes.moblietitle}>Flowpage Preview</span>
            <Button
                variant="contained"
                color="primary"
                className={classes.editButton}
                onClick={this.handleEdit}
                >
                Edit
            </Button>
        </Typography>
        <br />
        <div className={classes.previewPhoneArea}>
          <UploadImage uploadAvatar={false}/>
          {listItems}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataObject: state,
    accountList: state.userInfo.socialMediaList
      ? state.userInfo.socialMediaList
      : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFullNameBio: (fullName, bio) =>
      dispatch({
        type: actionTypes.UPDATEFULLNAMEANDBIO,
        valFullName: fullName,
        valBio: bio,
      }),
    updateSocialMediaList: (accountList) =>
      dispatch({
        type: actionTypes.UPDATESOCIALMEDIA,
        socialMediaListValue: accountList,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobilePreviewSocical);
