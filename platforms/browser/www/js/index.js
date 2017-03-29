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
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        //welcomeScreen
        welcomeScreen();
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

var welcomeScreen = function(){
    var myapp = new Framework7();
    var welcomescreen_slides = [
          {
            id: '0',
            //picture: '<div class="tutorialicon">♥ <i class="material-icons">person<sup>add</sup></i></div>',
            picture: '<div class="tutorialicon"><img src="img/logo_main_small.png"></div>',
            text: 'Bienvenido a Brindix!.<br> <br> Te guiaremos a través de esta guia para que puedas utilizar la app.'
          },
          {
            id: '1',
           // picture: '<div class="tutorialicon">✲</div>',
              picture: '<div class="tutorialicon"><i class="material-icons md-200">directions_walk</i></div>',
            text: 'Encuentra los lugares más cercanos a ti'
          },
          {
            id: '2',
            //picture: '<div class="tutorialicon">♫</div>',
              picture: '<div class="tutorialicon"><i class="material-icons md-200">audio_track</i> <i class="material-icons md-200">local_drink</i> </div>',
            text: 'Ubica los lugares donde puedes <strong>CONSUMIR</strong> bebidas alcoholicas'
          },
          {
            id: '3',
           // picture: '<div class="tutorialicon">☆</div>',
              picture: '<div class="tutorialicon"><i class="material-icons md-200">audio_track</i> <i class="material-icons md-200">local_drink</i> </div>',
            text: 'Ubica los lugares donde puedes <strong>COMPRAR</strong> bebidas alcoholicas'
          },
          {
            id: '4',
           // picture: '<div class="tutorialicon">☆</div>',
              picture: '<div class="tutorialicon"><i class="material-icons md-250">account_circle</i></div>',
            text: 'Thanks for reading! Enjoy this app.<br><br><a id="tutorial-close-btn" href="#">End Tutorial</a>'
          }
        ];
    
    var options = {
      'bgcolor': '#6A1B9A',
      'fontcolor': '#fff'
    }
    var welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);
};