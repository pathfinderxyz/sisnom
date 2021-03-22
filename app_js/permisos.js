function permisos(){


event.preventDefault();

$('#administracion').empty();
$('#Empleados').empty();
$('#inicio').empty();
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





$("#permisos").html(
	'<div class="row">'
  +'<div class="col-md-12">'
    +'<h2 class="page-header"> Gestion de Permisos</h2>'
  +'</div>'
+'</div>'
      +'<div class="row">'
        +'<div class="col-md-12 col-sm-12 col-xs-12 text-right" style="margin:10px;">'
          +'<button type="button" onclick="incluir_permiso_empleado();" data-toggle="modal" href="#modal_incluir_permisos_empleado" class="btn btn-primary">Agreagar Permisos <i class="fa fa-user"></i></button>'
        +'</div>'
     + '</div>'
     + '<div class="row">'
     + '<div class="col-md-12 col-sm-12 col-xs-12"></div>'
     + '<div class="panel panel-default">'
        +'<div class="panel-heading">'
         +' <strong>Historial</strong>'
        +'</div>'
       + '<div class="panel-body">'
      +'<table id="tabla_permisos2" cellpadding="0" cellspacing="0" border="0" class="table table-condesend table-responsive table-bordered table-striped">'
        +'<thead>'
          +'<tr>'
           + '<th>Codigo</th>'
           + '<th>Permiso</th>'
           + '<th>Codigo</th>'
           + '<th>Cedula</th>'
           + '<th>Nombre</th>'
           + '<th>Inicio</th>'
           + '<th>Final</th>'
           + '<th>Estado</th>'
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

		$('#tabla_permisos2').dataTable({
				"ajax": "clases/permiso_empleado.class.php?resp=1",					
					 "columns": [
						{ "data": "id_permiso" },
						{ "data": "permiso" },
						{ "data": "cod_empleado" },
						{ "data": "cedula" },
						{ "data": "nombre" },
						{ "data": "fecha_inicio" },
						{ "data": "fecha_final" },	
						{ "data": "estado" },	
						{ "data": "acciones" },	
						]
			    });


 }

 function eliminar_permiso_empleado(id_permiso,cod_empleado,fecha_inicio){

console.log(id_permiso);
console.log(cod_empleado);
console.log(fecha_inicio);



var parametros = {
    "id_permiso" : id_permiso,
    "cod_empleado" : cod_empleado,
    "fecha_inicio" : fecha_inicio

  };
$.ajax({
                type: "POST",
                url:"clases/permiso_empleado.class.php?resp=2",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                        console.log(data);
                        alert(data);
                        //para recargar la tabla hijos al eliminar
                        $('#tabla_permisos2').DataTable().ajax.reload();

                    },
                error:function (xhr, ajaxOptions, thrownError){
/*                        alert(xhr.status);
                        alert(thrownError);*/
                        $('#tabla_permisos2').DataTable().ajax.reload();

                }
          }); 





 }

  function incluir_permiso_empleado(){

$("#modal_permisos_empleado").html(

'<div class="modal fade" id="modal_incluir_permisos_empleado" role="dialog" style="">'
  +'<div class="modal-dialog">'
   +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Permisos</h4>'
      +'</div>'
      	+'<div class="modal-body">'
			+'<div class="row">'
				+'<form id="form_incluir_permiso_empleado" role="form" action="">'
						+'<div class="col-md-6">'
                            +'<div class="form-group">'
                                +'<label for="cedula_p"><strong>Cedula: </strong></label>'
                                +'<input type="number" min="1" max="99999999" class="form-control input-sm" id="cedula_p" name="cedula_p" autofocus required>'
                            +'</div>'
                        +'</div>'
                        +'<div class="col-md-6">'
                            +'<div class="form-group">'
                                +'<label for="permiso_empleado2"><strong>Tipo de Permiso: </strong></label>'
                                +'<select class="form-control" id="permiso_empleado2" name="permiso_empleado2" required>'
                                    +'<option value="">Seleccione</option>'
                                +'</select>'
                            +'</div>'
                        +'</div>'
                        +'<div class="col-md-6">'
                            +'<div class="form-group">'
                                +'<label for="fecha_inicio_p"><strong>Fecha de Inicio: </strong></label>'
                                +'<input type="date" class="form-control input-sm" id="fecha_inicio_p" name="fecha_inicio_p" required>'
                            +'</div>'
                        +'</div>'
                        +'<div class="col-md-6">'
                            +'<div class="form-group">'
                                +'<label for="fecha_final_p"><strong>Fecha Final: </strong></label>'
                                +'<input type="date" class="form-control input-sm" id="fecha_final_p" name="fecha_final_p" required>'
                            +'</div>'
                        +'</div>'
                        +'</form>'
                        +'</div>'
      		+'</div>'
		+'<div class="modal-footer form-group">'
			+'<bottom type="button" class="btn btn-primary" data-dismiss="modal" style="margin-right:10px" id="guardar_empleado_permiso">Guardar</button>'
		+'</div>'
    	+'</div>'

  	+'</div>'
+'</div>'
    );


$.ajax({
    type: "POST",
    url:"clases/permiso.class.php?resp=5",
    data:"",                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);

        $.each(data, function (i, data) {
            $('#permiso_empleado2').append($('<option>', { 
                value: data.id,
                text : data.permiso 
            }));
        });
    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});


