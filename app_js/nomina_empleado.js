
function nomina_empleados(){

event.preventDefault();
$('#administracion').empty();
$('#Empleados').empty();
$('#inicio').empty();
$('#permisos').empty();
$('#listar_pagos').empty();
$('#vacaciones').empty();
$('#nomina_especial').empty();
$('#creditos').empty();
$('#nomina_partidas').empty();
$('#listar_nomina_partidas').empty();
$('#base_datos').empty();
$('#listar_nomina').empty();
$('#calculadora').empty();






$( "div" ).remove( ".modal-backdrop" );

$("#nomina_empleados").html(
  '<div class="row">'
  +'<div class="col-md-12">'
    +'<h2 class="page-header"> Nomina por Empleados</h2>'
  +'</div>'
+'</div>'

  +'<div class="row">'
  +'<div class="col-md-4">'
      +'<div class="form-group input-group">'
          +'<input type="number" id="buscar_empleado_text" class="form-control">'
          +'<span class="input-group-btn">'
              +'<button class="btn btn-default" onclick="buscar_empleado_pago()" type="button"><i class="fa fa-search"></i>'
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








}

function buscar_empleado_pago(){

  console.log($("#buscar_empleado_text").val());
  var cedula = $("#buscar_empleado_text").val();



$("#listar_pagos_empleados").html(
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
      +'<table id="tabla_pago_empleado" cellpadding="0" cellspacing="0" border="0" class="table table-condesend table-responsive table-bordered table-striped">'
        +'<thead>'
          +'<tr>'
           + '<th>Codigo</th>'
           + '<th>Cedula</th>'
           + '<th>Nombres</th>'
           + '<th>Apellidos</th>'
           + '<th>Fecha Pago</th>'
           + '<th>Periodo inicio</th>'
           + '<th>Periodo Final</th>'
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


$('#tabla_pago_empleado').dataTable({

"ajax": "clases/pago.class.php?resp=7&cedula="+cedula+"",         
           "columns": [
            { "data": "cod_empleado" },
            { "data": "cedula" },
            { "data": "nombres" },
            { "data": "apellidos" },
            { "data": "fecha_pago" },  
            { "data": "periodo_inicio" },  
            { "data": "periodo_final" },  
            { "data": "acciones" }, 
            ]

});



}

function eliminar_nomina_empleado_fecha (cod_empleado,fecha_pago,periodo_final) {

console.log(cod_empleado,fecha_pago,periodo_final);

parametros = {
"cod_empleado":cod_empleado,
"fecha_pago":fecha_pago,
"periodo_final":periodo_final
};


$.ajax({
    type: "POST",
    url:"clases/pago.class.php?resp=8",
    data:parametros,                   
    global:false,
    async: false,
/*    dataType: "json",
*/    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_pago_empleado').DataTable().ajax.reload();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});

}

function generar_nomina_empleado_fecha (cod_empleado,fecha_pago,periodo_inicio,periodo_final,id_tipo_nomina) {

console.log(id_tipo_nomina,fecha_pago,periodo_inicio,periodo_final);

window.open('nomina_empleado.php?id_tipo_nomina='+id_tipo_nomina+'&fecha_pago='+fecha_pago+'&periodo_inicio='+periodo_inicio+'&periodo_final='+periodo_final+'&cod_empleado='+cod_empleado+'');

}