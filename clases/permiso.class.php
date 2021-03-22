<?php

require('../conexion.php');

class permiso {

    private $id_permiso;
    private $permiso;
    private $dias_min;
    private $dias_max;

    public function buscar_permiso($permiso){

        $tipo = gettype($permiso);

        if ($tipo=='integer'){
    $query = pg_query("select * from permiso where id_permiso=$permiso");

        }elseif ($tipo=='string') {
    $query = pg_query("select * from permiso where permiso='$permiso'");

        }

    $row = pg_fetch_row($query);
    $total = pg_num_rows($query);
    $this->id_permiso=$row[0];
    $this->permiso=$row[1];
    $this->dias_min=$row[2];
    $this->dias_max=$row[3];

        return $total;
    }

    public function agregar_permiso($permiso,$dias_min,$dias_max){
        $busqueda=$this->buscar_permiso($permiso);
        $nombre_permiso_nuevo = $permiso;
        $dias_min_nuevo= $dias_min;
        $dias_max_nuevo= $dias_max;
            
            if ($busqueda>=1) {
                echo json_encode(array(
                    "existe"=> "Ya Existe"
                    ));

            }else{
                $query = pg_query("INSERT INTO permiso (id_permiso,permiso,dias_min,dias_max) VALUES (COALESCE(((SELECT max(id_permiso) from permiso)+1),1),'$nombre_permiso_nuevo',$dias_min_nuevo,$dias_max_nuevo)");
                echo json_encode(array(
                    "existe"=> "Registrado"
                    ));

            }


    }

    public function modificar_permiso($a,$actualizacion,$dias_min,$dias_max){
        $id_permiso = (int) $a;
        $busqueda=$this->buscar_permiso($id_permiso);
        $nombre_permiso_nuevo = $actualizacion;
        $actualizacion_dias_min = $dias_min;
        $actualizacion_dias_max = $dias_max;
            
            if ($busqueda>=1) {
                
                    if ($nombre_permiso_nuevo!='') {
                        $query = pg_query("UPDATE permiso set permiso='$nombre_permiso_nuevo' where id_permiso=$id_permiso");

                            echo json_encode(array(
                            "existe"=> "Permiso Actualizado"
                            )); 


                    }
                    if ($actualizacion_dias_min>=0) {
                        $query = pg_query("UPDATE permiso set dias_min=$actualizacion_dias_min where id_permiso=$id_permiso");

                            echo json_encode(array(
                            "existe"=> "Dias Minimos Actualizado"
                            )); 

                    }
                   if ($actualizacion_dias_max>=0) {
                        $query = pg_query("UPDATE permiso set dias_max=$actualizacion_dias_max where id_permiso=$id_permiso");

                            echo json_encode(array(
                            "existe"=> "Dias Maximos Actualizado"
                            )); 

                    }
                   
            }else{

                            echo json_encode(array(
                            "existe"=> "No Existe"
                            )); 

            }
    }

    public function eliminar_permiso($permiso){
        $busqueda=$this->buscar_permiso($permiso);
        $nombre_permiso_nuevo = $permiso;
            
            if ($busqueda>=1) {
                $query = pg_query("DELETE FROM permiso WHERE permiso='$nombre_permiso_nuevo'");
                echo "Eliminar Exitoso";
            }else{

                echo "No Existe";
            }
    }

    public function listar_permiso($resp){
            
        $query = pg_query("SELECT * FROM permiso order by id_permiso");
        $total = pg_num_rows($query);
        $permiso_a = array(); //creamos un array
 
            if ($resp==5) {

                while($row = pg_fetch_array($query)){ 
                    
                    $id=$row['id_permiso'];
                    $permiso=$row['permiso']; 
                    
                    $permiso_a[] = array("id"=> $id, "permiso"=> $permiso);
         
                }

            }elseif ($resp==6) {
                while($row = pg_fetch_array($query)){
            
                    $id=$row['id_permiso'];
                    $permiso=$row['permiso'];
                    $permiso_a[] = array($id => $permiso);
                 
                }
            }
/*//desconectamos la base de datos
$close = mysqli_close($conexion) 
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");*/
//Creamos el JSON
$json_string = json_encode($permiso_a);
echo $json_string;

}

public function mostrar_permiso(){

        $query = pg_query("select * from permiso");
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json
            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_editar_permiso\" onClick=\"editar_permiso($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';

            $tabla.='{"id_permiso":"'.$row[0].'","permiso":"'.$row[1].'","dias_min":"'.$row[2].'","dias_max":"'.$row[3].'","acciones":"'.$editar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }


public function mostrar_permiso_json($id_permiso){

        //fucnion para el editable del datatable 

        $query = pg_query("SELECT * FROM permiso where id_permiso = $id_permiso");
        $total = pg_num_rows($query);

           $permiso_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $id_permiso=$row['id_permiso'];
            $permiso=$row['permiso'];
            $dias_min=$row['dias_min'];
            $dias_max=$row['dias_max'];


            

            $permiso_a[] = array(

                'id_permiso'=> $id_permiso,
                'permiso'=> $permiso,
                'dias_min' => $dias_min,
                'dias_max' => $dias_max

                );

}
//Creamos el JSON
$json_string = json_encode($permiso_a);
echo $json_string; 

}



}


$permiso = new permiso;

//$permiso->modificar_permiso('chao','Chao Me fui',0,0); // utilizamos los metodos
//$permiso->eliminar_permiso('Chao Me fui'); // utilizamos los metodos
//$permiso->agregar_permiso('Chao Me fui',0,1); // utilizamos los metodos
//echo $permiso->buscar_permiso('Chao Me fui'); // utilizamos los metodos
//$permiso->listar_permiso(); // utilizamos los metodos

if ($_GET['resp']==1 and isset($_GET['resp'])) {
$permiso->mostrar_permiso();

}


if ($_GET['resp']==2 and isset($_GET['resp'])) {

if ($_POST['nombre_permiso']!='' and $_POST['dias_min']>=0 and $_POST['dias_max']>=0) {
$permiso->agregar_permiso($_POST['nombre_permiso'],$_POST['dias_min'],$_POST['dias_max']); // utilizamos los metodos

}
}


if (isset($_GET['resp']) and $_GET['resp']==3) {

$permiso->mostrar_permiso_json($_POST['id_permiso']);

}


if (isset($_GET['resp']) and $_GET['resp']==4) {

if ($_POST['permiso_e']!='' and isset($_POST['permiso_e'])) {

$permiso->modificar_permiso($_POST['id_permiso'],$_POST['permiso_e'],-1,-1); // utilizamos los metodos


}

if (isset($_POST['dias_e_min']) and $_POST['dias_e_min']>=0) {
$permiso->modificar_permiso($_POST['id_permiso'],'',$_POST['dias_e_min'],-1); // utilizamos los metodos
}

if (isset($_POST['dias_e_max']) and $_POST['dias_e_max']>=0) {
$permiso->modificar_permiso($_POST['id_permiso'],'',-1,$_POST['dias_e_max']); // utilizamos los metodos
}

}

if (isset($_GET['resp']) and $_GET['resp']==5 or $_GET['resp']==6) {

        $permiso->listar_permiso($_GET['resp']); // utilizamos los metodos


}



?>