$('#guardar_empleado_permiso').click(function(){

    var datos_form = $('#form_incluir_permiso_empleado').serialize();
    console.log(datos_form);
    
$.ajax({
        type: "POST",
        url:"clases/permiso_empleado.class.php?resp=3",
        data:datos_form,                   
        global:false,
        async: false,
        dataType: "json",
        success: function(data) {
        		console.log(data);


            if (data.existe =='Este Permiso ya existe') {
                alert('Ya Existe este empleado con este permiso en esa fecha');
            };
            if (data.existe =='Empleado no Existe') {
				alert('Este Empleado no Existe');

            };
            if (data.existe=='Registrado'){
                console.log(data.existe);
                alert(data.existe);
				$('#tabla_permisos2').DataTable().ajax.reload();

			};

        },
        error:function (xhr, ajaxOptions, thrownError){
          alert('Por favor llene los campos requeridos');
      }

  });

});

}

function editar_permiso_empleado(id_permiso,cod_empleado,fecha_inicio){

  console.log(id_permiso,cod_empleado,fecha_inicio);
var parametros = {
    "cod_empleado" : cod_empleado,
    "fecha_inicio" : fecha_inicio

  };

$.ajax({
    type: "POST",
    url:"clases/permiso_empleado.class.php?resp=4",
    data: parametros,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
          console.log(data);
          data_arreglo = [ data[0].cod_empleado, data[0].fecha_inicio];
          console.log(data_arreglo);
        $("#editar_permiso_empleado").html(
          '<div class="modal fade" id="modal_editar_permiso_empleado" role="dialog">'
              +'<div class="modal-dialog">'
                +'<!-- Modal content-->'
                +'<div class="modal-content">'
                  +'<div class="modal-header">'
                    +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
                    +'<h4 class="modal-title" align="center">Modificar Permiso</h4>'
                  +'</div>'
                +'<div class="modal-body">'       
                    +'<table id="" class="table table-bordered table-striped" style="clear: both">'
                    +'<tbody> '
                        +'<tr> '        
                          +'<td>Cedula</td>'
                            +'<td><strong id="cedula_permiso_empleado">'+data[0].cedula+'</strong></td>'
                          +'</tr>' 
                          +'<tr>'     
                          +'<td>Nombres</td>'
                            +'<td><strong id="nombres_permiso_empleado">'+data[0].nombres+'</strong></td>'
                          +'</tr>' 
                          +'<tr>'     
                            +'<td>Permiso</td>'
                            +'<td><a href="#" id="permiso_editar_empleado" data-type="select" data-pk="1" data-value="" data-title="Seleccione" class="editable editable-click" style="color: blue;">'+data[0].permiso+'</a></td>'
                          +'</tr>'
                            +'<tr> '        
                                +'<td>Fecha Inicio</td>'
                                +'<td><strong id="fecha_inicio_e">'+data[0].fecha_inicio+'</strong></td>'
                            +'</tr> '
                            +'<tr>'         
                            +'<td>Fecha Final</td>'
                                +'<td><a href="" id="fecha_final_e" data-type="date" data-value="'+data[0].fecha_final+'" data-pk="1" data-title="Seleccione Fecha" data-placement="right" class="editable editable-click">'+data[0].fecha_final+'</a></td>'
                            +'</tr>'                  
                        +'</tbody>'
                    +'</table>'
                  +'</div>'
                  +'<div class="modal-footer">'
                    +'<button type="button" class="btn btn-info pull-rigth" style="margin:10px" data-dismiss="modal">Guardar</button>'
                  +'</div>'
               +' </div>'
             +' </div>'
           +' </div>'
        );
    return data_arreglo
  },
    error:function (xhr, ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
  }
});  

$('#permiso_editar_empleado').editable({
source: function() {
 $.ajax({
                type: "POST",
                url:"clases/permiso.class.php?resp=6",
                data:"",                   
                global:false,
                async: false,
                dataType: "json",
                success: function(response) {                             
                        result=response;
                        jsonAsString = JSON.stringify(result);
                        console.log(jsonAsString);
                        return jsonAsString;

                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
         });  

        return jsonAsString;
    },
    validate: function(permiso_editar_empleado) {
           if($.trim(permiso_editar_empleado) == '') return 'Requerido';
           console.log(permiso_editar_empleado);
           console.log(data_arreglo);

           var parametros = {
            "cod_empleado" : data_arreglo[0],
            "fecha_inicio": data_arreglo[1],
            "id_permiso": permiso_editar_empleado
              };            

            $.ajax({
                type: "POST",
                url:"clases/permiso_empleado.class.php?resp=5",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
          console.log(data);
          $('#tabla_permisos2').DataTable().ajax.reload();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          });
          }
 });


 $('#fecha_final_e').editable({
        validate: function(fecha_final_e) {
           if($.trim(fecha_final_e) == '') return 'Requerido';
           var fecha_final_n = moment(fecha_final_e).format('YYYY-MM-DD');
            console.log(fecha_final_n); 
            var parametros = {
            "cod_empleado" : data_arreglo[0],
            "fecha_inicio": data_arreglo[1],
            "fecha_final_n": fecha_final_n

              };            

            $.ajax({
                type: "POST",
                url:"clases/permiso_empleado.class.php?resp=5",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                        console.log(data);
                $('#tabla_permisos2').DataTable().ajax.reload();

                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          });
        }       

        });


}