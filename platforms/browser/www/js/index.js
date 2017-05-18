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

var watchID; var lat; var lon; var position;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        /*document.addEventListener("offline", whenOffline, false);
        document.addEventListener("online", whenOnline, false);*/
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
        moment.locale('es');
        //console.log('Received Event: ' + id);
        switch ( id ){
            case "deviceready":
                    payWithTweet();
                break;
            case "pause":
                console.log("pause event");
                break;
            case "resume":
                console.log("resume event");
                break;
        }
        
        
        /*coloca en dispositivo inicializado la capa de cordova */
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        
     
        
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

/*var dblocal = function(){
 
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
};*/

/*function whenOffline() {
    // Handle the offline event
    console.log("La app se puso en modo offline");
} //not in use

function whenOnline() {
    // Handle the offline event
    console.log("La app se puso en modo online");
} // not in use

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
}; // not in use

*/




function onPosSuccess(coord) {
    //console.log("watcher pos");
    //console.log(coord.coords);
    lat = coord.coords.latitude;
    lon = coord.coords.longitude;
    var myIcon = L.divIcon({className: 'my-div-icon', html:'<div class="pulse-me"></div>'});
    position = (typeof position !== 'undefined')?position.setLatLng([coord.coords.latitude, coord.coords.longitude]).update():new L.marker([coord.coords.latitude, coord.coords.longitude], {icon: myIcon}).addTo(map);
    // si auto refresh esta encendido baja los establecimientos
    if (!$$("#map_refresh").hasClass('color-gray')) getDenue();
    
    
    
    
    
    
    //map.panTo(position._latlng) -->envia al punto donde esta el usuario
    /*storage.removeItem('entidad');
    var currentEntidad = storage.getItem('entidad'); 
    var pt = turf.point([coord.coords.longitude, coord.coords.latitude]);
    console.log(pt);
    if (currentEntidad !== null){
        var poly = turf.polygon([entidades[currentEntidad]]);
        var isInside = turf.inside(pt, poly);
         //console.log(isInside);
        if (isInside === false){
            storage.removeItem('entidad');
            onPosSuccess(coord);
        }
     }else{
         //determina la entidad a la que pertenece la coordenada recorriendo el arreglo de entidades
        for (var key in entidades) {
            var poly = turf.polygon([entidades[key]]);
            var isInside = turf.inside(pt, poly);
            // console.log(key+ ' isInside: ' + isInside);
            if (isInside === true){
                currentEntidad = key;
                storage.setItem('entidad', key);
                break;
            }
        }
     }
        $$(".my-location").val(currentEntidad).trigger("change");  
        var myIcon = L.divIcon({className: 'my-div-icon', html:'<div class="pulse-me"></div>'});
     var element = document.getElementById('geolocation');
        element.innerHTML = 'Lat: '  + coord.coords.latitude      + '<br />' +
                            'Lon: ' + coord.coords.longitude     + '<br />';
    
     position = (typeof position !== 'undefined')?position.setLatLng([coord.coords.latitude, coord.coords.longitude]).update():new L.marker([coord.coords.latitude, coord.coords.longitude], {icon: myIcon}).addTo(map);
    panToPoint();*/
    
}

/*function panToPoint(){
    if (!$$("#testigoPosition").hasClass('color-gray')){
        map.panTo(position._latlng);
    }
}*/

function onPosError(error) {
    console.log("No se pudo determinar la posicion " + error.message);
    if (lat !== '' && lon !== ''){
        navigator.geolocation.clearWatch(watchID);
        startWatcher();
    } 
    //$$(".pulse-me").hide();
}



/*function AlertNoLocated() {
    // do something
    myApp.openPanel('left');
    $$('#location').click();
}*/ // not in use

