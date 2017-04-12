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
            //-1 inicializa la base de datos local
                dblocal();
            
            //0 checkConnection()
                checkConnection();
            
            //1 el welcomeScreen
                welcomeScreen();
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
        
        //welcomeScreen
        //welcomeScreen();
        
    }
};
//local storage
var storage = window.localStorage;
app.initialize();

var dblocal = function(){
    //determina el color de la app (la que haya guardado el usuario)
    var color = storage.getItem('color');
    if (color !== null){
        //cambia el color al root
        var classList = $$('body')[0].classList;
        for (var i = 0; i < classList.length; i++) {
            if (classList[i].indexOf('theme') === 0) classList.remove(classList[i]);
        }
        classList.add('theme-' + color);
        //cambia el color a los badges
       // document.getElementsByClassName("bg-deeppurple").className = 'bg-' + color;
        
        var badges = document.getElementsByClassName("bg-deeppurple");
         for (var i = 0; i < badges.length; i++) {
             //badges[i].className ='bg-' + color;
             //replaceClass(badges[i], 'bg-deeppurple', 'bg-' + color);
              /*for (var j = 0; j < badges[i].classList.length; j++) {
                    badges[i].classList.remove(badges[i].classList[j]);
                }*/
             // badges[i].classList[j].add('bg-' + color);
            //badges[i].remove('bg-deeppurple').add('bg-' + color);
             //console.log("antes");
             //if (badges[i].indexOf('bg-deeppurple') === 0) classList.remove(classList[i]);
            //console.log(badges[i].classList);
             //replaceClass(badges[i], 'bg-deeppurple', 'bg-' + color);
             //addClass(badges[i], 'bg-' + color);
            // console.log("despues");
             //console.log(badges[i]);
         }
        
        
        
    }else{
        // inicializa el color en purpura
        storage.setItem('color', 'deeppurple');
    }
    color = storage.getItem('color')
    console.log(color);
    
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
    
    var map = L.map('map').setView([21.881272, -102.295468], 16);
//http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png --> xido
    //http://{s}.tile.osm.org/{z}/{x}/{y}.png ---> ejemplo
L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {}).addTo(map);
    
//L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map);

L.marker([21.881272, -102.295468]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
}

var welcomeScreen = function(){
    var myapp_ = new Framework7();
    var welcomescreen_slides = [
          {
            id: '0',
            //picture: '<div class="tutorialicon">♥ <i class="material-icons">person<sup>add</sup></i></div>',
            picture: '<div class="tutorialicon"><img src="img/logo_main_small.png"></div>',
            text: 'Bienvenido a Brindix<br> <br> Descubre todo lo que puedes hacer con esta increible app.'
          },
          {
            id: '1',
           picture: '<ul class="flex-container"><li class="flex-item"><i class="material-icons md-100">audiotrack</i></li><li class="flex-item"><i class="material-icons md-100">local_bar</i></li></ul>',
            text: '<div class="content-block-title">Lugares de consumo</div><div class="content-block">ubica todos los antros, discos y bares</div>'
            },
         {
            id: '2',
           picture: '<ul class="flex-container"><li class="flex-item"><i class="material-icons md-100">local_drink</i></li><li class="flex-item"><i class="material-icons md-100">store</i></li></ul>',
            text: '<div class="content-block-title">Lugares de adquisición</div><div class="content-block">ubica todas las vinaterias, modeloramas y abarrotes con venta de bebidas alcoholicas<br><br><a class="button button-big button-fill button-raised color-purple close-welcomescreen" href="#">COMENZAR</a></div>'
            }
        ];
    
    var options = {
      'bgcolor': '#6A1B9A',
      'fontcolor': '#fff',
        'closeButtonText': 'Omitir'
    }
  //  var welcomescreen = myapp_.welcomescreen(welcomescreen_slides, options);
};


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
}
