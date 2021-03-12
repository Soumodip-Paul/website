// This web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var redirectCount =0;
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
  // Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
  function googleSignIn() {
      
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider).then((result) => {
    redirectCount=1;
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
    redirectCount=0;
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
    window.location.replace("./");
  }).catch((error) => {
    // An error happened.
    console.error(error);
  });
}
  
function getCurrentUser(){
    return firebase.auth().currentUser;
}
var uiConfig = {
  callbacks: {
  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
  // User successfully signed in.
  // Return type determines whether we continue the redirect automatically
  // or whether we leave that to developer to handle.
  redirectCount =1;
  authPassword(authResult);
  return false;
},
uiShown: function() {
// The widget is rendered.
// Hide the loader.
  document.getElementById('loader').style.display = 'none';
  }
},
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'redirect',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };
  // The start method will wait until the DOM is loaded.
  $(function() {if(document.getElementById("firebaseui-auth-container")!=null){ui.start('#firebaseui-auth-container', uiConfig);}});
  //if(document.getElementById("firebaseui-auth-container")!=null){ui.start('#firebaseui-auth-container', uiConfig);}
   export { googleSignIn, signOut , getCurrentUser , ui};

   function login(email,password) {
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
   function takePassword(authResult,password) {
      var uid = authResult.user.uid;
      var user = authResult.user;
      var db = firebase.firestore();
      var collectionReferrance = db.collection("users");
      const entryUser = {
      UserName: user.displayName,
      uid: uid,
      email: user.email,
      photoUrl: user.photoURL,
      password : password
}

var user1 = firebase.auth().currentUser;
var newPassword = password;

user1.updatePassword(newPassword).then(function() {
  // Update successful.
  console.log("success");
  collectionReferrance.doc(user.uid).set(entryUser).then(() => {
  console.log("Document successfully written!");
  redirectCount=0;
  window.location.replace("./mysite.html?uid="+user.uid+"&redirect=1");
})
.catch((error) => {
  console.error("Error writing document: ", error);
  redirectCount=0;
});
}).catch(function(error) {
  // An error happened.
  redirectCount=0;
});

}
$("#login").click(function () {if(firebase.auth().currentUser==null){
  login($('#login_email').val(),$('#password').val());}
});
function authPassword(authResult) {
  console.log(authResult)
    $('#email').empty();
    $('#email').append("<legend>Password</legend><input type=\"password\" name=\"password\" id=\"password\" />");
    $('#pword').empty();
    $('#pword').append("<legend>Confirm Password</legend><input type=\"password\" name=\"confirm password\" id=\"confirm-password\"/>");
    $('#login').text("Save Password")
    $('#login').click(function () {
    if ($("#password").val()==$("#confirm-password").val()) {
        takePassword(authResult,$('#password').val());
        }
    });
}