var map;
function createMap(){
    if (typeof map === 'undefined'){
        map = L.map('map',{
            dragging:true,
            zoomControl:true
        }).setView([21.8782892, -102.3050335], 16); 
            L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
                detectRetina: true
            }).addTo(map);
            /*FILTROS*/
            L.control.custom({
                position: 'bottomleft',
                content: '<div class="btn-group-vertical" data-step="1" data-intro="Estos son los filtros" data-position="right">'
                         +'<a href="#" id="map_audiotrack" class="button button-raised bg-white"><i class="icon material-icons">audiotrack</i></a>'
                         +'<a href="#" id="map_local_bar" class="button button-raised bg-white"><i class="icon material-icons">local_bar</i></a>'
                         +'<a href="#" id="map_local_drink" class="button button-raised bg-white"><i class="icon material-icons">local_drink</i></a>'
                         +'<a href="#" id="map_store" class="button button-raised bg-white"><i class="icon material-icons">store</i></a>'
                         +'</div>',
                 events:{
                    click: function(data){
                        if ($$(data.toElement).hasClass('icon')){
                            syncFiltros(data.toElement.innerText,($$(data.toElement).parent().hasClass('color-gray')));
                        }else{
                            syncFiltros(data.toElement.innerText,($$(data.toElement).hasClass('color-gray')));
                        }
                    },
                }
            }).addTo(map);    
            /*L.control.custom({
                position: 'bottomright',
                content: '<div class="btn-group-vertical">'
                         +'<a href="#" class="button button-raised bg-white color-gray" id="map_favorite"><i class="icon material-icons">favorite</i></a>'
                         +'<a href="#" class="button button-raised bg-white color-gray" id="map_local_pizza"><i class="icon material-icons">local_pizza</i></a>'
                         +'<a href="#" class="button button-raised bg-white color-gray" id="map_card_giftcard"><i class="icon material-icons">card_giftcard</i></a>'
                         +'</div>',
                events:{
                    click: function(data){
                        if ($$(data.toElement).hasClass('icon')){
                            syncLayers(data.toElement.innerText,($$(data.toElement).parent().hasClass('color-gray')));
                        }else{
                            syncLayers(data.toElement.innerText,($$(data.toElement).hasClass('color-gray')));
                        }
                    },
                }
            }).addTo(map);*/
            L.control.custom({
                position: 'topright',
                content: '<div class="btn-group-vertical">'
                         +'<a href="#" class="button button-raised bg-white" id="map_my_location"><i class="icon material-icons" >my_location</i></a>'
                         +'<a href="#" class="button button-raised bg-white" id="map_refresh"><i class="icon material-icons">refresh</i></a>'
                         +'</div>',

                events:{
                    click: function(data){
                        if ($$(data.toElement).hasClass('icon')){
                            syncMyPos(data.toElement.innerText,($$(data.toElement).parent().hasClass('color-gray')));
                        }else{
                            syncMyPos(data.toElement.innerText,($$(data.toElement).hasClass('color-gray')));
                        }
                        //if (data.toElement.innerText === 'my_location') ;
                    },
                }
            }).addTo(map);
        
        //agrega los listen para los zoom y los dragend
        map.on('zoomend', function() {getDenue();});
        map.on('dragend', function() {getDenue();});
        setInitialView();
    }
    
    try {
    //registra la funcion que detecta si la ubicacion GPS esta disponible
     cordova.plugins.diagnostic.registerLocationStateChangeHandler(function(state){
        if((device.platform === "Android" && state !== cordova.plugins.diagnostic.locationMode.LOCATION_OFF)
            || (device.platform === "iOS") && ( state === cordova.plugins.diagnostic.permissionStatus.GRANTED
                || state === cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE
        )){
            console.log("Location is available");
            startWatcher();
            }else{
                console.log("Location is not available");
                //$$(".pulse-me").hide();
                navigator.geolocation.clearWatch(watchID);
            }
        });
    }catch(err){
        console.log(err.message);
    }
}


function startWatcher(){
    watchID = navigator.geolocation.watchPosition(onPosSuccess, onPosError, { timeout: 3000 });
};


function setInitialView() {
    navigator.geolocation.getCurrentPosition(function(position){
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        map.panTo([lat,lon]);
        //console.log(lat + '|' + lon);
        startWatcher();
    }, function(error){
        switch(error.code){
            case 1:
                console.log("el usuario no da permiso a la app de conocer su ubicacion: abrir el panel de seleccion de entidad");
                break;
            case 3:
                console.log("Si dio permiso pero no esta encendido el GPS");
                 cordova.dialogGPS();
                break;
                
        }
        console.log(error.code + '|' + error.message);
    }, { enableHighAccuracy: true, timeout: 3000  });
}
    /*
    
    bbox = map.getBounds();

var points = turf.random('points', 150, {
  bbox: [bbox._southWest.lat, bbox._southWest.lng, bbox._northEast.lat, bbox._northEast.lng]
}); 
  
var markerNormal = {
            radius: 6,
            fillColor: "#607D8B",
            color: "#607D8B",
            weight: 0,
            opacity: 1,
            fillOpacity: 0.8
    };
var leafletView = L.markerClusterGroup({disableClusteringAtZoom: 17});
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
    }else{
        var myIcon = L.divIcon({className: 'my-div-icon', html:'<div class="pin-no"></div>'});
    }
    var m = new L.marker([points.features[i].geometry.coordinates[0],points.features[i].geometry.coordinates[1]], {icon: myIcon}).addTo(leafletView).bindPopup('PUNTO ' + i + ' <i class="icon material-icons">directions_walk</i>  ' + distancia);
}   
     
    map.addLayer(leafletView);
    L.marker([21.8782892, -102.3050335]).addTo(map).bindPopup('INICIO').openPopup();*/




