function gravarOcorrencia(){
	

	var lib = new localStorageDB("t0", localStorage);

	var d = new Date();
	var n = d.getDay()+""+d.getHours()+""+d.getMinutes()+""+d.getSeconds()+""+d.getMilliseconds();

	var codigo = "NAT01"+n;

	// Check if the database was just created. Useful for initial database setup
	if( lib.isNew() ) {
	    lib.createTable("autoacoes", ["cod", "placa", "veiculo", "rua", "bairro", "cidade", "localicacao", "infracao", "imagem", "data"]);
	}

	json = {
	        cod : codigo,
	        placa :  $("#placa").val(),
	        veiculo :  $("#veiculo").val(),
	        rua : $("#logradouro").val(),
	        bairro : $("#bairro").val(),
	        cidade : $("#cidade").val(),
	        localizacao : $("#localizacao").val(),
	        infracao :  $("#infracao").val(),
	        //imagem : $("#smallImage").attr('src'),
	        data: d,

	      };

	lib.insert("autoacoes", json);

	lib.commit();

    $(".main").hide();
    $(".ocorrencia").html(codigo);
    $("#retorno").show();

	console.log("--------------------------------------------");
	console.log(lib.query("autoacoes"));
}

function getQtdMultas(){
	

	var lib = new localStorageDB("t0", localStorage);
	if( lib.isNew() ) {
	    lib.createTable("autoacoes", ["cod", "placa", "veiculo", "rua", "bairro", "cidade", "localicacao", "infracao", "imagem", "data"]);
	}
	var lista = lib.query("autoacoes");
	var qtdRegistro = lib.rowCount("autoacoes");

	$(".qtd").html(qtdRegistro);

	var linha = '<li data-role="list-divider" data-theme="a">Multas Aplicadas</li>';
	for (var i = lista.length - 1; i >= 0; i--) {
		linha += "<li>"+lista[i].cod+" - ("+ lista[i].data +")</li>";
	};

	console.log(linha);
	$("#multas").html(linha);
	$('#multas').listview('refresh');
}

function postar(){

	var internet = false;

	if(internet){

	  $.post( "http:///sandbox.cachina.com.br/transit/index.php",

	      {
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

	        $("#main").hide();
	        $(".ocorrencia").html(codigo);
	        $("#retorno").show();

	  });

	}else{
	
		gravarOcorrencia();
	}
}


$( document ).ajaxStart(function() {
  $( "#loading" ).text( "Triggered ajaxStart handler." );
  $("#main").hide();
  $("#retorno").hide();
  $( "#loading" ).show();
});

$( document ).ajaxStop(function() {
  $( "#loading" ).hide();
});