function base_datos () {
$('#administracion').empty();
$('#Empleados').empty();
$('#inicio').empty();
$('#permisos').empty();
$('#listar_nomina').empty();
$('#vacaciones').empty();
$('#nomina_especial').empty();
$('#creditos').empty();
$('#nomina_empleados').empty();
$('#listar_pagos_empleados').empty();
$('#nomina_partidas').empty();
$('#listar_nomina_partidas').empty();
$('#listar_pagos').empty();
$('#calculadora').empty();




$("div").remove( ".modal-backdrop" );

$("#base_datos").html(
	'<div class="row">'
  +'<div class="col-md-12 text-center">'
    +'<h2 class="page-header"> Respaldar Base de Datos </h2>'
  +'</div>'
+'</div>'

     + '<div class="row">'
     + '<div class="col-md-12 text-center"></div>'
     + '<div class="panel panel-default">'
        +'<div class="panel-heading">'
         +' <strong>Base de datos</strong>'
        +'</div>'
       + '<div class="panel-body">'
      
       		+'<div class="row">'
       		+'<div class="col-md-6 text-center">'

       		+'<button class="btn btn-success" onclick="respaldar()"> Respaldar</button>'

       		+'</div>'
			+'<div class="col-md-6 text-center">'

			+'<button class="btn btn-warning" onclick="restaurar()"> Recuperar</button>'

       		+'</div>'
       		+'</div>'


    + ' </div>'
    + ' </div>'
    +'</div>'

);

}

function respaldar () {

  if (confirm("¿Esta seguro que desea respaldar la base de datos?")) {
$.ajax({
    type: "POST",
    url:"clases/base_datos.class.php?resp=111",
    data:"",                   
    global:false,
    async: false,
/*   dataType: "json",
*/   success: function(data) {                             
        console.log(data);
        alert("Respaldo Exitoso");

    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});

};
}

function restaurar () {


$.ajax({
    type: "POST",
    url:"clases/base_datos.class.php?resp=222",
    data:"",                   
    global:false,
    async: false,
/*   dataType: "json",
*/   success: function(data) {                             
        console.log(data);
        alert("Restauracion Exitoso");

    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});


}