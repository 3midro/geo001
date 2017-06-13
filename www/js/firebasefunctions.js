var providerFB; var providerTW; var providerGO;

var initFirebase =  function(){
       // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBV6_NNzdi2gEJjAPhJF4yq469GKqdpyx0",
    authDomain: "geo001-c7e20.firebaseapp.com",
    databaseURL: "https://geo001-c7e20.firebaseio.com",
    projectId: "geo001-c7e20",
    storageBucket: "geo001-c7e20.appspot.com",
    messagingSenderId: "62028111802"
  };
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(function(user) {
      console.log(user);
      if (user) {
          $$(".open-login-screen").hide();
          $$("#chipUsuario>.chip-media").html('<img src="'+user.photoURL+'">');
          $$("#chipUsuario>.chip-label").html(user.displayName);
          $$("#chipUsuario").removeAttr("style");
      }else{
          $$("#chipUsuario").hide();
          $$(".open-login-screen").removeAttr("style");
          //manda a la pagina de login?
           var p = storage.getItem('pay'); var w = storage.getItem('welcome');
           if (w === "true" && p === "true"){$$(".open-login-screen").click();}
      }
    });
    
    providerFB = new firebase.auth.FacebookAuthProvider(); providerFB.addScope('public_profile');providerFB.addScope('user_birthday');
    providerTW = new firebase.auth.TwitterAuthProvider();
    providerGO = new firebase.auth.GoogleAuthProvider();
}

var login = function (p){
    var provider;
    switch (p){case "f": provider = providerFB; break;case "t": provider = providerTW; break;case "g": provider = providerGO; break;default: return;}
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      myApp.closeModal('.login-screen');
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
};

var logout = function (){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
};


