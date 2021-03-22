<?php

require('../conexion.php');

include 'nomina.class.php';

class pago {

    private $cod_empleado;
    private $cod_partida;
    private $id_tipo_nomina;
    private $id_banco;
    private $id_unidad_administrativa;
    private $tipo_partida;
    private $monto_nomina;
	private $fecha_pago;
	private $cedula;
	private $nombres;
	private $apellidos;

    public function __construct(){
        $this->nomina = new nomina;

    }



        public function buscar_nomina_elaborada_especial()
    {


            $query = pg_query("SELECT id_tipo_nomina FROM detalle_nomina_especial group by id_tipo_nomina");
            $total = pg_num_rows($query);
            $tipo="";
            $tipo2="";
            $resultado="";

            


        while ( $row = pg_fetch_array($query) ) {
                    
                     $tipo .= ' or id_tipo_nomina = '.$row['id_tipo_nomina'];           
            }

        $tipo = substr($tipo,1, strlen($tipo) - 1);

        $tipo2 = substr($tipo, 3);

        $resultado = 'where '.$tipo2;

        return $resultado;





    }



        public function buscar_nomina_elaborada()
    {


    		$query = pg_query("SELECT id_tipo_nomina FROM nomina_final group by id_tipo_nomina");
    		$total = pg_num_rows($query);
    		$tipo="";
    		$tipo2="";
			$resultado="";

    		


   		while ( $row = pg_fetch_array($query) ) {
					
					 $tipo .= ' or id_tipo_nomina = '.$row['id_tipo_nomina'];    		
    		}

        $tipo = substr($tipo,1, strlen($tipo) - 1);

        $tipo2 = substr($tipo, 3);

        $resultado = 'where '.$tipo2;

        return $resultado;





    }


        public function buscar_pago_nomina($fecha_pago,$periodo_inicio,$periodo_final)
    {


    		$query = pg_query("SELECT * FROM pago where periodo_inicio='$periodo_inicio'");
    		$total = pg_num_rows($query);

    		if ($total>0) {

				return $total;

    		}else{

    			return $total;
    		}


    }




            public function buscar_pago_nomina_e($id_tipo_nomina,$fecha_pago,$fecha_inicio,$fecha_final)
    {


    		$query = pg_query("SELECT * FROM pago where id_tipo_nomina=$id_tipo_nomina and periodo_inicio='$fecha_inicio'");
    		$total = pg_num_rows($query);

    		if ($total>0) {

				return $total;

    		}else{

    			return $total;
    		}



    }

    public function guardar_pago($fecha_pago,$periodo_inicio,$periodo_final){

	$busqueda=$this->buscar_pago_nomina($fecha_pago,$periodo_inicio,$periodo_final);
	$busqueda2=$this->buscar_nomina_elaborada();

if ($busqueda>0) {

echo "Ya se guardo el pago para esta esta fecha";


}else{

        	///////buscar si la nomina ya se elaboro o existe en cuadro para poder guardarla
        	if ($busqueda2!='where ') {
    




        	echo "pago al tipo de nomina exitoso";

    		$query = pg_query("INSERT INTO pago select cod_empleado,cod_partida,id_tipo_nomina,id_banco,id_unidad_administrativa,monto_nomina,'$fecha_pago' as fecha_pago,cedula,nombres,apellidos,'$periodo_inicio' as periodo_inicio,'$periodo_final' as periodo_final from guardar_pago $busqueda2");
    
                $this->nomina->eliminar_partida_variables();
                $this->nomina->eliminar_partida_credito_cero();

        	}else{

        		echo "no se realizo ha relizado ninguna nomina por favor elabore una";
        	}

}
        

}


    public function guardar_pago_nomina_especial($fecha_pago,$periodo_inicio,$periodo_final){

    $busqueda=$this->buscar_pago_nomina($fecha_pago,$periodo_inicio,$periodo_final);
    $busqueda2=$this->buscar_nomina_elaborada_especial();

if ($busqueda>0) {

echo "Ya se guardo el pago para esta esta fecha";


}else{

            ///////buscar si la nomina ya se elaboro o existe en cuadro para poder guardarla
            if ($busqueda2!='where ') {
    

            $query = pg_query("DELETE FROM nomina_especial where cod_partida=1");



            echo "pago al tipo de nomina exitoso";

            $query = pg_query("INSERT INTO pago select cod_empleado,cod_partida,id_tipo_nomina,id_banco,id_unidad_administrativa,monto_nomina,'$fecha_pago' as fecha_pago,cedula,nombres,apellidos,'$periodo_inicio' as periodo_inicio,'$periodo_final' as periodo_final from guardar_pago_especial $busqueda2 and cod_partida=9");

            $query2= pg_query("DELETE from nomina_especial");
    



            }else{

                echo "no se realizo ha relizado ninguna nomina por favor elabore una";
            }

}
        

}

