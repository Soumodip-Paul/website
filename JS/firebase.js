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
  // Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
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
      
    var db = firebase.firestore();
    var collectionReferrance = db.collection("users");
    const entryUser = {
    UserName: user.displayName,
    uid: user.uid,
    email: user.email,
    photoUrl: user.photoURL
  };

  collectionReferrance.doc(user.uid).set(entryUser).then(() => {
    console.log("Document successfully written!");
    window.location.replace("./mysite.html?uid="+user.uid+"&redirect=1");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});
  
      
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
        console.log(authResult)
        var user = authResult.user;
        var db = firebase.firestore();
        var collectionReferrance = db.collection("users");
        const entryUser = {
        UserName: user.displayName,
        uid: user.uid,
        email: user.email,
        photoUrl: user.photoURL
  }
  collectionReferrance.doc(user.uid).set(entryUser).then(() => {
    console.log("Document successfully written!");
    window.location.replace("./mysite.html?uid="+user.uid+"&redirect=1");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});

        return false;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };
  // The start method will wait until the DOM is loaded.
  if(document.getElementById("firebaseui-auth-container")!=null){ui.start('#firebaseui-auth-container', uiConfig);}
   export { googleSignIn, signOut , getCurrentUser , ui};