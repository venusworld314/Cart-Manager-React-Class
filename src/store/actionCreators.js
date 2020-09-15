import * as actionTypes from "./actionTypes";
import firebase from "../containers/firebase/firebase";

export const saveInfo = (currentPage, firebaseInfo) => {
  try {
    return {
      type: actionTypes.PULLINFO,
      fullName: firebaseInfo.userName,
      email: firebaseInfo.email,
      bio: firebaseInfo.bio,
      viewPage: currentPage + "/" + "view/" + firebaseInfo.userURL,
      socialMediaList: firebaseInfo.socialMediaList,
      avatarURL: firebaseInfo.avatarURL,
    };
  } catch (error) {
    alert(
      "Unable to load this page. Either try it again or this page is not existed"
    );
  }
};

export const pullInfo = (currentPage, userKey) => {
  return (dispatch) => {
    setTimeout(() => {
      let firebaseInfo = null;
      firebase.getRealtimeInfo(userKey).on("value", (snap) => {
        firebaseInfo = snap.val();
        dispatch(saveInfo(currentPage, firebaseInfo));
      });
    }, 100);
  };
};

export const saveInfoView = (firebaseInfo) => {
  try {
    return {
      type: actionTypes.PULLINFOVIEW,
      fullName: firebaseInfo.userName,
      email: firebaseInfo.email,
      bio: firebaseInfo.bio,
      socialMediaList: firebaseInfo.socialMediaList,
      avatarURL: firebaseInfo.avatarURL,
    };
  } catch (error) {
    alert(
      "Unable to load this page. Either try it again or this page is not existed"
    );
  }
};

export const pullInfoView = (userKey) => {
  return (dispatch) => {
    setTimeout(() => {
      let firebaseInfo = null;
      firebase.getRealtimeInfo(userKey).on("value", (snap) => {
        firebaseInfo = snap.val();
        dispatch(saveInfoView(firebaseInfo));
      });
    }, 100);
  };
};
