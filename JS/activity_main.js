import { user } from "sign_in.js";
import { firebaseConfig } from "sign_in.js";
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
  if (user == null) {
      window.location.replace("./");
  }
  else {
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  var collectionReferrance = db.collection("users");
  const entryUser = {
    UserName: user.displayNmae,
    uid: user.uid,
    email = user.email,
    photoUrl = user.photoURL
  };

  collectionReferrance.doc(user.uid).set(entryUser).then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});
  }