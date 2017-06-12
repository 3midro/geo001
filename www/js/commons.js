var sendAJAX = function (URL, data, type, myfunction) {
    type = (type !== null && type !== '')?type.toUpperCase():type;
    URL = (URL === null && URL === '')?'':URL;
    var xhttp = new XMLHttpRequest();
    var dataBack = [{}];
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            console.log(this);
            if(this.status === 200){
                dataBack[0].operation = true;
                dataBack[0].datos =JSON.parse(this.responseText);    
            }else{
                dataBack[0].operation = false;
                dataBack[0].datos =['Error de conexión'];
            }
            myfunction(dataBack);
       }
    };
    xhttp.open(type, URL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
};

function $_GET(param) {
    url = document.URL;
    url = String(url.match(/\?+.+/));
    url = url.replace("?", "");
    url = url.split("&");
    x = 0;
    while (x < url.length)
    {
        p = url[x].split("=");
        if (p[0] == param)
        {
            return decodeURIComponent(p[1]);
        }
        x++;
    }
}

function getSerial(param, cadena) {
    cadena = cadena.split("&");
    var p, x = 0;
    while (x < cadena.length)
    {
        p = cadena[x].split("=");
        if (p[0] == param)
        {
            return decodeURIComponent(p[1]);
        }
        x++;
    }
}

/*var geoCoding = function(dir){
    return;
    var geocoder = new google.maps.Geocoder;
     geocoder.geocode( { 'address': dir}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
       console.log(results);
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
};*/

var ladas = [353,283,866,677,429,835,951,659,918,228,753,417,718,734,762,988,736,325,744,741,378,387,953,274,775,279,249,776,275,743,924,623,241,772,732,471,434,288,272,418,832,698,355,687,784,81,786,774,643,482,454,694,377,923,633,444,441,892,472,449,426,962,668,317,324,764,756,386,243,733,423,778,236,376,419,997,984,765,647,246,757,462,738,981,998,868,278,224,716,725,724,748,833,493,919,637,672,375,226,276,297,481,961,55,477,455,971,312,862,826,921,372,751,327,726,323,496,374,271,739,768,731,442,448,597,222,594,452,767,993,894,715,435,284,697,831,676,425,754,413,453,599,447,467,346,313,936,351,834,797,348,451,469,897,934,635,422,634,473,461,966,232,358,235,487,844,354,938,326,727,349,388,371,499,712,789,717,735,244,437,415,391,742,245,845,769,489,914,345,233,321,745,316,238,649,991,642,983,645,644,615,958,662,646,475,954,781,315,922,656,464,33,438,996,761,311,287,613,636,433,658,992,673,746,641,872,474,485,273,229,773,498,329,624,846,385,486,964,841,829,994,828,478,871,722,986,749,759,495,432,616,314,322,625,873,982,674,436,411,476,431,458,443,459,465,937,933,357,916,294,999,629,488,785,456,631,825,675,618,968,877,648,891,963,639,341,494,652,791,755,483,424,319,723,737,782,381,328,867,686,412,842,393,967,421,696,667,394,468,626,593,987,695,965,869,282,913,671,777,352,384,466,373,457,714,612,588,763,383,985,595,296,747,231,614,823,427,861,653,665,664,343,972,492,995,428,669,445,285,359,463,389,711,356,771,622,836,917,969,824,414,248,821,766,247,227,344,632,932,721,392,878,719,621,638,223,225,899,728,864,779,281,596,661,628,382,395,347,591,592,627,758,783,237,713,342,651];


