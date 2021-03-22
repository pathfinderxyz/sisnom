function nomina_especial () {
event.preventDefault();
$('#administracion').empty();
$('#Empleados').empty();
$('#inicio').empty();
$('#permisos').empty();
$('#listar_pagos').empty();
$('#vacaciones').empty();
$('#listar_nomina').empty();
$('#creditos').empty();
$('#nomina_empleados').empty();
$('#listar_pagos_empleados').empty();
$('#nomina_partidas').empty();
$('#listar_nomina_partidas').empty();
$('#base_datos').empty();
$('#calculadora').empty();



       


$.getJSON( "fecha_nomina.php", { "fecha" : "fecha" } )
  .done(function( data, textStatus, jqXHR ) {
        console.log(data.fecha);
        fecha_actual = String(data.fecha);

$( "div" ).remove( ".modal-backdrop" );

$("#nomina_especial").html(
	'<div class="row">'
  +'<div class="col-md-12">'
    +'<h2 class="page-header"> Aguinaldos </h2>'
  +'</div>'
+'</div>'
      +'<div class="row">'
        +'<div class="col-md-12 col-sm-12 col-xs-12 text-right" style="margin:10px;">'
          +'<button type="button" data-toggle="modal" href="#pregunta_nomina_especial" class="btn btn-primary">Agreagar Nomina <i class="fa fa-users"></i></button>'
        +'</div>'
     + '</div>'
     + '<div class="row">'
     + '<div class="col-md-12 col-sm-12 col-xs-12"></div>'
     + '<div class="panel panel-default">'
        +'<div class="panel-heading">'
         +' <strong>Pago de Aguinaldos</strong>'
        +'</div>'
       + '<div class="panel-body">'
      +'<table id="tabla_nomina_especial" cellpadding="0" cellspacing="0" border="0" class="table table-condesend table-responsive table-bordered table-striped">'
        +'<thead>'
          +'<tr>'
           + '<th>Codigo</th>'
           + '<th>Cedula</th>'
           + '<th>Nombre</th>'
           + '<th>Apellido</th>'
           + '<th>Nomina</th>'
           + '<th>Banco</th>'
           + '<th>Aguinaldos</th>'
           + '<th>Acciones</th>'
          +'</tr>'
        +'</thead>'
       + '<tbody>'
        +'</tbody> ' 
     +' </table> '
    + ' </div>'
    + ' </div>'
    +'</div>'
    +'<div class="row">'

    +'<div class="col-md-3">'
      +'<button type="button" title="Guardar Aguinaldos" data-toggle="modal" href="#guardar_nomina_especial" onclick="guardar_nomina_especial(fecha_actual);" class="btn btn-outline btn-success">Guardar Pago Aguinaldos <i class="fa fa-save"></i></button>'
    +'</div>'

    +'<div class="col-md-6">'
      +'<button type="button" title="Generar Archivo Banco" data-toggle="modal" href="#generar_txt_nomina_especial" onclick="generar_txt_nomina_especial();" class="btn btn-outline btn-warning">Generar Archivo Banco <i class="fa fa-file-text-o"></i></button>'
    +'</div>'

    +'</div>'


////////////////////////////////////Modal Preguntar Si desea agregar tipos de nominas o empleados individauales/////////
  +'<div class="modal fade" id="pregunta_nomina_especial" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-body">'
      +'<div class="row">'
        +'<div class="col-md-12 pull-right">'
          +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'</div>'
      +'</div>'
          +'<div class="row">'
              +'<div class="col-md-12">'

                +'<blockquote>'

                  +'<p> Al seleccionar "Agregar por tipo de nomina", podra elegir entre los tipos de nomina creados y se incluiran todos los empleados que pertenecen a esa nomina para el pago de aguinaldos.<br>'
                  +'</p>'

                +'</blockquote>'
                    
              +'</div>'
          +'</div>'

      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" data-toggle="modal" href="#incluir_tipo_nomina_especial" class="btn btn-primary pull-rigth">Agregar por Tipo de Nomina <i class="fa fa-th-list"></i></button>'
      +'</div>'
      +'</form>'  
    +'</div>'
  +'</div>'
+'</div>'

/////////////////////////////////////////////////////////////MODAL TIPO DE NOMINA
+'<div class="modal fade" id="incluir_tipo_nomina_especial" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Tipo de Nomina</h4>'
      +'</div>'
      +'<div class="modal-body">'
+'<form id="form_tipo_nomina_especial">'

        +'<div class="form-group">'
          +'<label for="tipo_nomina_especial"><strong>Tipo de Nomina: </strong></label>'
          +'<select class="form-control" name="tipo_nomina_especial" id="tipo_nomina_especial">'
            +'<option value="0">Seleccione</option>'
          +'</select>'
        +'</div>'

        +'<div class="form-group" id="tipo_partida_especial">'
          +'<label for="tipo_partida_especial"><strong>Tipo de Partida: </strong></label>'
          +'<select class="form-control" name="tipo_partida_especial" id="tipo_partida_especial">'
            +'<option value="0">Seleccione</option>'
            +'<option value="VARIABLE">VARIABLE</option>'
          +'</select>'
        +'</div>'

        +'<div class="form-group" id="partida_nomina_especial">'
          +'<label for="partida_nomina_especial_t"><strong>Tipo de Partida: </strong></label>'
          +'<select class="form-control" name="partida_nomina_especial_t" id="partida_nomina_especial_t">'
            +'<option value="0">Seleccione</option>'
          +'</select>'
        +'</div>'


        +'<div class="row">'
        +'<div class="col-md-12 col-sm-12 col-xs-12">'

            +'<div id="tabla_partida_formula_nomina_especial" style="display: none" class="form-group">'
            +'<label>Seleccione Formula</label>'
            +'<table id="element_especial" class="table table-bordered table-striped" style="clear: both">'
                +'<thead>'
                  +'<tr>'
                     +'<th>Partida</th>'
                     +'<th>Formula</th>'
                     +'<th>Seleccione</th>'
                 +'</tr>'
             +'</thead>'
             +'<tbody id="tbody_especial">' 
             +'</tbody>'
            +'</table>'
            +'</div>'

        +'</div>'
        +'</div>'


      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" onClick="incluir_tipo_nomina_especial();" class="btn btn-primary pull-rigth">Guardar</button>'
      +'</div>'
+'</form>'
    +'</div>'
  +'</div>'
+'</div>'




);


$('#tabla_nomina_especial').dataTable({

"ajax": "clases/nomina_especial.class.php?resp=1",         
           "columns": [
            { "data": "cod_empleado" },
            { "data": "cedula" },
            { "data": "nombres" },
            { "data": "apellidos" },
            { "data": "tipo_nomina" },
            { "data": "nombre_banco" },
            { "data": "total_neto" },  
            { "data": "acciones" }, 
            ]

});


$.ajax({
    type: "POST",
    url:"clases/tipo_nomina.class.php?resp=1",
    data:"",                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);

        $.each(data, function (i, data) {
            $('#tipo_nomina_especial').append($('<option>', { 
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

$.ajax({
    type: "POST",
    url:"clases/nomina_especial.class.php?resp=3",
    data:"",                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);

        $.each(data, function (i, data) {
            $('#partida_nomina_especial_t').append($('<option>', { 
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


$("#partida_nomina_especial_t").change(function() {

console.log($('#partida_nomina_especial_t').val());

    var cod_partida = $('#partida_nomina_especial_t').val();
    var parametros = {
        "cod_partida": cod_partida
    };  
    $.ajax({
        type: "POST",
        url:"clases/formula.class.php?resp=6",
        data: parametros,                   
        global:false,
        async: false,
        dataType: "json",
        beforeSend: function () {

                        },
        success: function(data) { 
            console.log(data);
            var i = 0;

            $("#tabla_partida_formula_nomina_especial").show('fast');
            for (i = 0; i < data[0].cant_formulas; i++) {

                $('#element_especial > tbody:last-child').append('<tr><td>'+data[i].descripcion_partida_formula+'</td><td>'+data[i].formula+'</td><td><input type="radio" name="val_formula" id="val_formula" value="'+i+'" checked=""></td></tr>');

            }

        },
        error:function (xhr, ajaxOptions, thrownError){
          alert(xhr.status);
          alert(thrownError);
      }
  });

});


  }
  )
  .fail(function( jqXHR, textStatus, errorThrown ) {
      alert('Error al traer la fecha');
  });


}

function incluir_tipo_nomina_especial() {



console.log($("#form_tipo_nomina_especial").serialize());

 var datos_form_especial = $("#form_tipo_nomina_especial").serialize();
    $.ajax({
        type: "POST",
        url:"clases/nomina_especial.class.php?resp=5",
        data: datos_form_especial,                   
        global:false,
        async: false,
/*        dataType: "json",
*/
        success: function(data) { 
            console.log(data);
              alert(data);
            $('#incluir_tipo_nomina_especial').modal('hide');
            $('#pregunta_nomina_especial').modal('hide');
            $('#tabla_nomina_especial').DataTable().ajax.reload();




        },
        error:function (xhr, ajaxOptions, thrownError){
          alert(xhr.status);
          alert(thrownError);
      }
  });



}

function eliminar_nomina_especial_empleado(cod_empleado) {

console.log(cod_empleado);
var parametros = {
    "cod_empleado":cod_empleado
}; 

    $.ajax({
        type: "POST",
        url:"clases/nomina_especial.class.php?resp=6",
        data: parametros,                   
        global:false,
        async: false,
/*        dataType: "json",
*/
        success: function(data) { 
            console.log(data);
              alert(data);
            $('#tabla_nomina_especial').DataTable().ajax.reload();

        },
        error:function (xhr, ajaxOptions, thrownError){
          alert(xhr.status);
          alert(thrownError);
      }
  });


}

function guardar_nomina_especial(fecha){
console.log(fecha);


$("#guardar_nomina_periodo_especial").html(
'<div class="modal fade" id="guardar_nomina_especial" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Seleccione el Periodo</h4>'
      +'</div>'
      +'<div class="modal-body">'
        +'<form id="form_guardar_nomina_especial">'
        +'<div class="form-group">'
          +'<label for="fecha_inicio_e"><strong>Fecha Inicio: </strong></label>'
          +'<input type="date" class="form-control" id="fecha_inicio_e" name="fecha_inicio_e">'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="fecha_final_e"><strong>Fecha Final: </strong></label>'
          +'<input type="date" class="form-control" id="fecha_final_e" name="fecha_final_e">'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" id="guardar_nomina_periodo_g_e" class="btn btn-primary pull-rigth">Guardar</button>'
      +'</div>'
      +'</form>'  
    +'</div>'
  +'</div>'
+'</div>'
);

$("#guardar_nomina_periodo_g_e").on("click",function(){

console.log($("#form_guardar_nomina_especial").serialize());

datos = $("#form_guardar_nomina_especial").serialize();
datos2 = datos+'&fecha_pago_e='+fecha;
console.log(datos2);

if ($("#fecha_inicio_e").val()=='' || $("#fecha_final_e").val() == '') {

alert("Datos Vacios");

}else{

$.ajax({
    type: "POST",
    url:"clases/pago.class.php?resp=6",
    data:datos2,                   
    global:false,
    async: false,
    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_nomina_especial').DataTable().ajax.reload();
        $('#guardar_nomina_especial').modal('hide');

    },
    error:function (xhr, ajaxOptions, thrownError){
     alert(xhr.status);
      alert(thrownError);
  }
});

};




})


}

function generar_txt_nomina_especial () {

console.log("hola");


$.ajax({
    type: "POST",
    url:"clases/nomina_especial.class.php?resp=126",
    data:"",                   
    global:false,
    async: false,
    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_nomina_especial').DataTable().ajax.reload();
        window.open('/Nomina_Alcaldia/Nomina_Alcaldia/BD/archivos_bancos/nomina_especial/archivo_banco.csv', 'Download');



    },
    error:function (xhr, ajaxOptions, thrownError){
     alert(xhr.status);
      alert(thrownError);
  }
});



}