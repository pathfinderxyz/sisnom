<?php

require('../conexion.php');

class unidad_administrativa {

    private $id_unidad_administrativa;
    private $unidad_administrativa;

    public function buscar_unidad_administrativa($unidad_administrativa){
        $tipo = gettype($unidad_administrativa);

        if ($tipo=='integer'){
    $query = pg_query("select * from unidad_administrativa where id_unidad_administrativa=$unidad_administrativa");

        }elseif ($tipo=='string') {
    $query = pg_query("select * from unidad_administrativa where unidad_administrativa='$unidad_administrativa'");

        }

    $row = pg_fetch_row($query);
    $total = pg_num_rows($query);
    $this->id_unidad_administrativa=$row[0];
    $this->unidad_administrativa=$row[1];
        return $total;
    }

    public function agregar_unidad_administrativa($unidad_administrativa){
        $busqueda=$this->buscar_unidad_administrativa($unidad_administrativa);
        $nombre_unidad_administrativa_nuevo = $unidad_administrativa;
            
            if ($busqueda>=1) {

                echo json_encode(array(
                    "existe"=> "Ya Existe"
                    ));

            }else{
                $query = pg_query("INSERT INTO unidad_administrativa (id_unidad_administrativa,unidad_administrativa) VALUES (COALESCE(((SELECT max(id_unidad_administrativa) from unidad_administrativa)+1),1),'$nombre_unidad_administrativa_nuevo')");

                echo json_encode(array(
                    "existe"=> "Registrado"
                    ));

            }


    }

    public function modificar_unidad_administrativa($a,$actualizacion){
        $id_unidad_administrativa = (int) $a;

        $busqueda=$this->buscar_unidad_administrativa($id_unidad_administrativa);
        $nombre_unidad_administrativa_nuevo = $actualizacion;
            
            if ($busqueda>=1) {
                
                if ($nombre_unidad_administrativa_nuevo!='') {

                    $query = pg_query("UPDATE unidad_administrativa set unidad_administrativa='$nombre_unidad_administrativa_nuevo' where id_unidad_administrativa=$id_unidad_administrativa");

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

    public function eliminar_unidad_administrativa($unidad_administrativa){
        $busqueda=$this->buscar_unidad_administrativa($unidad_administrativa);
        $nombre_unidad_administrativa_nuevo = $unidad_administrativa;
            
            if ($busqueda>=1) {
                $query = pg_query("DELETE FROM unidad_administrativa WHERE unidad_administrativa='$nombre_unidad_administrativa_nuevo'");
                echo "Eliminar Exitoso";
            }else{

                echo "No Existe";
            }
    }

    public function listar_unidad_administrativa($resp){
            
        $query = pg_query("SELECT * FROM unidad_administrativa order by unidad_administrativa");
        $total = pg_num_rows($query);


$unidad_administrativa_a = array(); //creamos un array
 
if ($resp==1) {

        while($row = pg_fetch_array($query))
        { 
            $id=$row['id_unidad_administrativa'];
            $unidad_administrativa=$row['unidad_administrativa'];

            
         
            $unidad_administrativa_a[] = array("id"=> $id,
                                "unidad_administrativa"=> $unidad_administrativa
                                            );
         
        }

}elseif ($resp==2) {
        while($row = pg_fetch_array($query))
                {
                    $id=$row['id_unidad_administrativa'];
                    $unidad_administrativa=$row['unidad_administrativa'];

                    
                 
                    $unidad_administrativa_a[] = array($id=> $unidad_administrativa);
                 
                }
    }
/*//desconectamos la base de datos
$close = mysqli_close($conexion) 
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");*/
  
 
//Creamos el JSON
$json_string = json_encode($unidad_administrativa_a);
echo $json_string;



    }

    public function mostrar_unidad_administrativa(){

        $query = pg_query("select * from unidad_administrativa");
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json
            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_editar_unidad_administrativa\" onClick=\"editar_unidad_administrativa($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';

            $tabla.='{"id_unidad_administrativa":"'.$row[0].'","unidad_administrativa":"'.$row[1].'","acciones":"'.$editar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }

    public function mostrar_unidad_administrativa_json($id_unidad_administrativa){

        //fucnion para el editable del datatable 

        $query = pg_query("SELECT * FROM unidad_administrativa where id_unidad_administrativa = $id_unidad_administrativa order by id_unidad_administrativa");
        $total = pg_num_rows($query);

           $unidad_administrativa_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $id_unidad_administrativa=$row['id_unidad_administrativa'];
            $nombre_unidad_administrativa=$row['unidad_administrativa'];
            

            $unidad_administrativa_a[] = array(

                'id_unidad_administrativa'=> $id_unidad_administrativa,
                'nombre_unidad_administrativa'=> $nombre_unidad_administrativa



                );

}
//Creamos el JSON
$json_string = json_encode($unidad_administrativa_a);
echo $json_string; 

}


}


$unidad_administrativa = new unidad_administrativa;

//$unidad_administrativa->modificar_unidad_administrativa('Vagos','No hacen un coño'); // utilizamos los metodos
//$unidad_administrativa->eliminar_unidad_administrativa('No hacen un coño'); // utilizamos los metodos
//$unidad_administrativa->agregar_unidad_administrativa('Vagos'); // utilizamos los metodos
//echo $unidad_administrativa->buscar_unidad_administrativa('Vagos'); // utilizamos los metodos

if (isset($_GET['resp'])) {

if (isset($_GET['resp']) and $_GET['resp']==1 or $_GET['resp']==2) {
$unidad_administrativa->listar_unidad_administrativa($_GET['resp']); // utilizamos los metodos
}


if (isset($_GET['resp']) and $_GET['resp']==3) {
$unidad_administrativa->mostrar_unidad_administrativa(); // utilizamos los metodos
}

}


if ($_GET['resp']==4 and isset($_GET['resp'])) {
if ($_POST['nombre_unidad_administrativa']!='') {
$unidad_administrativa->agregar_unidad_administrativa($_POST['nombre_unidad_administrativa']); // utilizamos los metodos
}
}


if ($_GET['resp']==5 and isset($_GET['resp'])) {
if ($_POST['id_unidad_administrativa']>0) {
$unidad_administrativa->mostrar_unidad_administrativa_json($_POST['id_unidad_administrativa']); // utilizamos los metodos
}
}


if ($_GET['resp']==6 and isset($_GET['resp'])) {


if ($_POST['unidad_administrativa_n']!='') {

$unidad_administrativa->modificar_unidad_administrativa($_POST['id_unidad_administrativa'],$_POST['unidad_administrativa_n']); // utilizamos los metodos

  }




}


?>