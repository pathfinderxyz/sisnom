<?php
function fecha_es(){
	setlocale(LC_ALL,"es_ES");
	date_default_timezone_set('America/Caracas');
	$hora = date('h:i:s A');      
	$semana = date('N');
	$dia = date('d');
	$mes = date('n');
	$ano = date('Y');
	$semanas = array('','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo');
	$meses = array('','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Deciembre');
	$date = $semanas[$semana].", ".$dia." de ".$meses[$mes]." del ".$ano;
	echo json_encode(array('fecha' => $date , 'hora' => $hora));
}
fecha_es();
?>




