function gravarOcorrencia(){

	var d = new Date();
	var n = d.getTime();
	var codigo = "NAT01"+n;
	// Check if the database was just created. Useful for initial database setup
	if( lib.isNew() ) {
	    lib.createTable("autoacoes", ["cod", "placa", "marca", "veiculo", "rua", "bairro", "cidade", "localicacao", "infracao", "imagem", "data"]);
	}



	var lzwCompress = window.lzwCompress;

	var compressed = lzwCompress.pack($("#smallImage").attr('src'));
	//var original = lzwCompress.unpack(compressed);
	//console.log(original);

	
	json = {
	        cod : codigo,
	        marca: $("#marca").val(),
	        placa :  $("#placa").val(),
	        veiculo :  $("#veiculo").val(),
	        rua : $("#logradouro").val(),
	        bairro : $("#bairro").val(),
	        cidade : $("#cidade").val(),
	        localizacao : $("#localizacao").val(),
	        infracao :  $("#infracao").val(),
	        imagem : compressed,
	        data: d,

	      };


	lib.insert("autoacoes", json);

	lib.commit();

	$("#loading" ).hide();
	$(".ocorrencia").html(data);
	$("#retorno").show();
    

}

function getQtdMultas(){
	if( lib.isNew() ) {
	    lib.createTable("autoacoes", ["cod", "placa", "marca", "veiculo", "rua", "bairro", "cidade", "localicacao", "infracao", "imagem", "data"]);
	}

	var qtdRegistro = lib.rowCount("autoacoes");

	$(".qtd").html(qtdRegistro);

}

function getMultas(){
	
	if( lib.isNew() ) {
	    lib.createTable("autoacoes", ["cod", "placa", "marca", "veiculo", "rua", "bairro", "cidade", "localicacao", "infracao", "imagem", "data"]);
	}
	var lista = lib.query("autoacoes");

	var lzwCompress = window.lzwCompress;

	var linha = '<li data-role="list-divider" data-theme="a">Multas Aplicadas</li>';
	for (var i = lista.length - 1; i >= 0; i--) {
		listaAutoacoes.push(lista[i]);
		console.log(listaAutoacoes)
		var original = lzwCompress.unpack(lista[i].imagem);
		linha += "<li><img src='"+original+"' width='80'><h2>"+lista[i].cod+"<span class='ui-li-count'><img src='images/sync.png'></span></h2> <p>"+ lista[i].data +"</p></li>";
	};


	$("#multas").html(linha);
	$('#multas').listview('refresh');

}
function exportarMultas(){

	$("#export").show();
	$("#multas").hide();
	$(".log").append("<p>Validando Conexão com a Internet...</p>")
	getQtdMultas();
	sleep(2000);
	$(".txtExport").show();
	for (var i = listaAutoacoes.length - 1; i >= 0; i--) {

		exportar(listaAutoacoes[i]);
		sleep(500);
	};


}


function exportar(obj){

	var lzwCompress = window.lzwCompress;
	var original = lzwCompress.unpack(obj.imagem);
	  $.post( "http:///sandbox.cachina.com.br/transit/index.php",

	      {
	      	exportar : true,
	      	codigo : obj.codigo,
	      	marca: obj.marca,
	        imagem : original,
	        bairro : obj.bairro,
	        logradouro : obj.rua,
	        cidade : obj.cidade,
	        localizacao : obj.localicacao,
	        placa :  obj.placa,
	        veiculo :  "",
	        infracao :  obj.infracao,

	      }, 
	      function( data ) {

	        $(".log").append("<p>"+data+"</p>");

	  });


}

function postar(){

	var internet = getNumConnection();

	if(internet > 0 ){

		$( "#loading" ).show();
		$(".multar-cadastro").hide();

		var d = new Date();
		var n = d.getTime();
		var codigo = "NAT01"+n;
	  $.post( "http://sandbox.cachina.com.br/transit/index.php",

	      {
	      	codigo: codigo,
	      	marca: $("#marca").val(),
	        imagem : $("#smallImage").attr('src'),
	        bairro : $("#bairro").val(),
	        logradouro : $("#logradouro").val(),
	        cidade : $("#cidade").val(),
	        localizacao : $("#localizacao").val(),
	        placa :  $("#placa").val(),
	        veiculo :  $("#veiculo").val(),
	        infracao :  $("#infracao").val(),

	      }, 
	      function( data ) {
	      	$("#loading" ).hide();
	        $(".ocorrencia").html(data);
	        $("#retorno").show();

	  });

	}else{

		gravarOcorrencia();
	}
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}