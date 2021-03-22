<?php
	if (!isset($_SESSION)) {
	 	session_start();
	}
	if (!$_SESSION['autorizado']) {
		header("Location: index.php");
	}
	require('conexion.php');
	//Resetear Variables de session
	$_SESSION['usuario'] = NULL;
	$_SESSION['autorizado'] = false;
	//Eliminar variables de session
	unset($_SESSION['usuario']);
	unset($_SESSION['autorizado']);
	header("Location: index.php");
	pg_close($cnx);


?>