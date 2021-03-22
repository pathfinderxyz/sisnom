<?php

require('../conexion.php');

class partida {

    private $cod_partida;
    private $partida;
    private $tipo;
    private $id_periodicidad;
    private $descripcion;

    public function buscar_partida($partida){

        $tipo = gettype($partida);

        if ($tipo=='integer'){
            $query = pg_query("select * from partida where cod_partida=$partida");
        }elseif ($tipo=='string') {
            $query = pg_query("select * from partida where partida='$partida'");
        }

        $row = pg_fetch_row($query);
        $total = pg_num_rows($query);
        $this->cod_partida=$row[0];
        $this->partida=$row[1];
        $this->tipo=$row[2];
        $this->id_periodicidad=$row[3];
        $this->descripcion=$row[4];

        return $total;
    }

    public function agregar_partida($partida,$tipo,$id_periodicidad,$descripcion){
        $busqueda=$this->buscar_partida($partida);
        $nombre_partida_nuevo = $partida;
        $tipo_nuevo = $tipo;
        $id_periodicidad_nuevo = $id_periodicidad;
        $descripcion_nuevo = $descripcion;

        if ($busqueda>=1) {

            echo json_encode(array(
                "existe"=> "Ya Existe"
                ));

        }else{
            $query = pg_query("INSERT INTO partida (cod_partida,partida,tipo,id_periodicidad,descripcion) VALUES (COALESCE(((SELECT max(cod_partida) from partida)+1),1),'$nombre_partida_nuevo','$tipo_nuevo',$id_periodicidad_nuevo,'$descripcion_nuevo')");

            echo json_encode(array(
                "existe"=> "Registrado"
                ));

        }


    }

    public function modificar_partida($a,$actualizacion,$tipo,$id_periodicidad,$descripcion){
        $id_partida = (int) $a;
        $busqueda=$this->buscar_partida($id_partida);
        $nombre_partida_nuevo = $actualizacion;
        $actualizacion_tipo = $tipo;
        $actualizacion_id_periodicidad = $id_periodicidad;
        $actualizacion_descripcion = $descripcion;

        if ($busqueda>=1) {

            if ($nombre_partida_nuevo!='') {
                $query = pg_query("UPDATE partida set partida='$nombre_partida_nuevo' where cod_partida=$id_partida");

                echo json_encode(array(
                    "existe"=> "Actualizacion de partida",
                ));
            
            }
            if ($actualizacion_tipo != '') {
                $query = pg_query("UPDATE partida set tipo='$actualizacion_tipo' where cod_partida=$id_partida");

                echo json_encode(array(
                    "existe"=> "Actualizacion de Tipo",
                ));

            }
            if ($actualizacion_id_periodicidad>0) {
                $query = pg_query("UPDATE partida set id_periodicidad='$actualizacion_id_periodicidad' where cod_partida=$id_partida");

                echo json_encode(array(
                    "existe"=> "Actualizacion de periodicidad",
                ));

            }
            if ($actualizacion_descripcion != '') {
                $query = pg_query("UPDATE partida set descripcion='$actualizacion_descripcion' where cod_partida=$id_partida");

                echo json_encode(array(
                    "existe"=> "Actualizacion de descripcion",
                ));

            }

        }else{

                echo json_encode(array(
                    "existe"=> $nombre_partida_nuevo,
                ));
        }
    }

    public function eliminar_partida($partida){
        $c_e = (int) $partida;
        $busqueda=$this->buscar_partida($c_e);
        $nombre_partida_nuevo = $c_e;

        if ($busqueda>=1) {
            $query = pg_query("DELETE FROM partida WHERE cod_partida='$c_e'");
            echo json_encode(array(
                "existe"=> "Partida Eliminado"
                ));      
        }else{

            echo json_encode(array(
                "existe"=> "No Existe"
                ));      


        }
    }

