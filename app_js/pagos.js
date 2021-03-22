function pagos(){

event.preventDefault();
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
$('#base_datos').empty();
$('#calculadora').empty();






$( "div" ).remove( ".modal-backdrop" );

$("#listar_pagos").html(
	'<div class="row">'
  +'<div class="col-md-12">'
    +'<h2 class="page-header"> Historial de Pagos </h2>'
  +'</div>'
+'</div>'

     + '<div class="row">'
     + '<div class="col-md-12 col-sm-12 col-xs-12"></div>'
     + '<div class="panel panel-default">'
        +'<div class="panel-heading">'
         +' <strong>Pagos</strong>'
        +'</div>'
       + '<div class="panel-body">'
      +'<table id="tabla_pago" cellpadding="0" cellspacing="0" border="0" class="table table-condesend table-responsive table-bordered table-striped">'
        +'<thead>'
          +'<tr>'
           + '<th>Codigo</th>'
           + '<th>Tipo de Nomina</th>'
           + '<th>Fecha de Pago</th>'
           + '<th>Periodo Inicial</th>'
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


$('#tabla_pago').dataTable({

"ajax": "clases/pago.class.php?resp=2",         
           "columns": [
            { "data": "id_tipo_nomina" },
            { "data": "tipo_nomina" },
            { "data": "fecha_pago" },
            { "data": "periodo_inicio" },
            { "data": "periodo_final" },  
            { "data": "acciones" }, 
            ]

});

}

function eliminar_nomina_p(fecha_pago,periodo_inicio,periodo_final,id_tipo_nomina){

console.log(fecha_pago,periodo_inicio,periodo_final,id_tipo_nomina);

parametros = {
"id_tipo_nomina":id_tipo_nomina,
"fecha_pago":fecha_pago,
"periodo_inicio":periodo_inicio,
"periodo_final":periodo_final
};

$.ajax({
    type: "POST",
    url:"clases/pago.class.php?resp=3",
    data:parametros,                   
    global:false,
    async: false,
/*    dataType: "json",
*/    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_pago').DataTable().ajax.reload();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});


}

function generar_nomina_p (id_tipo_nomina,fecha_pago,periodo_inicio,periodo_final) {


console.log(id_tipo_nomina,fecha_pago,periodo_inicio,periodo_final);

window.open('nomina.php?id_tipo_nomina='+id_tipo_nomina+'&fecha_pago='+fecha_pago+'&periodo_inicio='+periodo_inicio+'&periodo_final='+periodo_final+'');
}