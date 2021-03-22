function listar_nomina () {
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
$('#nomina_partidas').empty();
$('#listar_nomina_partidas').empty();
$('#base_datos').empty();
$('#calculadora').empty();







$.getJSON( "fecha_nomina.php", { "fecha" : "fecha" } )
  .done(function( data, textStatus, jqXHR ) {
        console.log(data.fecha);
        fecha_actual = String(data.fecha);
        

$( "div" ).remove( ".modal-backdrop" );
$("#listar_nomina").html(
	'<div class="row">'
  +'<div class="col-md-12">'
    +'<h2 class="page-header"> Nomina </h2>'
  +'</div>'
+'</div>'
      +'<div class="row">'
        +'<div class="col-md-12 text-right" style="margin:10px;">'
          +'<button type="button" data-toggle="modal" href="#pregunta_nomina" class="btn btn-primary">Agreagar Empleado <i class="fa fa-users"></i></button>'
        +'</div>'
     + '</div>'
     + '<div class="row">'
     + '<div class="col-md-12"></div>'
     + '<div class="panel panel-default">'
        +'<div class="panel-heading">'
         +' <strong>Empleados en Nomina</strong>'
        +'</div>'
       + '<div class="panel-body">'
      +'<table id="tabla_nomina" cellpadding="0" cellspacing="0" border="0" class="table table-condesend table-responsive table-bordered table-striped">'
        +'<thead>'
          +'<tr>'
           + '<th>Codigo</th>'
           + '<th>Cedula</th>'
           + '<th>Nombre</th>'
           + '<th>Apellido</th>'
           + '<th>Nomina</th>'
           + '<th>Banco</th>'
           + '<th>Total Netos</th>'
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

    +'<div class="col-md-2">'
      +'<button type="button" title="Guardar Nomina" data-toggle="modal" href="#guardar_nomina" onclick="guardar_nomina(fecha_actual);" class="btn btn-outline btn-success">Guardar Nomina <i class="fa fa-save"></i></button>'
    +'</div>'

    +'<div class="col-md-4">'
      +'<button type="button" title="Generar Archivo Banco" data-toggle="modal" href="#generar_txt" onclick="generar_txt();" class="btn btn-outline btn-warning">Generar Archivo Banco <i class="fa fa-file-text-o"></i></button>'
    +'</div>'

    +'</div>'

////////////////////////////////////Modal Preguntar Si es fija o individauales/////////
  +'<div class="modal fade" id="pregunta_nomina" role="dialog">'
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

                  +'<p> ¿Desea agregar todas las partidas de la ley para este empleado? <br> Si selecciona "Agregar Partidas Fijas", Se agregaran las siguientes partidas:<br> -- Sueldo Base Quincenal<br> -- Aporte Patronal IVSS <br> -- Aporte Patronal LPH <br> -- Aporte Patrona LPF <br> -- Aporte Patronal Fondo de Jubilacion <br> -- Aporte Trabajador IVSS <br> -- Aporte Trabajador LPH <br> -- Aporte Trabajador LPF <br> -- Aporte Trabajador Fondo de Jubilacion <br> -- Inasistencias <br> <strong>El calculo de las partidas seran generadas automaticaticamente segun el monto del sueldo base y las formulas guardadas.</strong>'
                  +'</p>'

                +'</blockquote>'
                    
              +'</div>'
          +'</div>'

      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" data-toggle="modal" href="#incluir_partidas_fijas" class="btn btn-primary pull-rigth">Agregar Partidas Fijas <i class="fa fa-th-list"></i></button>'
        +'<button type="button" data-toggle="modal" href="#incluir_partidas_individuales" class="btn btn-primary pull-rigth">Agregar Partidas Individuales <i class="fa fa-th"></i></button>'
      +'</div>'
      +'</form>'  
    +'</div>'
  +'</div>'
+'</div>'

/////////////////////////////////////Modal registrar partidas fijas///////////////////
+'<div class="modal fade" id="incluir_partidas_fijas" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Partidas Fijas</h4>'
      +'</div>'
      +'<div class="modal-body">'
        +'<form id="form_partidas_fijas">'
        +'<div class="form-group">'
          +'<label for="cedula_partidas_fijas"><strong>Cedula: </strong></label>'
          +'<input type="text" class="form-control" id="cedula_partidas_fijas" name="cedula_partidas_fijas">'
        +'</div>'
        +'<label for="sueldo_base_partidas_fijas"><strong>Sueldo Base Quincenal: </strong></label>'
        +'<div class="form-group input-group">'
          +'<input type="number" class="form-control" id="sueldo_base_partidas_fijas" name="sueldo_base_partidas_fijas">'
          +'<span class="input-group-addon">Bs.</span>'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" onClick="incluir_partidas_fijas_nomina();" class="btn btn-primary pull-rigth">Guardar</button>'
      +'</div>'
      +'</form>'  
    +'</div>'
  +'</div>'
+'</div>'



/////////////////////////////////////Modal registrar partidas individuales///////////////////
+'<div class="modal fade" id="incluir_partidas_individuales" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Partidas Individuales</h4>'
      +'</div>'
      +'<div class="modal-body">'


                +'<div class="form-group">'
                  +'<label for="cedula_partidas_individuales"><strong>Cedula: </strong></label>'
                  +'<input type="text" class="form-control" id="cedula_partidas_individuales" name="cedula_partidas_individuales" value="0">'
                +'</div>'
                +'<label for="sueldo_base_partidas_individuales"><strong>Sueldo Base Quincenal: </strong></label>'
                +'<div class="form-group input-group">'
                  +'<input type="number" class="form-control" id="sueldo_base_partidas_individuales" name="sueldo_base_partidas_individuales" value="0">'
                  +'<span class="input-group-addon">Bs.</span>'
                +'</div>'

                +'<div class="row pull-right" style="margin:5px">'
                  +'<div class="col-md-12 ">'
                    +'<button type="button" class="btn btn-info" style="margin:10px" onclick="sueldo_base_nomina_individual();">Guardar Sueldo Base</button>'
                  +'</div>'
                +'</div>'

+'<form id="form_formula_f">'

            +'<div id="div_cuadro_formula" class="row" style="display:none;margin:10px">'
                +'<div class="col-md-12">'

                  +'<div class="row">'
                  +'<div class="col-md-12">'

                      +'<div class="form-group">'
                      +'<label for="cod_partida_s">Seleccione Partida</label>'
                      +'<select id="cod_partida_s" name="cod_partida_s" class="form-control">'
                          +'<option value="0">Seleccione</option>'
                      +'</select>'
                      +'</div>'

                  +'</div>'
                  +'</div>'


                  +'<div class="row">'
                  +'<div class="col-md-12">'

                      +'<div class="form-group">'
                          +'<label for="tipo_partida_s">Seleccione Tipo de Partida</label>'
                          +'<select id="tipo_partida_s" name="tipo_partida_s" class="form-control">'
                              +'<option value="0">Seleccione</option>'
                          +'</select>'
                      +'</div>'

                  +'</div>'
                  +'</div>'

                  +'<div class="row">'
                  +'<div class="col-md-12">'

                      +'<div id="tabla_partida_formula_nomina" style="display: none" class="form-group">'
                      +'<label>Seleccione Formula</label>'
                      +'<table id="element" class="table table-bordered table-striped" style="clear: both">'
                          +'<thead>'
                            +'<tr>'
                               +'<th>Partida</th>'
                               +'<th>Formula</th>'
                               +'<th>Seleccione</th>'
                           +'</tr>'
                       +'</thead>'
                       +'<tbody id="tbody">' 
                       +'</tbody>'
                      +'</table>'
                      +'</div>'

                  +'</div>'
                  +'</div>'


                  +'<div class="row">'
                  +'<div class="col-md-12">'

                       +'<div id="credito_nomina" style="display: none">'

                          +'<div class="form-group">'
                              +'<label for="credito_n">Credito:</label>'
                              +'<input type="number" class="form-control" placeholder="Bs." id="credito_n" name="credito_n" value="0">'
                          +'</div>'

                          +'<div class="form-group">'
                              +'<label for="cantidad_cuotas_n">Cuotas:</label>'
                              +'<input type="number" class="form-control" id="cantidad_cuotas_n" name="cantidad_cuotas_n" value="0">'
                          +'</div>'
                          
                      +'</div>'

                  +'</div>'
                  +'</div>'

                  +'<div class="row">'
                  +'<div class="col-md-12">'

                       +'<div id="inasistencias_n" style="display: none">'

                          +'<div class="form-group">'
                              +'<label for="inasistencias_n">Inasistencias:</label>'
                              +'<input type="number" class="form-control" id="inasistencias_n" name="inasistencias_n" value="0">'
                          +'</div>'
                          
                      +'</div>'

                  +'</div>'
                  +'</div>'

                  +'<div class="row">'
                  +'<div class="col-md-12">'

                       +'<div id="horasextras_n" style="display: none">'

                          +'<div class="form-group">'
                              +'<label for="horasextras_n">Inasistencias:</label>'
                              +'<input type="number" class="form-control" id="horasextras_n" name="horasextras_n" value="0">'
                          +'</div>'
                          
                      +'</div>'

                  +'</div>'
                  +'</div>'

                  +'<div class="row">'
                  +'<div class="col-md-12">'

                      +'<div class="form-group pull-right">'
                          +'<button type="button" class="btn btn-info pull-rigth" onClick="incluir_partidas_individuales_nomina();" >Guardar Partida</button>'
                      +'</div>'
                  +'</div>'
                  +'</div>'
+'</form>'




                +'</div>'
            +'</div>'


      +'<div class="modal-footer">'
        +'<div id="agregar_partida_empleado_d" class="row" style="display:none">'
          +'<div class="col-md-12">'
              +'<button class="btn btn-info btn-xs" onclick=\'$("#div_cuadro_formula").show("slow")\'> Agregar Mas Partidas</button>'
              +'<button class="btn btn-success btn-xs" style="margin-right:20px" onclick=listar_nomina();> No Agregar Mas Partidas</button>'
            +'</div>'
        +'</div>'
      +'</div>'
    

    +'</div>'
  +'</div>'
+'</div>'

);


$('#tabla_nomina').dataTable({

"ajax": "clases/nomina.class.php?resp=1",         
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
    url:"clases/partida.class.php?resp=3",
    data:"",                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);

        $.each(data, function (i, data) {
            $('#cod_partida_s').append($('<option>', { 
                value: data.id,
                text : data.partida 
            }));
        });
    },
    error:function (xhr, ajaxOptions, thrownError){
/*      alert(xhr.status);
      alert(thrownError);*/
  }
});


$('#cod_partida_s').change(function(){

    console.log($('#cod_partida_s').val());

    var cod_partida = $('#cod_partida_s').val();
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

                $("#tipo_partida_s").find('[value="CREDITO"]').remove();
                $("#tipo_partida_s").find('[value="FIJA"]').remove();
                $("#tipo_partida_s").find('[value="VARIABLE"]').remove();


                $('#tipo_partida_s').append($('<option>', {
                    value: 'FIJA',
                    text: 'FIJA'
                    }));
                $('#tipo_partida_s').append($('<option>', {
                    value: 'VARIABLE',
                    text: 'VARIABLE'
                    }));
                $("#tbody").empty();
                $("#credito_nomina").hide();
                $("#inasistencias_n").hide();
                $("#horasextras_n").hide();



                        },
        success: function(data) { 
            console.log(data);
            var i = 0;

            $("#tabla_partida_formula_nomina").show();
            for (i = 0; i < data[0].cant_formulas; i++) {

                $('#element > tbody:last-child').append('<tr><td>'+data[i].descripcion_partida_formula+'</td><td>'+data[i].formula+'</td><td><input type="radio" name="val_formula" id="val_formula" value="'+i+'" checked=""></td></tr>');

            }

            if (data[0].tipo=='Credito') {

                $("#credito_nomina").show();

                $('#tipo_partida_s').append($('<option>', {
                    value: 'CREDITO',
                    text: 'CREDITO'
                    }));
                $("#tipo_partida_s").find('[value="VARIABLE"]').remove();
                $("#tipo_partida_s").find('[value="FIJA"]').remove();

            };

            if (data[0].cod_partida==14) {

                $("#inasistencias_n").show();

            };

            if (data[0].cod_partida==35) {

                $("#horasextras_n").show();

            };

            $('#tipo_partida_s').change(function(){

                tipo2 = $('#tipo_partida_s').val();

                if (tipo2 == 'FIJA' && data[0].tipo != 'Credito') {
                    $("#credito_nomina").hide();
                    $("#tipo_partida_s").find('[value="CREDITO"]').remove();
                };
                if (tipo2 == 'VARIABLE' && data[0].tipo != 'Credito') {
                    $("#credito_nomina").hide();
                    $("#tipo_partida_s").find('[value="CREDITO"]').remove();

                };
            });

        },
        error:function (xhr, ajaxOptions, thrownError){
/*          alert(xhr.status);
          alert(thrownError);*/
      }
  });



});

  }
  )
  .fail(function( jqXHR, textStatus, errorThrown ) {
      alert('Error al traer la fecha');
  });

}


