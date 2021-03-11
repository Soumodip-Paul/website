$(function(){
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
});
function writeList(name_val,id_val) {
    return `${name_val}:  <i> ${id_val} </i><br/><br/> `;
  }
  