function nomina_partidas () {

event.preventDefault();
$('#administracion').empty();
$('#Empleados').empty();
$('#inicio').empty();
$('#permisos').empty();
$('#listar_pagos').empty();
$('#vacaciones').empty();
$('#nomina_especial').empty();
$('#creditos').empty();
$('#nomina_empleados').empty();
$('#listar_pagos_empleados').empty();
$('#listar_nomina').empty();
$('#base_datos').empty();
$('#calculadora').empty();





$( "div" ).remove( ".modal-backdrop" );

$("#nomina_partidas").html(
  '<div class="row">'
  +'<div class="col-md-12">'
    +'<h2 class="page-header"> Reporte por Partidas</h2>'
  +'</div>'
+'</div>'

  +'<div class="row">'
  +'<div class="col-md-6">'
      +'<div class="form-group input-group">'
          +'<select id="partida_pago" class="form-control">'
			+'<option value="0">Seleccione</option>'
          +'</select>'
          +'<span class="input-group-btn">'
              +'<button class="btn btn-default" onclick="buscar_partida_pago()" type="button"><i class="fa fa-search"></i>'
              +'</button>'
          +'</span>'
      +'</div>'
  +'</div>'

  +'<div class="row">'
  +'<div class="col-md-12">'
      +'<hr/>'
  +'</div>'
+'</div>'


);


$.ajax({
    type: "POST",
    url:"clases/partida.class.php?resp=3",
    data:"",                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);

        $.each(data, function (i, data) {
            $('#partida_pago').append($('<option>', { 
                value: data.id,
                text : data.partida 
            }));
        });
    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});

}

function buscar_partida_pago () {

	
	console.log($("#partida_pago").val());
	var cod_partida = $("#partida_pago").val();

	$("#listar_nomina_partidas").html(
  '<div class="row">'
  +'<div class="col-md-12">'
    +'<h2 class="page-header"> Historial de Pagos </h2>'
  +'</div>'
+'</div>'

     + '<div class="row">'
     + '<div class="col-md-12"></div>'
     + '<div class="panel panel-default">'
        +'<div class="panel-heading">'
         +' <strong>Pagos</strong>'
        +'</div>'
       + '<div class="panel-body">'
      +'<table id="tabla_pago_partida" cellpadding="0" cellspacing="0" border="0" class="table table-condesend table-responsive table-bordered table-striped">'
        +'<thead>'
          +'<tr>'
           + '<th>Codigo</th>'
           + '<th>Partida</th>'
           + '<th>N° Integrantes</th>'
           + '<th>Pagado</th>'
           + '<th>Fecha Pago</th>'
           + '<th>Periodo inicio</th>'
           + '<th>Periodo Final</th>'
          +'</tr>'
        +'</thead>'
       + '<tbody>'
        +'</tbody> ' 
     +' </table> '
    + ' </div>'
    + ' </div>'
    +'</div>'

);





$('#tabla_pago_partida').dataTable({

"ajax": "clases/pago.class.php?resp=40&cod_partida="+cod_partida+"",         
           "columns": [
            { "data": "cod_partida" },
            { "data": "partida" },
            { "data": "total_integrantes" },
            { "data": "total_pagado" },
            { "data": "fecha_pago" },  
            { "data": "periodo_inicio" },  
            { "data": "periodo_final" },  
            ]

});

}

function pago_partidas_ver (cod_partida,fecha_pago,periodo_inicio,periodo_final) {


/*$cod_partida,$id_tipo_nomina,$id_banco,$fecha_pago,$periodo_inicio,$periodo_final
*/


$("#ver_nomina_partidas").html(
/////////////////////////////////////////////////////////////MODAL TIPO DE NOMINA
'<div class="modal fade" id="modal_ver_pago_partidas" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Seleccione</h4>'
      +'</div>'
      +'<div class="modal-body">'
+'<form id="form_tipo_nomina_partida">'

        +'<div class="form-group">'
          +'<label for="tipo_nomina_partida"><strong>Tipo de Nomina: </strong></label>'
          +'<select class="form-control" name="tipo_nomina_partida" id="tipo_nomina_partida">'
            +'<option value="0">Seleccione</option>'
          +'</select>'
        +'</div>'


        +'<div class="form-group">'
          +'<label for="banco_partida"><strong>Banco: </strong></label>'
          +'<select class="form-control" name="banco_partida" id="banco_partida">'
            +'<option value="0">Seleccione</option>'
          +'</select>'
        +'</div>'


      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" id="nomina_resumen_partida" class="btn btn-primary pull-rigth">Generar</button>'
      +'</div>'
+'</form>'
    +'</div>'
  +'</div>'
+'</div>'

);

parametros = {
"cod_partida":cod_partida,
"fecha_pago":fecha_pago,
"periodo_inicio":periodo_inicio,
"periodo_final":periodo_final
};

$.ajax({
    type: "POST",
    url:"clases/pago.class.php?resp=98",
    data:parametros,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);

        $.each(data, function (i, data) {
            $('#tipo_nomina_partida').append($('<option>', { 
                value: data.id,
                text : data.tipo_nomina 
            }));
        });
    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});

parametros2 = {
"cod_partida":cod_partida,
"fecha_pago":fecha_pago,
"periodo_inicio":periodo_inicio,
"periodo_final":periodo_final
};

$.ajax({
    type: "POST",
    url:"clases/pago.class.php?resp=99",
    data:parametros2,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);

        $.each(data, function (i, data) {
            $('#banco_partida').append($('<option>', { 
                value: data.id,
                text : data.nombre_banco 
            }));
        });
    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});


$("#nomina_resumen_partida").on("click", function () {

console.log(cod_partida,fecha_pago,periodo_inicio,periodo_final);
var  id_banco = $("#banco_partida").val();
var id_tipo_nomina = $("#tipo_nomina_partida").val();



parametros3 = {
"cod_partida":cod_partida,
"fecha_pago":fecha_pago,
"periodo_inicio":periodo_inicio,
"periodo_final":periodo_final,
"id_banco":id_banco,
"id_tipo_nomina":id_tipo_nomina
};

$.ajax({
    type: "POST",
    url:"clases/pago.class.php?resp=58",
    data:parametros3,                   
    global:false,
    async: false,
/*    dataType: "json",
*/    success: function(data) {                             
        console.log(data);

    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});


});

}

function pago_partidas_ver_credito (cod_partida,fecha_pago) {

console.log(cod_partida,fecha_pago);


parametros4 = {
"cod_partida":cod_partida,
"fecha_pago":fecha_pago
};

$.ajax({
    type: "POST",
    url:"clases/pago.classT.php?resp=96",
    data:parametros4,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});



}