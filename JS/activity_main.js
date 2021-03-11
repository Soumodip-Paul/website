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
      $("#logout").href = "logout.html?uid="+uid;
      console.log(redirect+ " and "+uid+ " and "+post);
    } catch (err) {
      console.log("Issues with Parsing URL Parameter's - " + err);
    }
     
// db.collection("posts").doc("wxwa9qWbdls3snKsGyt3")
//     .onSnapshot((doc) => {
//         console.log("Current data: ", doc.data());
//     });

}
