
 import { googleSignIn, signOut , getCurrentUser} from "./firebase.js";
  
  function getUser(){
    return getCurrentUser();
  }
  
 
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
  // find deauth button 
  const deauth = document.getElementById("deauth");
  if(deauth != null){
    deauth.addEventListener("click",signOut);
  }
var indexPage = window.location.pathname;
console.log(indexPage);