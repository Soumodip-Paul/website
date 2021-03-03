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
    var db = firebase.firestore();
    db.collection("posts").get().then((querySnapshot) => {
      var list="";
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().text}`);
          var name_val = doc.data().createdBy.UserName;
          var id_val = doc.data().text;
          list+= writeList(name_val,id_val);
        });
        $("#post").append(list);
  });
  
// db.collection("posts").doc("wxwa9qWbdls3snKsGyt3")
//     .onSnapshot((doc) => {
//         console.log("Current data: ", doc.data());
//     });

}

function writeList(name_val,id_val) {
  return `${name_val}:  <i> ${id_val} </i><br/><br/> `;
}
