var Page1Controller = function () {};

Page1Controller.prototype = {
	onScroll: Function,
	self: Object,
	initialize: function () {
		self = this;
		//scroll listener
		//FG.$scrollApp.addEventListener("scroll", self.onScroll);


		$(document).delegate('.multar', 'click', function(e) {
		    
			var placa = $("input[name='letras']").val()+'-'+$("input[name='numeros']").val();
			var latitude = $("input[name='latitude']").val();
			var longitude = $("input[name='longitude']").val();
			var condutor = $("input[name='condutor']").val();
			var infracao = $("select[name='infracao']").val();
			var imagem = $("#imagem").attr('src');


			var url = "http://localhost:8000/multar/";

			$.ajax( {
				url:"http://192.168.1.106:8000/multar/" ,
				type: "POST",
				data: {
    				placa:placa, 
    				latitude:latitude,
    				longitude:longitude,
    				condutor:condutor,
    				infracao:infracao,
    				
		    	},  
		    	crossDomain: true,
		    	success: function( data ) {
					console.log( data );
				}
			});

			$( document ).ajaxError(function( event, jqxhr, settings, exception ) {
				console.log(jqxhr)
				console.log(settings)
				console.log(exception)
			});

/*
		    $.post(url, {
		    				placa:placa, 
		    				latitude:latitude,
		    				longitude:longitude,
		    				condutor:condutor,
		    				imagem:imagem,
		    				infracao:infracao

		    			}, 
		    	function(response){

			    	console.log(response);
		    	});
*/

		});





	},
	onScroll: function (e) {
		//checkscrol
	},
	destroy: function () {
		// unset events
		// stop ajax
		//remove listener scroll
		//FG.$scrollApp.removeEventListener("scroll", self.onScroll);
		PageLoad.ajxHandle = null;
	}
};