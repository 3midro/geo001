/*var sendAJAX = function (URL, data, type, myfunction, bs, withCredentials) {
    type = (type !== null && type !== '')?type.toUpperCase():type;
    URL = (URL === null && URL === '')?'':URL;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
       }
    };
    xhttp.open(urlServices['serviceTest'].type, urlServices['serviceTest'].url, true);
    xhttp.send();
    
    
    
    
    
    $$.ajax({
        type: type.toString(),
        url: URL,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', //multipart/form-data, or text/plain
		//contentType: 'text/plain',
        dataType: 'json', //(xml, json, script, or html
        cache: false,
        async: true,
        xhrFields: {withCredentials: credential},
        crossDomain: true, //false si es mismo dominio, true  para forzar el uso de cross domain usar sonp
        data: data,
        beforeSend: function () {
            if (bs !== null && bs !== '') {
                bs(); //beforeSend function 
            }
        },
        success: function (dataJSON) {
            var dataBack = [{}];
            dataBack[0].operation = true;
            dataBack[0].datos = dataJSON;
            myfunction(dataBack);
        },
        error: function (xhr, ajaxOptions, thrownError) {
			var dataBack = [{}];
            dataBack[0].operation = false;
            dataBack[0].messages = ['Error de conexión'];
			myfunction(dataBack);
        },
        complete: function (xhr, status){
            //console.log(xhr + " | " + status);
        }

    });
};

var sendAJAXORIGINAL = function (URL, data, type, myfunction, bs, withCredentials) {
    if (type !== null && type !== '') {
        type = type.toUpperCase();
    }
    if (URL === null && URL === '') {
        return '';
    }
    var credential = false;
    if (typeof withCredentials !== 'undefined') {
        credential = false || withCredentials;

    }
    $$.ajax({
        type: type.toString(),
        url: URL,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', //multipart/form-data, or text/plain
		//contentType: 'text/plain',
        dataType: 'json', //(xml, json, script, or html
        cache: false,
        async: true,
        xhrFields: {withCredentials: credential},
        crossDomain: true, //false si es mismo dominio, true  para forzar el uso de cross domain usar sonp
        data: data,
        headers:{
            'Access-Control-Allow-Credentials':true
        },
        beforeSend: function () {
            if (bs !== null && bs !== '') {
                bs(); //beforeSend function 
            }
        },
        success: function (dataJSON) {
            var dataBack = [{}];
            dataBack[0].operation = true;
            dataBack[0].datos = dataJSON;
            myfunction(dataBack);
        },
        error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr);
			console.log(thrownError);
            console.log(ajaxOptions);
            var dataBack = [{}];
            dataBack[0].operation = false;
            dataBack[0].messages = ['Error de conexión'];
			//dataBack[0].messages =[thrownError];
            myfunction(dataBack);
        },
        complete: function (xhr, status){
            //console.log(xhr + " | " + status);
        }

    });
};*/

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

