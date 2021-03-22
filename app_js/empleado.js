function editar(cod_empleado){
	event.preventDefault();

    	console.log(cod_empleado);
  var parametros = {
    "cod_empleado" : cod_empleado
  };

 $.ajax({
                type: "POST",
                url:"clases/empleado.class.php?resp=2",
                data: parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                      console.log(data[0].cedula);
                      cedula = data[0].cedula;
                      

$("#modal_editar").html(
  '<div class="modal fade" id="modal" role="dialog">'
      +'<div class="modal-dialog">'
        +'<!-- Modal content-->'
        +'<div class="modal-content">'
          +'<div class="modal-header">'
            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
            +'<h4 class="modal-title" align="center">Modificar Empleado</h4>'
          +'</div>'
        +'<div class="modal-body">'       
            +'<table id="user" class="table table-bordered table-striped" style="clear: both">'
            +'<tbody> '
                   +' <tr> '        
                   +'<td>Cedula</td>'
                   +'<td><strong id="cedula">'+data[0].cedula+'</strong></td>'
                        +'</tr>' 
                        +'<tr>'         
                    +'<td>Cargo</td>'
                    +'<td><a href="#" id="cargo" data-type="select" data-pk="1" data-value="" data-title="Seleccione el Cargo" class="editable editable-click" style="color: blue;">'+data[0].cargo+'</a></td>'
                        +'</tr>'
                        +'<tr> '        
                    +'<td>Profesion</td>'
                    +'<td><a href="#" id="profesion" data-type="select" data-pk="1" data-value="" data-title="Seleccione la Profesion" class="editable editable-click" style="color: blue;">'+data[0].profesion+'</a></td>'
                        +'</tr>'
                        +'<tr> '        
                    +'<td>Tipo de Nomina</td>'
                    +'<td><a href="#" id="tipo_nomina" data-type="select" data-pk="1" data-value="" data-title="Seleccione el Tipo de Nomina" class="editable editable-click" style="color: blue;">'+data[0].tipo_nomina+'</a></td>'
                    +'</tr>'
                    +'<tr> '        
                        +'<td>Banco</td>'
                        +'<td><a href="#" id="banco" data-type="select" data-pk="1" data-value="" data-title="Seleccione Banco" class="editable editable-click" style="color: blue;">'+data[0].nombre_banco+'</a></td>'
                    +'</tr>'
                    +'<tr>'         
                        +'<td>Unidad Administrativa</td>'
                        +'<td><a href="#" id="unidad_administrativa" data-type="select" data-pk="1" data-value="" data-title="Seleccione Unidad Administrativa" class="editable editable-click" style="color: blue;">'+data[0].unidad_administrativa+'</a></td>'
                    +'</tr>'
                    +'<tr> '        
                        +'<td>Nombres</td>'
                        +'<td><a href="" id="nombres" data-type="text" data-pk="1" data-placement="right" data-placeholder="Required" data-title="Nombres" class="editable editable-click editable-empty">'+data[0].nombres+'</a></td>'
                    +'</tr> '
                    +'<tr>'         
                        +'<td>Apellidos</td>'
                        +'<td><a href="" id="apellidos" data-type="text" data-pk="1" data-placement="right" data-placeholder="Required" data-title="Apellidos" class="editable editable-click editable-empty">'+data[0].apellidos+'</a></td>'
                    +'</tr>'
                    +'<tr>'       
                        +'<td>Fecha de Nacimiento</td>'
                        +'<td><a href="" id="fecha_nacimiento" data-type="combodate" data-value="'+data[0].fecha_nacimiento+'" data-format="YYYY-MM-DD" data-viewformat="DD/MM/YYYY" data-template="D / MMM / YYYY" data-pk="1" data-title="Seleccione Fecha" class="editable editable-click">'+data[0].fecha_nacimiento+'</a></td>'
                    +'</tr>' 
                    +'<tr>'         
                        +'<td>Fecha de Ingreso</td>'
                        +'<td><a href="" id="fecha_ingreso" data-type="combodate" data-value="'+data[0].fecha_ingreso+'" data-format="YYYY-MM-DD" data-viewformat="DD/MM/YYYY" data-template="DD / MM / YYYY" data-pk="1" data-title="Seleccione Fecha de Ingreso" class="editable editable-click">'+data[0].fecha_ingreso+'</a></td>'
                    +'</tr>'
                    +'<tr>'         
                        +'<td>Direccion</td>'
                        +'<td><a href="#" id="direccion" data-type="textarea" data-pk="1" data-placeholder="'+data[0].direccion+'" data-title="Ingrese la Direccion" class="editable editable-pre-wrapped editable-click">'+data[0].direccion+'</a></td>'
                    +'</tr> ' 
                    +'<tr> '        
                        +'<td>Telefono</td>'
                        +'<td><a href="" id="telefono" data-type="text" data-pk="1" data-placement="right" data-placeholder="Telefono" data-title="Telefono" class="editable editable-click editable-empty">'+data[0].telefonos+'</a></td>'
                    +'</tr> '                 
                +'</tbody>'
            +'</table>'

            +'<div id="div_hijo" class="row" style="display:none">'
                +'<div class="col-md-12">'
                    +'<form id="form_incluir_hijo" role="form" action="">'
                            +'<hr/>'
                            +'<h5>Datos del Hijo</h5>'

                            +'<div class="col-md-6">'
                                +'<div class="form-group">'
                                    +'<label for="nombre2"><strong>Nombre: </strong></label>'
                                    +'<input type="text" class="form-control input-sm" id="nombre2" name="nombre2" minlength="2" required>'
                               +' </div>'
                            +'</div>'

                            +'<div class="col-md-6">'
                                +'<div class="form-group">'
                                   +'<label for="apellidos2"><strong>Apellidos: </strong></label>'
                                    +'<input type="text" class="form-control input-sm" id="apellidos2" name="apellidos2" minlength="2" required>'
                                +'</div>'
                            +'</div>'
                            +'<div class="col-md-6">'
                                +'<div class="form-group">'
                                    +'<label for="fecha_n_cedula"><strong>Fecha de Nacimiento o Cedula: </strong></label>'
                                    +'<input type="text" class="form-control input-sm" id="fecha_n_cedula" name="fecha_n_cedula" required>'
                                +'</div>'
                            +'</div>'

                            +'<div class="col-md-6">'
                                +'<div class="form-group">'
                                    +'<label for="profesion2"><strong>Nivel de Estudio: </strong></label>'
                                    +'<select class="form-control" id="profesion2" name="profesion2" required>'
                                       +' <option value="">Seleccione</option>'
                                    +'</select>'
                                +'</div>'
                            +'</div>'
                            +'<div class="col-md-12"><hr/></div>'
                            +'<div class="col-md-6 pull-right">'
                                +'<div class="pull-right">'
                                    +'<bottom type="button" onclick="incluir_hijo('+data[0].cod_empleado+');" class="btn btn-primary" style="margin-right:10px" id="guardar_hijo">Guardar Hijo</button>'
                                    +'</div>'
                                +'</div>' 
                    +'</form>'
                +'</div>'
            +'</div>'

          +'</div>'
          +'<div class="modal-footer">'
                +'<div class="row">'
                    +'<div class="col-md-12">'
                        +'<button class="btn btn-info btn-xs" onclick=\'$("#div_hijo").show("slow")\'> Agregar Hijos</button>'
                        +'<button class="btn btn-success btn-xs" onclick=\'$("#div_hijo").hide("slow")\'> No Agregar Hijos</button>'
                    +'</div>'
                +'</div>'
                +'<div class="row">'
                +'<div class="col-md-12">'
                +'<hr/>'
            +'<button type="button" class="btn btn-info pull-rigth" style="margin:10px" onclick="listar_empleados();" data-dismiss="modal">Guardar</button>'
                +'</div>'
                +'</div>'

          +'</div>'
       +' </div>'
     +' </div>'
   +' </div>'
);
return cedula;

                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
         });  


/////////validar el formulario con la libreria form validate
$("#form_incluir_hijo").validate({

    rules: {

        nombre2: { 
            required: true,
            lettersonly: true 
        },
        apellidos2: { 
            required: true,
            lettersonly: true 
        },
        fecha_n_cedula: { 
            required: true,
        },
        profesion2: { 
            required: true
        }
        
    },

    messages : {

        nombre2:{
            required: "Este campo es requerido",
            lettersonly : "Solo Letras",
            minlength: "Nombre Invalido"
        },
        apellidos2:{
            required: "Este campo es requerido",
            lettersonly : "Solo Letras",
            minlength: "Apellidos Invalido"
        },
        fecha_n_cedula: { 
            required: "Este campo es requerido"
        },
        profesion2: { 
            required: "Este campo es requerido"
        }
    }

});

jQuery.validator.addMethod("lettersonly", function(value, element) 
{
    return this.optional(element) || /^[a-z ]+$/i.test(value);
}, "Letters and spaces only please");

/////////fin del validar form




/////////////////////////Editables_Empleados////////////////////////

//cargos 
$('#cargo').editable({
source: function() {
 $.ajax({
                type: "POST",
                url:"clases/cargo.class.php?resp=2",
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
    validate: function(cargo) {
           if($.trim(cargo) == '') return 'Requerido';
            console.log(cedula);
            console.log(cargo);

            var parametros = {
            "cedula" : cedula,
            "cargo": cargo
              };            

            $.ajax({
                type: "POST",
                url:"clases/empleado.class.php?resp=3",
                data:parametros,                   
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
 });

//profesion 
$('#profesion').editable({
source: function() {
 $.ajax({
                type: "POST",
                url:"clases/profesion.class.php?resp=2",
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
    validate: function(profesion) {
           if($.trim(profesion) == '') return 'Requerido';
           console.log(profesion);
           console.log(cedula);

            var parametros = {
            "cedula" : cedula,
            "profesion": profesion
              };            

            $.ajax({
                type: "POST",
                url:"clases/empleado.class.php?resp=3",
                data:parametros,                   
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
 });

///////////////////////profesion para el select del hijo con ajax
$.ajax({
    type: "POST",
    url:"clases/profesion.class.php?resp=1",
    data:"",                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        
        $.each(data, function (i, data) {
            $('#profesion2').append($('<option>', { 
                value: data.id,
                text : data.profesion 
            }));
        });
    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});



//tipo de nomina 
$('#tipo_nomina').editable({
source: function() {
 $.ajax({
                type: "POST",
                url:"clases/tipo_nomina.class.php?resp=2",
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
    validate: function(tipo_nomina) {
           if($.trim(tipo_nomina) == '') return 'Requerido';
           console.log(tipo_nomina);
           console.log(cedula);

            var parametros = {
            "cedula" : cedula,
            "tipo_nomina": tipo_nomina
              };            

            $.ajax({
                type: "POST",
                url:"clases/empleado.class.php?resp=3",
                data:parametros,                   
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
 });

//seleccione el banco
$('#banco').editable({
source: function() {
 $.ajax({
                type: "POST",
                url:"clases/banco.class.php?resp=2",
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
    validate: function(banco) {
           if($.trim(banco) == '') return 'Requerido';
           console.log(banco);
           console.log(cedula);
            var parametros = {
            "cedula" : cedula,
            "banco": banco
              };            

            $.ajax({
                type: "POST",
                url:"clases/empleado.class.php?resp=3",
                data:parametros,                   
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
 });


//seleccione el banco
$('#unidad_administrativa').editable({
source: function() {
 $.ajax({
                type: "POST",
                url:"clases/unidad_administrativa.class.php?resp=2",
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
    validate: function(unidad_administrativa) {
           if($.trim(unidad_administrativa) == '') return 'Requerido';
           console.log(unidad_administrativa);
           console.log(cedula);
            var parametros = {
            "cedula" : cedula,
            "unidad_administrativa": unidad_administrativa
              };            

            $.ajax({
                type: "POST",
                url:"clases/empleado.class.php?resp=3",
                data:parametros,                   
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
 });
//nombre 
    $('#nombres').editable({
           validate: function(nombre) {
           if($.trim(nombre) == '') return 'Requerido';
            console.log($.trim(nombre)); 
            console.log(cedula);
            var parametros = {
            "cedula" : cedula,
            "nombre": nombre
              };            

            $.ajax({
                type: "POST",
                url:"clases/empleado.class.php?resp=3",
                data:parametros,                   
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
    });

//nombre 
    $('#apellidos').editable({

           validate: function(apellidos) {
           if($.trim(apellidos) == '') return 'Requerido';
            console.log($.trim(apellidos));
            console.log(cedula);
            var parametros = {
            "cedula" : cedula,
            "apellidos": apellidos
              };            

            $.ajax({
                type: "POST",
                url:"clases/empleado.class.php?resp=3",
                data:parametros,                   
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
    });
//FECHA_NACIMIENTO
 $('#fecha_nacimiento').editable({
        validate: function(fecha_nacimiento) {
           if($.trim(fecha_nacimiento) == '') return 'Requerido';
           var fecha_n = moment(fecha_nacimiento).format('YYYY-MM-DD');
            console.log($.trim(fecha_n)); 
            console.log(cedula);
            var parametros = {
            "cedula" : cedula,
            "fecha_n": fecha_n
              };            

            $.ajax({
                type: "POST",
                url:"clases/empleado.class.php?resp=3",
                data:parametros,                   
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

        });

//FECHA_INGRESO
 $('#fecha_ingreso').editable({
        validate: function(fecha_ingreso) {
           if($.trim(fecha_ingreso) == '') return 'Requerido';
           var fecha_i = moment(fecha_ingreso).format('YYYY-MM-DD');
            console.log($.trim(fecha_i));
            console.log(cedula);
            var parametros = {
            "cedula" : cedula,
            "fecha_i": fecha_i
              };            

            $.ajax({
                type: "POST",
                url:"clases/empleado.class.php?resp=3",
                data:parametros,                   
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

        });
//direccion
    $('#direccion').editable({
        showbuttons: 'bottom',
        validate: function(direccion) {
            console.log($.trim(direccion));
            console.log(cedula);
            var parametros = {
            "cedula" : cedula,
            "direccion": direccion
              };            

            $.ajax({
                type: "POST",
                url:"clases/empleado.class.php?resp=3",
                data:parametros,                   
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
    });


//telefono 
    $('#telefono').editable({
           validate: function(telefono) {
            console.log($.trim(telefono));
            console.log(cedula);
            var parametros = {
            "cedula" : cedula,
            "telefono": telefono
              };            

            $.ajax({
                type: "POST",
                url:"clases/empleado.class.php?resp=3",
                data:parametros,                   
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
    });


    }

function incluir_hijo(cod_empleado){

    event.preventDefault();
    console.log(cod_empleado);
    var datos_form = $('#form_incluir_hijo').serialize();
    console.log(datos_form);
    variables=datos_form+'&cod_empleado='+cod_empleado;
    console.log(variables);





            $.ajax({
                type: "POST",
                url:"clases/hijo_empleado.class.php?resp=1",
                data:variables,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                        console.log(data);
                        alert(data.existe);
                        $("#div_hijo").hide("slow");
                        $("#form_incluir_hijo")[0].reset();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert('Por favor llene todos los campos');

                }
          }); 


}

function ver_hijo(cod_empleado){
console.log(cod_empleado);
var s = cod_empleado;



$("#modal_hijo").html(
'<div class="modal fade" id="modal_ver_hijo" role="dialog">'
      +'<div class="modal-dialog modal-lg">'
        +'<!-- Modal content-->'
        +'<div class="modal-content">'
          +'<div class="modal-header">'
            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
            +'<h4 class="modal-title" align="center"> Lista de Hijos</h4>'
          +'</div>'
        +'<div class="modal-body">' 
     + '<div class="row" style="margin:5px">'
     + '<div class="col-md-12 col-sm-12 col-xs-12"></div>'
     + '<div class="panel panel-default">'
        +'<div class="panel-heading">'
         +' <strong>Hijos del Empleado</strong>'
        +'</div>'
       + '<div class="panel-body">'
      +'<table id="tabla_hijo" cellpadding="0" cellspacing="0" border="0" class="table table-bordered table-striped">'
        +'<thead>'
          +'<tr>'
           + '<th>Codigo Hijo</th>'
           + '<th>Nombres</th>'
           + '<th>Apellidos</th>'
           + '<th>Cedula o Fecha de Nacimiento</th>'
           + '<th>Nivel de Estudio</th>'
           + '<th>ID</th>'
           + '<th>Acciones</th>'
          +'</tr>'
        +'</thead>'
       + '<tbody>'
        +'</tbody> ' 
     +' </table> '
    + ' </div>'
    + ' </div>'
    +'</div>'


        +'</div>'
          +'</div>'
       +' </div>'
     +' </div>'
   +' </div>'
);
$('#tabla_hijo').dataTable( {
                "ajax": { "url" : "clases/hijo_empleado.class.php?cod_empleado="+s+"", 
                           "type": "POST"
                        },

                     "columns": [
                        { "data": "cod_hijo" },
                        { "data": "nombres" },
                        { "data": "apellidos" },
                        { "data": "cedula_fecha_nacimiento" },
                        { "data": "profesion" },
                        { "data": "id_profesion" },
                        { "data": "acciones" },

                        ]
                });
        

}

function eliminar_hijo(codigo_hijo){

console.log(codigo_hijo);
  var parametros = {
    "codigo_hijo" : codigo_hijo
  };
$.ajax({
                type: "POST",
                url:"clases/hijo_empleado.class.php?resp=2",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                        console.log(data);
                        alert(data.existe);
                        //para recargar la tabla hijos al eliminar
                        $('#tabla_hijo').DataTable().ajax.reload();

                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          }); 

}

function editar_hijo(cod_hijo){

console.log(cod_hijo);



var parametros = {
    "cod_hijo" : cod_hijo
  };

 $.ajax({
                type: "POST",
                url:"clases/hijo_empleado.class.php?resp=3",
                data: parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                      console.log(data);
                      cod_hijo = data[0].cod_hijo;


$("#editar_hijo").html(
  '<div class="modal fade" id="modal_editar_hijo" role="dialog">'
      +'<div class="modal-dialog">'
        +'<!-- Modal content-->'
        +'<div class="modal-content">'
          +'<div class="modal-header">'
            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
            +'<h4 class="modal-title" align="center">Modificar Hijo</h4>'
          +'</div>'
        +'<div class="modal-body">'       
            +'<table id="" class="table table-bordered table-striped" style="clear: both">'
            +'<tbody> '
                    +'<tr> '        
                        +'<td>Cedula o Fecha de Nacimiento</td>'
                        +'<td><a href="" id="cedula_fecha_nacimiento_h" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Cedula o Fecha de Nacimiento" class="editable editable-click editable-empty">'+data[0].cedula_fecha_nacimiento+'</a></td>'
                    +'</tr> '  
                    +'<tr>'     
                    +'<tr> '        
                        +'<td>Nombres</td>'
                        +'<td><a href="" id="nombres_h" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Nombre" class="editable editable-click editable-empty">'+data[0].nombres+'</a></td>'
                    +'</tr> '
                    +'<tr>'         
                        +'<td>Apellidos</td>'
                        +'<td><a href="" id="apellidos_h" data-type="text" data-pk="1" data-placement="right" data-placeholder="Required" data-title="Apellidos" class="editable editable-click editable-empty">'+data[0].apellidos+'</a></td>'
                    +'</tr>'  
                        +'<tr> '        
                    +'<td>Profesion</td>'
                    +'<td><a href="#" id="profesion_h" data-type="select" data-pk="1" data-value="" data-title="Seleccione el Nivel de Estudio" class="editable editable-click" style="color: blue;">'+data[0].profesion+'</a></td>'
                        +'</tr>'         
                +'</tbody>'
            +'</table>'

          +'</div>'
          +'<div class="modal-footer">'
            +'<button type="button" class="btn btn-info pull-rigth" style="margin:10px" onclick="listar_empleados();" data-dismiss="modal">Guardar</button>'

          +'</div>'
       +' </div>'
     +' </div>'
   +' </div>'
);
return cod_hijo;
         },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
         });  


//profesion 
$('#profesion_h').editable({
source: function() {
 $.ajax({
                type: "POST",
                url:"clases/profesion.class.php?resp=2",
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
    validate: function(profesion_h) {
           if($.trim(profesion_h) == '') return 'Requerido';
           console.log(profesion_h);
           console.log(cod_hijo);

            var parametros = {
            "cod_hijo" : cod_hijo,
            "profesion_h": profesion_h
              };            

            $.ajax({
                type: "POST",
                url:"clases/hijo_empleado.class.php?resp=4",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                        $('#tabla_hijo').DataTable().ajax.reload();

                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          }); 


        }
 });


//apellidos 
    $('#apellidos_h').editable({

           validate: function(apellidos_h) {
           if($.trim(apellidos_h) == '') return 'Requerido';
            console.log($.trim(apellidos_h));
            console.log(cod_hijo);
            var parametros = {
            "cod_hijo" : cod_hijo,
            "apellidos_h": apellidos_h
              };            

            $.ajax({
                type: "POST",
                url:"clases/hijo_empleado.class.php?resp=4",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                        $('#tabla_hijo').DataTable().ajax.reload();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          });


        }
    });


//apellidos 
    $('#nombres_h').editable({

           validate: function(nombres_h) {
           if($.trim(nombres_h) == '') return 'Requerido';
            console.log($.trim(nombres_h));
            console.log(cod_hijo);
            var parametros = {
            "cod_hijo" : cod_hijo,
            "nombres_h": nombres_h
              };            

            $.ajax({
                type: "POST",
                url:"clases/hijo_empleado.class.php?resp=4",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                        $('#tabla_hijo').DataTable().ajax.reload();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          });


        }
    });

    //cedula fecha de nacimiento 
    $('#cedula_fecha_nacimiento_h').editable({

           validate: function(cedula_fecha_nacimiento_h) {
           if($.trim(cedula_fecha_nacimiento_h) == '') return 'Requerido';
            console.log($.trim(cedula_fecha_nacimiento_h));
            console.log(cod_hijo);
            var parametros = {
            "cod_hijo" : cod_hijo,
            "cedula_fecha_nacimiento_h": cedula_fecha_nacimiento_h
              };            

            $.ajax({
                type: "POST",
                url:"clases/hijo_empleado.class.php?resp=4",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                        $('#tabla_hijo').DataTable().ajax.reload();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          });


        }
    });



}

function ver(cod_empleado){
	event.preventDefault();
    	console.log(cod_empleado);


var parametros = {
    "cod_empleado" : cod_empleado
  };

 $.ajax({
                type: "POST",
                url:"clases/empleado.class.php?resp=2",
                data: parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                      console.log(data[0].cedula);
                      cedula = data[0].cedula;
                      

$("#modal_editar").html(
  '<div class="modal fade" id="modal_ver" role="dialog">'
      +'<div class="modal-dialog">'
        +'<!-- Modal content-->'
        +'<div class="modal-content">'
          +'<div class="modal-header">'
            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
            +'<h4 class="modal-title" align="center">Ver Empleado</h4>'
          +'</div>'
        +'<div class="modal-body">'       
            +'<table id="" class="table table-bordered table-striped table-hover" style="clear: both">'
            +'<tbody> '
                   +' <tr> '        
                   +'<td>Cedula</td>'
                   +'<td><strong>'+data[0].cedula+'</strong></td>'
                        +'</tr>' 
                        +'<tr>'         
                    +'<td>Cargo</td>'
                    +'<td><strong>'+data[0].cargo+'</strong></td>'
                        +'</tr>'
                        +'<tr> '        
                    +'<td>Profesion</td>'
                    +'<td><strong id="profesion">'+data[0].profesion+'</strong></td>'
                        +'</tr>'
                        +'<tr> '        
                    +'<td>Tipo de Nomina</td>'
                    +'<td><strong id="tipo_nomina">'+data[0].tipo_nomina+'</strong></td>'
                    +'</tr>'
                    +'<tr> '        
                        +'<td>Banco</td>'
                        +'<td><strong href="#" id="banco">'+data[0].nombre_banco+'</strong></td>'
                    +'</tr>'
                    +'<tr>'         
                        +'<td>Unidad Administrativa</td>'
                        +'<td><strong id="unidad_administrativa">'+data[0].unidad_administrativa+'</strong></td>'
                    +'</tr>'
                    +'<tr> '        
                        +'<td>Nombres</td>'
                        +'<td><strong id="nombres">'+data[0].nombres+'</strong></td>'
                    +'</tr> '
                    +'<tr>'         
                        +'<td>Apellidos</td>'
                        +'<td><strong id="apellidos">'+data[0].apellidos+'</strong></td>'
                    +'</tr>'
                    +'<tr>'       
                        +'<td>Fecha de Nacimiento</td>'
                        +'<td><strong id="fecha_nacimiento">'+data[0].fecha_nacimiento+'</strong></td>'
                    +'</tr>' 
                    +'<tr>'         
                        +'<td>Fecha de Ingreso</td>'
                        +'<td><strong id="fecha_ingreso">'+data[0].fecha_ingreso+'</strong></td>'
                    +'</tr>'
                    +'<tr>'         
                        +'<td>Antiguedad</td>'
                        +'<td><strong id="antiguedad">'+data[0].antiguedad+'</strong></td>'
                    +'</tr> '
                    +'<tr>'         
                        +'<td>Cantidad de Hijos</td>'
                        +'<td><strong id="cantidad_hijos">'+data[0].cantidad_hijos+'</strong></td>'
                    +'</tr> '  
                    +'<tr>'         
                        +'<td>Direccion</td>'
                        +'<td><strong id="direccion">'+data[0].direccion+'</strong></td>'
                    +'</tr> ' 
                    +'<tr> '        
                        +'<td>Telefono</td>'
                        +'<td><strong id="telefono">'+data[0].telefonos+'</strong></td>'
                    +'</tr> '                 
                +'</tbody>'
            +'</table>'
          +'</div>'
       +' </div>'
     +' </div>'
   +' </div>'
);
return cedula;

                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
         });  
  
    }
    function eliminar(cod_empleado){
     event.preventDefault();
     console.log(cod_empleado);
     if (confirm('¿Esta Seguro que Desea Eliminar este Empleado?\nAl Eliminar este Empleado lo Eliminara de la Nomina')) {

      var parametros = {
        "cod_empleado" : cod_empleado
      };       

      $.ajax({
        type: "POST",
        url:"clases/empleado.class.php?resp=4",
        data: parametros,                   
        global:false,
        async: false,
        dataType: "json",
        success: function(data) {                             

          console.log(data);
          alert(data.existe);

        },
        error:function (xhr, ajaxOptions, thrownError){
          alert(xhr.status);
          alert(thrownError);
        }
      }); 

      listar_empleados();


    } else {
      listar_empleados();
    }

  }   

function listar_empleados () {
event.preventDefault();

$('#administracion').empty();
$('#permisos').empty();
$('#inicio').empty();
$('#listar_nomina').empty();
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







$("#Empleados").html(
	'<div class="row">'
  +'<div class="col-md-12">'
    +'<h2 class="page-header"> Lista de Empleados</h2>'
  +'</div>'
+'</div>'
      +'<div class="row">'
        +'<div class="col-md-12 col-sm-12 col-xs-12 text-right" style="margin:10px;">'
          +'<button type="button" onclick="incluir_empleado();" data-toggle="modal" href="#modal_empleado" class="btn btn-primary">Incluir <i class="fa fa-user"></i></button>'
        +'</div>'
     + '</div>'
     + '<div class="row">'
     + '<div class="col-md-12 col-sm-12 col-xs-12"></div>'
     + '<div class="panel panel-default">'
        +'<div class="panel-heading">'
         +' <strong>Empleados</strong>'
        +'</div>'
       + '<div class="panel-body">'
      +'<table id="tabla_empleado" cellpadding="0" cellspacing="0" border="0" class="table table-condesend table-responsive table-bordered table-striped">'
        +'<thead>'
          +'<tr>'
           + '<th>Codigo</th>'
           + '<th>Cedula</th>'
           + '<th>Nombres</th>'
           + '<th>Apellidos</th>'
           + '<th>Fecha de Nacimiento</th>'
           + '<th>Fecha de Ingreso</th>'
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

		$('#tabla_empleado').dataTable( {
				"ajax": "clases/empleado.class.php?resp=1",					
					 "columns": [
						{ "data": "cod_empleado" },
						{ "data": "cedula" },
						{ "data": "nombres" },
						{ "data": "apellidos" },
						{ "data": "fecha_nacimiento" },
						{ "data": "fecha_ingreso" },
						{ "data": "acciones" },

						]
			    });


 }

 function incluir_empleado(e){
event.preventDefault();
console.log(e);


$("#modal_incluir_empleado").html(

'<div class="modal fade" id="modal_empleado" role="dialog" style="">'
  +'<div class="modal-dialog">'
   +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Empleado</h4>'
      +'</div>'

      +'<div class="modal-body">'
+'<div class="row">'
+'<form id="form_incluir_empleado" role="form" action="">'

                    +'<div class="col-md-12"><h5>Datos Personales</h5></div>'
                        +'<div class="col-md-6">'

                            +'<div class="form-group">'
                                +'<label for="cedula1"><strong>Cedula: </strong></label>'
                                +'<input type="number" min="1" max="99999999" class="form-control input-sm" id="cedula1" name="cedula1" autofocus required>'
                            +'</div>'
                        +'</div>'
                        +'<div class="col-md-6">'
                            +'<div class="form-group">'
                                +'<label for="nombre1"><strong>Nombre: </strong></label>'
                                +'<input type="text" class="form-control input-sm" id="nombre1" name="nombre1" minlength="2" required>'
                            +'</div>'
                        +'</div>'

                        +'<div class="col-md-6">'
                            +'<div class="form-group">'
                                +'<label for="apellidos1"><strong>Apellidos: </strong></label>'
                                +'<input type="text" class="form-control input-sm" id="apellidos1" name="apellidos1" minlength="2" required>'
                            +'</div>'
                        +'</div>'
                        +'<div class="col-md-6">'
                            +'<div class="form-group">'
                                +'<label for="fecha_n1"><strong>Fecha de Nacimiento: </strong></label>'
                                +'<input type="date" class="form-control input-sm" id="fecha_n1" name="fecha_n1" required>'
                            +'</div>'
                        +'</div>'

                        +'<div class="col-md-6">'
                            +'<div class="form-group">'
                                +'<label for="fecha_ingreso1"><strong>Fecha de Ingreso: </strong></label>'
                                +'<input type="date" class="form-control input-sm" id="fecha_ingreso1" name="fecha_ingreso1" required>'
                            +'</div>'
                        +'</div>'
                        +'<div class="col-md-6">'
                           +' <div class="form-group">'
                                +'<label for="telefono1"><strong>Telefono: </strong></label>'
                                +'<input type="text" class="form-control input-sm" id="telefono1" name="telefono1">'
                            +'</div>'
                        +'</div>'

                        +'<div class="col-md-12">'
                            +'<div class="form-group">'
                               +'<label for="direccion1"><strong>Direccion: </strong></label>'
                                +'<textarea rows="4" cols="50" class="form-control input-sm" id="direccion1" name="direccion1" ></textarea>'
                            +'</div>'
                        +'</div>'

                        +'<div class="col-md-12"><hr/><h5>Datos Laborales</h5></div>'
                        +'<div class="col-md-6">'
                            +'<div class="form-group">'
                                +'<label for="cargo1"><strong>Cargo: </strong></label>'
                                +'<select class="form-control" id="cargo1" name="cargo1" required>'
                                    +'<option value="">Seleccione</option>'
                                +'</select>'
                            +'</div>'
                        +'</div>'
                        +'<div class="col-md-6">'
                            +'<div class="form-group">'
                                +'<label for="profesion1"><strong>Profesion: </strong></label>'
                                +'<select class="form-control" id="profesion1" name="profesion1" required>'
                                    +'<option value="">Seleccione</option>'
                                +'</select>'
                            +'</div>'
                        +'</div>'

                        +'<div class="col-md-6">'
                            +'<div class="form-group">'
                                +'<label for="tipo_nomina1"><strong>Tipo de Nomina: </strong></label>'
                                +'<select class="form-control" id="tipo_nomina1" name="tipo_nomina1" required>'
                                    +'<option value="">Seleccione</option>'
                                +'</select>'
                            +'</div>'
                        +'</div>'
                        +'<div class="col-md-6">'
                            +'<div class="form-group">'
                                +'<label for="banco"><strong>Banco: </strong></label>'
                                +'<select class="form-control" id="banco1" name="banco1" required>'
                                    +'<option value="">Seleccione</option>'
                                +'</select>'
                            +'</div>'
                        +'</div>'

                        +'<div class="col-md-6">'
                           +' <div class="form-group">'
                                +'<label for="unidad_administrativa1"><strong>Unidad Administrativa: </strong></label>'
                                +'<select class="form-control" id="unidad_administrativa1" name="unidad_administrativa1" required>'
                                    +'<option value="">Seleccione</option>'
                                +'</select>'
                            +'</div>'
                        +'</div>'

 

                        +'</form>'
                        +'</div>'
           
      +'</div>'

        +'<div class="modal-footer form-group">'

            +'<bottom type="button" class="btn btn-primary" style="margin-right:10px" id="guardar_empleado">Guardar</button>'

        +'</div>'

    +'</div>'
  +'</div>'
+'</div>'



    );

$.ajax({
    type: "POST",
    url:"clases/cargo.class.php?resp=1",
    data:"",                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);

        $.each(data, function (i, data) {
            $('#cargo1').append($('<option>', { 
                value: data.id,
                text : data.cargo 
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
    url:"clases/profesion.class.php?resp=1",
    data:"",                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        
        $.each(data, function (i, data) {
            $('#profesion1').append($('<option>', { 
                value: data.id,
                text : data.profesion 
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
    url:"clases/tipo_nomina.class.php?resp=1",
    data:"",                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        
        $.each(data, function (i, data) {
            $('#tipo_nomina1').append($('<option>', { 
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
    url:"clases/banco.class.php?resp=1",
    data:"",                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        
        $.each(data, function (i, data) {
            $('#banco1').append($('<option>', { 
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

$.ajax({
    type: "POST",
    url:"clases/unidad_administrativa.class.php?resp=1",
    data:"",                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        
        $.each(data, function (i, data) {
            $('#unidad_administrativa1').append($('<option>', { 
                value: data.id,
                text : data.unidad_administrativa 
            }));
        });
    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});

/////////validar el formulario con la libreria form validate
$("#form_incluir_empleado").validate({

    rules: {

        nombre1: { 
            required: true,
            lettersonly: true 
        },
        apellidos1: { 
            required: true,
            formula: true 
        },
        fecha_n1: { 
            required: true,
            date: true 
        },
        fecha_ingreso1: { 
            required: true,
            date: true 
        },
        cargo1: { 
            required: true
        },
        profesion1: { 
            required: true
        },
        tipo_nomina1: { 
            required: true
        },
        banco1: { 
            required: true
        },
        unidad_administrativa1: { 
            required: true
        }
        
    },

    messages : {

        cedula1 : {
            required: "Este campo es requerido",
            max: "La cedula esta fuera del rango",
            min: "Cedula Invalida"
        },
        nombre1:{
            required: "Este campo es requerido",
            lettersonly : "Solo Letras",
            minlength: "Nombre Invalido"
        },
        apellidos1:{
            required: "Este campo es requerido",
            formula : "Solo Letras",
            minlength: "Apellidos Invalido"
        },
        fecha_n1: { 
            required: "Este campo es requerido"
        },
        fecha_ingreso1: { 
            required: "Este campo es requerido"

        },
        cargo1: { 
            required: "Este campo es requerido"
        },
        profesion1: { 
            required: "Este campo es requerido"
        },
        tipo_nomina1: { 
            required: "Este campo es requerido"
        },
        banco1: { 
            required: "Este campo es requerido"
        },
        unidad_administrativa1: { 
            required: "Este campo es requerido"
        }
    }

});

jQuery.validator.addMethod("lettersonly", function(value, element) 
{
    return this.optional(element) || /^[a-z ]+$/i.test(value);
}, "Solo letras");

/*jQuery.validator.addMethod("formula", function(value, element) 
{
return this.optional(element) || /^[a-z1234567890()$.+*-/]+$/i.test(value);
}, "formula invalida");*/

/////////fin del validar form


$('#guardar_empleado').click(function(){

    var datos_form = $('#form_incluir_empleado').serialize();
    $.ajax({
        type: "POST",
        url:"clases/empleado.class.php?resp=5",
        data:datos_form,                   
        global:false,
        async: false,
        dataType: "json",
        success: function(data) {
            if (data.existe =='Este Empleado con esta Cedula Ya Existe') {
                alert(data.existe);
                $('#modal_empleado').modal('show');
            };
            if (data.existe =='Registrado') {

                console.log(data.existe);
                alert(data.existe);
                $('#modal_empleado').modal('hide');
                event.preventDefault();
                listar_empleados();

            };
        },
        error:function (xhr, ajaxOptions, thrownError){
          alert('Por favor llene los campos requeridos');
      }

  });

});


}