    public function eliminar_pago($id_tipo_nomina,$fecha_pago,$fecha_inicio,$fecha_final)
    {

        $busqueda=$this->buscar_pago_nomina_e($id_tipo_nomina,$fecha_pago,$fecha_inicio,$fecha_final);


        if ($busqueda>0) {
		
		$query = pg_query("DELETE from pago where id_tipo_nomina=$id_tipo_nomina and fecha_pago='$fecha_pago' and periodo_inicio='$fecha_inicio' and periodo_final='$fecha_final'");
		        		echo "nomina eliminada";


        }else{

        		echo "A esta nomina aun no se le ha pagado en esta fecha";
		
		}


    }

    public function listar_tipo_nomina_pago(){

        $query = pg_query("SELECT id_tipo_nomina,tipo_nomina,fecha_pago,periodo_inicio,periodo_final from pago_final group by id_tipo_nomina,tipo_nomina,fecha_pago,periodo_inicio,periodo_final");
        
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {

            //////botones del datatable para crear en el json
            $generar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_generar_nomina\" onClick=\"generar_nomina_p('.$row[0].',\''.$row[2].'\',\''.$row[3].'\',\''.$row[4].'\');\" title=\"Generar Nomina\"><i class=\"fa fa-eye\"></i></button>';
            $eliminar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_eliminar_nomina\" onClick=\"eliminar_nomina_p('.'\''.$row[2].'\''.','.'\''.$row[3].'\''.','.'\''.$row[4].'\''.','.'\''.$row[0].'\''.');\" title=\"Eliminar Nomina\"><i class=\"fa fa-ban\"></i></button>';

            $tabla.='{"id_tipo_nomina":"'.$row[0].'","tipo_nomina":"'.$row[1].'","fecha_pago":"'.$row[2].'","periodo_inicio":"'.$row[3].'","periodo_final":"'.$row[4].'","acciones":"'.$generar.$eliminar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }

    public function listar_vacaciones()
    {


            $query=pg_query("SELECT p.cod_empleado,p.cedula,p.nombres,p.apellidos, count(anos) anos_v, COALESCE (cod_partida,0)as pagado from anos_vencidos p left join pago_vacaciones pv on pv.cod_empleado=p.cod_empleado group by p.cod_empleado,p.cedula,p.nombres,p.apellidos,pv.cod_partida");
                
                $total = pg_num_rows($query);
                $i=0;
                $tabla = "";


        while($row = pg_fetch_row($query))
        {


                if ($row[5]==7) {

                    if ($row[4]>1) {
                     $var = '<span class=\"label label-warning\">Año Pagado</span>';
                    }elseif ($row[4]==1) {
                     $var = '<span class=\"label label-success\">Año Pagado</span>';
                    }

                }elseif ($row[5]==17) {

                    if ($row[4]>1) {
                     $var = '<span class=\"label label-warning\">Año Pagado</span>';
                    }elseif ($row[4]==1) {
                     $var = '<span class=\"label label-success\">Año Pagado</span>';
                    }
                }elseif ($row[5]==18) {
                    $var ='<span class=\"label label-success\">Vacaciones Vencidas Pagadas</span>';
                }elseif ($row[5]==0) {
                    $var ='<span class=\"label label-danger\">Vacaciones Sin Pagar</span>';
                }
                //////botones del datatable para crear en el json.
            $ver='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_ver_anos_vencidos\" onClick=\"ver_anos_vencidos($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Ver Años Vencidos\"><i class=\"fa fa-eye\"></i></button>';


            $tabla.='{"cod_empleado":"'.$row[0].'","cedula":"'.$row[1].'","nombres":"'.$row[2].'","apellidos":"'.$row[3].'","anos_v":"'.$row[4].'","pagado":"'.$var.'","acciones":"'.$ver.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   
    



    }

    public function listar_anos_vencidos_json($cod_empleado)
    {

    $query = pg_query("select p.cod_empleado,p.cedula,p.nombres,p.apellidos, date_part('year', p.periodo_inicio) as anos from pago p where cod_partida<>18 and cod_empleado=$cod_empleado group by p.cod_empleado,p.cedula,p.nombres,p.apellidos,anos order by cod_empleado,anos");

        $total = pg_num_rows($query);

           $anos_vencidos_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $cod_empleado=$row['cod_empleado'];
            $cedula=$row['cedula'];
            $nombres=$row['nombres'];
            $apellidos=$row['apellidos'];
            $anos=$row['anos'];

            $anos_vencidos_a[] = array(

                'cod_empleado'=> $cod_empleado,
                'cedula'=> $cedula,
                'nombres'=> $nombres,
                'apellidos'=> $apellidos,
                'nombres'=> $nombres,
                'anos'=> $anos

                );

            }
//Creamos el JSON
$json_string = json_encode($anos_vencidos_a);
echo $json_string; 

    }


        public function listar_pago_nomina_empleado($cedula){

        $query = pg_query("select cod_empleado,cedula,nombres,apellidos,fecha_pago,periodo_inicio,periodo_final,id_tipo_nomina from detalle_pago where cedula='$cedula' group by cod_empleado,cedula,nombres,apellidos,fecha_pago,periodo_inicio,periodo_final,id_tipo_nomina order by periodo_final");
        
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {

            //////botones del datatable para crear en el json
            $generar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" onClick=\"generar_nomina_empleado_fecha('.$row[0].',\''.$row[4].'\',\''.$row[5].'\',\''.$row[6].'\','.$row[7].');\" title=\"Generar Nomina\"><i class=\"fa fa-eye\"></i></button>';
            $eliminar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" onClick=\"eliminar_nomina_empleado_fecha('.$row[0].',\''.$row[4].'\',\''.$row[6].'\');\" title=\"Eliminar Nomina\"><i class=\"fa fa-ban\"></i></button>';

            $tabla.='{"cod_empleado":"'.$row[0].'","cedula":"'.$row[1].'","nombres":"'.$row[2].'","apellidos":"'.$row[3].'","fecha_pago":"'.$row[4].'","periodo_inicio":"'.$row[5].'","periodo_final":"'.$row[6].'","acciones":"'.$generar.$eliminar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }

        public function eliminar_pago_empleado($cod_empleado,$fecha_pago,$periodo_final)
    {


        
        $query = pg_query("DELETE from pago where cod_empleado=$cod_empleado and fecha_pago='$fecha_pago' and periodo_final='$periodo_final'");
                        echo "empleado eliminado";



    }


        public function listar_pago_nomina_partida($cod_partida){
                //////saber si el listar pago es de tipo credito para poder mostrar el monto del historia del credito
            $query4 = pg_query("SELECT tipo from partida where cod_partida=$cod_partida");
            $row4 = pg_fetch_row($query4);
            
            if ($row4[0]=="Credito") {

                    $query = pg_query("select * from credito_historial where cod_partida=$cod_partida");
                    $total = pg_num_rows($query);

                        //guardamos en un array multidimensional todos los datos de la consulta
                    $i=0;
                    $tabla = "";

                    while($row = pg_fetch_row($query))
                    {

                        //////botones del datatable para crear en el json
                        $generar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_ver_pago_partidas_credito\" onClick=\"pago_partidas_ver_credito('.$row[0].',\''.$row[4].'\');\" title=\"Ver Resumen Partida\"><i class=\"fa fa-eye\"></i></button>';

                        $tabla.='{"cod_partida":"'.$row[0].'","partida":"'.$row[1].'","total_integrantes":"'.$row[2].'","total_pagado":"'.$row[3].' Bs.'.'","fecha_pago":"'.$row[4].'","periodo_inicio":"--","periodo_final":"--"},';       
                        $i++;
                    }
                    $tabla = substr($tabla,0, strlen($tabla) - 1);

                    echo '{"data":['.$tabla.']}'; 


            }elseif ($row4[0]!="Credito") {



        $query = pg_query("SELECT cod_partida, partida, count(cod_empleado) as total_integrantes, sum(monto_pago) as total_pagado,fecha_pago,periodo_inicio,periodo_final  FROM detalle_pago  WHERE cod_partida=$cod_partida group by cod_partida, partida, fecha_pago,periodo_inicio,periodo_final");
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {

            //////botones del datatable para crear en el json
            $generar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_ver_pago_partidas\" onClick=\"pago_partidas_ver('.$row[0].',\''.$row[4].'\',\''.$row[5].'\',\''.$row[6].'\');\" title=\"Ver Resumen Partida\"><i class=\"fa fa-eye\"></i></button>';

            $tabla.='{"cod_partida":"'.$row[0].'","partida":"'.$row[1].'","total_integrantes":"'.$row[2].'","total_pagado":"'.$row[3].' Bs.'.'","fecha_pago":"'.$row[4].'","periodo_inicio":"'.$row[5].'","periodo_final":"'.$row[6].'","acciones":"'.$generar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



            }




    }


    public function ver_resumen_nomina_partida($cod_partida,$id_tipo_nomina,$id_banco,$fecha_pago,$periodo_inicio,$periodo_final)
    {

    $query = pg_query("select cod_partida,partida,count(cod_empleado) as integrantes, sum(monto_pago) as total_pago, id_tipo_nomina, tipo_nomina, id_banco, nombre_banco,periodo_inicio,periodo_final  from detalle_pago where cod_partida=$cod_partida and fecha_pago='$fecha_pago' and periodo_inicio='$periodo_inicio' and periodo_final='$periodo_final' and id_tipo_nomina=$id_tipo_nomina and id_banco=$id_banco group by cod_partida,partida, id_tipo_nomina, tipo_nomina, id_banco, nombre_banco,periodo_inicio,periodo_final");

        $total = pg_num_rows($query);

           $anos_vencidos_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $cod_partida=$row['cod_partida'];
            $partida=$row['partida'];
            $integrantes=$row['integrantes'];
            $total_pago=$row['total_pago'];
            $id_tipo_nomina=$row['id_tipo_nomina'];
            $tipo_nomina=$row['tipo_nomina'];
            $id_banco=$row['id_banco'];
            $nombre_banco=$row['nombre_banco'];
            $periodo_inicio=$row['periodo_inicio'];
            $periodo_final=$row['periodo_final'];

            $anos_vencidos_a[] = array(

                'cod_partida'=> $cod_partida,
                'partida'=> $partida,
                'integrantes'=> $integrantes,
                'total_pago'=> $total_pago,
                'id_tipo_nomina'=> $id_tipo_nomina,
                'tipo_nomina'=> $tipo_nomina,
                'id_banco'=> $id_banco,
                'nombre_banco'=> $nombre_banco,
                'periodo_inicio'=> $periodo_inicio,
                'periodo_final'=> $periodo_final


                );

            }
//Creamos el JSON
$json_string = json_encode($anos_vencidos_a);
echo $json_string; 

    }


        public function listar_tipo_nomina_partida($cod_partida,$fecha_pago,$periodo_inicio,$periodo_final){
            
        $query = pg_query("select id_tipo_nomina, tipo_nomina from detalle_pago where cod_partida=$cod_partida and fecha_pago='$fecha_pago' and periodo_inicio='$periodo_inicio' and periodo_final='$periodo_final' group by id_tipo_nomina, tipo_nomina");
        $total = pg_num_rows($query);

$tipo_nomina_a = array(); //creamos un array
 

        while($row = pg_fetch_array($query))
        { 
            $id=$row['id_tipo_nomina'];
            $tipo_nomina=$row['tipo_nomina'];

            
         
            $tipo_nomina_a[] = array("id"=> $id,
                                "tipo_nomina"=> $tipo_nomina
                                            );
         
        }


/*//desconectamos la base de datos
$close = mysqli_close($conexion) 
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");*/
  
 
//Creamos el JSON
$json_string = json_encode($tipo_nomina_a);
echo $json_string;



    }



        public function listar_banco_partida($cod_partida,$fecha_pago,$periodo_inicio,$periodo_final){
            
        $query = pg_query("select id_banco, nombre_banco from detalle_pago where cod_partida=$cod_partida and fecha_pago='$fecha_pago' and periodo_inicio='$periodo_inicio' and periodo_final='$periodo_final' group by id_banco, nombre_banco");
        $total = pg_num_rows($query);

$banco_a = array(); //creamos un array
 

        while($row = pg_fetch_array($query))
        { 
            $id=$row['id_banco'];
            $nombre_banco=$row['nombre_banco'];

            
         
            $banco_a[] = array("id"=> $id,
                                "nombre_banco"=> $nombre_banco
                                            );
         
        }


/*//desconectamos la base de datos
$close = mysqli_close($conexion) 
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");*/
  
 
//Creamos el JSON
$json_string = json_encode($banco_a);
echo $json_string;



    }

    public function ver_resumen_nomina_partida_credito($cod_partida,$fecha_pago)
    {

    $query = pg_query("select * from credito_historial where cod_partida=$cod_partida and fecha_credito='$fecha_pago'");

        $total = pg_num_rows($query);

           $credito_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $cod_partida=$row['cod_partida'];
            $partida=$row['partida'];
            $integrantes=$row['total_integrantes'];
            $total_pago=$row['total_pagado'];
            $fecha_credito=$row['fecha_credito'];

            $credito_a[] = array(

                'cod_partida'=> $cod_partida,
                'partida'=> $partida,
                'integrantes'=> $integrantes,
                'total_pago'=> $total_pago,
                'fecha_credito'=> $fecha_credito


                );

            }
//Creamos el JSON
$json_string = json_encode($credito_a);
echo $json_string; 

    }



}

$pago = new pago;

/*echo $pago->buscar_pago_nomina_e(1,'2016-04-03');
*/

/*echo $pago->buscar_pago_nomina('2016-04-03');
*/
/*echo $pago->buscar_nomina_elaborada();
*/

/*$pago->eliminar_pago(3,'2016-04-03','2016-04-03','2016-04-03');
*/

/*$pago->guardar_pago('2016-04-04','2016-04-01','2016-04-15');
*/

if ($_GET['resp']==101 and isset($_GET['resp'])) {

	if (isset($_POST['fecha_pago']) and $_POST['fecha_pago']!='' and isset($_POST['fecha_inicio']) and $_POST['fecha_inicio']!='' and isset($_POST['fecha_final']) and $_POST['fecha_final']!='') {

			$pago->guardar_pago($_POST['fecha_pago'],$_POST['fecha_inicio'],$_POST['fecha_final']);
	}
}

if ($_GET['resp']==2 and isset($_GET['resp'])) {
$pago->listar_tipo_nomina_pago();
}


if ($_GET['resp']==3 and isset($_GET['resp'])) {

if (isset($_POST['id_tipo_nomina']) and $_POST['id_tipo_nomina']!='' and isset($_POST['fecha_pago']) and $_POST['fecha_pago'] !='' and isset($_POST['periodo_inicio']) and $_POST['periodo_inicio']!='' and isset($_POST['periodo_final']) and $_POST['periodo_final']!='') {
$pago->eliminar_pago($_POST['id_tipo_nomina'],$_POST['fecha_pago'],$_POST['periodo_inicio'],$_POST['periodo_final']);
}
}

if ($_GET['resp']==4 and isset($_GET['resp'])) {

$pago->listar_vacaciones();

}

if ($_GET['resp']==5 and isset($_GET['resp'])) {

    if ($_POST['cod_empleado8']>0 and isset($_POST['cod_empleado8'])) {
        $pago->listar_anos_vencidos_json($_POST['cod_empleado8']);
    }

}


if ($_GET['resp']==6 and isset($_GET['resp'])) {

    if (isset($_POST['fecha_pago_e']) and $_POST['fecha_pago_e']!='' and isset($_POST['fecha_inicio_e']) and $_POST['fecha_inicio_e']!='' and isset($_POST['fecha_final_e']) and $_POST['fecha_final_e']!='') {

            $pago->guardar_pago_nomina_especial($_POST['fecha_pago_e'],$_POST['fecha_inicio_e'],$_POST['fecha_final_e']);
    }
}


if ($_GET['resp']==7 and isset($_GET['resp'])) {
$pago->listar_pago_nomina_empleado($_GET['cedula']);
}

if ($_GET['resp']==8 and isset($_GET['resp'])) {
$pago->eliminar_pago_empleado($_POST['cod_empleado'],$_POST['fecha_pago'],$_POST['periodo_final']);
}


if ($_GET['resp']==40 and isset($_GET['resp'])) {

    $pago->listar_pago_nomina_partida($_GET['cod_partida']);

}

if ($_GET['resp']==58 and isset($_GET['resp'])) {

$pago->ver_resumen_nomina_partida($_POST['cod_partida'],$_POST['id_tipo_nomina'],$_POST['id_banco'],$_POST['fecha_pago'],$_POST['periodo_inicio'],$_POST['periodo_final']);

}


if ($_GET['resp']==98 and isset($_GET['resp'])) {

$pago->listar_tipo_nomina_partida($_POST['cod_partida'],$_POST['fecha_pago'],$_POST['periodo_inicio'],$_POST['periodo_final']);

}

if ($_GET['resp']==99 and isset($_GET['resp'])) {

$pago->listar_banco_partida($_POST['cod_partida'],$_POST['fecha_pago'],$_POST['periodo_inicio'],$_POST['periodo_final']);

}
/*$pago->eliminar_pago(3,'2016-04-03','2016-04-15','2016-04-30');
*/

if ($_GET['resp']==96 and isset($_GET['resp'])) {

$pago->ver_resumen_nomina_partida_credito($_POST['cod_partida'],$_POST['fecha_pago']);

}




?>