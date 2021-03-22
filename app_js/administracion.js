function administracion(){
$('#Empleados').empty();
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

$("div").remove( ".modal-backdrop" );


$("#administracion").html(
		'<div class="row">'
		  +'<div class="col-md-12">'
		    +'<h2 class="page-header"> Administracion </h2>'
		  +'</div>'
		+'</div>'
	+'<div class="row" >'
		+'<div class="col-lg-6">'
                    +'<div class="panel panel-default">'
                        +'<div class="panel-heading">'
							+'<div class="row">'
								+'<div class="col-md-6">'
									+'<h4> Banco </h4>'
								+'</div>'
								+'<div class="col-md-6">'
									+'<div class="form-group form-inline pull-right">'
										+'<input type="text" id="buscar_banco" class="form-control input-sm" onkeyup="$.uiTableFilter($(\'#tabla_banco\'), this.value);" placeholder="Buscar Banco">'
										+'<button class="btn btn-sm btn-default" data-toggle="modal" href="#modal_banco" onClick="" title="Agregar Banco">'
											+'<i class="fa fa-plus"></i>'
										+'</button>'	
									+'</div>'						
								+'</div>'
							+'</div>'
                        +'</div>'
                        +'<!-- /.panel-heading -->'
                        +'<div class="panel-body">'
                            +'<div class="table-responsive" style="max-height:150px">'
                                +'<table class="table table-condensed table-striped table-bordered table-hover" id="tabla_banco">'
                                   +'<thead>'
									+'<tr>'
										+'<td>Codigo</td>'
										+'<td>Nombre</td>'
										+'<td>Acciones</td>'
									+'</tr>'
								+'</thead>'
								+'<tbody>'
									
								+'</tbody>'
                                +'</table>'
                            +'</div>'
                            +'<!-- /.table-responsive -->'
                        +'</div>'
                        +'<!-- /.panel-body -->'
                    +'</div>'
            +'<!-- /.panel -->'
    	+'</div>'
		+'<div class="col-lg-6">'
				+'<div class="panel panel-default">'
                        +'<div class="panel-heading">'
							+'<div class="row">'
							+'<div class="col-md-6">'
								+'<h4> Cargos </h4>'
							+'</div>'
							+'<div class="col-md-6 form-group form-inline pull-right">'
								+'<button class="btn btn-sm btn-default pull-right" data-toggle="modal" href="#modal_cargo" onClick="" title="Agregar Cargos">'
								+'<i class="fa fa-plus"></i>'
							+'</button>'
							+'<input type="text" id="buscar_cargo" class="form-control input-sm pull-right"  onkeyup="$.uiTableFilter($(\'#tabla_cargo\'), this.value);" placeholder="Buscar Cargos">'
							+'</div>'
						+'</div>'
                        +'</div>'
                        +'<!-- /.panel-heading -->'
                        +'<div class="panel-body">'
                            +'<div class="table-responsive" style="max-height:150px">'
                                +'<table class="table table-condensed table-striped table-bordered table-hover" id="tabla_cargo">'
                                   +'<thead>'
								+'<tr>'
									+'<td>Codigo</td>'
									+'<td>Nombre</td>'
									+'<td>Acciones</td>'
								+'</tr>'
							+'</thead>'
							+'<tbody>'

							+'</tbody>'
                                +'</table>'
                            +'</div>'
                            +'<!-- /.table-responsive -->'
                        +'</div>'
                        +'<!-- /.panel-body -->'
                    +'</div>'
                    +'<!-- /.panel -->'
        +'</div>'
	+'</div> <!-- final del div row  -->'
	
	+'<div class="row" >'
		+'<div class="col-lg-12">'
                    +'<div class="panel panel-default">'
                        +'<div class="panel-heading">'
							+'<div class="row">'
								+'<div class="col-md-6">'
									+'<h4> Partidas </h4>'
								+'</div>'
								+'<div class="col-md-6">'
									+'<div class="form-group form-inline pull-right">'
										+'<input type="text" id="buscar_partida" class="form-control input-sm" onkeyup="$.uiTableFilter($(\'#tabla_partida\'), this.value);" placeholder="Buscar Partida">'
										+'<button class="btn btn-sm btn-default" data-toggle="modal" href="#modal_partida" onClick="" title="Agregar Partida">'
											+'<i class="fa fa-plus"></i>'
										+'</button>'	
									+'</div>'						
								+'</div>'
							+'</div>'
                        +'</div>'
                        +'<!-- /.panel-heading -->'
                        +'<div class="panel-body">'
                            +'<div class="table-responsive" style="max-height:150px">'
                                +'<table class="table table-condensed table-striped table-bordered table-hover" id="tabla_partida">'
                                   +'<thead>'
									+'<tr>'
										+'<td>Codigo</td>'
										+'<td>Nombre</td>'
										+'<td>Tipo</td>'
										+'<td>Periodicidad</td>'
										+'<td>Descripcion</td>'
										+'<td>Acciones</td>'
									+'</tr>'
								+'</thead>'
								+'<tbody>'

								+'</tbody>'
                                +'</table>'
                            +'</div>'
                            +'<!-- /.table-responsive -->'
                        +'</div>'
                        +'<!-- /.panel-body -->'
                    +'</div>'
                    +'<!-- /.panel -->'
        +'</div>'
	+'</div> <!-- final del div row  -->'

+'<div class="row">'

+'<div class="col-lg-12">'
                    +'<div class="panel panel-default">'
                        +'<div class="panel-heading">'
							+'<div class="row">'
							+'<div class="col-md-6">'
								+'<h4> Formula </h4>'
							+'</div>'
							+'<div class="col-md-6 form-group form-inline pull-right">'
								+'<button class="btn btn-sm btn-default pull-right" data-toggle="modal" href="#modal_formula" onClick="" title="Agregar Formula">'
								+'<i class="fa fa-plus"></i>'
							+'</button>'
							+'<input type="text" id="buscar_formula" class="form-control input-sm pull-right" onkeyup="$.uiTableFilter($(\'#tabla_formula\'), this.value);" placeholder="Buscar Formula">'
							+'</div>'
						+'</div>'
                        +'</div>'
                        +'<!-- /.panel-heading -->'
                        +'<div class="panel-body">'
                            +'<div class="table-responsive" style="max-height:150px">'
                                +'<table class="table table-condensed table-striped table-bordered table-hover" id="tabla_formula">'
                                   +'<thead>'
								+'<tr>'
									+'<td>Codigo</td>'
									+'<td>Partida</td>'
									+'<td>Descripcion Partida</td>'
									+'<td>Descripcion Formula</td>'
									+'<td>Formula</td>'
									+'<td>Acciones</td>'
								+'</tr>'
							+'</thead>'
							+'<tbody>'
								
							+'</tbody>'
                                +'</table>'
                            +'</div>'
                            +'<!-- /.table-responsive -->'
                        +'</div>'
                        +'<!-- /.panel-body -->'
                    +'</div>'
                    +'<!-- /.panel -->'
        +'</div>'


+'</div>'



	+'<div class="row" >'
		+'<div class="col-lg-6">'
                    +'<div class="panel panel-default">'
                        +'<div class="panel-heading">'
							+'<div class="row">'
								+'<div class="col-md-6">'
									+'<h4> Periodicidad </h4>'
								+'</div>'
								+'<div class="col-md-6">'
									+'<div class="form-group form-inline pull-right">'
										+'<input type="text" id="buscar_periodicidad" class="form-control input-sm" onkeyup="$.uiTableFilter($(\'#tabla_periodicidad\'), this.value);" placeholder="Buscar Periodicidad">'
										+'<button class="btn btn-sm btn-default" data-toggle="modal" href="#modal_periodicidad" onClick="" title="Agregar Periodicidad">'
											+'<i class="fa fa-plus"></i>'
										+'</button>'	
									+'</div>'						
								+'</div>'
							+'</div>'
                        +'</div>'
                        +'<!-- /.panel-heading -->'
                        +'<div class="panel-body">'
                            +'<div class="table-responsive" style="max-height:150px">'
                                +'<table class="table table-condensed table-striped table-bordered table-hover" id="tabla_periodicidad">'
                                   +'<thead>'
									+'<tr>'
										+'<td>Codigo</td>'
										+'<td>Periodicidad</td>'
										+'<td>Dias</td>'
										+'<td>Acciones</td>'
									+'</tr>'
								+'</thead>'
								+'<tbody>'
									
								+'</tbody>'
                                +'</table>'
                            +'</div>'
                            +'<!-- /.table-responsive -->'
                        +'</div>'
                        +'<!-- /.panel-body -->'
                    +'</div>'
                    +'<!-- /.panel -->'
        +'</div>'
		+'<div class="col-lg-6">'
                    +'<div class="panel panel-default">'
                        +'<div class="panel-heading">'
							+'<div class="row">'
							+'<div class="col-md-6">'
								+'<h4> Numero de Cuenta </h4>'
							+'</div>'
							+'<div class="col-md-6 form-group form-inline pull-right">'
								+'<button class="btn btn-sm btn-default pull-right" data-toggle="modal" href="#modal_numero_cuenta" onClick="" title="Agregar Numero de  Cuenta">'
								+'<i class="fa fa-plus"></i>'
							+'</button>'
							+'<input type="text" id="buscar_numero_cuenta" class="form-control input-sm pull-right" onkeyup="$.uiTableFilter($(\'#tabla_numero_cuenta\'), this.value);" placeholder="Buscar Numero de Cuenta">'
							+'</div>'
						+'</div>'
                        +'</div>'
                        +'<!-- /.panel-heading -->'
                        +'<div class="panel-body">'
                            +'<div class="table-responsive" style="max-height:150px">'
                                +'<table class="table table-condensed table-striped table-bordered table-hover" id="tabla_numero_cuenta">'
                                   +'<thead>'
								+'<tr>'
									+'<td>Cedula</td>'
									+'<td>Nombre</td>'
									+'<td>Banco</td>'
									+'<td>Numero de Cuenta</td>'
									+'<td>Acciones</td>'
								+'</tr>'
							+'</thead>'
							+'<tbody>'
								
							+'</tbody>'
                                +'</table>'
                            +'</div>'
                            +'<!-- /.table-responsive -->'
                        +'</div>'
                        +'<!-- /.panel-body -->'
                    +'</div>'
                    +'<!-- /.panel -->'
        +'</div>'
	+'</div> <!-- final del div row  -->'
	+'<div class="row" >'
		+'<div class="col-lg-6">'
                    +'<div class="panel panel-default">'
                        +'<div class="panel-heading">'
							+'<div class="row">'
								+'<div class="col-md-6">'
									+'<h4> Permisos </h4>'
								+'</div>'
								+'<div class="col-md-6">'
									+'<div class="form-group form-inline pull-right">'
										+'<input type="text" id="buscar_permisos" class="form-control input-sm" onkeyup="$.uiTableFilter($(\'#tabla_permisos\'), this.value);" placeholder="Buscar Permisos">'
										+'<button class="btn btn-sm btn-default" data-toggle="modal" href="#modal_permiso" onClick="" title="Agregar Permiso">'
											+'<i class="fa fa-plus"></i>'
										+'</button>'	
									+'</div>'						
								+'</div>'
							+'</div>'
                        +'</div>'
                        +'<!-- /.panel-heading -->'
                        +'<div class="panel-body">'
                            +'<div class="table-responsive" style="max-height:150px">'
                                +'<table class="table table-condensed table-striped table-bordered table-hover" id="tabla_permisos">'
                                   +'<thead>'
									+'<tr>'
										+'<td>Codigo</td>'
										+'<td>Permisos</td>'
										+'<td>Dias Maximo</td>'
										+'<td>Dias Minimo</td>'
										+'<td>Acciones</td>'
									+'</tr>'
								+'</thead>'
								+'<tbody>'
									
								+'</tbody>'
                                +'</table>'
                            +'</div>'
                            +'<!-- /.table-responsive -->'
                        +'</div>'
                        +'<!-- /.panel-body -->'
                    +'</div>'
                    +'<!-- /.panel -->'
        +'</div>'
		+'<div class="col-lg-6">'
                    +'<div class="panel panel-default">'
                        +'<div class="panel-heading">'
							+'<div class="row">'
							+'<div class="col-md-6">'
								+'<h4> Profesion </h4>'
							+'</div>'
							+'<div class="col-md-6 form-group form-inline pull-right">'
								+'<button class="btn btn-sm btn-default pull-right" data-toggle="modal" href="#modal_profesion" onClick="" title="Agregar Profesion">'
								+'<i class="fa fa-plus"></i>'
							+'</button>'
							+'<input type="text" id="buscar_profesion" class="form-control input-sm pull-right" onkeyup="$.uiTableFilter($(\'#tabla_profesion\'), this.value);" placeholder="Buscar Profesion">'
							+'</div>'
						+'</div>'
                        +'</div>'
                        +'<!-- /.panel-heading -->'
                        +'<div class="panel-body">'
                            +'<div class="table-responsive" style="max-height:150px">'
                                +'<table class="table table-condensed table-striped table-bordered table-hover" id="tabla_profesion">'
                                   +'<thead>'
								+'<tr>'
									+'<td>Codigo</td>'
									+'<td>Nombre</td>'
									+'<td>Acciones</td>'
								+'</tr>'
							+'</thead>'
							+'<tbody>'
								
							+'</tbody>'
                                +'</table>'
                            +'</div>'
                            +'<!-- /.table-responsive -->'
                        +'</div>'
                        +'<!-- /.panel-body -->'
                    +'</div>'
                    +'<!-- /.panel -->'
        +'</div>'
	+'</div> <!-- final del div row  -->'
	+'<div class="row" >'
		+'<div class="col-lg-6">'
                    +'<div class="panel panel-default">'
                        +'<div class="panel-heading">'
							+'<div class="row">'
								+'<div class="col-md-6">'
									+'<h4> Unidad Administrativa </h4>'
								+'</div>'
								+'<div class="col-md-6">'
									+'<div class="form-group form-inline pull-right">'
										+'<input type="text" id="buscar_unidad_administrativa" class="form-control input-sm" onkeyup="$.uiTableFilter($(\'#tabla_unidad_administrativa\'), this.value);" placeholder="Buscar Unidad Administrativa">'
										+'<button class="btn btn-sm btn-default" data-toggle="modal" href="#modal_unidad_administrativa" onClick="" title="Agregar Unidad Administrativa">'
											+'<i class="fa fa-plus"></i>'
										+'</button>'	
									+'</div>'						
								+'</div>'
							+'</div>'
                        +'</div>'
                        +'<!-- /.panel-heading -->'
                        +'<div class="panel-body">'
                            +'<div class="table-responsive" style="max-height:150px">'
                                +'<table class="table table-condensed table-striped table-bordered table-hover" id="tabla_unidad_administrativa">'
                                   +'<thead>'
									+'<tr>'
										+'<td>Codigo</td>'
										+'<td>Nombre</td>'
										+'<td>Acciones</td>'
									+'</tr>'
								+'</thead>'
								+'<tbody>'
									
								+'</tbody>'
                                +'</table>'
                            +'</div>'
                            +'<!-- /.table-responsive -->'
                        +'</div>'
                        +'<!-- /.panel-body -->'
                    +'</div>'
                    +'<!-- /.panel -->'
        +'</div>'
		+'<div class="col-lg-6">'
                    +'<div class="panel panel-default">'
                        +'<div class="panel-heading">'
							+'<div class="row">'
							+'<div class="col-md-6">'
								+'<h4> Tipo de Nomina </h4>'
							+'</div>'
							+'<div class="col-md-6 form-group form-inline pull-right">'
								+'<button class="btn btn-sm btn-default pull-right" data-toggle="modal" href="#modal_tipo_nomina" onClick="" title="Agregar Tipo de Nomina">'
								+'<i class="fa fa-plus"></i>'
							+'</button>'
							+'<input type="text" id="buscar_tipo_nomina" class="form-control input-sm pull-right" onkeyup="$.uiTableFilter($(\'#tabla_tipo_nomina\'), this.value);" placeholder="Buscar Tipo de Nomina">'
							+'</div>'
						+'</div>'
                        +'</div>'
                        +'<!-- /.panel-heading -->'
                        +'<div class="panel-body">'
                            +'<div class="table-responsive" style="max-height:150px">'
                                +'<table class="table table-condensed table-striped table-bordered table-hover" id="tabla_tipo_nomina">'
                                   +'<thead>'
								+'<tr>'
									+'<td>Codigo</td>'
									+'<td>Nombre</td>'
									+'<td>Acciones</td>'
								+'</tr>'
							+'</thead>'
							+'<tbody>'
								
							+'</tbody>'
                                +'</table>'
                            +'</div>'
                            +'<!-- /.table-responsive -->'
                        +'</div>'
                        +'<!-- /.panel-body -->'
                    +'</div>'
                    +'<!-- /.panel -->'
        +'</div>'
	+'</div> <!-- final del div row  -->'
		+'<div class="row" >'
		+'<div class="col-lg-12">'
                    +'<div class="panel panel-default">'
                        +'<div class="panel-heading">'
							+'<div class="row">'
							+'<div class="col-md-6">'
								+'<h4> Usuarios </h4>'
							+'</div>'
							+'<div class="col-md-6 form-group form-inline pull-right">'
								+'<button class="btn btn-sm btn-default pull-right" data-toggle="modal" href="#modal_usuario" onClick="" title="Agregar Usuarios">'
								+'<i class="fa fa-plus"></i>'
							+'</button>'
							+'<input type="text" id="buscar_usuarios" class="form-control input-sm pull-right" onkeyup="$.uiTableFilter($(\'#tabla_usuarios\'), this.value);" placeholder="Buscar Usuarios">'
							+'</div>'
						+'</div>'
                        +'</div>'
                        +'<!-- /.panel-heading -->'
                        +'<div class="panel-body">'
                            +'<div class="table-responsive" style="max-height:150px">'
                                +'<table class="table table-condensed table-striped table-bordered table-hover" id="tabla_usuarios">'
                                   +'<thead>'
								+'<tr>'
									+'<td>Codigo</td>'
									+'<td>Usuario</td>'
									+'<td>Contraseña</td>'
									+'<td>Tipo</td>'
									+'<td>Acciones</td>'
								+'</tr>'
							+'</thead>'
							+'<tbody>'
								
							+'</tbody>'
                                +'</table>'
                            +'</div>'
                            +'<!-- /.table-responsive -->'
                        +'</div>'
                        +'<!-- /.panel-body -->'
                    +'</div>'
                    +'<!-- /.panel -->'
        +'</div>'
	+'</div> <!-- final del div row  -->'


/////////7//////////////////////////Modales /////////////////////////////////////////////////////


///////////////////////////////Banco /////////////////
+'<div class="modal fade" id="modal_banco" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Banco</h4>'
      +'</div>'
      +'<form id="form_banco">'
      +'<div class="modal-body">'
        +'<div class="form-group">'
          +'<label for="nombre_banco"><strong>Nombre del Banco: </strong></label>'
          +'<input type="text" class="form-control" id="nombre_banco" name="nombre_banco">'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" class="btn btn-primary pull-rigth" data-dismiss="modal" onClick="incluir_banco();">Guardar</button>'
        +'</form>'
      +'</div>'
    +'</div>'
  +'</div>'
+'</div>'
///////////////////////////////Cargo /////////////////
+'<div class="modal fade" id="modal_cargo" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Cargo</h4>'
      +'</div>'
      +'<div class="modal-body">'
        +'<form id="form_cargo">'
        +'<div class="form-group">'
          +'<label for="nombre_cargo"><strong>Nombre del Cargo: </strong></label>'
          +'<input type="text" class="form-control" id="nombre_cargo" name="nombre_cargo">'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" onClick="incluir_cargos();" class="btn btn-primary pull-rigth" data-dismiss="modal">Guardar</button>'
		+'</form>'
      +'</div>'
    +'</div>'
  +'</div>'
+'</div>'
///////////////////////////////Partidas /////////////////
+'<div class="modal fade" id="modal_partida" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Partida</h4>'
      +'</div>'
      +'<div class="modal-body">'
        +'<form id="form_partida">'
		+'<div class="form-group">'
          +'<label for="nombre_partida"><strong>Nombre de la partida: </strong></label>'
          +'<input type="text" class="form-control" name="nombre_partida" id="nombre_partida">'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="tipo_partida"><strong>Tipo: </strong></label>'
          +'<select class="form-control" id="tipo_partida" name=tipo_partida>'
		  +'<option value="">Seleccione</option>'
          +'<option value="Asignacion">Asignacion</option>'
          +'<option value="Deduccion">Deduccion</option>'
          +'<option value="Credito">Credito</option>'
          +'</select>'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="periodicidad_partida2"><strong>Periodicidad: </strong></label>'
          +'<select class="form-control" id="periodicidad_partida2" name=periodicidad_partida2>'
          +'<option value="">Seleccione</option>'

          +'</select>'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="descripcion_partida"><strong>Descripcion de la partida: </strong></label>'
          +'<textarea class="form-control" name="descripcion_partida" id="descripcion_partida" cols="20" rows="5">'
          +'</textarea>'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" onClick="incluir_partida();" class="btn btn-primary pull-rigth" data-dismiss="modal">Guardar</button>'
      +'</div>'
      +'</form>'
    +'</div>'
  +'</div>'
+'</div>'
///////////////////////////////Formula Partidas /////////////////
+'<div class="modal fade" id="modal_formula" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Formula: </h4>'
      +'</div>'
      +'<div class="modal-body">'
        +'<form id="form_formula">'
 +'<div class="form-group">'
		  +'<label for="partida_formula"><strong>Nota Importante: </strong></label>'
		    +'<blockquote>'
				+'<p> La formula se aplica solo a la partida selecionada, si es porcentaje use el valor relativo. Ejemplo:'
						+' 50% es igual a 0.5, si es solo un valor (decimal o absoluto) coloque 200 para por ejemplo Prima por Hogar. Las variables al cual se le puede aplicar la formula va a depender de las ya creadas'
						+' por el sistema ($sueldo_base, $cant_hijos, $antiguedad, $cant_cuotas, $credito, $anos_vencidos e $inasistencias). Si quiere crear variables ponganse en contacto con'
						+' el administrador del sistema.'
				+'</p>'
			+'</blockquote>'
        +'</div>'
        +'<div class="form-group">'
		  +'<label for="partida_formula"><strong>Partida a aplicar la formula: </strong></label>'
		  +'<select class="form-control" id="partida_formula" name=partida_formula>'
          +'<option value="">Seleccione</option>'
          +'</select>'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="descripcion_partida_formula"><strong>Descripcion de la partida: </strong></label>'
          +'<textarea class="form-control" name="descripcion_partida_formula" id="descripcion_partida_formula" placeholder="Ejemplo: LPH Deduccion" cols="10" rows="5">'
          +'</textarea>'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="descripcion_formula"><strong>Descripcion de la formula: </strong></label>'
          +'<textarea class="form-control" name="descripcion_formula" id="descripcion_formula" cols="10" rows="5" placeholder="Ejemplo: Esta formula es para LPH">'
          +'</textarea>'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="formula_partida"><strong>Formula: </strong></label>'
          +'<textarea class="form-control" name="formula_partida" id="formula_partida" placeholder="Ejemplo de Formula con variables: $sueldo_base*0.02\nUse los operadores matematicos: * / + - y los ( )\nNota Importante: Los decimales se denota con punto (.) no con comas (,)\nEjemplo: 0.02" cols="10" rows="5">'
          +'</textarea>'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" onClick="incluir_formula();" class="btn btn-primary pull-rigth" data-dismiss="modal">Guardar</button>'
      +'</div>'
      +'</form>'
    +'</div>'
  +'</div>'
+'</div>'
///////////////////////////////Periodicidad /////////////////
+'<div class="modal fade" id="modal_periodicidad" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Periodicidad</h4>'
      +'</div>'
      +'<div class="modal-body">'
        +'<form id="form_periodicidad">'
		+'<div class="form-group">'
          +'<label for="nombre_periodicidad"><strong>Nombre de la Periodicidad: </strong></label>'
          +'<input type="text" class="form-control" id="nombre_periodicidad" name="nombre_periodicidad">'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="dias"><strong>Dias: </strong></label>'
          +'<input type="number" class="form-control" id="cant_dias" name="cant_dias">'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" onClick="incluir_periodicidad();" class="btn btn-primary pull-rigth" data-dismiss="modal">Guardar</button>'
      +'</div>'
      +'</form>'  
    +'</div>'
  +'</div>'
+'</div>'
///////////////////////////////Numero de Cuenta /////////////////
+'<div class="modal fade" id="modal_numero_cuenta" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Numero de Cuenta</h4>'
      +'</div>'
      +'<div class="modal-body">'
        +'<form id="form_numero_cuenta">'
        +'<div class="form-group">'
          +'<label for="cedula_cuenta"><strong>Cedula: </strong></label>'
          +'<input type="text" class="form-control" id="cedula_cuenta" name="cedula_cuenta">'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="numero_cuenta"><strong>Numero de Cuenta: </strong></label>'
          +'<input type="text" class="form-control" id="numero_cuenta" name="numero_cuenta">'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" onClick="incluir_numero_cuenta();" class="btn btn-primary pull-rigth" data-dismiss="modal">Guardar</button>'
      +'</div>'
      +'</form>'  
    +'</div>'
  +'</div>'
+'</div>'
///////////////////////////////Tipos de Permisos /////////////////
+'<div class="modal fade" id="modal_permiso" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Tipos de Permisos</h4>'
      +'</div>'
      +'<div class="modal-body">'

        +'<form id="form_permiso">'
		+'<div class="form-group">'
          +'<label for="nombre_permiso"><strong>Nombre del Permiso: </strong></label>'
          +'<input type="text" class="form-control" id="nombre_permiso" name="nombre_permiso">'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="dias_min"><strong>Dias Minimos: </strong></label>'
          +'<input type="number" class="form-control" id="dias_min" name="dias_min">'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="dias_max"><strong>Dias Maximos: </strong></label>'
          +'<input type="number" class="form-control" id="dias_max" name="dias_max">'
        +'</div>'        
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" onClick="incluir_permiso();" class="btn btn-primary pull-rigth" data-dismiss="modal">Guardar</button>'
      +'</div>'
      +'</form>'  
        
    +'</div>'
  +'</div>'
+'</div>'
///////////////////////////////Profesion /////////////////
+'<div class="modal fade" id="modal_profesion" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Profesion</h4>'
      +'</div>'
      +'<div class="modal-body">'

        +'<form id="form_profesion">'
        +'<div class="form-group">'
          +'<label for="nombre_profesion"><strong>Nombre de la Profesion: </strong></label>'
          +'<input type="text" class="form-control" id="nombre_profesion" name="nombre_profesion">'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" onClick="incluir_profesion();" class="btn btn-primary pull-rigth" data-dismiss="modal">Guardar</button>'
      +'</div>'
      +'</form>'  

    +'</div>'
  +'</div>'
+'</div>'
///////////////////////////////Unidad Aministrativa /////////////////
+'<div class="modal fade" id="modal_unidad_administrativa" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Unidad Administrativa</h4>'
      +'</div>'
      +'<div class="modal-body">'

        +'<form id="form_unidad_administrativa">'
        +'<div class="form-group">'
          +'<label for="nombre_unidad_administrativa"><strong>Nombre de la Unidad Administrativa: </strong></label>'
          +'<input type="text" class="form-control" id="nombre_unidad_administrativa" name="nombre_unidad_administrativa">'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" onClick="incluir_unidad_administrativa();" class="btn btn-primary pull-rigth" data-dismiss="modal">Guardar</button>'
      +'</div>'
      +'</form>'  

    +'</div>'
  +'</div>'
+'</div>'
///////////////////////////////Tipo de Nomina /////////////////
+'<div class="modal fade" id="modal_tipo_nomina" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Tipo de Nomina</h4>'
      +'</div>'
      +'<div class="modal-body">'
        +'<form id="form_tipo_nomina">'
        +'<div class="form-group">'
          +'<label for="nombre_tipo_nomina"><strong>Nombre del Tipo de Nomina: </strong></label>'
          +'<input type="text" class="form-control" id="nombre_tipo_nomina" name="nombre_tipo_nomina">'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button" onClick="incluir_tipo_nomina();" class="btn btn-primary pull-rigth" data-dismiss="modal">Guardar</button>'
      +'</div>'
      +'</form>'  
    +'</div>'
  +'</div>'
+'</div>'
///////////////////////////////Usuarios /////////////////
+'<div class="modal fade" id="modal_usuario" role="dialog">'
  +'<div class="modal-dialog">'
    +'<!-- Modal content-->'
    +'<div class="modal-content">'
      +'<div class="modal-header">'
        +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
        +'<h4 class="modal-title" align="center">Agregar Usuarios</h4>'
      +'</div>'
      +'<div class="modal-body">'

        +'<form id="form_usuario">'
        +'<div class="form-group">'
          +'<label for="nombre_usuario"><strong>Usuario: </strong></label>'
          +'<input type="text" class="form-control" id="nombre_usuario" name="nombre_usuario">'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="passwd"><strong>Contraseña: </strong></label>'
          +'<input type="password" class="form-control" id="passwd" name="passwd">'
        +'</div>'
        +'<div class="form-group">'
          +'<label for="tipo_cuenta"><strong>Tipo de la Cuenta: </strong></label>'
		  	+'<select class="form-control" id="tipo_cuenta" name=tipo_cuenta>'
          		+'<option value="1">Director</option>'
          		+'<option value="2">Asistente Administrativo I</option>'
          		+'<option value="3">Asistente Administrativo II</option>'
          		+'<option value="4">Analista de Nomina</option>'
          	+'</select>'
        +'</div>'
      +'</div>'
      +'<div class="modal-footer">'
        +'<button type="button"  onClick="incluir_usuarios();"  class="btn btn-primary pull-rigth" data-dismiss="modal">Guardar</button>'
      +'</div>'
      +'</form>'  
    +'</div>'
  +'</div>'
+'</div>'
	);


/////////////////////////////////////////////DATA TABLES////////////
	$('#tabla_banco').dataTable( {
		 "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
				"ajax": "clases/banco.class.php?resp=3",					
					 "columns": [
						{ "data": "id_banco" },
						{ "data": "nombre_banco" },
						{ "data": "acciones" },

						]
			    });
	$('#tabla_cargo').dataTable( {
		 "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
				"ajax": "clases/cargo.class.php?resp=3",					
					 "columns": [
						{ "data": "id_cargo" },
						{ "data": "nombre_cargo" },
						{ "data": "acciones" },

						]
			    });
	$('#tabla_partida').dataTable( {
		 "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
				"ajax": "clases/partida.class.php?resp=1",					
					 "columns": [
						{ "data": "id_partida" },
						{ "data": "partida" },
						{ "data": "tipo_partida" },
						{ "data": "periodicidad_partida" },
						{ "data": "descripcion_partida" },
						{ "data": "acciones" },
						]
			    });
	$('#tabla_formula').dataTable( {
		 "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
				"ajax": "clases/formula.class.php?resp=1",					
					 "columns": [
						{ "data": "id_formula" },
						{ "data": "partida" },
						{ "data": "descripcion_partida" },
						{ "data": "descripcion_formula" },
						{ "data": "formula" },
						{ "data": "acciones" },
						]
			    });
	$('#tabla_periodicidad').dataTable( {
		 "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
				"ajax": "clases/periodicidad.class.php?resp=1",					
					 "columns": [
						{ "data": "id_periodicidad" },
						{ "data": "periodicidad" },
						{ "data": "dias" },
						{ "data": "acciones" },
						]
			    });
	$('#tabla_numero_cuenta').dataTable( {
		 "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
				"ajax": "clases/numero_cuenta.class.php?resp=1",					
					 "columns": [
						{ "data": "cedula" },
						{ "data": "nombre" },
						{ "data": "banco" },
						{ "data": "numero_cuenta" },
						{ "data": "acciones" },
						]
			    });
	$('#tabla_permisos').dataTable( {
		 "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
				"ajax": "clases/permiso.class.php?resp=1",					
					 "columns": [
						{ "data": "id_permiso" },
						{ "data": "permiso" },
						{ "data": "dias_min" },
						{ "data": "dias_max" },
						{ "data": "acciones" },
						]
			    });
	$('#tabla_profesion').dataTable( {
		 "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
				"ajax": "clases/profesion.class.php?resp=3",					
					 "columns": [
						{ "data": "id_profesion" },
						{ "data": "profesion" },
						{ "data": "acciones" },
						]
			    });
	$('#tabla_unidad_administrativa').dataTable( {
		 "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
				"ajax": "clases/unidad_administrativa.class.php?resp=3",					
					 "columns": [
						{ "data": "id_unidad_administrativa" },
						{ "data": "unidad_administrativa" },
						{ "data": "acciones" },
						]
			    });
	$('#tabla_tipo_nomina').dataTable( {
		 "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
				"ajax": "clases/tipo_nomina.class.php?resp=3",					
					 "columns": [
						{ "data": "id_tipo_nomina" },
						{ "data": "tipo_nomina" },
						{ "data": "acciones" },
						]
			    });
	$('#tabla_usuarios').dataTable( {
		 "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
				"ajax": "clases/usuario.class.php?resp=1",					
					 "columns": [
						{ "data": "id_usuario" },
						{ "data": "usuario" },
						{ "data": "passwd" },
						{ "data": "nivel" },
						{ "data": "acciones" },
						]
			    });



$.ajax({
    type: "POST",
    url:"clases/periodicidad.class.php?resp=3",
    data:"",                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);

        $.each(data, function (i, data) {
            $('#periodicidad_partida2').append($('<option>', { 
                value: data.id,
                text : data.periodicidad 
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
    url:"clases/partida.class.php?resp=3",
    data:"",                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);

        $.each(data, function (i, data) {
            $('#partida_formula').append($('<option>', { 
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
            $('#banco_cuenta').append($('<option>', { 
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


}




function incluir_numero_cuenta(){
	event.preventDefault();

	var datos = $("#form_numero_cuenta").serialize();
	console.log($("#form_numero_cuenta").serialize());

$.ajax({
    type: "POST",
    url:"clases/numero_cuenta.class.php?resp=2",
    data:datos,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        alert(data.existe);
		$('#tabla_numero_cuenta').DataTable().ajax.reload();
		$("#form_numero_cuenta")[0].reset();

    },
    error:function (xhr, ajaxOptions, thrownError){
		alert("Ya existe un empleado con ese numero de cuenta.");
/*      alert(xhr.status);
      alert(thrownError);*/
  }
});
}



function incluir_partida(){
	event.preventDefault();
	$('#tabla_partida').DataTable().ajax.reload();
	$('#tabla_formula').DataTable().ajax.reload();
	var datos = $("#form_partida").serialize();
	console.log($("#form_partida").serialize());

$.ajax({
    type: "POST",
    url:"clases/partida.class.php?resp=2",
    data:datos,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        alert(data.existe);
		$('#tabla_formula').DataTable().ajax.reload();
		$('#tabla_partida').DataTable().ajax.reload();		
		$("#form_partida")[0].reset();
		administracion();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});
}



function incluir_formula(){
	event.preventDefault();
	$('#tabla_partida').DataTable().ajax.reload();
	$('#tabla_formula').DataTable().ajax.reload();


	var datos = $("#form_formula").serialize();
	console.log($("#form_formula").serialize());

$.ajax({
    type: "POST",
    url:"clases/formula.class.php?resp=2",
    data:datos,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        alert(data.existe);
		$('#tabla_formula').DataTable().ajax.reload();
		$('#tabla_partida').DataTable().ajax.reload();
		$("#form_formula")[0].reset();
		administracion();




    },
    error:function (xhr, ajaxOptions, thrownError){
/*      alert(xhr.status);
      alert(thrownError);*/
      alert("Complete los campos, Error al guardar");
  }
});
}


function incluir_banco(){
	event.preventDefault();

	var datos = $("#form_banco").serialize();
	console.log($("#form_banco").serialize());

$.ajax({
    type: "POST",
    url:"clases/banco.class.php?resp=4",
    data:datos,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        alert(data.existe);
		$('#tabla_banco').DataTable().ajax.reload();
		$("#form_banco")[0].reset();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});


}

function incluir_cargos(){
	event.preventDefault();
	var datos = $("#form_cargo").serialize();
	console.log($("#form_cargo").serialize());

$.ajax({
    type: "POST",
    url:"clases/cargo.class.php?resp=4",
    data:datos,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        alert(data.existe);
		$('#tabla_cargo').DataTable().ajax.reload();
		$("#form_cargo")[0].reset();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});

}

function incluir_periodicidad(){
	event.preventDefault();
	var datos = $("#form_periodicidad").serialize();
	console.log($("#form_periodicidad").serialize());

$.ajax({
    type: "POST",
    url:"clases/periodicidad.class.php?resp=2",
    data:datos,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        alert(data.existe);
		$('#tabla_periodicidad').DataTable().ajax.reload();
		$("#form_periodicidad")[0].reset();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});

}

function incluir_permiso(){
	event.preventDefault();
	var datos = $("#form_permiso").serialize();
	console.log($("#form_permiso").serialize());

$.ajax({
    type: "POST",
    url:"clases/permiso.class.php?resp=2",
    data:datos,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        alert(data.existe);
		$('#tabla_permisos').DataTable().ajax.reload();
		$("#form_permiso")[0].reset();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});

}


function incluir_profesion(){
	event.preventDefault();
	var datos = $("#form_profesion").serialize();
	console.log($("#form_profesion").serialize());

$.ajax({
    type: "POST",
    url:"clases/profesion.class.php?resp=4",
    data:datos,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        alert(data.existe);
		$('#tabla_profesion').DataTable().ajax.reload();
		$("#form_profesion")[0].reset();



    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});

}

function incluir_unidad_administrativa(){
	event.preventDefault();
	var datos = $("#form_unidad_administrativa").serialize();
	console.log($("#form_unidad_administrativa").serialize());

$.ajax({
    type: "POST",
    url:"clases/unidad_administrativa.class.php?resp=4",
    data:datos,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        alert(data.existe);
		$('#tabla_unidad_administrativa').DataTable().ajax.reload();
		$("#form_unidad_administrativa")[0].reset();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});

}


function incluir_tipo_nomina(){
	event.preventDefault();
	var datos = $("#form_tipo_nomina").serialize();
	console.log($("#form_tipo_nomina").serialize());

$.ajax({
    type: "POST",
    url:"clases/tipo_nomina.class.php?resp=4",
    data:datos,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        alert(data.existe);
		$('#tabla_tipo_nomina').DataTable().ajax.reload();
		$("#form_tipo_nomina")[0].reset();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});

}

function incluir_usuarios(){
	event.preventDefault();
	var datos = $("#form_usuario").serialize();
	console.log($("#form_usuario").serialize());

$.ajax({
    type: "POST",
    url:"clases/usuario.class.php?resp=2",
    data:datos,                   
    global:false,
    async: false,
    dataType: "json",
    success: function(data) {                             
        console.log(data);
        alert(data.existe);
		$('#tabla_usuarios').DataTable().ajax.reload();
		$("#form_usuario")[0].reset();


    },
    error:function (xhr, ajaxOptions, thrownError){
      alert(xhr.status);
      alert(thrownError);
  }
});

}


function eliminar_partida(cod_partida){

console.log(cod_partida);


var parametros = {
    "cod_partida" : cod_partida
  };
$.ajax({
                type: "POST",
                url:"clases/partida.class.php?resp=5",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                        console.log(data);
                        alert(data.existe);
                        //para recargar la tabla hijos al eliminar
                        $('#tabla_partida').DataTable().ajax.reload();
						$('#tabla_formula').DataTable().ajax.reload();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          }); 


}


function eliminar_formula(id_formula){

console.log(id_formula);

var parametros = {
    "id_formula" : id_formula
  };
$.ajax({
                type: "POST",
                url:"clases/formula.class.php?resp=3",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                        console.log(data);
                        alert(data.existe);
                        //para recargar la tabla hijos al eliminar
                        $('#tabla_partida').DataTable().ajax.reload();
						$('#tabla_formula').DataTable().ajax.reload();

                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          }); 


}

function eliminar_numero_cuenta (cedula) {
	
	console.log(cedula);



var parametros = {
    "cedula" : cedula
  };
$.ajax({
                type: "POST",
                url:"clases/numero_cuenta.class.php?resp=3",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                        console.log(data);
                        alert(data.existe);
                        //para recargar la tabla hijos al eliminar
						$('#tabla_numero_cuenta').DataTable().ajax.reload();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          }); 


	}

function eliminar_usuario (codigo) {
	
	console.log(codigo);



var parametros = {
    "codigo" : codigo
  };
$.ajax({
                type: "POST",
                url:"clases/usuario.class.php?resp=3",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
                        console.log(data);
                        alert(data.existe);
                        //para recargar la tabla hijos al eliminar
						$('#tabla_usuarios').DataTable().ajax.reload();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          }); 


	}

function editar_banco(id_banco){
	console.log(id_banco);
	var parametros = {
	    "id_banco" : id_banco
	  };

	$.ajax({       
		type: "POST",
		url:"clases/banco.class.php?resp=7",
		data: parametros,                   
		global:false,
		async: false,
		dataType: "json",
		success: function(data) {                             
			console.log(data);
			id_banco=data[0].id_banco;

			$("#editar_banco").html(
			  '<div class="modal fade" id="modal_editar_banco" role="dialog">'
			      +'<div class="modal-dialog">'
			        +'<!-- Modal content-->'
			        +'<div class="modal-content">'
			          +'<div class="modal-header">'
			            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
			            +'<h4 class="modal-title" align="center">Modificar Banco</h4>'
			          +'</div>'
			        +'<div class="modal-body">'       
			            +'<table class="table table-bordered table-striped" style="clear: both">'
			            +'<tbody> '
			                    +'<tr> '        
			                        +'<td>Codigo: </td>'
			                        +'<td><strong>'+data[0].id_banco+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '        
			                        +'<td>Nombre</td>'
			                        +'<td><a href="" id="banco_n" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Nombre" class="editable editable-click editable-empty">'+data[0].nombre_banco+'</a></td>'
			                    +'</tr> '           
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
			 return id_banco
        },
       
        error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
        }
	});

//nombre 
    $('#banco_n').editable({
		validate: function(banco_n) {
			if($.trim(banco_n) == '') return 'Requerido';
			console.log($.trim(banco_n)); 
            var parametros = {
            "banco_n": banco_n,
            "id_banco" : id_banco
		};            

			$.ajax({
                type: "POST",
                url:"clases/banco.class.php?resp=6",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_banco').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);
                }
			});         
        }
    });
}

function editar_cargo(id_cargo){
	console.log(id_cargo);
	var parametros = {
	    "id_cargo" : id_cargo
	  };

	$.ajax({       
		type: "POST",
		url:"clases/cargo.class.php?resp=6",
		data: parametros,                   
		global:false,
		async: false,
		dataType: "json",
		success: function(data) {                             
			console.log(data);
			id_cargo=data[0].id_cargo;

			$("#editar_cargo").html(
			  '<div class="modal fade" id="modal_editar_cargo" role="dialog">'
			      +'<div class="modal-dialog">'
			        +'<!-- Modal content-->'
			        +'<div class="modal-content">'
			          +'<div class="modal-header">'
			            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
			            +'<h4 class="modal-title" align="center">Modificar cargo</h4>'
			          +'</div>'
			        +'<div class="modal-body">'       
			            +'<table class="table table-bordered table-striped" style="clear: both">'
			            +'<tbody> '
			                    +'<tr> '        
			                        +'<td>Codigo: </td>'
			                        +'<td><strong>'+data[0].id_cargo+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '        
			                        +'<td>Nombre</td>'
			                        +'<td><a href="" id="cargo_n" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Nombre" class="editable editable-click editable-empty">'+data[0].nombre_cargo+'</a></td>'
			                    +'</tr> '           
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
			 return id_cargo
        },
       
        error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
        }
	});

//nombre 
    $('#cargo_n').editable({
		validate: function(cargo_n) {
			if($.trim(cargo_n) == '') return 'Requerido';
			console.log($.trim(cargo_n)); 
            var parametros = {
            "cargo_n": cargo_n,
            "id_cargo" : id_cargo
		};            

			$.ajax({
                type: "POST",
                url:"clases/cargo.class.php?resp=5",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_cargo').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);
                }
			});         
        }
    });
}

function editar_profesion(id_profesion){
	console.log(id_profesion);
	var parametros = {
	    "id_profesion" : id_profesion
	  };

	$.ajax({       
		type: "POST",
		url:"clases/profesion.class.php?resp=6",
		data: parametros,                   
		global:false,
		async: false,
		dataType: "json",
		success: function(data) {                             
			console.log(data);
			id_profesion=data[0].id_profesion;

			$("#editar_profesion").html(
			  '<div class="modal fade" id="modal_editar_profesion" role="dialog">'
			      +'<div class="modal-dialog">'
			        +'<!-- Modal content-->'
			        +'<div class="modal-content">'
			          +'<div class="modal-header">'
			            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
			            +'<h4 class="modal-title" align="center">Modificar Profesion</h4>'
			          +'</div>'
			        +'<div class="modal-body">'       
			            +'<table class="table table-bordered table-striped" style="clear: both">'
			            +'<tbody> '
			                    +'<tr> '        
			                        +'<td>Codigo: </td>'
			                        +'<td><strong>'+data[0].id_profesion+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '        
			                        +'<td>Nombre</td>'
			                        +'<td><a href="" id="profesion_n" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Nombre" class="editable editable-click editable-empty">'+data[0].nombre_profesion+'</a></td>'
			                    +'</tr> '           
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
			 return id_cargo
        },
       
        error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
        }
	});

//nombre 
    $('#cargo_n').editable({
		validate: function(cargo_n) {
			if($.trim(cargo_n) == '') return 'Requerido';
			console.log($.trim(cargo_n)); 
            var parametros = {
            "cargo_n": cargo_n,
            "id_cargo" : id_cargo
		};            

			$.ajax({
                type: "POST",
                url:"clases/cargo.class.php?resp=5",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_cargo').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);
                }
			});         
        }
    });
}



function editar_partida(id_partida){

	console.log(id_partida);

	
	var parametros = {
	    "id_partida" : id_partida
	  };

	$.ajax({       
		type: "POST",
		url:"clases/partida.class.php?resp=6",
		data: parametros,                   
		global:false,
		async: false,
		dataType: "json",
		success: function(data) {                             
			console.log(data);
			cod_partida=data[0].cod_partida;

			$("#editar_partida").html(
			  '<div class="modal fade" id="modal_editar_partida" role="dialog">'
			      +'<div class="modal-dialog">'
			        +'<!-- Modal content-->'
			        +'<div class="modal-content">'
			          +'<div class="modal-header">'
			            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
			            +'<h4 class="modal-title" align="center">Modificar Partida</h4>'
			          +'</div>'
			        +'<div class="modal-body">'       
			            +'<table class="table table-bordered table-striped" style="clear: both">'
			            +'<tbody> '
			                    +'<tr> '        
			                        +'<td>Codigo: </td>'
			                        +'<td><strong>'+data[0].cod_partida+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '        
			                        +'<td>Nombre</td>'
			                        +'<td><a href="" id="partida_n" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Nombre" class="editable editable-click editable-empty">'+data[0].partida+'</a></td>'
			                    +'</tr> '
			                    +'<tr> '        
			                        +'<td>Tipo</td>'
			                        +'<td><a href="#" id="tipo_p" data-type="select" data-pk="1" data-value="" data-title="Seleccione Tipo" class="editable editable-click" style="color: blue;">'+data[0].tipo+'</a></td>'
			                    +'</tr>'

			                    +'<tr> '        
			                        +'<td>Periodicidad</td>'
			                        +'<td><a href="#" id="periodicidad_p" data-type="select" data-pk="1" data-value="" data-title="Seleccione Periodicidad" class="editable editable-click" style="color: blue;">'+data[0].periodicidad+'</a></td>'
			                    +'</tr>'
			                    +'<tr>'         
			                        +'<td>Descripcion</td>'
			                        +'<td><a href="#" id="descripcion_p" data-type="textarea" data-pk="1" data-placeholder="'+data[0].descripcion+'" data-title="Ingrese la Descripcion" class="editable editable-pre-wrapped editable-click">'+data[0].descripcion+'</a></td>'
			                    +'</tr> ' 

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
			 return cod_partida
        },
       
        error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
        }
	});

    $('#tipo_p').editable({
        source: [
            {value: 'Asignacion', text: 'Asignacion'},
            {value: 'Deduccion', text: 'Deduccion'},
            {value: 'Credito', text: 'Credito'}

        ],

		validate: function(tipo_p) {
				if($.trim(tipo_p) == '') return 'Requerido';
				console.log($.trim(tipo_p)); 

	            var parametros = {
	            "tipo_p": tipo_p,
	            "cod_partida" : cod_partida
			};            

				$.ajax({
	                type: "POST",
	                url:"clases/partida.class.php?resp=7",
	                data:parametros,                   
	                global:false,
	                async: false,
	                dataType: "json",
	                success: function(data) {                             
						console.log(data);
						$('#tabla_partida').DataTable().ajax.reload();


					},
	                error:function (xhr, ajaxOptions, thrownError){
						alert(xhr.status);
						alert(thrownError);
	                }
				});       
	    }

 
    });  


//nombre 
    $('#partida_n').editable({
		validate: function(partida_n) {
			if($.trim(partida_n) == '') return 'Requerido';
			console.log($.trim(partida_n)); 

            var parametros = {
            "partida_n": partida_n,
            "cod_partida" : cod_partida
		};            

			$.ajax({
                type: "POST",
                url:"clases/partida.class.php?resp=7",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_partida').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);
                }
			});         
        }
    });


//seleccione el banco
$('#periodicidad_p').editable({
source: function() {
 $.ajax({
                type: "POST",
                url:"clases/periodicidad.class.php?resp=4",
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
    validate: function(periodicidad_p) {
           if($.trim(periodicidad_p) == '') return 'Requerido';
           console.log(periodicidad_p);
           console.log(id_partida);
            var parametros = {
            "cod_partida" : cod_partida,
            "periodicidad_p": periodicidad_p
              };            

            $.ajax({
                type: "POST",
                url:"clases/partida.class.php?resp=7",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_partida').DataTable().ajax.reload();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          });     
          }
 });


    $('#descripcion_p').editable({
        showbuttons: 'bottom',
        validate: function(descripcion_p) {
            console.log($.trim(descripcion_p));
            console.log(id_partida);
            var parametros = {
            "cod_partida" : cod_partida,
            "descripcion_p": descripcion_p
              };            

            $.ajax({
                type: "POST",
                url:"clases/partida.class.php?resp=7",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_partida').DataTable().ajax.reload();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          }); 



            }
    });


}

function editar_formula(id_formula){


console.log(id_formula);



var parametros = {
	    "id_formula" : id_formula
	  };

	$.ajax({       
		type: "POST",
		url:"clases/formula.class.php?resp=4",
		data: parametros,                   
		global:false,
		async: false,
		dataType: "json",
		success: function(data) {                             
			console.log(data);
			id_formula=data[0].id_formula;

			$("#editar_formula").html(
			  '<div class="modal fade" id="modal_editar_formula" role="dialog">'
			      +'<div class="modal-dialog">'
			        +'<!-- Modal content-->'
			        +'<div class="modal-content">'
			          +'<div class="modal-header">'
			            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
			            +'<h4 class="modal-title" align="center">Modificar Formula</h4>'
			          +'</div>'
			        +'<div class="modal-body">'       
			            +'<table class="table table-bordered table-striped" style="clear: both">'
			            +'<tbody> '
			                    +'<tr> '        
			                        +'<td>Codigo: </td>'
			                        +'<td><strong>'+data[0].id_formula+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '        
			                        +'<td>Partida</td>'
			                        +'<td><a href="#" id="formula_p" data-type="select" data-pk="1" data-value="" data-title="Seleccione Partida" class="editable editable-click" style="color: blue;">'+data[0].partida_f+'</a></td>'
			                    +'</tr>'

			                    +'<tr>'         
			                        +'<td>Descripcion de la Partida</td>'
			                        +'<td><a href="#" id="des" data-type="textarea" data-pk="1" data-placeholder="'+data[0].descripcion_partida_formula+'" data-placement="right" data-title="Ingrese la Descripcion" class="editable editable-pre-wrapped editable-click">'+data[0].descripcion_partida_formula+'</a></td>'
			                    +'</tr> ' 

			                    +'<tr>'         
			                        +'<td>Descripcion de la Formula</td>'
			                        +'<td><a href="#" id="des_f" data-type="textarea" data-pk="1" data-placeholder="'+data[0].descripcion_formula+'" data-placement="right" data-title="Ingrese la Descripcion" class="editable editable-pre-wrapped editable-click">'+data[0].descripcion_formula+'</a></td>'
			                    +'</tr> ' 

			                    +'<tr>'         
			                        +'<td>Formula</td>'
			                        +'<td><a href="#" id="formula_e" data-placement="right" data-type="textarea" data-pk="1" data-placeholder="'+data[0].formula+'" data-title="Ingrese la Formula" class="editable editable-pre-wrapped editable-click">'+data[0].formula+'</a></td>'
			                    +'</tr> ' 

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
			 return id_formula
        },
       
        error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
        }
	});




$('#formula_p').editable({
source: function() {
 $.ajax({
                type: "POST",
                url:"clases/partida.class.php?resp=4",
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
    validate: function(formula_p) {
           if($.trim(formula_p) == '') return 'Requerido';
           console.log(formula_p);
           console.log(id_formula);
            var parametros = {
            "id_formula" : id_formula,
            "formula_p": formula_p
              };            

            $.ajax({
                type: "POST",
                url:"clases/formula.class.php?resp=5",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_formula').DataTable().ajax.reload();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          });     
          }
 });


    $('#des').editable({
        validate: function(des) {
            console.log($.trim(des));
            console.log(des);
            var parametros = {
            "id_formula" : id_formula,
            "des": des
              };            

            $.ajax({
                type: "POST",
                url:"clases/formula.class.php?resp=5",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_formula').DataTable().ajax.reload();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          }); 



            }
    });

    $('#des_f').editable({
        validate: function(des_f) {
            console.log($.trim(des_f));
            console.log(des_f);
            var parametros = {
            "id_formula" : id_formula,
            "des_f": des_f
              };            

            $.ajax({
                type: "POST",
                url:"clases/formula.class.php?resp=5",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_formula').DataTable().ajax.reload();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          }); 



            }
    });

    $('#formula_e').editable({
        validate: function(formula_e) {
            console.log($.trim(formula_e));
            console.log(id_formula);
            var parametros = {
            "id_formula" : id_formula,
            "formula_e": formula_e
              };            

            $.ajax({
                type: "POST",
                url:"clases/formula.class.php?resp=5",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_formula').DataTable().ajax.reload();


                    },
                error:function (xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                }
          }); 



            }
    });


}

function editar_periodicidad(id_periodicidad){

console.log(id_periodicidad);

var parametros = {
	    "id_periodicidad" : id_periodicidad
	  };

	$.ajax({       
		type: "POST",
		url:"clases/periodicidad.class.php?resp=5",
		data: parametros,                   
		global:false,
		async: false,
		dataType: "json",
		success: function(data) {                             
			console.log(data);
			id_periodicidad=data[0].id_periodicidad;

			$("#editar_periodicidad").html(
			  '<div class="modal fade" id="modal_editar_periodicidad" role="dialog">'
			      +'<div class="modal-dialog">'
			        +'<!-- Modal content-->'
			        +'<div class="modal-content">'
			          +'<div class="modal-header">'
			            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
			            +'<h4 class="modal-title" align="center">Modificar Periodicidad</h4>'
			          +'</div>'
			        +'<div class="modal-body">'       
			            +'<table class="table table-bordered table-striped" style="clear: both">'
			            +'<tbody> '
			                    +'<tr> '        
			                        +'<td>Codigo: </td>'
			                        +'<td><strong>'+data[0].id_periodicidad+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '        

			                    +'<tr> '        
			                        +'<td>Nombre</td>'
			                        +'<td><a href="" id="periodicidad_e" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Nombre" class="editable editable-click editable-empty">'+data[0].nombre_periodicidad+'</a></td>'
			                    +'</tr> '

			                    +'<tr> '        
			                        +'<td>Dias</td>'
			                        +'<td><a href="" id="dias_e" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Dias" class="editable editable-click editable-empty">'+data[0].dias+'</a></td>'
			                    +'</tr> '

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
			 return id_periodicidad
        },
       
        error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
        }
	});


$('#periodicidad_e').editable({
		validate: function(periodicidad_e) {
			if($.trim(periodicidad_e) == '') return 'Requerido';
			console.log($.trim(periodicidad_e)); 

            var parametros = {
            "periodicidad_e": periodicidad_e,
            "id_periodicidad" : id_periodicidad
		};            

			$.ajax({
                type: "POST",
                url:"clases/periodicidad.class.php?resp=6",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_periodicidad').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);
                }
			});         
        }
    });


$('#dias_e').editable({
		validate: function(dias_e) {
			if($.trim(dias_e) == '') return 'Requerido';
			console.log($.trim(dias_e)); 

            var parametros = {
            "dias_e": dias_e,
            "id_periodicidad" : id_periodicidad
		};            

			$.ajax({
                type: "POST",
                url:"clases/periodicidad.class.php?resp=6",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_periodicidad').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);
                }
			});         
        }
    });


}

function editar_numero_cuenta(cedula){

console.log(cedula);



var parametros = {
	    "cedula" : cedula
	  };

	$.ajax({       
		type: "POST",
		url:"clases/numero_cuenta.class.php?resp=4",
		data: parametros,                   
		global:false,
		async: false,
		dataType: "json",
		success: function(data) {                             
			console.log(data);
			cedula=data[0].cedula_cuenta;

			$("#editar_numero_cuenta").html(
			  '<div class="modal fade" id="modal_editar_numero_cuenta" role="dialog">'
			      +'<div class="modal-dialog">'
			        +'<!-- Modal content-->'
			        +'<div class="modal-content">'
			          +'<div class="modal-header">'
			            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
			            +'<h4 class="modal-title" align="center">Modificar Numero de Cuenta</h4>'
			          +'</div>'
			        +'<div class="modal-body">'       
			            +'<table class="table table-bordered table-striped" style="clear: both">'
			            +'<tbody> '
			                    +'<tr> '        
			                        +'<td>Cedula: </td>'
			                        +'<td><strong>'+data[0].cedula_cuenta+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '   
			                    +'<tr> '        
			                        +'<td>Nombre: </td>'
			                        +'<td><strong>'+data[0].nombres+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '
			                    +'<tr> '        
			                        +'<td>Banco: </td>'
			                        +'<td><strong>'+data[0].nombre_banco+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '      
			                    +'<tr> '        
			                        +'<td>Numero de Cuenta</td>'
			                        +'<td><a href="" id="numero_cuenta_e" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Numero de Cuenta" class="editable editable-click editable-empty">'+data[0].numero_cuenta+'</a></td>'
			                    +'</tr> '

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
			 return cedula
        },
       
        error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
        }
	});




$('#numero_cuenta_e').editable({
		validate: function(numero_cuenta_e) {
			if($.trim(numero_cuenta_e) == '') return 'Requerido';
			console.log($.trim(numero_cuenta_e)); 

            var parametros = {
            "numero_cuenta_e": numero_cuenta_e,
            "cedula" : cedula
		};            

			$.ajax({
                type: "POST",
                url:"clases/numero_cuenta.class.php?resp=5",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_numero_cuenta').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);
                }
			});         
        }
    });


}

function editar_permiso(id_permiso){

console.log(id_permiso);


var parametros = {
	    "id_permiso" : id_permiso
	  };

	$.ajax({       
		type: "POST",
		url:"clases/permiso.class.php?resp=3",
		data: parametros,                   
		global:false,
		async: false,
		dataType: "json",
		success: function(data) {                             
			console.log(data);
			id_permiso=data[0].id_permiso;

			$("#editar_permiso").html(
			  '<div class="modal fade" id="modal_editar_permiso" role="dialog">'
			      +'<div class="modal-dialog">'
			        +'<!-- Modal content-->'
			        +'<div class="modal-content">'
			          +'<div class="modal-header">'
			            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
			            +'<h4 class="modal-title" align="center">Modificar Permiso</h4>'
			          +'</div>'
			        +'<div class="modal-body">'       
			            +'<table class="table table-bordered table-striped" style="clear: both">'
			            +'<tbody> '
			                    +'<tr> '        
			                        +'<td>Codigo: </td>'
			                        +'<td><strong>'+data[0].id_permiso+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '        

			                    +'<tr> '        
			                        +'<td>Nombre</td>'
			                        +'<td><a href="" id="permiso_e" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Nombre" class="editable editable-click editable-empty">'+data[0].permiso+'</a></td>'
			                    +'</tr> '

			                    +'<tr> '        
			                        +'<td>Dias Minimos</td>'
			                        +'<td><a href="" id="dias_e_min" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Dias Minimos" class="editable editable-click editable-empty">'+data[0].dias_min+'</a></td>'
			                    +'</tr> '
			                    +'<tr> '        
			                        +'<td>Dias Maximos</td>'
			                        +'<td><a href="" id="dias_e_max" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Dias Maximos" class="editable editable-click editable-empty">'+data[0].dias_max+'</a></td>'
			                    +'</tr> '

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
			 return id_permiso
        },
       
        error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
        }
	});



$('#permiso_e').editable({
		validate: function(permiso_e) {
			if($.trim(permiso_e) == '') return 'Requerido';
			console.log($.trim(permiso_e)); 

            var parametros = {
            "permiso_e": permiso_e,
            "id_permiso" : id_permiso
		};            

			$.ajax({
                type: "POST",
                url:"clases/permiso.class.php?resp=4",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_permisos').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);
                }
			});         
        }
    });




$('#dias_e_min').editable({
		validate: function(dias_e_min) {
			if($.trim(dias_e_min) == '') return 'Requerido';
			console.log($.trim(dias_e_min)); 

            var parametros = {
            "dias_e_min": dias_e_min,
            "id_permiso" : id_permiso
		};            

			$.ajax({
                type: "POST",
                url:"clases/permiso.class.php?resp=4",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_permisos').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
/*					alert(xhr.status);
					alert(thrownError);*/
					$('#tabla_permisos').DataTable().ajax.reload();

                }
			});         
        }
    });

$('#dias_e_max').editable({
		validate: function(dias_e_max) {
			if($.trim(dias_e_max) == '') return 'Requerido';
			console.log($.trim(dias_e_max)); 

            var parametros = {
            "dias_e_max": dias_e_max,
            "id_permiso" : id_permiso
		};            

			$.ajax({
                type: "POST",
                url:"clases/permiso.class.php?resp=4",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_permisos').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
/*					alert(xhr.status);
					alert(thrownError);*/
					$('#tabla_permisos').DataTable().ajax.reload();

                }
			});         
        }
    });

}

function editar_profesion(id_profesion){



	var parametros = {
	    "id_profesion" : id_profesion
	  };

	$.ajax({       
		type: "POST",
		url:"clases/profesion.class.php?resp=5",
		data: parametros,                   
		global:false,
		async: false,
		dataType: "json",
		success: function(data) {                             
			console.log(data);
			profesion_v=data[0].nombre_profesion;

			$("#editar_profesion").html(
			  '<div class="modal fade" id="modal_editar_profesion" role="dialog">'
			      +'<div class="modal-dialog">'
			        +'<!-- Modal content-->'
			        +'<div class="modal-content">'
			          +'<div class="modal-header">'
			            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
			            +'<h4 class="modal-title" align="center">Modificar Profesion</h4>'
			          +'</div>'
			        +'<div class="modal-body">'       
			            +'<table class="table table-bordered table-striped" style="clear: both">'
			            +'<tbody> '
			                    +'<tr> '        
			                        +'<td>Codigo: </td>'
			                        +'<td><strong>'+data[0].id_profesion+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '        
			                        +'<td>Nombre</td>'
			                        +'<td><a href="" id="profesion_n" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Nombre" class="editable editable-click editable-empty">'+data[0].nombre_profesion+'</a></td>'
			                    +'</tr> '           
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
			 return id_profesion
        },
       
        error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
        }
	});

//nombre 
    $('#profesion_n').editable({
		validate: function(profesion_n) {
			if($.trim(profesion_n) == '') return 'Requerido';
			console.log($.trim(profesion_n)); 
            var parametros = {
            "profesion_n": profesion_n,
            "id_profesion" : id_profesion
		};            

			$.ajax({
                type: "POST",
                url:"clases/profesion.class.php?resp=6",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_profesion').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);
                }
			});         
        }
    });


}


function editar_unidad_administrativa(id_unidad_administrativa){



	var parametros = {
	    "id_unidad_administrativa" : id_unidad_administrativa
	  };

	$.ajax({       
		type: "POST",
		url:"clases/unidad_administrativa.class.php?resp=5",
		data: parametros,                   
		global:false,
		async: false,
		dataType: "json",
		success: function(data) {                             
			console.log(data);
			id_unidad_administrativa=data[0].id_unidad_administrativa;

			$("#editar_unidad_administrativa").html(
			  '<div class="modal fade" id="modal_editar_unidad_administrativa" role="dialog">'
			      +'<div class="modal-dialog">'
			        +'<!-- Modal content-->'
			        +'<div class="modal-content">'
			          +'<div class="modal-header">'
			            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
			            +'<h4 class="modal-title" align="center">Modificar Unidad Administrativa</h4>'
			          +'</div>'
			        +'<div class="modal-body">'       
			            +'<table class="table table-bordered table-striped" style="clear: both">'
			            +'<tbody> '
			                    +'<tr> '        
			                        +'<td>Codigo: </td>'
			                        +'<td><strong>'+data[0].id_unidad_administrativa+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '        
			                        +'<td>Nombre</td>'
			                        +'<td><a href="" id="unidad_administrativa_n" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Nombre" class="editable editable-click editable-empty">'+data[0].nombre_unidad_administrativa+'</a></td>'
			                    +'</tr> '           
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
			 return id_unidad_administrativa
        },
       
        error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
        }
	});

//nombre 
    $('#unidad_administrativa_n').editable({
		validate: function(unidad_administrativa_n) {
			if($.trim(unidad_administrativa_n) == '') return 'Requerido';
			console.log($.trim(unidad_administrativa_n)); 
            var parametros = {
            "unidad_administrativa_n": unidad_administrativa_n,
            "id_unidad_administrativa" : id_unidad_administrativa
		};            

			$.ajax({
                type: "POST",
                url:"clases/unidad_administrativa.class.php?resp=6",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_unidad_administrativa').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);
                }
			});         
        }
    });


}

function editar_tipo_nomina(id_tipo_nomina){



	var parametros = {
	    "id_tipo_nomina" : id_tipo_nomina
	  };

	$.ajax({       
		type: "POST",
		url:"clases/tipo_nomina.class.php?resp=6",
		data: parametros,                   
		global:false,
		async: false,
		dataType: "json",
		success: function(data) {                             
			console.log(data);
			id_tipo_nomina=data[0].id_tipo_nomina;

			$("#editar_tipo_nomina").html(
			  '<div class="modal fade" id="modal_editar_tipo_nomina" role="dialog">'
			      +'<div class="modal-dialog">'
			        +'<!-- Modal content-->'
			        +'<div class="modal-content">'
			          +'<div class="modal-header">'
			            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
			            +'<h4 class="modal-title" align="center">Modificar Tipo de Nomina</h4>'
			          +'</div>'
			        +'<div class="modal-body">'       
			            +'<table class="table table-bordered table-striped" style="clear: both">'
			            +'<tbody> '
			                    +'<tr> '        
			                        +'<td>Codigo: </td>'
			                        +'<td><strong>'+data[0].id_tipo_nomina+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '        
			                        +'<td>Nombre</td>'
			                        +'<td><a href="" id="tipo_nomina_n" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Nombre" class="editable editable-click editable-empty">'+data[0].nombre_tipo_nomina+'</a></td>'
			                    +'</tr> '           
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
			 return id_tipo_nomina
        },
       
        error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
        }
	});

//nombre 
    $('#tipo_nomina_n').editable({
		validate: function(tipo_nomina_n) {
			if($.trim(tipo_nomina_n) == '') return 'Requerido';
			console.log($.trim(tipo_nomina_n)); 
            var parametros = {
            "tipo_nomina_n": tipo_nomina_n,
            "id_tipo_nomina" : id_tipo_nomina
		};            

			$.ajax({
                type: "POST",
                url:"clases/tipo_nomina.class.php?resp=7",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_tipo_nomina').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);
                }
			});         
        }
    });


}


function editar_usuario(id_usuario){

console.log(id_usuario);


var parametros = {
	    "id_usuario" : id_usuario
	  };

	$.ajax({       
		type: "POST",
		url:"clases/usuario.class.php?resp=4",
		data: parametros,                   
		global:false,
		async: false,
		dataType: "json",
		success: function(data) {                             
			console.log(data);
			id_usuario=data[0].id_usuario;

			$("#editar_usuario").html(
			  '<div class="modal fade" id="modal_editar_usuario" role="dialog">'
			      +'<div class="modal-dialog">'
			        +'<!-- Modal content-->'
			        +'<div class="modal-content">'
			          +'<div class="modal-header">'
			            +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
			            +'<h4 class="modal-title" align="center">Modificar Usuario</h4>'
			          +'</div>'
			        +'<div class="modal-body">'       
			            +'<table class="table table-bordered table-striped" style="clear: both">'
			            +'<tbody> '
			                    +'<tr> '        
			                        +'<td>Codigo: </td>'
			                        +'<td><strong>'+data[0].id_usuario+'</strong></td>'
			                    +'</tr> '       
			                    +'<tr> '        

			                    +'<tr> '        
			                        +'<td>Nombre</td>'
			                        +'<td><strong>'+data[0].usuario+'</strong></td>'
			                    +'</tr> '

			                    +'<tr> '        
			                        +'<td>Constraseña</td>'
			                        +'<td><a href="" id="passwd_e" data-type="text" data-pk="1" data-placement="right" data-placeholder="Requerido" data-title="Contraseña" class="editable editable-click editable-empty">'+data[0].passwd+'</a></td>'
			                    +'</tr> '
			                    +'<tr> '        
			                        +'<td>Tipo</td>'
			                        +'<td><a href="" id="tipo_e" data-type="select" data-pk="1" data-value="" data-title="Seleccione Tipo" class="editable editable-click" style="color: blue;">'+data[0].nivel+'</a></td>'
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
			 return id_usuario
        },
       
        error:function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
        }
	});


$('#passwd_e').editable({
		validate: function(passwd_e) {
			if($.trim(passwd_e) == '') return 'Requerido';
			console.log($.trim(passwd_e)); 

            var parametros = {
            "passwd_e": passwd_e,
            "id_usuario" : id_usuario
		};            

			$.ajax({
                type: "POST",
                url:"clases/usuario.class.php?resp=82",
                data:parametros,                   
                global:false,
                async: false,
                dataType: "json",
                success: function(data) {                             
					console.log(data);
					$('#tabla_usuarios').DataTable().ajax.reload();


				},
                error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);

                }
			});         
        }
    });

$('#tipo_e').editable({
        source: [
            {value: 1, text: 'Director'},
            {value: 2, text: 'Asistente Administrativo I'},
            {value: 3, text: 'Asistente Administrativo II'},
            {value: 4, text: 'Analista de Nomina'}


        ],

		validate: function(tipo_e) {
				if($.trim(tipo_e) == '') return 'Requerido';
				console.log($.trim(tipo_e)); 

	            var parametros = {
	            "tipo_e": tipo_e,
	            "id_usuario" : id_usuario
			};            

				$.ajax({
	                type: "POST",
	                url:"clases/usuario.class.php?resp=5",
	                data:parametros,                   
	                global:false,
	                async: false,
	                dataType: "json",
	                success: function(data) {                             
						console.log(data);
						$('#tabla_usuarios').DataTable().ajax.reload();


					},
	                error:function (xhr, ajaxOptions, thrownError){
						alert(xhr.status);
						alert(thrownError);

	                }
				});       
	    }

 
    });  

}