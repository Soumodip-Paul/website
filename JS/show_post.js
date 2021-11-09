$(function(){
    var db = firebase.firestore();
    db.collection("posts").orderBy("createdAt","desc").onSnapshot((querySnapshot) => {
      var list="<div id=\"post\" >";
      querySnapshot.forEach((doc) => {
          
          console.log(`${doc.id} => ${doc.data().text}`);
          var name_val = doc.data().createdBy.UserName;
          var id_val = doc.data().text;
          list+= createCard(doc.data());
          
        });
        list+="</div>";
        $("#post").replaceWith(list);
        list = "";
  });
});
function writeList(name_val,id_val) {
  return `${name_val}:  <i> ${id_val} </i><br/><br/> `;
}
function  createCard(docData){
  return ` <div class="card"><div class="name"><img src="${docData.createdBy.imageUri}" alt="user image" height="33em" width="33em">
  <span class="postuser"> ${docData.createdBy.UserName}</span></div>
  <p class="post">${docData.text}</p>
  <div class="statusbar"><i class='liked'>Liked By: ${docData.likedBy.length}</i><span class='comment'>Comments: ${docData.commentedBy.length}</span></div></div>`;
}
$(function(){ 
$("div.fab").click(
  function(){var image = firebase.auth().currentUser.photoURL;
      $("div.fab").replaceWith(`<div class="postcreate">
      <img src="${image}" alt="user image" height="33em" width="33em"/>
      </div>`);
  }
);
});