<?php

require('../conexion.php');

class tipo_nomina {

    private $id_tipo_nomina;
    private $tipo_nomina;

    public function buscar_tipo_nomina($tipo_nomina){

        $tipo = gettype($tipo_nomina);

        if ($tipo=='integer'){
    $query = pg_query("select * from tipo_nomina where id_tipo_nomina=$tipo_nomina");

        }elseif ($tipo=='string') {
    $query = pg_query("select * from tipo_nomina where tipo_nomina='$tipo_nomina'");

        }

    $row = pg_fetch_row($query);
    $total = pg_num_rows($query);
    $this->id_tipo_nomina=$row[0];
    $this->tipo_nomina=$row[1];
        return $total;
    }

    public function agregar_tipo_nomina($tipo_nomina){
        $busqueda=$this->buscar_tipo_nomina($tipo_nomina);
        $nombre_tipo_nomina_nuevo = $tipo_nomina;
            
            if ($busqueda>=1) {

                echo json_encode(array(
                    "existe"=> "Ya Existe"
                    ));

            }else{
                $query = pg_query("INSERT INTO tipo_nomina (id_tipo_nomina,tipo_nomina) VALUES (COALESCE(((SELECT max(id_tipo_nomina) from tipo_nomina)+1),1),'$nombre_tipo_nomina_nuevo')");

                echo json_encode(array(
                    "existe"=> "Registrado"
                    ));

            }


    }

    public function modificar_tipo_nomina($a,$actualizacion){
        $id_tipo_nomina = (int) $a;

        $busqueda=$this->buscar_tipo_nomina($id_tipo_nomina);
        $nombre_tipo_nomina_nuevo = $actualizacion;
            
            if ($busqueda>=1) {
                
                        if ($nombre_tipo_nomina_nuevo!='') {
                    $query = pg_query("UPDATE tipo_nomina set tipo_nomina='$nombre_tipo_nomina_nuevo' where id_tipo_nomina=$id_tipo_nomina");

                    echo json_encode(array(
                    "existe"=> "Registrado"
                    ));
                        }



            }else{


                echo json_encode(array(
                    "existe"=> "NO Existe"
                    ));
            }
    }

    public function eliminar_tipo_nomina($tipo_nomina){
        $busqueda=$this->buscar_tipo_nomina($tipo_nomina);
        $nombre_tipo_nomina_nuevo = $tipo_nomina;
            
            if ($busqueda>=1) {
                $query = pg_query("DELETE FROM tipo_nomina WHERE tipo_nomina='$nombre_tipo_nomina_nuevo'");
                echo "Eliminar Exitoso";
            }else{

                echo "No Existe";
            }
    }

    public function listar_tipo_nomina($resp){
            
        $query = pg_query("SELECT * FROM tipo_nomina order by tipo_nomina");
        $total = pg_num_rows($query);

$tipo_nomina_a = array(); //creamos un array
 
if ($resp==1) {

        while($row = pg_fetch_array($query))
        { 
            $id=$row['id_tipo_nomina'];
            $tipo_nomina=$row['tipo_nomina'];

            
         
            $tipo_nomina_a[] = array("id"=> $id,
                                "tipo_nomina"=> $tipo_nomina
                                            );
         
        }

}elseif ($resp==2) {
        while($row = pg_fetch_array($query))
                {
                    $id=$row['id_tipo_nomina'];
                    $tipo_nomina=$row['tipo_nomina'];

                    
                 
                    $tipo_nomina_a[] = array($id=> $tipo_nomina);
                 
                }
    }
/*//desconectamos la base de datos
$close = mysqli_close($conexion) 
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");*/
  
 
//Creamos el JSON
$json_string = json_encode($tipo_nomina_a);
echo $json_string;



    }

public function mostrar_tipo_nomina(){

        $query = pg_query("select * from tipo_nomina");
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json
            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_editar_tipo_nomina\" onClick=\"editar_tipo_nomina($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';

            $tabla.='{"id_tipo_nomina":"'.$row[0].'","tipo_nomina":"'.$row[1].'","acciones":"'.$editar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }


    public function mostrar_tipo_nomina_json($id_tipo_nomina){

        //fucnion para el editable del datatable 

        $query = pg_query("SELECT * FROM tipo_nomina where id_tipo_nomina = $id_tipo_nomina order by id_tipo_nomina");
        $total = pg_num_rows($query);

           $tipo_nomina_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $id_tipo_nomina=$row['id_tipo_nomina'];
            $nombre_tipo_nomina=$row['tipo_nomina'];
            

            $tipo_nomina_a[] = array(

                'id_tipo_nomina'=> $id_tipo_nomina,
                'nombre_tipo_nomina'=> $nombre_tipo_nomina



                );

}
//Creamos el JSON
$json_string = json_encode($tipo_nomina_a);
echo $json_string; 

}


}


$tipo_nomina = new tipo_nomina;

//$tipo_nomina->modificar_tipo_nomina('Sin Real','Pelando Bola'); // utilizamos los metodos
//$tipo_nomina->eliminar_tipo_nomina('Pelando Bola'); // utilizamos los metodos
//$tipo_nomina->agregar_tipo_nomina('Pelando Bola'); // utilizamos los metodos
//echo $tipo_nomina->buscar_tipo_nomina('Pelando Bola'); // utilizamos los metodos


if (isset($_GET['resp'])) {

if (isset($_GET['resp']) and $_GET['resp']==1 or $_GET['resp']==2) {
$tipo_nomina->listar_tipo_nomina($_GET['resp']); // utilizamos los metodos
}
if (isset($_GET['resp']) and $_GET['resp']==3) {
$tipo_nomina->mostrar_tipo_nomina();
}
}

if ($_GET['resp']==4 and isset($_GET['resp'])) {

if ($_POST['nombre_tipo_nomina']!='') {
$tipo_nomina->agregar_tipo_nomina($_POST['nombre_tipo_nomina']);
}
}

if (isset($_GET['resp']) and $_GET['resp']==5) {

   if ($_POST['nombre_tipo_nomina']!='') {
$tipo_nomina->modificar_tipo_nomina($_POST['nombre_tipo_nomina'],$_POST['nombres']); // utilizamos los metodos

 }

}


if (isset($_GET['resp']) and $_GET['resp']==6) {

$tipo_nomina->mostrar_tipo_nomina_json($_POST['id_tipo_nomina']); // utilizamos los metodos



}


if ($_GET['resp']==7 and isset($_GET['resp'])) {

if ($_POST['tipo_nomina_n']!='') {
$tipo_nomina->modificar_tipo_nomina($_POST['id_tipo_nomina'],$_POST['tipo_nomina_n']); // utilizamos los metodos

 }



}

?>