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
            //1 el welcomeScreen
                welcomeScreen();
            
            // -2 color interfaz
                setColor();
            //0 inicializa firebase
                initFirebase();
            //-1 inicializa la base de datos local
                dblocal();
            
            //0 checkConnection()
                checkConnection();
            
            
            //2 lanza el mapa
                createMap();
            // lanza a buscar la posición
        // Options: throw an error if no update is received every 30 seconds.
            //var watchID = navigator.geolocation.watchPosition(onPosSuccess, onPosError, { timeout: 1000 });
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
              $$("#chipUsuario").show();
          }else{
              $$("#chipUsuario").hide();
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
     var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;
}

function onPosError(error) {
    var element = document.getElementById('geolocation');
        element.innerHTML = 'Code: '  + error.code + '<br />' +
                            'Message: ' + error.message  + '<br />' +  element.innerHTML;
}

function createMap(){
    
    var map = L.map('map').setView([21.8782892, -102.3050335], 16);
//http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png --> xido
    //http://{s}.tile.osm.org/{z}/{x}/{y}.png ---> ejemplo
L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
    detectRetina: true
}).addTo(map);
    bbox = map.getBounds();

var points = turf.random('points', 120, {
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


