import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCNmhvwnxlbzgVcw0_XRC9KmcjYWWIZqnU",
  authDomain: "on-card.firebaseapp.com",
  databaseURL: "https://on-card.firebaseio.com",
  projectId: "on-card",
  storageBucket: "on-card.appspot.com",
  messagingSenderId: "149717466426",
  appId: "1:149717466426:web:39f4624ef948ffd10ba403",
  measurementId: "G-T76H1DZ38B",
};

function exactString(stringVal) {
  let subString1 = stringVal.substring(0, stringVal.indexOf("."));
  let subString2 = stringVal.substring(
    stringVal.indexOf(".") + 1,
    stringVal.length
  );
  const exactedString = subString1 + subString2;

  return exactedString;
}

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.dataBase = firebase.database();
    this.storage = firebase.storage();
  }

  async login(email, password) {
    console.log(`Email here: ${email}`);
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(email, password, userName) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: userName,
    });
  }

  addUser(userName, email, userNumber, userNo) {
    const keyString = exactString(email);
    return this.dataBase.ref("users/" + keyString).set({
      email: email,
      userName: userName,
      userNum: userNumber,
      userURL: userNo,
      bio: "Your Bio",
      avatarURL: "",
      socialMediaList: [],
    });
  }

  addUserIndex(email, userNo) {
    const keyString = exactString(email);
    return this.dataBase.ref("indexingUsers/" + userNo).set({
      email: keyString,
    });
  }

  updateImage(imageObject, imageName, userEmail) {
    // console.log(imageObject);
    return this.storage
      .ref(`images/${userEmail}/${imageName}`)
      .put(imageObject);
  }

  incrementUsers(userNumber) {
    const incre = userNumber + 1;
    return this.dataBase.ref("userNumber/").set({
      userAmount: incre,
    });
  }

  updateData(dataObject, userEmail) {
    return this.dataBase.ref("users/" + userEmail).update({
      email: dataObject.userInfo.email,
      userName: dataObject.userInfo.fullName,
      bio: dataObject.userInfo.bio,
      avatarURL: dataObject.userInfo.avatarURL,
      socialMediaList: dataObject.userInfo.socialMediaList,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getKeyStringByIndex(indexString) {
    try {
      return this.dataBase
        .ref()
        .child("indexingUsers/" + indexString + "/email");
    } catch (error) {
      alert(
        "Page Not Existed ! Please Re-Add your URL reference in your Edit Page"
      );
    }
  }

  getUserNumber() {
    return this.dataBase.ref().child("userNumber/userAmount");
  }

  getRealtimeInfo(userKey) {
    return this.dataBase.ref().child("users/" + userKey);
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}

export default new Firebase();
