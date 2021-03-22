<?php

require('../conexion.php');

 class credito_empleado {

    private $cod_partida;
    private $cod_empleado;
    private $fecha_credito;
    private $monto_credito;
    private $monto_actual;
    private $cant_cuotas;
    private $cant_cuotas_restantes;



    public function buscar_credito_empleado($cod_partida,$cod_empleado,$fecha_credito){
        $query = pg_query("select * from credito_empleado where cod_empleado='$cod_empleado' and cod_partida=$cod_partida and fecha_credito='$fecha_credito'");
        $row = pg_fetch_row($query);
        $total = pg_num_rows($query);
        $this->cod_partida=$row[0];
        $this->cod_empleado=$row[1];
        $this->fecha_credito=$row[2];
        $this->monto_credito=$row[3];
        $this->monto_actual=$row[4];
        $this->cant_cuotas=$row[5];
        $this->cant_cuotas_restantes=$row[6];

        return $total;
    }

    public function agregar_credito_empleado($cod_partida,$cod_empleado,$fecha_credito,$monto_credito,$monto_actual,$cant_cuotas,$cant_cuotas_restantes){
        $busqueda=$this->buscar_credito_empleado($cod_partida,$cod_empleado,$fecha_credito);
        $cod_partida_nuevo = $cod_partida;
        $cod_empleado_nuevo = $cod_empleado;
        $fecha_credito_nueva = $fecha_credito;
        $monto_credito_nueva = $monto_credito;
        $monto_actual_nueva = $monto_actual;
        $cant_cuotas_nueva = $cant_cuotas;
        $cant_cuotas_restantes_nueva = $cant_cuotas_restantes;

        if ($busqueda>=1) {
            echo "Ya Existe";
        }else{
            $query = pg_query("INSERT INTO credito_empleado (cod_partida,cod_empleado,fecha_credito,monto_credito,monto_actual,cant_de_cuotas,cant_cuotas_restantes) VALUES ($cod_partida_nuevo,$cod_empleado_nuevo,'$fecha_credito_nueva',$monto_credito_nueva,$monto_actual_nueva,$cant_cuotas_nueva,$cant_cuotas_restantes_nueva)");
            $query2 = pg_query("SELECT (monto_credito/cant_de_cuotas) as monto_nomina_credito from credito_empleado where cod_empleado=$cod_empleado_nuevo");
            $row = pg_fetch_row($query2);
            return $row[0];
/*            echo "Registro Exitoso";
*/        }


    }

    public function modificar_credito_empleado($cod_partida,$cod_empleado,$fecha_credito,$cod_partida_nuevo,$cod_empleado_nuevo,$fecha_credito_nuevo,$monto_credito,$monto_actual,$cant_de_cuotas){
        $busqueda=$this->buscar_credito_empleado($cod_partida,$cod_empleado,$fecha_credito);
        $actualizacion_cod_partida = $cod_partida_nuevo;
        $actualizacion_cod_empleado = $cod_empleado_nuevo;
        $actualizacion_fecha_credito = $fecha_credito_nuevo;
        $actualizacion_monto_credito = $monto_credito;
        $actualizacion_monto_actual = $monto_actual;
        $actualizacion_cant_cuotas = $cant_de_cuotas;

        if ($busqueda>=1) {
            echo "Ya existe";
            if ($actualizacion_cod_empleado > 0) {
                $query = pg_query("UPDATE credito_empleado set cod_empleado='$actualizacion_cod_empleado' where cod_empleado='$cod_empleado' and cod_partida=$cod_partida and fecha_credito='$fecha_credito'");
                echo "Actualizacion de Codigo del Empleado Exitoso <br>";
            }
            if ($actualizacion_cod_partida > 0) {
                $query = pg_query("UPDATE credito_empleado set cod_partida='$actualizacion_cod_partida' where cod_empleado='$cod_empleado' and cod_partida=$cod_partida and fecha_credito='$fecha_credito'");
                echo "Actualizacion del Codigo de la partida Exitoso <br>";
            }
            if ($actualizacion_fecha_credito != '') {
                $query = pg_query("UPDATE credito_empleado set fecha_credito='$actualizacion_fecha_credito' where cod_empleado='$cod_empleado' and cod_partida=$cod_partida and fecha_credito='$fecha_credito'");
                echo "Actualizacion de la Fecha de Credito Exitoso <br>";
            }
            if ($actualizacion_monto_credito > 0) {
                $query = pg_query("UPDATE credito_empleado set monto_credito='$actualizacion_monto_credito' where cod_empleado='$cod_empleado' and cod_partida=$cod_partida and fecha_credito='$fecha_credito'");
                echo "Actualizacion del Monto del Credito Exitoso <br>";
            }
            if ($actualizacion_monto_actual > 0) {
                $query = pg_query("UPDATE credito_empleado set monto_actual='$actualizacion_monto_actual' where cod_empleado='$cod_empleado' and cod_partida=$cod_partida and fecha_credito='$fecha_credito'");
                echo "Actualizacion del Monto Actual Exitoso <br>";
            }
            if ($actualizacion_cant_cuotas > 0) {
                $query = pg_query("UPDATE credito_empleado set cant_de_cuotas='$actualizacion_cant_cuotas' where cod_empleado='$cod_empleado' and cod_partida=$cod_partida and fecha_credito='$fecha_credito'");
                echo "Actualizacion de la cantidad de cuotas Exitoso <br>";
            }



        }else{

            echo "No Existe";

        }
    }

    public function restar_credito(){

                $query = pg_query("UPDATE credito_empleado set cant_cuotas_restantes=cant_cuotas_restantes-1");
                $query2 = pg_query("DELETE from credito_empleado WHERE cant_cuotas_restantes<0");

/*                echo "Actualizacion de la cantidad de cuotas restantes Exitoso <br>";
*/

    }


        public function restar_cuotas($cod_empleado,$fecha_credito,$cod_partida){

                $query = pg_query("UPDATE credito_empleado set monto_actual=((monto_credito/cant_de_cuotas)*cant_cuotas_restantes)");

                $query2 = pg_query("SELECT monto_actual from credito_empleado where cod_partida=$cod_partida and cod_empleado=$cod_empleado and fecha_credito='$fecha_credito'");
                $row = pg_fetch_row($query2);


                

                echo $row[0].' Bs. Restantes';



    }


    public function eliminar_credito_empleado($cod_partida,$cod_empleado,$fecha_credito){
        $busqueda=$this->buscar_credito_empleado($cod_partida,$cod_empleado,$fecha_credito);

        if ($busqueda>=1) {
            $query = pg_query("DELETE FROM credito_empleado WHERE cod_empleado='$cod_empleado' and cod_partida=$cod_partida and fecha_credito='$fecha_credito'");

            $query = pg_query("DELETE FROM historial_credito WHERE cod_empleado='$cod_empleado' and cod_partida=$cod_partida and fecha_credito='$fecha_credito'");

            echo "Eliminar Exitoso";
        }else{

            echo "No Existe";
        }
    }

    public function listar_credito_empleado(){

        $query = pg_query("select c.cod_partida,p.partida,c.cod_empleado,e.cedula,e.nombres,e.apellidos,c.fecha_credito,c.monto_credito,c.monto_actual,c.cant_de_cuotas,cant_cuotas_restantes from credito_empleado c left join empleado e on c.cod_empleado=e.cod_empleado left join partida p on p.cod_partida=c.cod_partida");
        $total = pg_num_rows($query);

       
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json
    $actualizar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" onClick=\"actualizar_credito(\''.$row[2].'\',\''.$row[6].'\',\''.$row[0].'\');\" title=\"Actualizar Restante\"><i class=\"fa fa-refresh\"></i></button>';

    $tabla.='{"cod_partida":"'.$row[0].'","partida":"'.$row[1].'","cod_empleado":"'.$row[2].'","cedula":"'.$row[3].'","nombres":"'.$row[4].'","fecha_credito":"'.$row[6].'","monto_credito":"'.$row[7].'","monto_actual":"'.$row[8].'","cant_de_cuotas":"'.$row[9].'","cant_cuotas_restantes":"'.$row[10].'","acciones":"'.$actualizar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}'; 


    }



}


