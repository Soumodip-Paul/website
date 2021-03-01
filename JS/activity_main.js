import {getUser} from "./sign_in.js";

  if (getUser() == null) {
      // window.location.replace("./");
  }
  else {
    document.getElementById("go").innerHTML=getUser().displayName;
  }