function incluir_partidas_fijas_nomina(){


    var datos_form = $('#form_partidas_fijas').serialize();
    console.log(datos_form);

    $.ajax({
        type: "POST",
        url:"clases/nomina.class.php?resp=2",
        data:datos_form,                   
        global:false,
        async: false,
        success: function(data) {

            console.log(data);

              if (data=="Registradas") {
                console.log(data);
                alert('Registradas');
                $('#incluir_partidas_fijas').modal('hide');
                $('#pregunta_nomina').modal('hide');
                $('#tabla_nomina').DataTable().ajax.reload();
                $("#form_partidas_fijas")[0].reset();


              };
              if (data=="1") {
                alert('Empleado Ya existe en nomina');
                $('#incluir_partidas_fijas').modal('show');
                $("#form_partidas_fijas")[0].reset();

              };
              if (data=="0") {
                alert('Empleado NO existe en el sistema');
                $('#incluir_partidas_fijas').modal('show');
                $("#form_partidas_fijas")[0].reset();


              };




        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
    }

  });


}

function ver_partidas_nomina_empleado(cod_empleado){

console.log(cod_empleado);
var parametros = {
    "cod_empleado" : cod_empleado
  };
    $.ajax({
        type: "POST",
        url:"clases/nomina.class.php?resp=3",
        data:parametros,                   
        global:false,
        async: false,
        dataType: "json",
        success: function(data) {                             
                console.log(data);

$("#ver_nomina_empleado").html(
'<div class="modal fade" id="ver_nomina_partida_empleado" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h5 class="modal-title" align="center"><strong>Detalle Nomina Empleado: '+data[0].nombres+' '+data[0].apellidos+'</strong></h5>'
      +'</div>'
      +'<div class="modal-body">'
        
        +'<div class="row">'
          +'<div class="col-md-12" style="padding-left:50px;padding-bottom:15px;">'
              +'<strong><ins>Asignaciones</ins></strong>'
          +'</div>'
        +'</div>'


          +'<div id="agregar_asignacion"></div>'

          +'<div class="row">'
            +'<div class="col-md-9"></div>'
            +'<div class="col-md-3">'
              +'<hr style="height:1px;border:none;color:#333;background-color:#333;"/>'
            +'</div>'
          +'</div>'

        +'<div class="row">'
          +'<div class="col-md-8" style="padding-left:80px;">'
              +'<strong>Total Asignaciones:</strong>'
          +'</div>'
          +'<div class="col-md-4" style="padding-left:80px;">'
              +'<strong>Bs. '+data[0].total_asignacion+'</strong>'
          +'</div>'
        +'</div>'

          +'<hr/>'

        +'<div class="row">'
          +'<div class="col-md-12" style="padding-left:50px;padding-top:15px;padding-bottom:15px;">'
              +'<strong><ins>Deducciones</ins></strong>'
          +'</div>'
        +'</div>'

        +'<div id="agregar_deduccion"></div>'

        
          +'<div class="row">'
            +'<div class="col-md-9"></div>'
            +'<div class="col-md-3">'
              +'<hr style="height:1px;border:none;color:#333;background-color:#333;"/>'
            +'</div>'
          +'</div>'


        +'<div class="row">'
          +'<div class="col-md-8" style="padding-left:80px;">'
              +'<strong>Total Deducciones:</strong>'
          +'</div>'
          +'<div class="col-md-4" style="padding-left:80px;">'
              +'<strong>Bs. '+data[0].total_deduccion+'</strong>'
          +'</div>'
        +'</div>'

        +'<hr/>'

        +'<div class="row">'
          +'<div class="col-md-12">'
            +'<div class="form-group pull-right"><h4><strong>Total Neto: Bs. '+data[0].total_neto+'</strong></h4></div>'
          +'</div>'
        +'</div>'


      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" class="btn btn-success pull-rigth" onClick="imprimir_recibo_pago('+cod_empleado+');">Imprimir <i class="fa fa-file-pdf-o"></i></button>'
      +'</div>'
    +'</div>'
  +'</div>'
+'</div>'
  );                  

for (var i = 0; i < data.length; i++) {
  

if (data[i].tipo=="Asignacion") {

    $("#agregar_asignacion").append(


          '<div class="row">'
          +'<div class="col-md-8" style="padding-left:80px;">'
              +data[i].partida+':'
          +'</div>'
          +'<div class="col-md-4" style="padding-left:80px;">'
              +'<strong>Bs. '+data[i].monto_nomina+'</strong>'
          +'</div>'
        +'</div>'

      );
            console.log(data[i].partida);
            console.log(data[i].monto_nomina);

};

if (data[i].tipo=="Deduccion" || data[i].tipo=="Credito") {

    $("#agregar_deduccion").append(


          '<div class="row">'
          +'<div class="col-md-8" style="padding-left:80px;">'
              +data[i].partida+':'
          +'</div>'
          +'<div class="col-md-4" style="padding-left:80px;">'
              +'<strong>Bs. '+data[i].monto_nomina+'</strong>'
          +'</div>'
        +'</div>'

      );
            console.log(data[i].partida);
            console.log(data[i].monto_nomina);

};



};

        },
        error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        }
  });
}



