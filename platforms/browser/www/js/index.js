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

var watchID; var lat; var lon; var position; var frame; var ruta;

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
    if (!$$("#map_refresh").hasClass('color-gray')){
        getDenue();
    }
    
    //actualiza las distancias
   updDistancias();
    
}


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
            zoomControl:true,
            maxZoom: 18,
            //minZoom: 14
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
        
        // inicializa el routing
        
        ruta = L.Routing.control({
         waypoints: [null],
         show: false,
            languaje: 'es',
         autoRoute: true
        }).addTo(map);
        
        //
        //agrega los listen para los zoom y los dragend
        map.on('zoomend', function() { decluster();getDenue();});
        map.on('dragend', function() { getDenue();});
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
    watchID = navigator.geolocation.watchPosition(onPosSuccess, onPosError, { timeout: 9000 });
};


function setInitialView() {
    navigator.geolocation.getCurrentPosition(function(position){
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        map.panTo([lat,lon]);
        //frame = map.getBounds();
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
    
function getDistance(to, from){
   var distancia;
    if (typeof from === 'undefined'){
        // No se especifico from.... lo intentara leer de la posicion
       if (typeof position !== 'undefined'){
           from = {"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [position._latlng.lng,position._latlng.lat]}};
            distancia = parseFloat((turf.distance(from, to)).toFixed(2))*1000;
                       //distancia = parseFloat(distancia.toFixed(2))*1000;
           
           /* if (distancia<1){
                distancia = (distancia * 1000) + ' m';
            }else{
                distancia = distancia + ' km';
            }*/
       }else{
           return "sin tu ubicación";
       }
        
       return distancia;
   }
}

function translateCategoria(categ){
    var cat;
    switch (categ){
        case "audiotrack": cat = 1; break;
        case "local_bar": cat = 2; break; 
        case "local_drink": cat = 3; break; 
        case "store": cat = 4; break;
        case "1": case 1: cat = "audiotrack"; break;
        case "2": case 2: cat = "local_bar"; break;
        case "3": case 3: cat = "local_drink"; break;
        case "4": case 4: cat = "store"; break;
    }
    return cat;
}




var syncFiltros = function (filtro, ch){
    console.log(filtro +'|'+ch);
    $$('input[type=checkbox][name=ks-giro][value='+filtro+']').prop("checked", ch);
    $$('#map_'+filtro+'').toggleClass('color-gray');
    var Allmarkers = leafletView.GetMarkers();
    // validar que all markers sea mayor que cero
    var cat = translateCategoria(filtro);
           // switch (filtro){case "audiotrack": cat = 1; break;case "local_bar": cat = 2; break; case "local_drink": cat = 3; break; case "store": cat = 4; break;}
    for (var i = 0; i < Allmarkers.length; i++){
        if (Allmarkers[i].category === cat){
            (ch)?Allmarkers[i].filtered = false:Allmarkers[i].filtered = true;    
        }
    }
    leafletView.ProcessView();
    //filtrar la lista por clase
    
    (ch)?$$(".swipeout."+filtro).removeClass('hidden-by-searchbar'):$$(".swipeout."+filtro).addClass('hidden-by-searchbar');
}

var syncMyPos = function (filtro, ch){
    //console.log(filtro +'|'+ch);
    $$('#map_'+filtro+'').toggleClass('color-gray');
    if (filtro === 'my_location'){
        if(ch){$$(".pulse-me").show();map.panTo(position._latlng);startWatcher();}
        else{$$(".pulse-me").hide();navigator.geolocation.clearWatch(watchID);}}
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

var decluster = function(){
    if  (typeof leafletView !== 'undefined'){
        leafletView.Cluster.Size  = (map.getZoom() >= 17)? -1 : 120;
        leafletView.ProcessView(); 
    }
    console.log('zoom: ' + map.getZoom() + ' Cluster size: ' + leafletView.Cluster.Size);
};

var getDenue = function(){
    //if(map.getZoom()<=8){$$("#map_refresh").addClass('color-gray')}; //evita que siga recargando grandes cantidades de establecimientos
    if (!map.getBounds().equals(frame)){
        if (!$$("#map_refresh").hasClass("color-gray")){
            frame = map.getBounds();
            $$.getJSON(urlServices['serviceGetDenue'].url, {bbox:frame}, function (data, status, xhr) {
               // console.log(data.geoUE);
                //drawUE(data.geoUE);
                 drawUEPrune(data.geoUE);
            }, function(xhr, status){
                console.log(status);
            }); 
        }else{
            console.log("No manda pedir nada Esta PANEANDO");
        }
    }else{
        console.log("No manda pedir nada porque el frame es el mismo no necesita refrescar");
    }
};

var leafletView;
function  drawUEPrune(geoJs){
   // console.log(geoJs);
    (typeof leafletView === 'undefined')?leafletView = new PruneClusterForLeaflet():leafletView.RemoveMarkers();
    //obtener filtros activos
    var filters = getFiltrosActivos();
   // console.log(filters);
    $$("#ul_establecimientos").html('');
    var UE = L.geoJson(geoJs,{
        onEachFeature: function(feature, featureLayer){
           var marker = new PruneCluster.Marker(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
            marker.category = parseInt(feature.properties.SCIAN);
            marker.data.icon = createIconNormal;
          // console.log(filters.indexOf(parseInt(feature.properties.SCIAN)) > -1);
            marker.filtered = !(filters.indexOf(parseInt(feature.properties.SCIAN)) > -1);
            marker.data.id = parseInt(feature.properties.id);
           //marker.filtered = !(filters.include(parseInt(feature.properties.SCIAN)));
           leafletView.RegisterMarker(marker);
           createFicha(feature);
            console.log(feature);
        }
    });
    map.addLayer(leafletView);
    leafletView.ProcessView(); 
    if ( $$("#ul_establecimientos li").length>0 && $$("#btnFlipMap>i").text()==='map'){$$("#initFiltro").removeAttr("style");}
    /* ========== lista de establecimientos ========= */
        $$("#ul_establecimientos li").on("click", function(){
            $$(this).toggleClass('list-marked')
        });
};

function createFicha(feature){
   // console.log(feature);
    var scian = translateCategoria(feature.properties.SCIAN);
    var d = getDistance(feature);
    var ficha = '<li class="swipeout '+scian+'" id="ficha_'+feature.properties.id+'">'
         + '<div class="swipeout-content"><a href="#" class="item-link item-content">'
        +      '<div class="item-inner">'
          +      '<div class="item-title-row">'
           +       '<div class="item-title">'+ feature.properties.nombre+'</div>'
            +      '<div class="item-after"><div class="circulo-categoria"><div class="icn_categoria"><i class="material-icons">'+scian+'</i></div></div></div>'
             +   '</div>'
              +  '<div class="item-text"><span id="distancia_'+feature.properties.id+'">'+d+'</span> m</div>'
              +  '</div></a></div>'
            + '<div class="swipeout-actions-left">'
            +  '<a href="#" class="demo-mark bg-'+storage.color+'"><i class="icon material-icons">favorite_border</i></a>'
            +  '<a href="#" class="demo-mark bg-'+storage.color+'" onclick="drawRoute('+feature.geometry.coordinates[1]+','+feature.geometry.coordinates[0]+')"><i class="icon material-icons">place</i></a>'
            +  '<a href="#" class="demo-mark bg-'+storage.color+'"><i class="icon material-icons">details</i></a>'
        + ' </div>'
    +    '</li>';
    $$(".searchbar-clear").click(); $$(".searchbar-overlay").click();
    $$("#ul_establecimientos").append(ficha);
    var options = {useEasing : true, useGrouping : true, separator : ',', decimal : '.',};
    var demo = new CountUp("distancia_"+feature.properties.id, 0, d, 0, 5.0, options);
    demo.start();
};

function createIconNormal(data, category) {
    return L.divIcon({className: 'my-div-icon', html:'<div class="pin_normal"></div>'});
}

function getFiltrosActivos(){
    var res = [];
    if (!$$("#map_audiotrack").hasClass('color-gray')) res.push(1);
    if (!$$("#map_local_bar").hasClass('color-gray')) res.push(2);
    if (!$$("#map_local_drink").hasClass('color-gray')) res.push(3);
    if (!$$("#map_store").hasClass('color-gray')) res.push(4);
    return res;
}

function updateProgressBar(processed, total, elapsed, layersArray) {
   var container = $$('.preloader-indicator-modal');
    /* var container = $$('#map');
    if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
     myApp.showProgressbar(container, 'yellow');
    /*var progress = document.getElementById('progress');
    var progressBar = document.getElementById('progress-bar');		*/
    if (elapsed > 1000) {
				// if it takes more than a second to load, display the progress bar:
		console.log(processed + '|'+total);		
        //progress.style.display = 'block';
				//progressBar.style.width = Math.round(processed/total*100) + '%';
			}
			if (processed === total) {
				// all markers processed - hide the progress bar:
				//progress.style.display = 'none';
                console.log("done");
     //           myApp.hideProgressbar();
			}
		}

function updDistancias(){
    if (typeof leafletView !== 'undefined'){
        var markers = leafletView.GetMarkers();
        var d;var pt;var options = {useEasing : true, useGrouping : true, separator : ',', decimal : '.',};
            for (var i = 0; i < markers.length; i++){
               pt = {"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [markers[i].position.lng, markers[i].position.lat]}};
               d = getDistance(pt);
               var anterior = parseFloat($$("#distancia_"+markers[i].data.id).text().replace(/,/g, ""));
               var t = Math.random() * (4 - 1) + 1;
               if (anterior !== d){
                    var numAnim = new CountUp("distancia_"+markers[i].data.id, anterior, d, 0, t, options);
                    numAnim.start();    
                }
            }
        // $$("#distancia_"+markers[i].data.id).html(d);
    }else{
        console.log("no calcula distancias porque la vista lefleatView no esta disponible y no puede leer los puntos en ella");
    }
    
}

function drawRoute(desLat, desLng){
    console.log(desLat + ' ' +desLng);
    $$("#btnFlipMap").click();
    ruta.setWaypoints([[position._latlng.lat,position._latlng.lng],[desLat, desLng]])
}


