function vacaciones(){
event.preventDefault();
$('#administracion').empty();
$('#Empleados').empty();
$('#inicio').empty();
$('#permisos').empty();
$('#listar_nomina').empty();
$('#listar_pagos').empty();
$('#nomina_especial').empty();
$('#creditos').empty();
$('#nomina_empleados').empty();
$('#listar_pagos_empleados').empty();
$('#nomina_partidas').empty();
$('#listar_nomina_partidas').empty();
$('#base_datos').empty();
$('#calculadora').empty();


$( "div" ).remove( ".modal-backdrop" );
$("#vacaciones").html(
	'<div class="row">'
  +'<div class="col-md-12 col-sm-12 col-xs-12">'
    +'<h2 class="page-header"> Gestion de pago de Vacaciones </h2>'
  +'</div>'
+'</div>'
     + '<div class="row">'
     + '<div class="col-md-12 col-sm-12 col-xs-12"></div>'
     + '<div class="panel panel-default">'
        +'<div class="panel-heading">'
         +' <strong>Vacaciones</strong>'
        +'</div>'
       + '<div class="panel-body">'
      +'<table id="tabla_vacaiones" cellpadding="0" cellspacing="0" border="0" class="table table-condesend table-responsive table-bordered table-striped">'
        +'<thead>'
          +'<tr>'
           + '<th>Codigo</th>'
           + '<th>Cedula</th>'
           + '<th>Nombres</th>'
           + '<th>Apellidos</th>'
           + '<th>Años Vencidos</th>'
           + '<th>Pagada</th>'
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



$('#tabla_vacaiones').dataTable({

	"ajax": "clases/pago.class.php?resp=4",         
           "columns": [
            { "data": "cod_empleado" },
            { "data": "cedula" },
            { "data": "nombres" },
            { "data": "apellidos" },
            { "data": "anos_v" },
            { "data": "pagado" },
            { "data": "acciones" },
            ]

});


}

function ver_anos_vencidos(cod_empleado8){

	console.log(cod_empleado8);
parametros1 = {

	"cod_empleado8":cod_empleado8
};

$.ajax({
    type: "POST",
    url:"clases/pago.class.php?resp=5",
    data:parametros1,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);

$("#ver_vacaciones_vencidas").html(
'<div class="modal fade" id="modal_ver_anos_vencidos" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h5 class="modal-title" align="center"><strong>Vacaciones Vencidas: '+data[0].nombres+' '+data[0].apellidos+'</strong></h5>'
      +'</div>'
      +'<div class="modal-body">'
        
        +'<div class="row">'
          +'<div class="col-md-12" style="padding-left:50px;padding-bottom:15px;">'
              +'<strong><ins>Años Vencidos</ins></strong>'
          +'</div>'
        +'</div>'


          +'<div id="agregar_anos_vencidos"></div>'

          

      +'</div>'
      +'<div class="modal-footer">'
      +'</div>'
    +'</div>'
  +'</div>'
+'</div>'
  );                  

for (var i = 0; i < data.length; i++) {
  


    $("#agregar_anos_vencidos").append(


          '<div class="row">'
          +'<div class="col-md-12" style="padding-left:80px;">'+data[i].anos
         +'</div>'
        +'</div>'

      );
};


        $('#tabla_vacaiones').DataTable().ajax.reload();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }

});



}