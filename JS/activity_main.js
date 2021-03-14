  window.onload = function() {
    try {
      var url_string = (window.location.href).toLowerCase();
      var url = new URL(url_string);
      var uid = url.searchParams.get("uid");
      var redirect = url.searchParams.get("redirect");
      var post = url.searchParams.get("post");
      $("#logout").href = "logout.html";
      console.log(redirect+ " and "+uid+ " and "+post);
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          // ...
          console.log(user);
        } else {
          // User is signed out.
          // ...
          window.location.replace("./");
        }
      });
    } catch (err) {
      console.log("Issues with Parsing URL Parameter's - " + err);
    }
     
// db.collection("posts").doc("wxwa9qWbdls3snKsGyt3")
//     .onSnapshot((doc) => {
//         console.log("Current data: ", doc.data());
//     });

}