function sueldo_base_nomina_individual(){
$("#agregar_partida_empleado_d").show("slow");
console.log($("#cedula_partidas_individuales").val());
console.log($("#sueldo_base_partidas_individuales").val());
cedula_a = $("#cedula_partidas_individuales").val();
sueldo_base_a = $("#sueldo_base_partidas_individuales").val();

if (sueldo_base_a > 0 && cedula_a > 0) {

            var parametros1 = {
            "cedula_a" : cedula_a,
            "sueldo_base_a": sueldo_base_a
              };            


$.ajax({
    type: "POST",
    url:"clases/nomina.class.php?resp=4",
    data:parametros1,                   
    global:false,
    async: false,
/*    dataType: "json",
*/    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_nomina').DataTable().ajax.reload();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});


};

if (sueldo_base_a == 0 && cedula_a == 0) {


alert("instroduzca una cedula o un sueldo base mayor a cero");

$("#agregar_partida_empleado_d").hide();

};


}

function incluir_partidas_individuales_nomina(){
    event.preventDefault();

/////////validar que credito no sea cero
if ($("#credito_n").val()>0 && $("#cantidad_cuotas_n").val()>0 && $("#tipo_partida_s").val() == 'CREDITO' && $("#cod_partida_s").val()!='') {


var datos_f = $("#form_formula_f").serialize();
var cedula_n = window.cedula_a;
var parametros = datos_f+'&cedula_n='+cedula_n;
console.log(parametros);
$("#form_formula_f")[0].reset();


$.ajax({
    type: "POST",
    url:"clases/nomina.class.php?resp=4",
    data:parametros,                   
    global:false,
    async: false,
/*    dataType: "json",
*/    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_nomina').DataTable().ajax.reload();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});



};
/////////validar que credito no sea cero

if ($("#credito_n").val()==0 && $("#cantidad_cuotas_n").val()==0 && $("#tipo_partida_s").val() == 'CREDITO') {

  alert('Credito y Cantida de Cuotas no pueden estar en Cero');

};


/////////validar que todo se haya elegido

if ($("#tipo_partida_s").val() == 'VARIABLE' || $("#tipo_partida_s").val() == 'FIJA' && $("#cod_partida_s").val()!='') {

var datos_f = $("#form_formula_f").serialize();
var cedula_n = window.cedula_a;
var parametros = datos_f+'&cedula_n='+cedula_n;

console.log(parametros);

$("#form_formula_f")[0].reset();


$.ajax({
    type: "POST",
    url:"clases/nomina.class.php?resp=4",
    data:parametros,                   
    global:false,
    async: false,
/*    dataType: "json",
*/    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_nomina').DataTable().ajax.reload();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});


};



}

function eliminar_nomina_empleado(cod_empleado){
  console.log(cod_empleado);
            var parametros = {
            "cod_empleado": cod_empleado
              }; 
$.ajax({
    type: "POST",
    url:"clases/nomina.class.php?resp=5",
    data:parametros,                   
    global:false,
    async: false,
/*    dataType: "json",
*/    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_nomina').DataTable().ajax.reload();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});

}


function editar_partida_nomina_empleado(cod_empleado){

  console.log(cod_empleado);
$("#editar_sueldo_base").html(
  /////////////////////////////////////Modal modificar base partidas fijas///////////////////
'<div class="modal fade" id="modal_editar_partidas_nomina" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Modificar Sueldo Base</h4>'
      +'</div>'
      +'<div class="modal-body">'
        +'<form id="form_modificar_sueldo_base">'
        +'<div class="form-group">'
          +'<label for="cod_empleado_modificar"><strong>Codigo: </strong></label>'
          +'<input type="text" class="form-control" id="cod_empleado_modificar" name="cod_empleado_modificar" value="'+cod_empleado+'" disabled>'
        +'</div>'
        +'<label for="sueldo_base_modificar"><strong>Sueldo Base Quincenal: </strong></label>'
        +'<div class="form-group input-group">'
          +'<input type="number" class="form-control" id="sueldo_base_modificar" name="sueldo_base_modificar">'
          +'<span class="input-group-addon">Bs.</span>'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" id="guardar_sueldo_base" class="btn btn-primary pull-rigth">Guardar</button>'
      +'</div>'
      +'</form>'  
    +'</div>'
  +'</div>'
+'</div>'
);

$("#guardar_sueldo_base").on("click", function(){

sueldo_base=$("#sueldo_base_modificar").val();

  
var parametros = {
"cod_empleado" : cod_empleado,
"sueldo_base" : sueldo_base
};

$.ajax({
    type: "POST",
    url:"clases/nomina.class.php?resp=6",
    data:parametros,                   
    global:false,
    async: false,
/*    dataType: "json",
*/    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_nomina').DataTable().ajax.reload();
        listar_nomina();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});


}



  );

}

function agregar_partida_nomina_empleado(cod_empleado){

cod_empleado2 = cod_empleado;

$("#agregar_partida_individual").html(
/////////////////////////////////////Modal registrar partidas individuales///////////////////
'<div class="modal fade" id="modal_agregar_partidas_nomina" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Partidas Individuales</h4>'
      +'</div>'
      +'<div class="modal-body">'


+'<form id="form_formula_f2">'

            +'<div id="div_cuadro_formula2" class="row" style="margin:10px">'
                +'<div class="col-md-12">'

                  +'<div class="row">'
                  +'<div class="col-md-12">'

                      +'<div class="form-group">'
                      +'<label for="cod_partida_s2">Seleccione Partida</label>'
                      +'<select id="cod_partida_s2" name="cod_partida_s2" class="form-control">'
                          +'<option value="0">Seleccione</option>'
                      +'</select>'
                      +'</div>'

                  +'</div>'
                  +'</div>'


                  +'<div class="row">'
                  +'<div class="col-md-12 col-sm-12 col-xs-12">'

                      +'<div class="form-group">'
                          +'<label for="tipo_partida_s2">Seleccione Tipo de Partida</label>'
                          +'<select id="tipo_partida_s2" name="tipo_partida_s2" class="form-control">'
                              +'<option value="0">Seleccione</option>'
                          +'</select>'
                      +'</div>'

                  +'</div>'
                  +'</div>'

                  +'<div class="row">'
                  +'<div class="col-md-12 col-sm-12 col-xs-12">'

                      +'<div id="tabla_partida_formula_nomina2" style="display: none" class="form-group">'
                      +'<label>Seleccione Formula</label>'
                      +'<table id="element2" class="table table-bordered table-striped" style="clear: both">'
                          +'<thead>'
                            +'<tr>'
                               +'<th>Partida</th>'
                               +'<th>Formula</th>'
                               +'<th>Seleccione</th>'
                           +'</tr>'
                       +'</thead>'
                       +'<tbody id="tbody2">' 
                       +'</tbody>'
                      +'</table>'
                      +'</div>'

                  +'</div>'
                  +'</div>'


                  +'<div class="row">'
                  +'<div class="col-md-12">'

                       +'<div id="credito_nomina2" style="display: none">'

                          +'<div class="form-group">'
                              +'<label for="credito_n2">Credito:</label>'
                              +'<input type="number" class="form-control" placeholder="Bs." id="credito_n2" name="credito_n2" value="0">'
                          +'</div>'

                          +'<div class="form-group">'
                              +'<label for="cantidad_cuotas_n2">Cuotas:</label>'
                              +'<input type="number" class="form-control" id="cantidad_cuotas_n2" name="cantidad_cuotas_n2" value="0">'
                          +'</div>'
                          
                      +'</div>'

                  +'</div>'
                  +'</div>'

                  +'<div class="row">'
                  +'<div class="col-md-12">'

                       +'<div id="inasistencias_n2" style="display: none">'

                          +'<div class="form-group">'
                              +'<label for="inasistencias_n2">Inasistencias:</label>'
                              +'<input type="number" class="form-control" id="inasistencias_n2" name="inasistencias_n2" value="0">'
                          +'</div>'
                          
                      +'</div>'

                  +'</div>'
                  +'</div>'

                  +'<div class="row">'
                  +'<div class="col-md-12">'

                       +'<div id="horasextras_n2" style="display: none">'

                          +'<div class="form-group">'
                              +'<label for="horasextras_n2">Horas Extras:</label>'
                              +'<input type="number" class="form-control" id="horasextras_n2" name="horasextras_n2" value="0">'
                          +'</div>'
                          
                      +'</div>'

                  +'</div>'
                  +'</div>'
     

                  +'<div class="row">'
                  +'<div class="col-md-12">'

                      +'<div class="form-group pull-right">'
                          +'<button type="button" class="btn btn-info pull-rigth" onClick="incluir_partidas_individuales_nomina_empleado()" >Guardar Partida</button>'
                      +'</div>'
                  +'</div>'
                  +'</div>'
+'</form>'




                +'</div>'
            +'</div>'


      +'<div class="modal-footer">'

      +'</div>'
    

    +'</div>'
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
            $('#cod_partida_s2').append($('<option>', { 
                value: data.id,
                text : data.partida 
            }));
        });
    },
    error:function (xhr, ajaxOptions, thrownError){
/*      alert(xhr.status);
      alert(thrownError);*/
  }
});


$('#cod_partida_s2').change(function(){

    console.log($('#cod_partida_s2').val());

    var cod_partida2 = $('#cod_partida_s2').val();
    var parametros2 = {
        "cod_partida": cod_partida2
    };  
    $.ajax({
        type: "POST",
        url:"clases/formula.class.php?resp=6",
        data: parametros2,                   
        global:false,
        async: false,
        dataType: "json",
        beforeSend: function () {

                $("#tipo_partida_s2").find('[value="CREDITO"]').remove();
                $("#tipo_partida_s2").find('[value="FIJA"]').remove();
                $("#tipo_partida_s2").find('[value="VARIABLE"]').remove();


                $('#tipo_partida_s2').append($('<option>', {
                    value: 'FIJA',
                    text: 'FIJA'
                    }));
                $('#tipo_partida_s2').append($('<option>', {
                    value: 'VARIABLE',
                    text: 'VARIABLE'
                    }));
                $("#tbody2").empty();
                $("#credito_nomina2").hide();
                $("#inasistencias_n2").hide();
                $("#horasextras_n2").hide();




                        },
        success: function(data) { 
            console.log(data);
            var i = 0;

            $("#tabla_partida_formula_nomina2").show();
            for (i = 0; i < data[0].cant_formulas; i++) {

                $('#element2 > tbody:last-child').append('<tr><td>'+data[i].descripcion_partida_formula+'</td><td>'+data[i].formula+'</td><td><input type="radio" name="val_formula2" id="val_formula2" value="'+i+'" checked=""></td></tr>');

            }

            if (data[0].tipo=='Credito') {

                $("#credito_nomina2").show();

                $('#tipo_partida_s2').append($('<option>', {
                    value: 'CREDITO',
                    text: 'CREDITO'
                    }));
                $("#tipo_partida_s2").find('[value="VARIABLE"]').remove();
                $("#tipo_partida_s2").find('[value="FIJA"]').remove();

            };

            if (data[0].cod_partida==14) {

                $("#inasistencias_n2").show();

            };

            if (data[0].cod_partida==35) {

                $("#horasextras_n2").show();

            };

            $('#tipo_partida_s2').change(function(){

                tipo2 = $('#tipo_partida_s2').val();

                if (tipo2 == 'FIJA' && data[0].tipo != 'Credito') {
                    $("#credito_nomina2").hide();
                    $("#tipo_partida_s2").find('[value="CREDITO"]').remove();
                };
                if (tipo2 == 'VARIABLE' && data[0].tipo != 'Credito') {
                    $("#credito_nomina2").hide();
                    $("#tipo_partida_s2").find('[value="CREDITO"]').remove();

                };
            });

        },
        error:function (xhr, ajaxOptions, thrownError){
/*          alert(xhr.status);
          alert(thrownError);*/
      }
  });



});

}

function incluir_partidas_individuales_nomina_empleado(){
    event.preventDefault();

/////////validar que credito no sea cero
if ($("#credito_n2").val()>0 && $("#cantidad_cuotas_n2").val()>0 && $("#tipo_partida_s2").val() == 'CREDITO' && $("#cod_partida_s2").val()!='') {


var datos_f2 = $("#form_formula_f2").serialize();
var cedula_n2 = window.cod_empleado2;
var parametros2 = datos_f2+'&cedula_n2='+cedula_n2;
console.log(parametros2);
$("#form_formula_f2")[0].reset();
console.log(cedula_n2);


$.ajax({
    type: "POST",
    url:"clases/nomina.class.php?resp=7",
    data:parametros2,                   
    global:false,
    async: false,
/*    dataType: "json",
*/    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_nomina').DataTable().ajax.reload();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});



};
/////////validar que credito no sea cero

if ($("#credito_n2").val()==0 && $("#cantidad_cuotas_n2").val()==0 && $("#tipo_partida_s2").val() == 'CREDITO') {

  alert('Credito y Cantida de Cuotas no pueden estar en Cero');

};


/////////validar que todo se haya elegido

if ($("#tipo_partida_s2").val() == 'VARIABLE' || $("#tipo_partida_s2").val() == 'FIJA' && $("#cod_partida_s2").val()!='') {
var datos_f2 = $("#form_formula_f2").serialize();
var cedula_n2 = window.cod_empleado2;
var parametros2 = datos_f2+'&cedula_n2='+cedula_n2;
console.log(cedula_n2);

console.log(parametros2);

$("#form_formula_f2")[0].reset();


$.ajax({
    type: "POST",
    url:"clases/nomina.class.php?resp=7",
    data:parametros2,                   
    global:false,
    async: false,
/*    dataType: "json",
*/    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_nomina').DataTable().ajax.reload();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});


};

}

function eliminar_partida_nomina_empleado (cedula) {

  console.log(cedula);


$("#eliminar_partida_individual").html(
/////////////////////////////////////Modal registrar partidas individuales///////////////////
'<div class="modal fade" id="modal_eliminar_partidas_nomina" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Eliminar Partidas Individuales</h4>'
      +'</div>'
      +'<div class="modal-body">'


+'<form id="form_formula_f3">'

            +'<div id="div_cuadro_formula3" class="row" style="margin:10px">'
                +'<div class="col-md-12">'

                  +'<div class="row">'
                  +'<div class="col-md-12">'

                      +'<div class="form-group">'
                        +'<label for="cod_empleado_eliminar"><strong>Cedula: </strong></label>'
                        +'<input type="text" class="form-control" id="cod_empleado_eliminar" name="cod_empleado_eliminar" value="'+cedula+'" disabled>'
                      +'</div>'

                      +'<div class="form-group">'
                      +'<label for="cod_partida_s3">Seleccione Partida</label>'
                      +'<select id="cod_partida_s3" name="cod_partida_s3" class="form-control">'
                          +'<option value="0">Seleccione</option>'
                      +'</select>'
                      +'</div>'



                  +'</div>'
                  +'</div>'

                  +'<div class="row">'
                  +'<div class="col-md-12">'
                      +'<div class="form-group pull-right">'
                          +'<button type="button" class="btn btn-info pull-rigth" id="eliminar_partida_n" >Eliminar Partida</button>'
                      +'</div>'
                  +'</div>'
                  +'</div>'
+'</form>'




                +'</div>'
            +'</div>'


      +'<div class="modal-footer">'

      +'</div>'
    

    +'</div>'
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
            $('#cod_partida_s3').append($('<option>', { 
                value: data.id,
                text : data.partida 
            }));
        });
    },
    error:function (xhr, ajaxOptions, thrownError){
/*      alert(xhr.status);
      alert(thrownError);*/
  }
});

$('#cod_partida_s3').change(function(){

    console.log($('#cod_partida_s3').val());
    cod_partida_e = $('#cod_partida_s3').val();
});


$("#eliminar_partida_n").on("click", function(){

  var parametros3 = {
    "cedula_e" : cedula,
    "cod_partida_e": cod_partida_e
  };

$.ajax({
    type: "POST",
    url:"clases/nomina.class.php?resp=8",
    data:parametros3,                   
    global:false,
    async: false,
/*    dataType: "json",
*/    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_nomina').DataTable().ajax.reload();


    },
    error:function (xhr, ajaxOptions, thrownError){
/*      alert(xhr.status);
      alert(thrownError);*/
  }
});


});



}

function guardar_nomina(fecha){
console.log(fecha);


$("#guardar_nomina_periodo").html(
'<div class="modal fade" id="guardar_nomina" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Seleccione el Periodo</h4>'
      +'</div>'
      +'<div class="modal-body">'
        +'<form id="form_guardar_partidas">'
        +'<div class="form-group">'
          +'<label for="fecha_inicio"><strong>Fecha Inicio: </strong></label>'
          +'<input type="date" class="form-control" id="fecha_inicio" name="fecha_inicio">'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="fecha_final"><strong>Fecha Final: </strong></label>'
          +'<input type="date" class="form-control" id="fecha_final" name="fecha_final">'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" id="guardar_nomina_periodo_g" class="btn btn-primary pull-rigth">Guardar</button>'
      +'</div>'
      +'</form>'  
    +'</div>'
  +'</div>'
+'</div>'
);

$("#guardar_nomina_periodo_g").on("click",function(){

console.log($("#form_guardar_partidas").serialize());

datos = $("#form_guardar_partidas").serialize();
datos2 = datos+'&fecha_pago='+fecha;
console.log(datos2);

if ($("#fecha_inicio").val()=='' && $("#fecha_final").val() == '') {

alert("datos vacios");

}else{

$.ajax({
    type: "POST",
    url:"clases/pago.class.php?resp=101",
    data:datos2,                   
    global:false,
    async: false,
    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_nomina').DataTable().ajax.reload();
        $('#guardar_nomina').modal('hide');




    },
    error:function (xhr, ajaxOptions, thrownError){
     alert(xhr.status);
      alert(thrownError);
  }
});

};




})


}

function imprimir_recibo_pago(cod_empleado) {
  console.log(cod_empleado);

  window.open('recibo_pago.php?cod_empleado='+cod_empleado+'');

}

function generar_txt () {

$.ajax({
    type: "POST",
    url:"clases/nomina.class.php?resp=232",
    data:"",                   
    global:false,
    async: false,
    success: function(data) {                             
        console.log(data);
        alert(data);
        $('#tabla_nomina').DataTable().ajax.reload();
        window.open('/Nomina_Alcaldia/Nomina_Alcaldia/BD/archivos_bancos/nomina/archivo_banco.csv', 'Download');



    },
    error:function (xhr, ajaxOptions, thrownError){
     alert(xhr.status);
      alert(thrownError);
  }
});


}