function creditos () {

event.preventDefault();
$('#administracion').empty();
$('#Empleados').empty();
$('#inicio').empty();
$('#permisos').empty();
$('#listar_nomina').empty();
$('#vacaciones').empty();
$('#nomina_especial').empty();
$('#listar_pagos').empty();
$('#nomina_empleados').empty();
$('#listar_pagos_empleados').empty();
$('#nomina_partidas').empty();
$('#listar_nomina_partidas').empty();
$('#base_datos').empty();
$('#calculadora').empty();



$( "div" ).remove( ".modal-backdrop" );

$("#creditos").html(
	'<div class="row">'
  +'<div class="col-md-12 col-sm-12 col-xs-12">'
    +'<h2 class="page-header"> Creditos Registrados </h2>'
  +'</div>'
+'</div>'

     + '<div class="row">'
     + '<div class="col-md-12 col-sm-12 col-xs-12"></div>'
     + '<div class="panel panel-default">'
        +'<div class="panel-heading">'
         +' <strong>Creditos</strong>'
        +'</div>'
       + '<div class="panel-body  col-sm-12 col-xs-12">'
      +'<table id="tabla_creditos" cellpadding="0" cellspacing="0" border="0" class="table table-condesend table-responsive table-bordered table-striped">'
        +'<thead>'
          +'<tr>'
           + '<th>Codigo</th>'
           + '<th>Partida</th>'
           + '<th>Codigo</th>'
           + '<th>Cedula</th>'
		   + '<th>Fecha Creditos</th>'
		   + '<th>Credito</th>'
		   + '<th>Cuotas</th>'
		   + '<th>Restantes</th>'
           + '<th>Acciones</th>'
          +'</tr>'
        +'</thead>'
       + '<tbody>'
        +'</tbody> ' 
     +' </table> '
    + ' </div>'
    + ' </div>'
    +'</div>'

);


$('#tabla_creditos').dataTable({

"ajax": "clases/credito_empleado.class.php?resp=11",         
           "columns": [
            { "data": "cod_partida" },
           { "data": "partida" },
            { "data": "cod_empleado" },
            { "data": "cedula" },
            { "data": "fecha_credito" },  
            { "data": "monto_credito" },  
            { "data": "cant_de_cuotas" },  
            { "data": "cant_cuotas_restantes" },  
            { "data": "acciones" },
            ]

});


}

function actualizar_credito (cod_empleado,fecha_credito,cod_partida) {

console.log(cod_empleado,fecha_credito,cod_partida);

var parametros = {

	"cod_empleado":cod_empleado,
	"fecha_credito":fecha_credito,
	"cod_partida":cod_partida

};
      $.ajax({
        type: "POST",
        url:"clases/credito_empleado.class.php?resp=12",
        data: parametros,                   
        global:false,
        async: false,
/*        dataType: "json",
*/        success: function(data) {                             

          console.log(data);
          alert(data);

        },
        error:function (xhr, ajaxOptions, thrownError){
          alert(xhr.status);
          alert(thrownError);
        }
      }); 


}