/*var myPosition = function(){
    var platform = device.platform;
   
    if (platform === 'browser'){
        watchID = navigator.geolocation.watchPosition(onPosSuccess, onPosError, { timeout: 6000 });
    }else if(platform === 'Android'){
         cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
        if (enabled){
            //obtiene las coordenadas
            watchID = navigator.geolocation.watchPosition(onPosSuccess, onPosError, { timeout: 6000 });
        }else{
            //manda a encender el gps
             cordova.dialogGPS("Your GPS is Disabled, this app needs to be enable to works.",//message
                    "Use GPS, with wifi or 3G.",//description
                    function(buttonIndex){//callback
                      switch(buttonIndex) {
                        case 0: break;//cancel
                        case 1: break;//neutro option
                        case 2: 
                              console.log("regreso de la configuración");
                              break;//user go to configuration
                      }},
                      "Please Turn on GPS",//title
                      ["Cancel","Later","Go"]);//buttons
        }
        console.log("GPS location is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });    
    }
};*/




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
}; // not in use

var syncFiltros = function (filtro, ch){
    console.log(filtro +'|'+ch);
    $$('input[type=checkbox][name=ks-giro][value='+filtro+']').prop("checked", ch);
    $$('#map_'+filtro+'').toggleClass('color-gray');
}

var syncMyPos = function (filtro, ch){
    console.log(filtro +'|'+ch);
    $$('#map_'+filtro+'').toggleClass('color-gray');
    if (filtro === 'my_location'){if(ch){$$(".pulse-me").show();map.panTo(position._latlng);}else{$$(".pulse-me").hide();}}
}


var syncLayers = function (layer, ch){
    //console.log(layer +'|'+ch);
    var elements = $$(".leaflet-control-layers-overlays>label").find('.icon');
    for (i=0; i<elements.length;i++){
        if ($$(elements[i]).text() === layer){
              $$(elements[i]).click();
            //$$($$(".leaflet-control-layers-overlays>label").find('.leaflet-control-layers-selector')[i]).prop("checked", ch).trigger('change');
            //$$(".leaflet-control-layers-overlays>label").find('.leaflet-control-layers-selector')[i].click();
            i = elements.length;
        }
    }
    //$$('input[type=checkbox][name=ks-giro][value='+filtro+']').prop("checked", ch);
    //(ch)?$$('#map_'+filtro+'').addClass('color-gray'):$$('#map_'+filtro+'').removeClass('color-')
    $$('#map_'+layer+'').toggleClass('color-gray');
}

var localLayers = function(){
    //ahorita las generaré random
        bbox = map.getBounds();
        var favL = new L.LayerGroup();
        var parL = new L.LayerGroup();
        var gifL = new L.LayerGroup();
        
    
        var favs = turf.random('points', 10, {
          bbox: [bbox._southWest.lat, bbox._southWest.lng, bbox._northEast.lat, bbox._northEast.lng]
        });
    
        for (i=0; i < favs.features.length; i++){
            L.marker([favs.features[i].geometry.coordinates[0],favs.features[i].geometry.coordinates[1]]).bindPopup('This is a fav!').addTo(favL);
        }
        //favL.addTo(map);
    
        var parties = turf.random('points', 3, {
          bbox: [bbox._southWest.lat, bbox._southWest.lng, bbox._northEast.lat, bbox._northEast.lng]
        }); 
        for (i=0; i < parties.features.length; i++){
                L.marker([parties.features[i].geometry.coordinates[0],parties.features[i].geometry.coordinates[1]]).bindPopup('This is a Partie!').addTo(parL);
        }
       // parL.addTo(map);
        var gifts = turf.random('points', 6, {
          bbox: [bbox._southWest.lat, bbox._southWest.lng, bbox._northEast.lat, bbox._northEast.lng]
        });
        for (i=0; i < gifts.features.length; i++){
                L.marker([gifts.features[i].geometry.coordinates[0],gifts.features[i].geometry.coordinates[1]]).bindPopup('This is a gift!').addTo(gifL);
        }
   var overlays = {
			"<i class='icon material-icons'>favorite</i>": favL, "<i class='icon material-icons'>local_pizza</i>": parL,"<i class='icon material-icons'>card_giftcard</i>": gifL
		};
    L.control.layers(null,overlays).addTo(map);
      
    
};


var notIn ='';
var workDenue=false;
var getDenue = function(){
    if (!map.getBounds().contains([lat,lon])){$$("#map_my_location").addClass("color-gray")};
    var bbox = map.getBounds().toBBoxString();
    if (!$$("#map_refresh").hasClass("color-gray")){
       $$.get(urlServices['serviceGetDenue'].url, {bbox:bbox, notIn:notIn}, function (data, status, xhr) {
            console.log(data);
       }, function(xhr, status){
            console.log(status);
       });
    }else{
        console.log("No manda pedir nada");
    }
    
    
   
};

