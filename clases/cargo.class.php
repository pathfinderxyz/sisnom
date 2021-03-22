<?php

require('../conexion.php');

class cargo {

    private $id_cargo;
    private $cargo;

    public function buscar_cargo($cargo){

       $tipo = gettype($cargo);

        if ($tipo=='integer'){
    $query = pg_query("select * from cargo where id_cargos=$cargo");

        }elseif ($tipo=='string') {
    $query = pg_query("select * from cargo where cargo='$cargo'");

        }

    $row = pg_fetch_row($query);
    $total = pg_num_rows($query);
    $this->id_cargo=$row[0];
    $this->nombre_cargo=$row[1];
        return $total;
    }

    public function agregar_cargo($cargo){
        $busqueda=$this->buscar_cargo($cargo);
        $nombre_cargo_nuevo = $cargo;
            
            if ($busqueda>=1) {

                echo json_encode(array(
                    "existe"=> "Ya Existe"
                    ));

            }else{
                $query = pg_query("INSERT INTO cargo (id_cargos,cargo) VALUES (COALESCE(((SELECT max(id_cargos) from cargo)+1),1),'$nombre_cargo_nuevo')");

                echo json_encode(array(
                    "existe"=> "Registrado"
                    ));

            }


    }

    public function modificar_cargo($a,$actualizacion){
        $id_cargo = (int) $a;

        $busqueda=$this->buscar_cargo($id_cargo);
        $nombre_cargo_nuevo = $actualizacion;
            
            if ($busqueda>=1) {
                

                if ($nombre_cargo_nuevo!='') {

                    $query = pg_query("UPDATE cargo set cargo='$nombre_cargo_nuevo' where id_cargos=$id_cargo");
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

    public function eliminar_cargo($cargo){
        $busqueda=$this->buscar_cargo($cargo);
        $nombre_cargo_nuevo = $cargo;
            
            if ($busqueda>=1) {
                $query = pg_query("DELETE FROM cargo WHERE cargo='$nombre_cargo_nuevo'");
                echo "Eliminar Exitoso";
            }else{

                echo "No Existe";
            }
    }

    public function listar_cargo($resp){
            
        $query = pg_query("SELECT * FROM cargo");
        $total = pg_num_rows($query);

           $cargo_a = array(); //creamos un array
 
 if ($resp==1) {

        while($row = pg_fetch_array($query))
        { 
            $id=$row['id_cargos'];
            $cargo=$row['cargo'];

            
         
            $cargo_a[] = array("id"=> $id,
                                "cargo"=> $cargo
                                            );
         
        }

}elseif ($resp==2) {
        while($row = pg_fetch_array($query))
                {
                    $id=$row['id_cargos'];
                    $cargo=$row['cargo'];

                    
                 
                    $cargo_a[] = array($id=> $cargo);
                 
                }
    }

/*//desconectamos la base de datos
$close = mysqli_close($conexion) 
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");*/
  
 
//Creamos el JSON
$json_string = json_encode($cargo_a);
echo $json_string;



    }




    public function mostrar_cargo(){

        $query = pg_query("SELECT * FROM cargo");
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json
            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_editar_cargo\" onClick=\"editar_cargo($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';
            $tabla.='{"id_cargo":"'.$row[0].'","nombre_cargo":"'.$row[1].'","acciones":"'.$editar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }


public function mostrar_cargo_json($id_cargo){

        //fucnion para el editable del datatable 

        $query = pg_query("SELECT * FROM cargo where id_cargos = $id_cargo order by id_cargos");
        $total = pg_num_rows($query);

           $cargo_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $id_cargo=$row['id_cargos'];
            $nombre_cargo=$row['cargo'];
            

            $cargo_a[] = array(

                'id_cargo'=> $id_cargo,
                'nombre_cargo'=> $nombre_cargo



                );

}
//Creamos el JSON
$json_string = json_encode($cargo_a);
echo $json_string; 

}


}


$cargo = new cargo;

//$cargo->modificar_cargo('Alcalde Bolivariano','Alcade'); // utilizamos los metodos
//$cargo->eliminar_cargo('Semanalmente'); // utilizamos los metodos
//$cargo->agregar_cargo('Asistente Administrativo'); // utilizamos los metodos
//echo $cargo->buscar_cargo('Arquitecto'); // utilizamos los metodos

if (isset($_GET['resp']) and $_GET['resp']==1 or $_GET['resp']==2) {
$cargo->listar_cargo($_GET['resp']); // utilizamos los metodos
}

if (isset($_GET['resp']) and $_GET['resp']==3) {
$cargo->mostrar_cargo();
}

if (isset($_GET['resp']) and $_GET['resp']==4) {
   if ($_POST['nombre_cargo']!='') {
      $cargo->agregar_cargo($_POST['nombre_cargo']); // utilizamos los metodos
  }

}


if (isset($_GET['resp']) and $_GET['resp']==5) {

$cargo->modificar_cargo($_POST['id_cargo'],$_POST['cargo_n']); // utilizamos los metodos


}

if (isset($_GET['resp']) and $_GET['resp']==6) {
   if ($_POST['id_cargo']!='') {
$cargo->mostrar_cargo_json($_POST['id_cargo']); // utilizamos los metodos


  }

}


?>