var coloresStatusBar = {
    "red": "#B71C1C",
    "pink": "#AD1457",
    "purple":"#6A1B9A",
    "deeppurple": "#4527A0",
    "indigo": "#303F9F",
    "blue": "#1976D2",
    "lightblue": "#039BE5",
    "cyan":"#0097A7",
    "teal": "#00695C",
    "green": "#2E7D32",
    "lightgreen": "#689F38",
    "lime": "#AFB42B",
    "yellow":"#FDD835",
    "amber": "#FFA000",
    "orange": "#EF6C00",
    "deeporange": "#D84315",
    "brown": "#4E342E",
    "gray":"#757575",
    "bluegray": "#455A64",
    "black": "#212121",
};
var payWithTweet = function(){
    var p = storage.getItem('pay');
    //p = false;
    if (p !== "true"){
       var myapp_ = new Framework7();
        var welcomescreen_slides = [
            {
                id: '0',
                picture: '<div class="img-back-share"></div>',
                text: '<div class="tutorialicon"><img src="img/logo_main_small.png" style="width: 15%"></div><div class="content-block center"><h1>¡Brindix es gratuito!</h1> <small>Por favor ayúdanos compartiendo esto en tu muro para que tus amigos también disfruten de esta increible app</small></div><ul class="flex-container"><li class="flex-item" onclick="window.plugins.socialsharing.shareViaFacebook(\'Ya baje brindix! esta increible, pruebala tu también https://goo.gl/zn13y7\', null /* img */, null /* url */, function() {console.log(\'share ok\')}, function(errormsg){alert(errormsg)})"><a href="#" class="button button-big button-fill button-raised color-indigo close-welcomescreen" ><i class="fa fa-facebook-f fa-4x fa-login" ></i></a></li><li class="flex-item" onclick="window.plugins.socialsharing.shareViaTwitter(\'Ya baje brindix! esta increible, pruebala tu también https://goo.gl/zn13y7\')"><a href="#" class="button button-big button-fill button-raised color-cyan close-welcomescreen"><i class="fa fa-twitter fa-4x fa-login" ></i></a></li></ul>'
              }
            ];

        var options = {
          'bgcolor': '#6A1B9A',
          'fontcolor': '#fff',
          'closeButton': 'disable',    
          'closeButtonText': '',
          'onOpened':function(){
              //statusbar color temporal to purple
              StatusBar.backgroundColorByHexString(coloresStatusBar["gray"]);
          },
          'onClosed': function(){
               welcomeScreen();
          }
        }
      var welcomescreen = myapp_.welcomescreen(welcomescreen_slides, options); 
      storage.setItem('pay', true);
    }else{
        welcomeScreen();
    }
   
};
var welcomeScreen = function(){
    var w = storage.getItem('welcome');
    //w = false;
    if (w !== "true"){
        var myapp_ = new Framework7();
        var welcomescreen_slides = [
            {
                id: '0',
                picture: '<div class="img-back-01"></div>',
                text: '<div class="tutorialicon"><img src="img/logo_main_small.png"></div><div class="content-block center"><h1>¡Muchas Gracias!</h1><small>Brindix no contiene molesta publicidad gracias a tu valiosa ayuda</small></div>'
            },{
                id: '1',
                picture: '<div class="img-back-02"></div>',
                text: '<div class="tutorialicon"><i class="material-icons md-150">local_bar</i></div><div class="content-block center"><h1>¡Orienta tus emociones!</h1><small>Estas en el lugar perfecto para encontrar todos los establecimientos de venta & consumo de bebidas alcohólicas</small></div>'
            },{
                id: '2',
                picture: '<div class="img-back-03"></div>',
                text: '<div class="tutorialicon"><i class="material-icons md-150">local_pizza</i></div><div class="content-block center"><h1>Tú lugar, tú espacio</h1><small>Organiza tus eventos, invita a tus amigos y diviertete con nuestra app</small></div>'
            }/*,{
                id: '3',
                picture: '<div class="img-back-01"></div>',
                text: '<div class="tutorialicon"><i class="material-icons md-150">timer</i></div><div class="content-block center"><h1>¿Qué estás esperando?</h1><small>Inicia sesión y registrate utilizando tus redes sociales</small><h1>¡Es gratis!</h1></div><ul class="flex-container"><li class="flex-item col-30"><a href="#" class="button button-big button-fill button-raised color-indigo close-welcomescreen" ><i class="fa fa-facebook-f fa-4x fa-login" ></i></a></li><li class="flex-item col-30" ><a href="#" class="button button-big button-fill button-raised color-cyan close-welcomescreen"><i class="fa fa-twitter fa-4x fa-login" ></i></a></li><li class="flex-item col-30" ><a href="#" class="button button-big button-fill button-raised color-red"><i class="fa fa-google-plus fa-4x fa-login" ></i></a></i></a></li></ul>'
            }*/
            ];

        var options = {
          'bgcolor': '#6A1B9A',
          'fontcolor': '#fff',
          'closeButtonText': 'Omitir',
          'onOpened':function(){
              //statusbar color temporal to purple
              StatusBar.backgroundColorByHexString(coloresStatusBar["purple"]);
          },
          'onClosed': function(){
               setColor();
          }
        }
        
        var welcomescreen = myapp_.welcomescreen(welcomescreen_slides, options); 
        storage.setItem('welcome', true);
    }else{
        setColor();
    }
};
/*var bp;
var beforePosition = function(){
        var myapp_ = new Framework7();
        var welcomescreen_slides = [{
               id: '0',
               picture: '<div class="img-back-02"></div>',
               text: '<div class="tutorialicon"><i class="material-icons md-150">my_location</i></div><div class="content-block center"><h1>Tú lugar, tú espacio</h1><small>Estamos cargando la interfaz</small></div>'
            }];

        var options = {
          'bgcolor': '#6A1B9A',
          'fontcolor': '#fff',
          'closeButtonText': '',
          'onOpened':function(){
              //statusbar color temporal to purple
              StatusBar.backgroundColorByHexString(coloresStatusBar["purple"]);
          }
        }
     bp = myapp_.welcomescreen(welcomescreen_slides, options); 
        createMap();
};*/ // NO EN USO

