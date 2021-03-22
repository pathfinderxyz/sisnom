<?php

require('../conexion.php');

class periodicidad {

    private $id_periodicidad;
    private $periodicidad;
    private $dias;

    public function buscar_periodicidad($periodicidad){

        $tipo = gettype($periodicidad);

        if ($tipo=='integer'){
            $query = pg_query("select * from periodicidad where id_periodicidad=$periodicidad");

        }elseif ($tipo=='string') {
            $query = pg_query("select * from periodicidad where periodicidad='$periodicidad'");
        }

    $row = pg_fetch_row($query);
    $total = pg_num_rows($query);
    $this->id_periodicidad=$row[0];
    $this->periodicidad=$row[1];
    $this->dias=$row[2];
        return $total;
    }

    public function agregar_periodicidad($periodicidad,$dias){
        $busqueda=$this->buscar_periodicidad($periodicidad);
        $nombre_periodicidad_nuevo = $periodicidad;
        $cant_dias = $dias;
            
            if ($busqueda>=1) {

                echo json_encode(array(
                    "existe"=> "Ya Existe"
                    ));
            }else{
                $query = pg_query("INSERT INTO periodicidad (id_periodicidad,periodicidad,dias) VALUES (COALESCE(((SELECT max(id_periodicidad) from periodicidad)+1),1),'$nombre_periodicidad_nuevo',$cant_dias)");

                echo json_encode(array(
                    "existe"=> "Registrado"
                    ));
            }


    }

    public function modificar_periodicidad($a,$actualizacion,$cant_dias){
        $id_periodicidad = (int) $a;

        $busqueda=$this->buscar_periodicidad($id_periodicidad);
        $nombre_periodicidad_nuevo=$actualizacion;


            if ($busqueda>=1) {
              

                    if ($nombre_periodicidad_nuevo != '') {
                            $query = pg_query("UPDATE periodicidad set periodicidad='$nombre_periodicidad_nuevo' where id_periodicidad=$id_periodicidad");

                            echo json_encode(array(
                            "existe"=> "Periodicidad Actualizado"
                            )); 

                    }

                    if ($cant_dias>0) {
                            $query = pg_query("UPDATE periodicidad set dias=$cant_dias where id_periodicidad=$id_periodicidad");
                            echo json_encode(array(
                            "existe"=> "Dias Actualizado"
                            )); 


                    }



            }else{

   
                    echo json_encode(array(
                    "existe"=> "No Existe"
                    ));

            }
    

    }

    public function eliminar_periodicidad($periodicidad){
        $busqueda=$this->buscar_periodicidad($periodicidad);
        $nombre_periodicidad_nuevo = $periodicidad;
            
            if ($busqueda>=1) {
                $query = pg_query("DELETE FROM periodicidad WHERE periodicidad='$nombre_periodicidad_nuevo'");
                echo "Eliminar Exitoso";
            }else{

                echo "No Existe";
            }
    }

    public function listar_periodicidad($resp){
            
        $query = pg_query("SELECT * FROM periodicidad order by dias");
        $total = pg_num_rows($query);

$periodicidad_a = array(); //creamos un array
 
if ($resp==3) {

        while($row = pg_fetch_array($query))
        { 
            $id=$row['id_periodicidad'];
            $periodicidad=$row['periodicidad'];
            $dias=$row['dias'];


            
         
            $periodicidad_a[] = array("id"=> $id,
                                "periodicidad"=> $periodicidad
                                            );
         
        }

}elseif ($resp==4) {
        while($row = pg_fetch_array($query))
                {
            $id=$row['id_periodicidad'];
            $periodicidad=$row['periodicidad'];

                    
                 
                    $periodicidad_a[] = array($id=> $periodicidad);
                 
                }
    }
/*//desconectamos la base de datos
$close = mysqli_close($conexion) 
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");*/
  
 
//Creamos el JSON
$json_string = json_encode($periodicidad_a);
echo $json_string;



    }

    public function mostrar_periodicidad(){

        $query = pg_query("select * from periodicidad");
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json
            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_editar_periodicidad\" onClick=\"editar_periodicidad($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';
            $tabla.='{"id_periodicidad":"'.$row[0].'","periodicidad":"'.$row[1].'","dias":"'.$row[2].'","acciones":"'.$editar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }


public function mostrar_periodicidad_json($id_periodicidad){

        //fucnion para el editable del datatable 

        $query = pg_query("SELECT * FROM periodicidad where id_periodicidad = $id_periodicidad order by id_periodicidad");
        $total = pg_num_rows($query);

           $periodicidad_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $id_periodicidad=$row['id_periodicidad'];
            $nombre_periodicidad=$row['periodicidad'];
            $dias=$row['dias'];

            

            $periodicidad_a[] = array(

                'id_periodicidad'=> $id_periodicidad,
                'nombre_periodicidad'=> $nombre_periodicidad,
                'dias' => $dias



                );

}
//Creamos el JSON
$json_string = json_encode($periodicidad_a);
echo $json_string; 

}



}


$periodicidad = new periodicidad;

//$periodicidad->modificar_periodicidad('Semanal','Semanal',7); // utilizamos los metodos
//$periodicidad->eliminar_periodicidad('Diario'); // utilizamos los metodos
//$periodicidad->agregar_periodicidad('Mensual',30); // utilizamos los metodos
//echo $periodicidad->buscar_periodicidad('Quincenal'); // utilizamos los metodos
//$periodicidad->listar_periodicidad(); // utilizamos los metodos

if (isset($_GET['resp'])) {




if ($_GET['resp']==1 and isset($_GET['resp'])) {
$periodicidad->mostrar_periodicidad();

}

if ($_GET['resp']==2 and isset($_GET['resp'])) {

if ($_POST['nombre_periodicidad']!='' and $_POST['cant_dias']!='') {
$periodicidad->agregar_periodicidad($_POST['nombre_periodicidad'],$_POST['cant_dias']); // utilizamos los metodos
}

}

if (isset($_GET['resp']) and $_GET['resp']==3 or $_GET['resp']==4) {
$periodicidad->listar_periodicidad($_GET['resp']); // utilizamos los metodos

}

if (isset($_GET['resp']) and $_GET['resp']==5) {
$periodicidad->mostrar_periodicidad_json($_POST['id_periodicidad']); // utilizamos los metodos

}

if (isset($_GET['resp']) and $_GET['resp']==6) {

if (isset($_POST['periodicidad_e']) and $_POST['periodicidad_e']) {

$periodicidad->modificar_periodicidad($_POST['id_periodicidad'],$_POST['periodicidad_e'],0); // utilizamos los metodos

}

if (isset($_POST['dias_e']) and $_POST['dias_e']) {

$periodicidad->modificar_periodicidad($_POST['id_periodicidad'],'',$_POST['dias_e']); // utilizamos los metodos

}


}




}


?>