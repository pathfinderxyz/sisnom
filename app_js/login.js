function validar_login (user,pass) {
	$("#form_login #entrar").html('<i class="fa fa-spinner fa-spin" style="font-size:20px"></i>').addClass('disabled');
	$.ajax({
		url: 'validar_login.php',
		dataType: 'json',
		data: {
			login: 1,
			user: user,
			pass: pass,
		},
	}).done(function(resp) {
		if (resp.status == 0) {//Error usuario incorrecto
			$("#alert").hide();
			$("#form_login #entrar .fa-spin").remove();
			$("#form_login #entrar").html('Entrar');
			$("#form_login #entrar").removeClass('disabled');
			$('#alert2').slideDown(1000);
		}else if(resp.status == 1){//Usuario Valido

			if (resp.nivel==1) {
			localStorage.itemMenu = 1;
			window.location.href = 'main.php';
			};

			if (resp.nivel==2) {
			localStorage.itemMenu = 1;
			window.location.href = 'asistente_I.php';
			};
			if (resp.nivel==3) {
			localStorage.itemMenu = 1;
			window.location.href = 'asistente_II.php';
			};
			if (resp.nivel==4) {
			localStorage.itemMenu = 1;
			window.location.href = 'analista.php';
			};

		}
	});
}

//documento cargado
$(document).ready(function() {
	//funcion click
	$('#entrar').click(function() {
		var user = $("#user").val();
		var pass = $("#pass").val();
		if (user == "" || pass == "") {
			$("alert2").hide();
			$('#alert').slideDown(1000);
		}else{
			validar_login(user,pass);
		}
	});




	//funcion tecla enter
	$(function(){
		$('#pass').keypress(function (e) {
			var key = e.which;
 				if(key == 13){
 					var user = $("#user").val();
 					var pass = $("#pass").val();
 						if (user == "" || pass == "") {
 							$("alert2").hide();
 							$('#alert').slideDown(1000);
 						}else{
 							validar_login(user,pass);
 						}
 				return false;  
 				}
		});
	});

$(function(){
		$('#user').keypress(function (e) {
			var key = e.which;
 				if(key == 13){
 					var user = $("#user").val();
 					var pass = $("#pass").val();
 						if (user == "" || pass == "") {
 							$("alert2").hide();
 							$('#alert').slideDown(1000);
 						}else{
 							validar_login(user,pass);
 						}
 				return false;  
 				}
		});
	});



});