    public function listar_partida($resp){

        $query = pg_query("SELECT * FROM partida order by cod_partida");
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


public function mostrar_partida(){

    $query = pg_query("select * from partida p left join periodicidad pe on p.id_periodicidad=pe.id_periodicidad");
    $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
    $i=0;
    $tabla = "";

    while($row = pg_fetch_row($query))
    {
            //////botones del datatable para crear en el json
        $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_editar_partida\" onClick=\"editar_partida($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';
        /*$eliminar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" onClick=\"eliminar_partida($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Eliminar\"><i class=\"fa fa-ban\"></i></button>';
*/
        $tabla.='{"id_partida":"'.$row[0].'","partida":"'.$row[1].'","tipo_partida":"'.$row[2].'","periodicidad_partida":"'.$row[6].'","descripcion_partida":"'.$row[4].'","acciones":"'/*.$eliminar*/.$editar.'"},';       
        $i++;
    }
    $tabla = substr($tabla,0, strlen($tabla) - 1);

    echo '{"data":['.$tabla.']}';   



}


public function mostrar_partida_json($cod_partida){

        //fucnion para el editable del datatable 

        $query = pg_query("SELECT * FROM partida_v where cod_partida= $cod_partida");
        $total = pg_num_rows($query);

           $partida_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $cod_partida=$row['cod_partida'];
            $partida=$row['partida'];
            $tipo=$row['tipo'];
            $id_periodicidad=$row['id_periodicidad'];
            $descripcion=$row['descripcion'];
            $periodicidad=$row['periodicidad'];


            $partida_a[] = array(

                'cod_partida'=> $cod_partida,
                'partida'=> $partida,
                'tipo'=> $tipo,
                'id_periodicidad'=> $id_periodicidad,
                'descripcion'=> $descripcion,
                'periodicidad'=> $periodicidad
                );

            }
//Creamos el JSON
$json_string = json_encode($partida_a);
echo $json_string; 

}


}


$partida = new partida;

//$partida->modificar_partida('Insulto','Metan','',0,''); // utilizamos los metodos
//$partida->eliminar_partida('Menta de Madre'); // utilizamos los metodos
//$partida->agregar_partida('Menta de Madre','Deduccion',1,'falta de respeto'); // utilizamos los metodos
//echo $partida->buscar_partida('Menta de Madre'); // utilizamos los metodos
//$partida->listar_partida(); // utilizamos los metodos

if ($_GET['resp']==1 and isset($_GET['resp'])) {
$partida->mostrar_partida(); // utilizamos los metodos
}

if (isset($_GET['resp']) and $_GET['resp']==3 or $_GET['resp']==4) {
$partida->listar_partida($_GET['resp']); // utilizamos los metodos
}


if (isset($_GET['resp']) and $_GET['resp']==2) {

    if ($_POST['nombre_partida']!='' and $_POST['tipo_partida']!='' and $_POST['periodicidad_partida2'] and  $_POST['descripcion_partida']) {
$partida->agregar_partida($_POST['nombre_partida'],$_POST['tipo_partida'],$_POST['periodicidad_partida2'],$_POST['descripcion_partida']); // utilizamos los metodos

}

}

if (isset($_GET['resp']) and $_GET['resp']==5){
    if ($_POST['cod_partida']>0) {
$partida->eliminar_partida($_POST['cod_partida']); // utilizamos los metodos
}
}

if (isset($_GET['resp']) and $_GET['resp']==6){
    $partida->mostrar_partida_json($_POST['id_partida']); // utilizamos los metodos
}


if (isset($_GET['resp']) and $_GET['resp']==7) {

    if (isset($_POST['partida_n']) and $_POST['partida_n']!='') {

        $partida->modificar_partida($_POST['cod_partida'],$_POST['partida_n'],'',0,''); // utilizamos los metodos
    }

    if (isset($_POST['tipo_p']) and $_POST['tipo_p']!='') {

        $partida->modificar_partida($_POST['cod_partida'],'',$_POST['tipo_p'],0,''); // utilizamos los metodos
    }

    if (isset($_POST['periodicidad_p']) and $_POST['periodicidad_p']!='') {

        $partida->modificar_partida($_POST['cod_partida'],'','',$_POST['periodicidad_p'],''); // utilizamos los metodos
    }

    if (isset($_POST['descripcion_p']) and $_POST['descripcion_p']!='') {

        $partida->modificar_partida($_POST['cod_partida'],'','',0,$_POST['descripcion_p']); // utilizamos los metodos
    }

}

