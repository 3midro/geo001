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
        if (id==='deviceready'){
            //dispositivo esta listo 
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
        console.log('Received Event: ' + id);
        //welcomeScreen
        //welcomeScreen();
        
    }
};

app.initialize();

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