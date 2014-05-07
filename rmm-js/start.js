var pictureSource;   // picture source
var destinationType; // sets the format of returned value

var lib = new localStorageDB("transit1", localStorage);
var listaAutoacoes = [];

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    //checkConnection();
}