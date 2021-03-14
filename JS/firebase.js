// This web app's Firebase configuration
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
  
  function googleSignIn() {
      
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider).then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    document.getElementById("auth").innerHTML = user.displayName;
    authPassword(result);
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.error(error);
  });
  }

function signOut() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    var auth = document.getElementById("auth");
    if (auth!=null) {
    auth.innerHTML = "Sign In";
    }
    if (typeof(Storage)!=="undefined") {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
    window.location.replace("./");
  }).catch((error) => {
    // An error happened.
    console.error(error);
  });
}
  
function getCurrentUser(){
    return firebase.auth().currentUser;
}
export { googleSignIn, signOut , getCurrentUser };

   function login(email,password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      saveCredentials(email,password)
      window.location.replace(`./mysite.html?uid=${user.uid}&redirect=1`);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode,errorMessage);
    });
   }
var e1 = document.getElementById("login");
if (e1!=null) {
  
  e1.addEventListener('click',function(){
  console.log("called")
  var email = document.getElementById("login_email").value;
  var pass  = document.getElementById("password").value;
  login(email,pass)});
}
function saveCredentials(email,password) {
  if (typeof(Storage)!=="undefined") {
    localStorage.setItem("email",email);
    localStorage.setItem("password",password);
  }
}
function autoLogin(email,password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.location.replace(`./mysite.html?uid=${user.uid}&redirect=1`);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode,errorMessage);
    });
}
window.onload = function(){
if (typeof(Storage)!=="undefined") {
  var login_email = localStorage.getItem("email");
  var login_pass = localStorage.getItem("password");
  var pathname = (window.location.pathname=='/');
  console.log(login_email,login_pass,pathname);
  if (login_email&&login_pass&&pathname) {
    autoLogin(login_email,login_pass);
  }
}
};