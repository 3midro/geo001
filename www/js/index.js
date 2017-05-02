/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener("offline", whenOffline, false);
        document.addEventListener("online", whenOnline, false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        // lanza a buscar la posición
        // Options: throw an error if no update is received every 30 seconds.
            //var watchID = navigator.geolocation.watchPosition(onPosSuccess, onPosError, { timeout: 1000 });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        if (id==='deviceready'){
            //dispositivo esta listo 
            //paywithateewt
                payWithTweet();
            
            // el welcomeScreen
               // welcomeScreen();
            
            //color interfaz
                //setColor();
            //inicializa firebase
                initFirebase();
            //inicializa la base de datos local
                dblocal();
            
            //checkConnection()
                checkConnection();
            
            
            //2 lanza el mapa
                createMap();
            // lanza a buscar la posición
        // Options: throw an error if no update is received every 30 seconds.
            var watchID = navigator.geolocation.watchPosition(onPosSuccess, onPosError, { timeout: 1000 });
        }else{
            console.log("dispositivo no listo");
        }
        
        /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
*/
        
     
        
    }
};
//local storage
var storage = window.localStorage;
//storage.removeItem('color');
app.initialize();

var initFirebase =  function(){
        // Initialize Firebase
      var config = {
        apiKey: "AIzaSyDrUJR4rbVPlr37C2Il8x-vSoSeBFxUqU4",
        authDomain: "brindix-866ce.firebaseapp.com",
        databaseURL: "https://brindix-866ce.firebaseio.com",
        projectId: "brindix-866ce",
        storageBucket: "brindix-866ce.appspot.com",
        messagingSenderId: "54415741684"
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
}

var dblocal = function(){
 
    return false;
    var db;
    var databaseName = 'myDBrdxLocal';
    var databaseVersion = 1;
    var openRequest = window.indexedDB.open(databaseName, databaseVersion);
    openRequest.onerror = function (event) {
        console.log(openRequest.errorCode);
    };
    openRequest.onsuccess = function (event) {
        // Database is open and initialized - we're good to proceed.
        db = openRequest.result;
       // displayData();
    };
    openRequest.onupgradeneeded = function (event) {
        // This is either a newly created database, or a new version number
        // has been submitted to the open() call.
        var db = event.target.result;
        db.onerror = function () {
            console.log(db.errorCode);
        };

        // Create an object store and indexes. A key is a data value used to organize
        // and retrieve values in the object store. The keyPath option identifies where
        // the key is stored. If a key path is specified, the store can only contain
        // JavaScript objects, and each object stored must have a property with the
        // same name as the key path (unless the autoIncrement option is true).
       // var color = db.createObjectStore('colors',{keyPath:'colorId'});
        var store = db.createObjectStore('customers', { keyPath: 'customerId' });

        // Define the indexes we want to use. Objects we add to the store don't need
        // to contain these properties, but they will only appear in the specified
        // index of they do.
        //
        // syntax: store.createIndex(indexName, keyPath[, parameters]);
        //
        // All these values could have duplicates, so set unique to false
        store.createIndex('firstName', 'firstName', { unique: false });
        store.createIndex('lastName', 'lastName', { unique: false });
        store.createIndex('street', 'street', { unique: false });
        store.createIndex('city', 'city', { unique: false });
        store.createIndex('zipCode', 'zipCode', { unique: false });
        store.createIndex('country', 'country', { unique: false });

        // Once the store is created, populate it
        store.transaction.oncomplete = function (event) {
            // The transaction method takes an array of the names of object stores
            // and indexes that will be in the scope of the transaction (or a single
            // string to access a single object store). The transaction will be
            // read-only unless the optional 'readwrite' parameter is specified.
            // It returns a transaction object, which provides an objectStore method
            // to access one of the object stores that are in the scope of this
            //transaction.
            var customerStore = db.transaction('customers', 'readwrite').objectStore('customers');
            customers.forEach(function (customer) {
                customerStore.add(customer);
            });
        };
    };
};

function whenOffline() {
    // Handle the offline event
    console.log("La app se puso en modo offline");
}

function whenOnline() {
    // Handle the offline event
    console.log("La app se puso en modo online");
}

var checkConnection = function(){
    console.log();
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    console.log('Connection type: ' + states[networkState]);
};






function onPosSuccess(position) {
    storage.removeItem('entidad');
    var currentEntidad = storage.getItem('entidad'); 
    //console.log(currentEntidad);
   // currentEntidad = '02';
     var pt = turf.point([position.coords.longitude, position.coords.latitude]);
    pt = turf.point([-104.65663,24.0279]); 
    if (currentEntidad !== null){
      //   console.log("eaaah");
         //verifica que la coordenada pertenezca a esa entidad
       
        var poly = turf.polygon([entidades[currentEntidad]]);
        var isInside = turf.inside(pt, poly);
         console.log(isInside);
         if (isInside === false){
            storage.removeItem('entidad');
            onPosSuccess(position);
         }
         
     }else{
         //determina la entidad a la que pertenece la coordenada recorriendo el arreglo de entidades
         //
         
         var i = 0;
        for (var key in entidades) {
            var poly = turf.polygon([entidades[key]]);
            var isInside = turf.inside(pt, poly);
             console.log(key+ ' isInside: ' + isInside);
            if (isInside === true){
                currentEntidad = key;
                storage.setItem('entidad', key);
                break;
            }
           
        }
         
         
          /*  Object.keys(entidades).forEach(function(key) {
                var poly = turf.polygon([entidades[key]]);
                var isInside = turf.inside(pt, poly);
                if (isInside === true){
                    storage.setItem('entidad', key);
                    break;
                }
            });*/
       
         
     }
   /* var __myapp = new Framework7();
    __myapp.initSmartSelects('.page[data-page="my-location"]');*/
    document.getElementsByName("location").value = currentEntidad;
   myApp.initSmartSelects('.page[data-page="panel-left"]');
   // myApp.initSmartSelects('.page[data-page="my-location"]');
    //$$('select[name="location"]  option[value="'+currentEntidad+'"]').click();
     console.log('La posicion esta dentro de la entidad '+ storage.getItem('entidad'));
    
    return false;
    
    var pt = turf.point([position.coords.longitude, position.coords.latitude]);
    var poly = turf.polygon([[
       [-102.667,22.292],
[-102.507,22.292],
[-102.504,22.302],
[-102.466,22.309],
[-102.470,22.351],
[-102.387,22.363],
[-102.379,22.358],
[-102.359,22.388],
[-102.323,22.387],
[-102.321,22.422],
[-102.306,22.447],
[-102.249,22.383],
[-102.152,22.348],
[-102.153,22.289],
[-102.105,22.284],
[-102.074,22.305],
[-102.035,22.298],
[-102.022,22.243],
[-102.005,22.240],
[-102.000,22.169],
[-102.046,22.152],
[-102.016,22.154],
[-102.027,22.128],
[-101.989,22.120],
[-101.857,22.042],
[-101.864,21.991],
[-101.901,21.971],
[-101.887,21.942],
[-101.836,21.948],
[-101.837,21.904],
[-101.868,21.911],
[-102.015,21.864],
[-102.140,21.701],
[-102.171,21.703],
[-102.177,21.686],
[-102.217,21.693],
[-102.224,21.652],
[-102.278,21.655],
[-102.295,21.660],
[-102.315,21.620],
[-102.375,21.650],
[-102.447,21.673],
[-102.459,21.696],
[-102.570,21.745],
[-102.652,21.766],
[-102.694,21.743],
[-102.735,21.711],
[-102.797,21.752],
[-102.850,21.801],
[-102.849,21.830],
[-102.876,21.851],
[-102.825,21.961],
[-102.749,22.071],
[-102.684,22.086],
[-102.637,22.224],
[-102.673,22.244],
[-102.670,22.254],
[-102.667,22.292] 
    ]]);
     var element = document.getElementById('geolocation');
        element.innerHTML = 'Lat: '  + position.coords.latitude      + '<br />' +
                            'Lon: ' + position.coords.longitude     + '<br />';
    var isInside = turf.inside(pt, poly);
    console.log(isInside);
}

function onPosError(error) {
    var element = document.getElementById('geolocation');
        element.innerHTML = 'Code: '  + error.code + '<br />' +
                            'Message: ' + error.message  + '<br />';
}

function createMap(){
    
    
    var map = L.map('map').setView([21.8782892, -102.3050335], 16);
//http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png --> xido
    //http://{s}.tile.osm.org/{z}/{x}/{y}.png ---> ejemplo
L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
    detectRetina: true
}).addTo(map);
    bbox = map.getBounds();
    
  
    

