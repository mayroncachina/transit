var map;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value

var lib = new localStorageDB("bancodedados", localStorage);
var listaAutoacoes = [];

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    
    if( lib.isNew() ) {
	    lib.createTable("autoacoes", ["cod", "placa", "marca", "veiculo", "rua", "bairro", "cidade", "localicacao", "infracao", "imagem", "data"]);

	    json = {
	        cod : '-1',
	        marca: '-',
	        placa :  '-',
	        veiculo :  '-',
	        rua : '-',
	        bairro : '-',
	        cidade : '-',
	        localizacao : '-',
	        infracao :  '-',
	        imagem : '-',
	        data: '-',

	      };

	    lib.insert("autoacoes", json);

		lib.commit();

	}

    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
 }