<?php
session_start();
include 'conexion.php';
function consulta_bd($user,$pass){
	$query = pg_query("select * from usuario where usuario='$user' and passwd='$pass'");
	$row = pg_fetch_row($query);
	$total = pg_num_rows($query);
	if ($total==1) {//usuario valido
		$_SESSION['autorizado'] = true;
		$_SESSION['usuario'] = $row[1];
		$_SESSION['nivel'] = $row[3];

		echo json_encode(array('status' => 1,
								'nivel' => $row[3]

			));
	}else{//usuario no valido
		echo json_encode(array('status' => 0));
	}
}
consulta_bd($_GET['user'],$_GET['pass']);
?>

