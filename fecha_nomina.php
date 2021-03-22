<?php
function fecha(){
	setlocale(LC_ALL,"es_ES");
	date_default_timezone_set('America/Caracas');
	$dia = date('d');
	$mes = date('m');
	$ano = date('Y');
	$date = $ano.'-'.$mes.'-'.$dia;
	echo json_encode(array('fecha' => $date));
}
fecha();
?>