// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
    // User successfully signed in.
    // Return type determines whether we continue the redirect automatically
    // or whether we leave that to developer to handle.
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
      window.location.replace("./mysite.html?uid="+user.uid+"&redirect=1");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    }).catch(function(error) {
      // An error happened.
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
    $("#login").click(function () {if(firebase.auth().currentUser==null){
      login($('#login_email').val(),$('#password').val());}
    });