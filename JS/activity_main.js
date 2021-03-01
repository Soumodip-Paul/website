<<<<<<< HEAD
  window.onload = function() {
    try {
      var url_string = (window.location.href).toLowerCase();
      var url = new URL(url_string);
      var uid = url.searchParams.get("uid");
      var redirect = url.searchParams.get("redirect");
      var post = url.searchParams.get("post");
      if (redirect != 1) {
        window.location.replace("./");
      }
      document.getElementById("logout").href = "logout.html?uid="+uid;
      console.log(redirect+ " and "+uid+ " and "+post);
    } catch (err) {
      console.log("Issues with Parsing URL Parameter's - " + err);
    }
}
=======
import { user } from "sign_in.js";
import { firebaseConfig } from "sign_in.js";

  if (user == null) {
      window.location.replace("./");
  }
  else {
    document.getElementById("go").innerHTML=user.displayName;
  }
>>>>>>> b1d7c0c5d015ac1ca3a8801992df287214e39237
