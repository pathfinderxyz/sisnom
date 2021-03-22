<?php

require('../conexion.php');

class profesion {

    private $id_profesion;
    private $profesion;

    public function buscar_profesion($profesion){
        $tipo = gettype($profesion);

        if ($tipo=='integer'){
    $query = pg_query("select * from profesion where id_profesion=$profesion");

        }elseif ($tipo=='string') {
    $query = pg_query("select * from profesion where profesion='$profesion'");

        }
    $row = pg_fetch_row($query);
    $total = pg_num_rows($query);
    $this->id_profesion=$row[0];
    $this->profesion=$row[1];
        return $total;
    }

    public function agregar_profesion($profesion){
        $busqueda=$this->buscar_profesion($profesion);
        $nombre_profesion_nuevo = $profesion;
            
            if ($busqueda>=1) {

                echo json_encode(array(
                    "existe"=> "Ya Existe"
                    ));
            }else{
                $query = pg_query("INSERT INTO profesion (id_profesion,profesion) VALUES (COALESCE(((SELECT max(id_profesion) from profesion)+1),1),'$nombre_profesion_nuevo')");

                echo json_encode(array(
                    "existe"=> "Registrado"
                    ));

            }


    }

    public function modificar_profesion($a,$actualizacion){
        $id_profesion = (int) $a;

        $busqueda=$this->buscar_profesion($id_profesion);
        $nombre_profesion_nuevo = $actualizacion;
            
            if ($busqueda>=1) {
                
                    $query = pg_query("UPDATE profesion set profesion='$nombre_profesion_nuevo' where id_profesion=$id_profesion");

                    echo json_encode(array(
                    "existe"=> "Registrado"
                    ));


            }else{


                echo json_encode(array(
                    "existe"=> "NO Existe"
                    ));


            }
    }

    public function eliminar_profesion($profesion){
        $busqueda=$this->buscar_profesion($profesion);
        $nombre_profesion_nuevo = $profesion;
            
            if ($busqueda>=1) {
                $query = pg_query("DELETE FROM profesion WHERE profesion='$nombre_profesion_nuevo'");
                echo "Eliminar Exitoso";
            }else{

                echo "No Existe";
            }
    }

    public function listar_profesion($resp){
            
        $query = pg_query("SELECT * FROM profesion order by profesion");
        $total = pg_num_rows($query);

            $profesion_a = array(); //creamos un array
 
if ($resp==1) {

        while($row = pg_fetch_array($query))
        { 
            $id=$row['id_profesion'];
            $profesion=$row['profesion'];

            
         
            $profesion_a[] = array("id"=> $id,
                                "profesion"=> $profesion
                                            );
         
        }

}elseif ($resp==2) {
        while($row = pg_fetch_array($query))
                {
                    $id=$row['id_profesion'];
                    $profesion=$row['profesion'];

                    
                 
                    $profesion_a[] = array($id=> $profesion);
                 
                }
    }
/*//desconectamos la base de datos
$close = mysqli_close($conexion) 
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");*/
  
 
//Creamos el JSON
$json_string = json_encode($profesion_a);
echo $json_string;



    }


    public function mostrar_profesion(){

        $query = pg_query("select * from profesion");
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json
            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_editar_profesion\" onClick=\"editar_profesion($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';

            $tabla.='{"id_profesion":"'.$row[0].'","profesion":"'.$row[1].'","acciones":"'.$editar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }


public function mostrar_profesion_json($id_profesion){

        //fucnion para el editable del datatable 

        $query = pg_query("SELECT * FROM profesion where id_profesion = $id_profesion order by id_profesion");
        $total = pg_num_rows($query);

           $profesion_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $id_profesion=$row['id_profesion'];
            $nombre_profesion=$row['profesion'];
            

            $profesion_a[] = array(

                'id_profesion'=> $id_profesion,
                'nombre_profesion'=> $nombre_profesion



                );

}
//Creamos el JSON
$json_string = json_encode($profesion_a);
echo $json_string; 

}

}


$profesion = new profesion;

//$profesion->modificar_profesion('Erudito','Inteligente'); // utilizamos los metodos
//$profesion->eliminar_profesion('Inteligente'); // utilizamos los metodos
//$profesion->agregar_profesion('Inteligente'); // utilizamos los metodos
//echo $profesion->buscar_profesion('Inteligente'); // utilizamos los metodos

if (isset($_GET['resp']) and $_GET['resp']==1 or $_GET['resp']==2) {
$profesion->listar_profesion($_GET['resp']); // utilizamos los metodos
}

if (isset($_GET['resp']) and $_GET['resp']==3) {
$profesion->mostrar_profesion(); // utilizamos los metodos
}


if ($_GET['resp']==4 and isset($_GET['resp'])) {

if ($_POST['nombre_profesion']!='') {
$profesion->agregar_profesion($_POST['nombre_profesion']); // utilizamos los metodos

}
}

if ($_GET['resp']==5 and isset($_GET['resp'])) {
$profesion->mostrar_profesion_json($_POST['id_profesion']); // utilizamos los metodos


}

if ($_GET['resp']==6 and isset($_GET['resp'])) {

if ($_POST['profesion_n']!='') {
$profesion->modificar_profesion($_POST['id_profesion'],$_POST['profesion_n']); // utilizamos los metodos
}



}




?>