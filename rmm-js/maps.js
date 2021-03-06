
  function initialize(){

    try {

       navigator.geolocation.getCurrentPosition(onSuccess, onError);

        function onSuccess(position) {
          $("#localizacao").val(position.coords.latitude+","+position.coords.longitude);
          $("#map-canvas").html("<img src='http://maps.googleapis.com/maps/api/staticmap?center="+position.coords.latitude+","+position.coords.longitude+"&zoom=17&size=300x200&markers=color:blue|7Clabel:S|"+position.coords.latitude+","+position.coords.longitude+"&sensor=true' />")
          getAddress(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        }

        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
    
    }catch(err) {
        console.log(err);
        getLocalizationHTML()
    }
  }

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
 

function getLocalizationHTML() {
  if(navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {

      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      $("#localizacao").val(position.coords.latitude+","+position.coords.longitude);
      $("#map-canvas").html("<img src='http://maps.googleapis.com/maps/api/staticmap?center="+position.coords.latitude+","+position.coords.longitude+"&zoom=17&size=300x200&markers=color:blue|7Clabel:S|"+position.coords.latitude+","+position.coords.longitude+"&sensor=true' />")

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

}