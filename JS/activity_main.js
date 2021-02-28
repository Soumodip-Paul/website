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

  var user = firebase.auth().currentUser;
  if (user == null) {
      window.location.replace("./index.html");
  }
  else{

  }
