<?php
$user = 'lsxiziuprazjck';
$passwd = 'kara$$17';
$db = 'd7r639glfvf48t';
$port = 5432;
$host = 'ec2-23-20-20-150.compute-1.amazonaws.com';
$strCnx = "host=$host port=$port dbname=$db user=$user password=$passwd";
$cnx = pg_connect($strCnx) or die ("Error de conexion. ". pg_last_error());
?>