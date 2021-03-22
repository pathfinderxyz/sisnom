<?php 

class base_datos {


public function restaurar()
{


$Borrar = system('"C:\Program Files\PostgreSQL\9.5\bin\dropdb.exe" -h localhost -p 5432 -U postgres -w SISNOM', $retval);

$Crear = system('"C:\Program Files\PostgreSQL\9.5\bin\createdb.exe" -h localhost -p 5432 -U postgres -T template0 -w SISNOM', $retval);

$Recuperar = system('"C:\Program Files\PostgreSQL\9.5\bin\psql.exe" -h localhost -p 5432 -U postgres -w SISNOM < C:/xampp/htdocs/Nomina_Alcaldia/Nomina_Alcaldia/BD/backup/sisnom.backup', $retval);

echo '
</pre>
<hr />Ultima linea de la salida: ' . $Borrar . '
<hr />Ultima linea de la salida: ' . $Crear . '
<hr />Ultima linea de la salida: ' . $Recuperar . '
<hr />Valor de retorno: ' . $retval;


}

public function respaldar ()
{

$Respaldar = system('"C:\Program Files\PostgreSQL\9.5\bin\pg_dump.exe" -h localhost -p 5432 -U postgres -w SISNOM > C:/xampp/htdocs/Nomina_Alcaldia/Nomina_Alcaldia/BD/backup/sisnom.backup', $retval);

echo '
</pre>
<hr />Ultima linea de la salida: ' . $Respaldar . '
<hr />Valor de retorno: ' . $retval;

}

}

$base_datos = new base_datos;

if (isset($_GET['resp']) and $_GET['resp'] == 111) {

$base_datos->respaldar();

}

if (isset($_GET['resp']) and $_GET['resp'] == 222) {

$base_datos->restaurar();

}


 ?>