


var map;

  function getAddress(latLng) {
  	geocoder = new google.maps.Geocoder();

    geocoder.geocode( {'latLng': latLng},
      function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
          if(results[0]) {

            var addressSplit = results[0].formatted_address.split(",");
            var bairroFormatado = addressSplit[1].trim().split("-")
            var cidadeFormatado = addressSplit[2].trim().split("-")

            document.getElementById("logradouro").value = results[0].address_components[1].short_name;


            document.getElementById("bairro").value = results[0].address_components[2].short_name;
            document.getElementById("cidade").value = results[0].address_components[4].short_name+"/"+results[0].address_components[5].short_name;
          }
          else {
            document.getElementById("logradouro").value = "No results";
          }
        }
        else {
          alert(status);
        }
    });
  }
 

function initialize() {

  var mapOptions = {

    zoom: 15,
    zoomControl: false,
    scaleControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,

  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Try HTML5 geolocation

  if(navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {

      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

/*
      var infowindow = new google.maps.InfoWindow({

        map: map,

        position: pos,

        content: 'Você está aqui!'

      });
*/
      
      $("#localizacao").val(position.coords.latitude+","+position.coords.longitude);
      $("#map-canvas").html("<img src='http://maps.googleapis.com/maps/api/staticmap?center="+position.coords.latitude+","+position.coords.longitude+"&zoom=17&size=320x320&markers=color:blue|7Clabel:S|"+position.coords.latitude+","+position.coords.longitude+"&sensor=true' />")
      //http://maps.googleapis.com/maps/api/staticmap?center=-5,780451727305376,-35,19955158233631&zoom=13&size=400x400&markers=color:blue|7Clabel:S|-5.33153159,-35.859375&sensor=true

//      map.setCenter(pos);
      getAddress(pos);

    }, function() {

      handleNoGeolocation(true);

    });

  } else {

    // Browser doesn't support Geolocation

    handleNoGeolocation(false);

  }

}



function handleNoGeolocation(errorFlag) {

  if (errorFlag) {

    var content = 'Error: The Geolocation service failed.';

  } else {

    var content = 'Error: Your browser doesn\'t support geolocation.';

  }



  var options = {

    map: map,

    position: new google.maps.LatLng(60, 105),

    content: content

  };



  var infowindow = new google.maps.InfoWindow(options);

  map.setCenter(options.position);
  
  

}