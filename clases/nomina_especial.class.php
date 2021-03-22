<?php 

require('../conexion.php');

class nomina_especial {

    private $credito_empleado;
    private $cod_empleado;
    private $cod_partida;
    private $id_tipo_nomina;
    private $id_banco;
    private $id_unidad_administrativa;
    private $tipo_partida;
    private $monto_nomina;




public function listar_empleado_nomina_especial(){

        $query = pg_query("SELECT nm.cod_empleado,nm.cedula, nm.nombres, nm.apellidos,nm.tipo_nomina,nm.nombre_banco,nm.monto_nomina from detalle_nomina_especial nm where cod_partida=9 group by nm.cod_empleado,nm.cedula, nm.nombres, nm.apellidos,nm.tipo_nomina,nm.nombre_banco,nm.monto_nomina");
        
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json

           
            $eliminar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" onClick=\"eliminar_nomina_especial_empleado($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Eliminar Empleado\"><i class=\"fa fa-ban\"></i></button>';

            $tabla.='{"cod_empleado":"'.$row[0].'","cedula":"'.$row[1].'","nombres":"'.$row[2].'","apellidos":"'.$row[3].'","tipo_nomina":"'.$row[4].'","nombre_banco":"'.$row[5].'","total_neto":"'.$row[6].' Bs.'.'","acciones":"'.
            $eliminar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }


public function buscar_tipo_nomina($id_tipo_nomina)
{


		$query = pg_query("SELECT * from detalle_nomina_especial where id_tipo_nomina=$id_tipo_nomina");
		$row= pg_fetch_row($query);
		$total = pg_num_rows($query);
		return $total;



}

public function incluir_tipo_nomina($id_tipo_nomina,$cod_partida,$val_formula,$tipo_partida)
{

       $busqueda=$this->buscar_tipo_nomina($id_tipo_nomina);

        if ($busqueda>0) {
					
					echo "Ya este tipo nomina fue agregada";

		}else{

			$query = pg_query("INSERT into nomina_especial select cod_empleado,cod_partida,'FIJA',monto_nomina from nomina_final where id_tipo_nomina=$id_tipo_nomina and cod_partida=1");

				////listo las formulas para ese codigo de partida
            $query2 = pg_query("SELECT formula from formula_partida where cod_partida=$cod_partida order by id_formula");
			$i=0;
			$j=0;

            while ( $row2 = pg_fetch_row($query2) ) {
                $formula[$i] = $row2[0];
                $i++;

            }
            
            $query_empleado = pg_query("SELECT cod_empleado,monto_nomina from nomina_especial where cod_empleado not in (SELECT cod_empleado FROM nomina_especial where cod_partida=$cod_partida)");

            while ( $row3 = pg_fetch_row($query_empleado) ) {
 				$cod_empleado[$j] = $row3[0];
 				$cod_empleado_nuevo = $cod_empleado[$j];
                $sueldo_base=$row3[1];
            $resultado = $formula[$val_formula];
            $R_F = eval('return '.$resultado.';');
            "Registrado ".$R_F." Bs";

            $query4= pg_query("INSERT INTO  nomina_especial (cod_empleado,cod_partida,tipo_partida,monto_nomina) VALUES ($cod_empleado_nuevo,$cod_partida,'$tipo_partida',$R_F)");
                $j++;            

			}
	
			echo "Registrado Tipo de Nomina";


		}


}

	public function listar_partida_especial($resp){

		$query = pg_query("SELECT * FROM partida where cod_partida=9 order by cod_partida");
		$total = pg_num_rows($query);


	$partida_a = array(); //creamos un array

	if ($resp==3) {

		while($row = pg_fetch_array($query))
		{ 
			$id=$row['cod_partida'];
			$partida=$row['partida'];




			$partida_a[] = array("id"=> $id,
				"partida"=> $partida
				);

		}

	}elseif ($resp==4) {
		while($row = pg_fetch_array($query))
		{
			$id=$row['cod_partida'];
			$partida=$row['partida'];



			$partida_a[] = array($id=> $partida);

		}
	}
	/*//desconectamos la base de datos
	$close = mysqli_close($conexion) 
	or die("Ha sucedido un error inexperado en la desconexion de la base de datos");*/


	//Creamos el JSON
	$json_string = json_encode($partida_a);
	echo $json_string;

	}

