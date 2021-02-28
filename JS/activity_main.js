import  "sign_in.js";
  var user = firebase.auth().currentUser;
  if (user == null) {
      window.location.replace("./");
  }
  else{

  }