$credito_empleado = new credito_empleado;
//$credito_empleado->modificar_credito_empleado(7,1,'2016-01-01',0,0,'',0,0,0); // utilizamos los metodos
//$credito_empleado->eliminar_credito_empleado(4); // utilizamos los metodos
//echo $credito_empleado->agregar_credito_empleado(7,2,'2016-05-01',35000,30000,30,28); // utilizamos los metodos
//echo $credito_empleado->buscar_credito_empleado(4); // utilizamos los metodos
//$credito_empleado->listar_credito_empleado(); // utilizamos los metodos
//$credito_empleado->restar_credito(); // utilizamos los metodos

if ($_GET['resp']==10 and isset($_GET['resp'])) {

    if ($_POST['cod_empleado']>0 and isset($_POST['cod_empleado']) and isset($_POST['fecha_credito']) and $_POST['fecha_credito']!='' and $_POST['cod_partida']>0 and isset($_POST['cod_partida'])) {
        $credito_empleado->restar_cuotas($_POST['cod_empleado'],$_POST['fecha_credito'],$_POST['cod_partida']);
    }

}

if ($_GET['resp']==11 and isset($_GET['resp'])) {
$credito_empleado->listar_credito_empleado();
}

if ($_GET['resp']==12 and isset($_GET['resp'])) {

$credito_empleado->restar_cuotas($_POST['cod_empleado'],$_POST['fecha_credito'],$_POST['cod_partida']);

}