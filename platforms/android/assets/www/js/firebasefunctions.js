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
    
    //watcher de los establecimientos
    watcherFireBase = firebase.database().ref('denue');
   /* watcherFireBase.orderByKey().equalTo("1").on("value", function(snapshot) {
      console.log(snapshot.key);
      console.log(snapshot.val());
    });*/
    
    /*watcherFireBase.on('child_added', function(data) {
        console.log(data.key, data.val());
        console.log("child added");
    });*/
    // No se pone el chil_added porque de inicio agrega todo en la base de datos y eso carga demasiada informacion

   /* watcherFireBase.on('child_changed', function(data) {
       // console.log(data.key, data.val());
        console.log("child changed");
    });

    watcherFireBase.on('child_removed', function(data) {
      //console.log(data.key);
        console.log("child removed");
    });*/
    
}

var login = function (p){
    var provider;
    switch (p){case "f": provider = providerFB; break;case "t": provider = providerTW; break;case "g": provider = providerGO; break;default: return;}
    firebase.auth().signInWithRedirect(provider).then(function(result) {
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


var createDenueDemo = function(id){
    //console.log(id);
    firebase.database().ref('denue/' + id).set({
        vistas: 0
    });
   /* firebase.database().ref('denue/' + id + '/precios/').set({
        0:'Precios se crearán cuando empiece a subirlos desde xls, csv, xml o captura manual'
    });
    firebase.database().ref('denue/' + id + '/promos/').set({
        0:'Promos se crearán cuando empiece a subirlos desde xls, csv, xml o captura manual'
    });*/
    firebase.database().ref('denue/' + id + '/horarios/').set({
        1:'Descanso',2:'08:00 - 16:00',3:'16:00 - 22:30',4:'08:00 - 16:00<br>21:00 - 21:30',5:'11:00 - 22:00',6:'09:00 - 21:00',7:'08:00 - 12:00<br>14:00 - 22:00'
    });
    
    //Nuevo precio
    var precioData = {
        idInterno: '', //id de su sistema
        item: 'Caguama indio 500ml envase retornable',
        precio: 45, //precio al publico
        pMay: 40, //precio de mayoreo
        cMay: 70, //cantidad de unidades necesarias para alcanzar el precio de mayoreo
        pBrd: 43 //precio de brindix (este se lo ofreceremos en exclusivo a usuarios premium)
      };
    var precioData2 = {
        idInterno: '', //id de su sistema
        item: 'Cerveza victoria 355ml',
        precio: 15, //precio al publico
        pMay: 12, //precio de mayoreo
        cMay: 10, //cantidad de unidades necesarias para alcanzar el precio de mayoreo
        pBrd: 12 //precio de brindix (este se lo ofreceremos en exclusivo a usuarios premium)
      };
    
    //Nueva Promo
    var promoData = {
        idInterno: '', //id de su sistema
        title:'Party pack', //titulo a mostrar en el listado
        item: '8 5kg cervezas Indio + bolsa de hielo 5kg + sabritones', //descripcion que va en el cuerpo del acordion
        precio: 190, //precio al publico
        dias: {
            1:true,
            3:true
        },// dias en que esta activa la promo (poner hasta arriba las del dia en curso)
        restricciones:'Solo aplica en horario de 8 - 12', //aclaraciones para hacer valida la promocion, en caso de ser necesario
        pBrd: '',//precio brindix (este se lo ofreceremos en exclusivo a usuarios premium)
        iniPromo: moment().format("D/MM/YYYY"),
        finPromo: moment().add(10, 'days').format("D/MM/YYYY")
      };
    
    
     // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('denue/' + id + '/precios/').push().key;
     var newPostKey2 = firebase.database().ref().child('denue/' + id + '/precios/').push().key;
        var updates = {};
        updates['denue/' + id + '/precios/' + newPostKey] = precioData;
        updates['denue/' + id + '/promos/' + newPostKey] = promoData;
        updates['denue/' + id + '/precios/' + newPostKey2] = precioData2;
        firebase.database().ref().update(updates);
    
};

function PrepareDenue(){
    for (i=1; i< 47770; i++){
        createDenueDemo(i);
    }
}

var watcherFireBase;
var watcherDenueGlobal = function(id){
    watcherFireBase = firebase.database().ref('denue');
    watcherFireBase.orderByKey().equalTo(id).on("child_changed", function(snapshot) {
        var UE = snapshot.val();
        //console.log(UE);
        if (UE !== null){
            if (pagDetalle === id){
                updDetalle(snapshot.key, UE);
            }
        }
        // este solo sirve para detectar los nuevos UE cuando sean AGREGADOS EN TIEMPO REAL, creando el efecto de caida de chincheta ordenando la LISTA
    });
    watcherFireBase.orderByKey().equalTo(id).on("child_removed", function(snapshot) {
         updDetalle(snapshot.key, null);
    });
};

var checkExist = function (id){
        firebase.database().ref('denue/' + id).once('value').then(function(snapshot) {
        var UE = snapshot.val();
        if (UE !== null) return 1; return 0;
    });
}

var updDetalle = function(id, UE){
    var dia = moment().day();
    if ( UE !== null){
                var horario = (typeof UE.horarios[dia] !== 'undefined')?UE.horarios[dia]:'No disponible';
                $$("#horario").html(horario);
                if (typeof UE.precios !== 'undefined'){
                    var totalPrecios = Object.keys(UE["precios"]).length;
                    var pmin =1000, pmax = 0; 
                    // limpio el UL de items productos
                    $$("#ul_detallePrecios").html('');
                    //recorro el objeto y creo el item
                    Object.keys(UE.precios).forEach(function(key) {
                        $$("#ul_detallePrecios").append('<li class="item-content"><div class="item-inner"><div class="item-title">'+UE.precios[key].item+'</div> <div class="item-after">$'+UE.precios[key].precio+'</div></div></li>');
                        pmin = (UE.precios[key].precio < pmin)?UE.precios[key].precio:pmin;
                        pmax = (UE.precios[key].precio > pmax)?UE.precios[key].precio:pmax;
                    });
                    pmin ='$'+pmin+' - ';
                    pmax ='$'+pmax;
                }else{
                    var totalPrecios = 0;
                    var pmin = 'Sin ', pmax = 'info';  
                }
                 if (typeof UE.promos !== 'undefined'){
                     var totalPromos = Object.keys(UE["promos"]).length;
                     // limpio el UL de items productos
                    $$("#ul_detallePromos").html('');
                      Object.keys(UE.promos).forEach(function(key) {
                          //si la promo ya caduco, no mostrarla, de preferencia mostrar hasta arriba las promos del dia de hoy
                        $$("#ul_detallePromos").append('<li class="accordion-item">'
                                +'<a href="#" class="item-link item-content">'
                                    +'<div class="item-inner">'
                                      +'<div class="item-title">'+UE.promos[key].title+'</div>'
                                    +'<div class="item-after">$'+UE.promos[key].precio+'</div>'
                                    +'</div>'
                                +'</a>'
                                +'<div class="accordion-item-content">'
                                    +'<div class="content-block">'
                                      +'<p>'+UE.promos[key].item+'</p>'
                                    +'<p><small>'+UE.promos[key].restricciones+'</small></p>'
                                    +'</div>'
                                +'</div>'
                            +'</li>');
                    });
                 }else{
                     var totalPromos = 0;
                 }
                
                $$("#totalPrecios").html(totalPrecios).show();
                $$("#totalPromos").html(totalPromos).show();
                $$("#detail_rangoPrecios").html(pmin+pmax);
            }else{
                //no esta en la base de firebase (NO PAGA)
                $$("#horario").html("No Aplica");
                $$("#detail_rangoPrecios").html("No Aplica");
                $$("#totalPrecios").hide();
                $$("#totalPromos").hide();
                $$("#ul_detallePrecios").html('<div class="center"><i class="material-icons md-100 color-gray">mood_bad</i><br>Usuario sin membresia</div>');
                $$("#ul_detallePromos").html('<div class="center"><i class="material-icons md-100 color-gray">mood_bad</i><br>Usuario sin membresia</div>');
            }
};