import * as actionTypes from "./actionTypes";
import user from "../assets/header/user.svg";

const initialState = {
  authenticated: false,
  userInfo: {
    avatarImg: user,
    avatarURL: "",
    email: "userloggedin@gmail.com",
    fullName: "On Card",
    bio: "Bio",
    viewPage: "localhost:3000/view",
    socialMediaList: [
      //   {
      //     title: null,
      //     icon: null,
      //     url: null,
      //   },
    ],
  },
};

const reducer = (state = initialState, action) => {
  // Doesn't need break here cause return already do the work
  switch (action.type) {
    //Login buttons
    case actionTypes.AUTHENTICATE:
      console.log("authenticated");
      const newState = Object.assign({}, state);
      newState.authenticated = true;
      return newState;

    // Logout buttons
    case actionTypes.UNAUTHENTICATE:
      console.log("unauthenticated");
      return {
        ...state,
        authenticated: false,
      };

    // EditPage in UI/UploadImage
    case actionTypes.IMAGEUPDATE:
      return {
        ...state,
        userInfo: {
          avatarImg: action.imageLoaded,
          avatarURL: action.imageURL,
          email: state.userInfo.email,
          fullName: state.userInfo.fullName,
          bio: state.userInfo.bio,
          viewPage: state.userInfo.viewPage,
          socialMediaList: state.userInfo.socialMediaList,
        },
      };

    // Updating full name and bio
    case actionTypes.UPDATEFULLNAMEANDBIO:
      return {
        ...state,
        userInfo: {
          avatarImg: state.userInfo.avatarImg,
          avatarURL: state.userInfo.avatarURL,
          email: state.userInfo.email,
          fullName: action.valFullName,
          bio: action.valBio,
          viewPage: state.userInfo.viewPage,
          socialMediaList: state.userInfo.socialMediaList,
        },
      };

    // Updating social media list, one object example:
    // {title: "Phone Number", icon: "phoneNumber", url: '416-518-4556'}
    case actionTypes.UPDATESOCIALMEDIA:
      return {
        ...state,
        userInfo: {
          avatarImg: state.userInfo.avatarImg,
          avatarURL: state.userInfo.avatarURL,
          email: state.userInfo.email,
          fullName: state.userInfo.fullName,
          bio: state.userInfo.bio,
          viewPage: state.userInfo.viewPage,
          socialMediaList: action.socialMediaListValue,
        },
      };

    case actionTypes.PULLINFO:
      return {
        ...state,
        userInfo: {
          avatarImg: state.userInfo.avatarImg,
          avatarURL: action.avatarURL,
          email: action.email,
          fullName: action.fullName,
          bio: action.bio,
          viewPage: action.viewPage,
          socialMediaList: action.socialMediaList,
        },
      };

    case actionTypes.PULLINFOVIEW:
      return {
        ...state,
        userInfo: {
          avatarImg: action.avatarURL,
          avatarURL: action.avatarURL,
          email: action.email,
          fullName: action.fullName,
          bio: action.bio,
          socialMediaList: action.socialMediaList,
        },
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        authenticated: false,
        userInfo: {
          avatarImg: user,
          avatarURL: "",
          email: "userloggedin@gmail.com",
          fullName: "On Card",
          bio: "Bio",
          viewPage: "localhost:3000/view",
          socialMediaList: [
            //   {
            //     title: null,
            //     icon: null,
            //     url: null,
            //   },
          ],
        },
      };

    default:
      return state;
  }
};

export default reducer;
