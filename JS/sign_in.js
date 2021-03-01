
 import { googleSignIn, signOut , getCurrentUser} from "./firebase.js";
  
  function getUser(){
    return getCurrentUser();
  }

 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAPlG2Zqw3-qLXstp5exVu1Y3-lGfQloI8",
    authDomain: "spsocialapp.firebaseapp.com",
    projectId: "spsocialapp",
    storageBucket: "spsocialapp.appspot.com",
    messagingSenderId: "781271197094",
    appId: "1:781271197094:web:08478aa3523f4393315b67",
    measurementId: "G-Q68122N52H"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
 
  
  function onSignInButtonClick() {
    var user = firebase.auth().currentUser;
    if (user != null) {
      // User is signed in.
      signOut();
      user = getCurrentUser();
      console.log(user);
    } else {
      // No user is signed in.
      googleSignIn();
      user = getCurrentUser();
      console.log(user);
      
    }   
  }
  // find auth button 
  const auth = document.getElementById("auth");
  if(auth != null){
    auth.addEventListener("click",onSignInButtonClick);
  }

const deauth = document.getElementById("deauth");
  if(deauth != null){
    auth.addEventListener("click",signOut);
    window.location.replace("./")
  }