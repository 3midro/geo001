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
             // usrObj = user.uid;
              console.log(user.uid);
             // $$("#chipUsuario").show();
          }else{
            //  $$("#chipUsuario").hide();
          }
      });
    providerFB = new firebase.auth.FacebookAuthProvider();
    providerFB.addScope('public_profile');
    providerFB.addScope('user_birthday');
    providerTW = new firebase.auth.TwitterAuthProvider();
    providerGO = new firebase.auth.GoogleAuthProvider();
}

var login = function (p){
    var provider;
    switch (p){
        case "f": provider = providerFB; break;
        case "t": provider = providerTW; break;
        case "g": provider = providerGO; break;
        default: return;
    }
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
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

/*var loginFB = function (){
    firebase.auth().signInWithPopup(providerFB).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
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

var loginTW = function(){
    firebase.auth().signInWithPopup(providerTW).then(function(result) {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      var token = result.credential.accessToken;
      var secret = result.credential.secret;
      // The signed-in user info.
      var user = result.user;
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

var loginGO = function(){
    firebase.auth().signInWithPopup(providerGO).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
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
};*/
//NOT IN USE