	public function buscar_empleado_nomina_especial($cod_empleado)
	{
			$query = pg_query("SELECT cod_empleado from nomina_especial where cod_empleado=$cod_empleado");	
    		$total = pg_num_rows($query);	
    		return $total;

    }

	public function eliminar_empleado_nomina_especial($cod_empleado)
	{

		$busqueda=$this->buscar_empleado_nomina_especial($cod_empleado);

		if ($busqueda>0) {
			$query = pg_query("DELETE FROM nomina_especial where cod_empleado=$cod_empleado");
			echo "Eliminado Exitoso";
		}else{

			echo "No existe";

		}

	
	}

 public function generar_txt(){


$generar_txt = pg_query("Copy (SELECT cedula,numero_cuenta,monto_nomina FROM nomina_numero_cuenta where cedula <>'' and cod_partida=9) To 'C:/xampp/htdocs/Nomina_Alcaldia/Nomina_Alcaldia/BD/archivos_bancos/nomina_especial/archivo_banco.csv' With CSV DELIMITER ';' Header;");

echo "Emision Exitosa";

}


 public function mostrar_nomina_especial_empleado_json($cod_empleado){

        $query = pg_query("SELECT * from detalle_nomina_especial where cod_empleado=$cod_empleado");
        $total = pg_num_rows($query);

           $empleado_nomina_a = array(); //creamos un array

                while($row = pg_fetch_array($query))
                { 
                $cod_empleado=$row['cod_empleado'];
                $cedula=$row['cedula'];
                $nombres=$row['nombres'];
                $apellidos=$row['apellidos'];
                $cod_partida=$row['cod_partida'];
                $partida=$row['partida'];
                $tipo=$row['tipo'];
                $tipo_partida=$row['tipo_partida'];
                $monto_nomina=$row['monto_nomina'];
                $id_tipo_nomina=$row['id_tipo_nomina'];
                $tipo_nomina=$row['tipo_nomina'];
                $id_banco=$row['id_banco'];
                $nombre_banco=$row['nombre_banco'];
                $id_unidad_administrativa=$row['id_unidad_administrativa'];
                $total_asignacion=$row['total_asignacion'];
                $total_deduccion=$row['total_deduccion'];
                $total_neto=$row['total_neto'];

                $empleado_nomina_a[] = array(

                "cod_empleado"=>$cod_empleado,
                "cedula"=>$cedula,
                "nombres"=>$nombres,
                "apellidos"=>$apellidos,
                "cod_partida"=>$cod_partida,
                "partida"=>$partida,
                "tipo"=>$tipo,
                "tipo_partida"=>$tipo_partida,
                "monto_nomina"=>$monto_nomina,
                "id_tipo_nomina"=>$id_tipo_nomina,
                "tipo_nomina"=>$tipo_nomina,
                "id_banco"=>$id_banco,
                "nombre_banco"=>$nombre_banco,
                "id_unidad_administrativa"=>$id_unidad_administrativa,
                "total_asignacion"=>$total_asignacion,
                "total_deduccion"=>$total_deduccion,
                "total_neto"=>$total_neto
                );

                }
                //Creamos el JSON
                $json_string = json_encode($empleado_nomina_a);
                echo $json_string; 

                }



}

$nomina_especial = new nomina_especial;

if ($_GET['resp']==1) {
$nomina_especial->listar_empleado_nomina_especial();
}

if ($_GET['resp']==2) {
	if (isset($_POST['id_tipo_nomina']) and $_POST['id_tipo_nomina']>0) {
		$nomina_especial->incluir_tipo_nomina($_POST['id_tipo_nomina']);
	}
}

if ($_GET['resp']==3 or $_GET['resp']==4) {
	
	$nomina_especial->listar_partida_especial($_GET['resp']);

}

if ($_GET['resp']==5) {


	$nomina_especial->incluir_tipo_nomina($_POST['tipo_nomina_especial'],$_POST['partida_nomina_especial_t'],$_POST['val_formula'],$_POST['tipo_partida_especial']);
}


if ($_GET['resp']==6) {

	$nomina_especial->eliminar_empleado_nomina_especial($_POST['cod_empleado']);

}

if (isset($_GET['resp']) and $_GET['resp']==126) {

$nomina_especial->generar_txt();

}

/*$nomina_especial->buscar_tipo_nomina(7);
*/
 
/*$nomina_especial->incluir_tipo_nomina(3,9,0,'VARIABLE');
*/

 ?>