var setColor = function(colprev){
    colprev = (typeof colprev !== 'undefined')?colprev:'deeppurple';
    var color = storage.getItem('color');
    if (color !== null){
        //console.log("colprev:" + colprev + " a color " + color);
        var classList = $$('body')[0].classList;
        //console.log(classList);
        for (var i = 0; i < classList.length; i++) {
           // console.log(classList[i]);
            if (classList[i].indexOf('theme') === 0) classList.remove(classList[i]);
        }
        classList.add('theme-' + color);
        //chip user
        $$('#chipUser').removeClass('bg-' + colprev).addClass('bg-' + color); 
        $$('.demo-mark').removeClass('bg-' + colprev).addClass('bg-' + color);
       // $$(".my-div-icon-cte").removeClass('bg-' + colprev).addClass('bg-' + color);
        //badges y elements
        var elements = document.getElementsByClassName("theme-" + colprev);
        var total = elements.length;
        for (var j = 0; j < total; j++) {
                $$(elements[0]).removeClass('theme-' + colprev).addClass('theme-' + color);
                
         }
        //statusbar color
        StatusBar.backgroundColorByHexString(coloresStatusBar[color]);
        //beforePosition();
         createMap();
        
    }else{
        // inicializa el color en purpura
        storage.setItem('color', 'deeppurple');
        setColor('deeppurple');
    }
}

var intro = function(){
    myApp.closePanel('left');
    var myApp_ = new Framework7({
        pushState: true,
        swipePanel: 'left'
    });
    var tourSteps = [
    {
        step: 0, 
        header: '1st Tour Step', 
        message: 'This is our first tour step.<br />Please click "next" or "back" to move forward and backwards respectively', 
        //element: "body > div.views > div > div.toolbar > div > a:nth-child(1)", 
        //element: "body > div.views > div.view > div.pages > div.page > div.page_content > div.flip-container > div.flipper > div.front_ > div.leaflet-container > div.leaflet-control-container > div.leaflet-bottom.leaflet-left ", 
        element: "body > div.views > div.view-main > div.pages > div.page > div.navbar", 
        action: function ()
        {
            console.log('Started guided tour');
            console.log('Step 0');
        }
    }, 
    {
        step: 1, 
        header: '2nd Tour Step', 
        message: 'This is our seconds tour step.<br />You can use icons and images too! Wow!<br /><br /> F7 Icon:<br /> <i class="icon icon-back"></i><br /><br />Image:<br /> <div style="background-image: url(http://cdn.framework7.io/i/logo-new.png); width: 100px; height: 100px; background-size: cover; margin: 0 auto";></div><br />Please click "next" or "back" to move forward and backwards respectively', 
       // element: "body > div.views > div > div.navbar > div > div.right > a", 
         element: "body > div.views > div.view-main > div.pages > div.page > div.navbar", 

        action: function ()
        {
            console.log('Step 1');
        }
    }, 
    {
        step: 2, 
        header: '3rd and Final Step', 
        message: 'Congratulations! You have finished your Tour Guide tutorial. Enjoy it :D', 
        //element: "body > div.views > div > div.navbar > div > div.right > a", 
         element: "body > div.views > div.view-main > div.pages > div.page > div.navbar", 

        action: function ()
        {
            console.log('Step 2');
            console.log('Last step on guided tour');
        }
    }];
    var options = {previousButton: true};
    var tourguide = myApp_.tourguide(tourSteps, options);
    tourguide.showTour();
    
}












