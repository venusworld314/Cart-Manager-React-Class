import React from 'react';
import { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import flagEngland from '../../assets/flag/flag_enlish.png'
import flagVietnam from '../../assets/flag/flag_vietnam.png'
import classes from './AppBar.module.css';

import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";

class AppNavBar extends Component {
    state = {
        anchorEl : null,
        location: '',
        menuOptionOne: '',
        menuOptionTwo: '',
        menuOptionThree: '',
    };

    handleProfileMenuOpen = (event) => {
        this.setState({anchorEl: event.currentTarget});

        let location = window.location.href;
        this.setState({location: location});

        if (location.includes('profile') && !location.includes('edit')) {
            this.setState({
                menuOptionOne: 'English',
                menuOptionTwo: 'Vietnam',
                menuOptionThree: 'Đăng Xuất',
            });
        } else if (location.includes('edit')) {
            this.setState({
                menuOptionOne: 'English',
                menuOptionTwo: 'Vietnam',
                menuOptionThree: 'Đăng Xuất',
            });
        } else if (location.includes('view')) {
            this.setState({
                // menuOptionOne: 'Sign In',
                // menuOptionTwo: 'Sign Up',
                menuOptionOne: 'Đăng Nhập',
                menuOptionTwo: 'Đăng Ký',
            });
        }
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
    };

    handleAccountMenu = () => {
        if (this.state.location.includes('profile') && !this.state.location.includes('edit')) {
            // this.props.history.replace("/profile");
        } else if (this.state.location.includes('edit')) {
            // this.props.history.replace("/view");
        } else if (this.state.location.includes('view')) {
            // this.props.history.replace("/profile");
        }
        this.handleMenuClose();
    }

    handleLogout = () => {
        if (this.state.location.includes('profile') && !this.state.location.includes('edit')) {
            this.props.unauthenticateUser();
            this.props.logOutResetStore();
        } else if (this.state.location.includes('edit')) {
            this.props.unauthenticateUser();
            this.props.logOutResetStore();
        } else if (this.state.location.includes('view')) {
            // this.props.history.replace("/profile");
        }
        // this.props.history.replace("/login");
        this.handleMenuClose();
    }

    render() {
        const isMenuOpen = Boolean(this.state.anchorEl);
        
        const menuId = 'primary-search-account-menu';
        const renderMenu = (
            <Menu
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                className={classes.renderMenu}
                onClose={this.handleMenuClose}
                >
                <MenuItem onClick={this.handleAccountMenu}>
                    {
                    this.state.menuOptionOne === 'English' ? <img className={classes.flagEngland} src={flagEngland} alt="flagEngland"></img> : null
                    }
                    {this.state.menuOptionOne}
                </MenuItem>
                <MenuItem onClick={this.handleAccountMenu}>
                    {
                    this.state.menuOptionTwo === 'Vietnam' ? <img className={classes.flagVietnam} src={flagVietnam} alt="flagVietnam"></img> : null
                    }
                    {this.state.menuOptionTwo}
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>
                    {this.state.menuOptionThree}
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.grow}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* <Typography className={classes.mainPageTab} noWrap>
                        Your Page
                    </Typography>
                    <Typography className={classes.analyticPageTab} noWrap>
                        Analytic
                    </Typography> */}
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Typography 
                            className={classes.accountIconArea} 
                            onClick={this.handleProfileMenuOpen}
                            noWrap>
                            <span className={classes.accountIconLabel}>My Profile</span>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                color="inherit"
                                >
                                <AccountCircle />
                            </IconButton>
                        </Typography>
                    </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authenticated,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      // This is unused
      authenticateUser: () => dispatch({ type: actionTypes.AUTHENTICATE }),
      unauthenticateUser: () => dispatch({ type: actionTypes.UNAUTHENTICATE }),
      logOutResetStore: () => dispatch({ type: actionTypes.LOGOUT }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);