var points = turf.random('points', 150, {
  bbox: [bbox._southWest.lat, bbox._southWest.lng, bbox._northEast.lat, bbox._northEast.lng]
});    

    //L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map);
  
var markerNormal = {
            radius: 6,
            fillColor: "#607D8B",
            color: "#607D8B",
            weight: 0,
            opacity: 1,
            fillOpacity: 0.8
    };

//var leafletView = new PruneClusterForLeaflet();
var leafletView = L.markerClusterGroup({disableClusteringAtZoom: 17});
    //console.log(leafletView);
    
    
    
    
var from = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Point",
    "coordinates": [21.8782892, -102.3050335]
    }
   };
var units = "kilometers";  
  
   
    
for (i=0; i < points.features.length; i++){

    
   // var categoria = Math.round(Math.random() * (4 - 1) + 1);
    //console.log(categoria);
    var to = points.features[i];
    var distancia = turf.distance(from, to, units);
    distancia = parseFloat(distancia.toFixed(2));
        if (distancia<1){
            distancia = (distancia * 1000) + ' m';
        }else{
            distancia = distancia + ' km';
        }
    
    var random_cte = Math.round(Math.random() * (4 - 1) + 1);
    if (random_cte == 1){
        var myIcon = L.divIcon({className: 'my-div-icon', html:'<div class="pin"></div><div class="pulse"></div>'});
        //myIcon += L.divIcon({className: 'pulse'});
    }else{
        var myIcon = L.divIcon({className: 'my-div-icon', html:'<div class="pin-no"></div>'});
    }
    
    
    //var myIcon = L.divIcon({className: 'my-div-icon'});
    var m = new L.marker([points.features[i].geometry.coordinates[0],points.features[i].geometry.coordinates[1]], {icon: myIcon}).addTo(leafletView).bindPopup('PUNTO ' + i + ' <i class="icon material-icons">directions_walk</i>  ' + distancia);

    
  //  L.circleMarker([points.features[i].geometry.coordinates[0],points.features[i].geometry.coordinates[1]],markerNormal).addTo(map).bindPopup('PUNTO ' + i + ' <i class="icon material-icons">directions_walk</i>  ' + distancia);
    
    
   
}   
     
    //var color = storage.getItem('color');    
    //cambia todos los clientes al color de la app
    //$$(".my-div-icon-cte").addClass('bg-' + color);
    
    //console.log(leafletView);
    map.addLayer(leafletView);
    
/*var to = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Point",
    "coordinates": [21.8815218, -102.29742565]
  }
};*/

/*
var points = {
  "type": "FeatureCollection",
  "features": [from, to]
};*/




    
    
//console.log('Distancia en km desde punto A a PUNTO B: ' + distancia );    
    
    
    
    
L.marker([21.8782892, -102.3050335]).addTo(map).bindPopup('INICIO').openPopup();
//L.marker([21.8815218, -102.29742565]).addTo(map).bindPopup('PUNTO B').openPopup();
}






//test PHP
function testPHP(){
    //GET
    /*var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
       }
    };
    xhttp.open(urlServices['serviceTest'].type, urlServices['serviceTest'].url, true);
    xhttp.send();*/
    
    
    //POST
    /*var xhttp = new XMLHttpRequest();
    var datos = {'a': 25687};
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
       }
    };
    xhttp.open(urlServices['serviceTest'].type, urlServices['serviceTest'].url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('a=147');*/ // OK
    datos = "a=147";
    
    console.log(datos);
    //return false;
    
   sendAJAX(urlServices['serviceTestPOST'].url, datos, urlServices['serviceTestPOST'].type, function (data) {
        console.log(data);
    });
};


