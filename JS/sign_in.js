
 import { googleSignIn, signOut , getCurrentUser} from "./firebase.js";
  
  function getUser(){
    return getCurrentUser();
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