import React, { Component } from "react";
import classes from "./BasicInfo.module.css";
import UploadImage from '../UI/UploadImage/UploadImage';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";

class BasicInfo extends Component {
  state = {
    fullname: this.props.userName,
    bio: this.props.bioVal,
    description: '',
    email: '',
    text: '',
    call: '',
    location: '',
    switchChecked: true,
  };

  handleChange(event, boxType) {
    switch (boxType) {
      case "fullname":
        this.setState({ fullname: event.target.value }, () => {
          this.props.updateFullNameBio(this.state.fullname, this.state.bio);
        });
        break;

      case "bio":
        this.setState({ bio: event.target.value }, () => {
          this.props.updateFullNameBio(this.state.fullname, this.state.bio);
        });
        break;

      default:
        console.log("No textbox type passed");
        break;
    }
  }

  handleClick = (fullName, bio) => {
    this.props.updateFullNameBio(fullName, bio);
  };

  handleCheck = (e) => {
    // console.log(e.target.checked);
    // this.setState({Checked: e.target.checked});
    this.setState({switchChecked: e.target.checked});
  };
  
  handleDownload = () => {

  }

  render() {
    // switch component
    const IOSSwitch = withStyles((theme) => ({
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
      },
      switchBase: {
        padding: 1,
        '&$checked': {
          transform: 'translateX(16px)',
          color: theme.palette.common.white,
          '& + $track': {
            backgroundColor: '#52d869',
            opacity: 1,
            border: 'none',
          },
        },
        '&$focusVisible $thumb': {
          color: '#52d869',
          border: '6px solid #fff',
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
      },
      checked: {},
      focusVisible: {},
    }))(({ classes, ...props }) => {
      return (
        <Switch
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
          {...props}
        />
      );
    });

    return (
      <div className={classes.BasicInfo}>
        <div className={classes.BasicInfoMain}>
          <UploadImage uploadAvatar={true}/>
          <List component="nav">
            <ListItem>
              <Typography className={classes.label} noWrap>
                  Name
              </Typography>
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                id="outlined-name-small"
                placeholder="Name"
                variant="outlined"
                size="small"
                className={classes.textField}
                onChange={(event) => this.handleChange(event, "fullname")}
              />
            </ListItem>
            <ListItem>
                <Typography className={classes.label} noWrap>
                    Bio
                </Typography>
            </ListItem>
            <ListItem>
                <TextareaAutosize
                  rowsMax={6}
                  aria-label="maximum height"
                  placeholder="Maximum 4 rows"
                  placeholder="Bio"
                  className={classes.textArea}
                  onChange={(event) => this.handleChange(event, "description")}
                />
            </ListItem>
            <ListItem>
              <Typography className={classes.titleContact}>
                Contact Methods
              </Typography>
            </ListItem>
            <ListItem>
              <Typography className={classes.descContact}>
                This allows visitors of your Flowpage to contact you
              </Typography>
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                id="outlined-email-small"
                placeholder="Email"
                variant="outlined"
                size="small"
                className={classes.textField}
                onChange={(event) => this.handleChange(event, "email")}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                id="outlined-text-small"
                placeholder="Text"
                variant="outlined"
                size="small"
                className={classes.textField}
                onChange={(event) => this.handleChange(event, "text")}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                id="outlined-call-small"
                placeholder="Call"
                variant="outlined"
                size="small"
                className={classes.textField}
                onChange={(event) => this.handleChange(event, "Call")}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                id="outlined-location-small"
                placeholder="Location"
                variant="outlined"
                size="small"
                className={classes.textField}
                onChange={(event) => this.handleChange(event, "location")}
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                control={<IOSSwitch checked={this.state.switchChecked} />}
                label="Allow your Flowpage viewers to download your virtual contact card"
                onChange={(event) => this.handleCheck(event)}
                name='downloadChecked'
              />
            </ListItem>
            <ListItem>
              <div className={classes.downloadArea}>
                <div className={classes.downloadAreaMain}>
                  <List component="nav">
                    <ListItem className={classes.downloadListItem}>
                      <Typography className={classes.donwloadTitle}>
                        Your Flowcode
                      </Typography>
                    </ListItem>
                    <ListItem className={classes.downloadListItem}>
                      <Typography className={classes.downloadDesc}>
                        When someone scans your Flowcode with their phones camera, they will be taken directly to your Flowpage.
                      </Typography>
                    </ListItem>
                    <ListItem className={classes.downloadListItem}>
                      <Typography className={classes.downloadHref}>
                        Learn more about Flowcodes.
                      </Typography>
                    </ListItem>
                    {/* <ListItem className={classes.downloadListItem}>
                      <UploadImage />
                    </ListItem> */}
                    <ListItem className={classes.downloadListItem}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.donwloadButton}
                        onClick={this.handleDownload}
                        >
                        DownLoad
                      </Button>
                    </ListItem>
                  </List>
                </div>
              </div>
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.userInfo.fullName,
    bioVal: state.userInfo.bio,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
