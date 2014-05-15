function limparTelaOcorrencias(){
	
    $("#placa-sufix").val('');
    $("#placa-prefix").val('');
    $("#obs").val('');
    $("#veiculo").val('');
    $("#marca").val('0');
    $("#marca").trigger('change');
    $("#infracao").val('0');
    $("#infracao").trigger('change');
    $("#smallImage").attr('src','');
    
	$("#retorno").hide();
	sleep(500);
    $('.multar-cadastro').show()
	$.mobile.changePage( "#multar", { transition: "slide" });
	$(".ocorrencia").html('');

}

function gravarOcorrencia(){

	var d = new Date();
	var n = d.getTime();
	var codigo = "NAT01"+n;

	var lzwCompress = window.lzwCompress;

	var compressed = lzwCompress.pack($("#smallImage").attr('src'));
	//var original = lzwCompress.unpack(compressed);
	//console.log(original);

	placa = $("#placa-prefix").val() + $("#placa-sufix").val()
	
	json = {
	        cod : codigo,
	        marca: $("#marca").val(),
	        placa :  placa,
	        veiculo :  $("#veiculo").val(),
	        rua : $("#logradouro").val(),
	        bairro : $("#bairro").val(),
	        cidade : $("#cidade").val(),
	        localizacao : $("#localizacao").val(),
	        infracao :  $("#infracao").val(),
	        obs:   $("#obs").val(),
	        imagem : compressed,
	        data: d,

	      };

	lib.insert("autoacoes", json);

	lib.commit();
	$('.multar-cadastro').hide()
	$(".ocorrencia").html(codigo);
	$("#retorno").show();
    

}

function getQtdMultas(){

	var qtdRegistro = lib.rowCount("autoacoes");

	$(".qtd").html(qtdRegistro);

}

function getMultas(){

	var lista = lib.query("autoacoes", function(row) {
	    if(row.cod != -1) {
	        return true;
	    } else {
	        return false;
	    }
	});
	
	var lzwCompress = window.lzwCompress;

	if(lista.length > 0){
		
		$("#btn-exportar").show();

		var linha = '<li data-role="list-divider" data-theme="a">Multas Aplicadas</li>';
		for (var i = lista.length - 1; i >= 0; i--) {
			listaAutoacoes.push(lista[i]);
			console.log(listaAutoacoes)
			var original = lzwCompress.unpack(lista[i].imagem);
			var dataOcorrencia = new Date(lista[i].data);
			linha += "<li><img src='"+original+"' width='80'><h2>"+lista[i].cod+"</h2> <p>"+ dataOcorrencia.toLocaleString() +"</p><p>Infração: "+lista[i].infracao+"</p></li>";
		};


		$("#multas").html(linha);
		$('#multas').listview('refresh');

	}else{

		$("#multas").html("<h1 class='center top50'>SEM MULTAS CADASTRADAS</h1>");
		$("#btn-exportar").hide();
	}

}
function exportarMultas(){

	var internet = getNumConnection();

	if(internet > 0 ){

		$("#export").show();
		$("#multas").hide();
		$(".log").append("<p>Validando Conexão com a Internet...</p>")
		getQtdMultas();
		sleep(2000);
		$(".txtExport").show();
		for (var i = listaAutoacoes.length - 1; i >= 0; i--) {

			exportar(listaAutoacoes[i]);
		};
	}else{
		alert('SEM CONEXAO');
	}


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
	        obs:   obj.obs,
	        veiculo :  "",
	        infracao :  obj.infracao,

	      }, 
	      function( data ) {

	        $(".log").append("<p>"+data+"</p>");

	  });


}

function validar(){
	$(".multar-cadastro").hide()
	$("#validacao").show()
}

function postar(){

	if(localStorage.getItem('matricula') == $("#matricula-conferir").val()){
		
		$( "#validacao" ).hide();

		var internet = getNumConnection();

		if(internet > 0 ){

			$( "#loading" ).show();
			$(".multar-cadastro").hide();

			var d = new Date();
			var n = d.getTime();
			var codigo = "NAT01"+n;
			var placa = $("#placa-prefix").val() + $("#placa-sufix").val()
		  $.post( "http://sandbox.cachina.com.br/transit/index.php",

		      {
		      	codigo: codigo,
		      	marca: $("#marca").val(),
		        imagem : $("#smallImage").attr('src'),
		        bairro : $("#bairro").val(),
		        logradouro : $("#logradouro").val(),
		        cidade : $("#cidade").val(),
		        localizacao : $("#localizacao").val(),
		        placa :  placa,
		        veiculo :  $("#veiculo").val(),
		        infracao :  $("#infracao").val(),
		        obs:   $("#obs").val(),

		      }, 
		      function( data ) {
		      	$("#loading" ).hide();
		        $(".ocorrencia").html(data);
		        $("#retorno").show();

		  });

		}else{

			gravarOcorrencia();
		}

	}else{
		alert("MATRICULA NÃO CONFERE!")
		$.mobile.changePage( "#login", { transition: "slide" });
	}
}


function truncate(){
	lib.truncate();
	lib.commit();
	alert("BANCO DE DADOS APAGADO")
	$.mobile.changePage( "#home", { transition: "slide", changeHash: false });

}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}