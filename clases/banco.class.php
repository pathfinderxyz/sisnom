<?php

require('../conexion.php');

class banco {

    private $id_banco;
    private $nombre_banco;

    public function buscar_banco($banco){

       $tipo = gettype($banco);
        if ($tipo=='integer'){
            $query = pg_query("select * from banco where id_banco=$banco");

        }elseif ($tipo=='string') {
            $query = pg_query("select * from banco where nombre_banco='$banco'");
        }

    $row = pg_fetch_row($query);
    $total = pg_num_rows($query);
    $this->id_banco=$row[0];
    $this->nombre_banco=$row[1];
        return $total;
    }

    public function agregar_banco($nombre_banco){
        $busqueda=$this->buscar_banco($nombre_banco);
        $nombre_banco_nuevo = $nombre_banco;
            
            if ($busqueda>=1) {
                echo json_encode(array(
                    "existe"=> "Ya Existe"
                    ));
            }else{
                $query = pg_query("INSERT INTO banco (id_banco,nombre_banco) VALUES (COALESCE(((SELECT max(id_banco) from banco)+1),1),'$nombre_banco_nuevo')");
                echo json_encode(array(
                    "existe"=> "Registrado"
                    ));
            }


    }

    public function modificar_banco($a,$actualizacion){
        $id_banco = (int) $a;

        $busqueda=$this->buscar_banco($id_banco);
        $nombre_banco_nuevo = $actualizacion;
            
            if ($busqueda>=1) {
                if ($nombre_banco_nuevo!='') {

                    $query = pg_query("UPDATE banco set nombre_banco='$nombre_banco_nuevo' where id_banco=$id_banco");
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

    public function eliminar_banco($nombre_banco){
        $c_e = (int) $nombre_banco;

        $busqueda=$this->buscar_banco($c_e);
        $nombre_banco_nuevo = $c_e;
            
            if ($busqueda>=1) {
                $query = pg_query("DELETE FROM banco WHERE id_banco=$c_e");

                echo json_encode(array(
                    "existe" => "Eliminado"
                    ));

            }else{

                echo json_encode(array(
                    "existe"=> "No Existe"
                    ));
            }
    }

    public function listar_banco($resp){
            
        $query = pg_query("SELECT * FROM banco");
        $total = pg_num_rows($query);

           $banco_a = array(); //creamos un array
 
if ($resp==1) {

        while($row = pg_fetch_array($query))
        { 
            $id=$row['id_banco'];
            $banco=$row['nombre_banco'];

            
         
            $banco_a[] = array("id"=> $id,
                                "nombre_banco"=> $banco
                                            );
         
        }

}elseif ($resp==2) {
        while($row = pg_fetch_array($query))
                {
                    $id=$row['id_banco'];
                    $banco=$row['nombre_banco'];

                    
                 
                    $banco_a[] = array($id=> $banco);
                 
                }
    }
/*//desconectamos la base de datos
$close = mysqli_close($conexion) 
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");*/
  
 
//Creamos el JSON
$json_string = json_encode($banco_a);
echo $json_string;



    }

public function mostrar_banco(){

        $query = pg_query("SELECT * FROM banco");
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json
            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_editar_banco\" onClick=\"editar_banco($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';
            $tabla.='{"id_banco":"'.$row[0].'","nombre_banco":"'.$row[1].'","acciones":"'.$editar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }


public function mostrar_banco_json($id_banco){

        //fucnion para el editable del datatable 

        $query = pg_query("SELECT * FROM banco where id_banco= $id_banco order by id_banco");
        $total = pg_num_rows($query);

           $banco_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $id_banco=$row['id_banco'];
            $nombre_banco=$row['nombre_banco'];
            

            $banco_a[] = array(

                'id_banco'=> $id_banco,
                'nombre_banco'=> $nombre_banco



                );

}
//Creamos el JSON
$json_string = json_encode($banco_a);
echo $json_string; 

}



}


$banco = new banco;

//$banco->modificar_banco('Banco del Tesoro del Pueblo','Banco del Tesoro del Pueblo'); // utilizamos los metodos
//$banco->eliminar_banco('Banco Confederado'); // utilizamos los metodos
//$banco->agregar_banco('Banco Confederado'); // utilizamos los metodos
//$banco->buscar_banco(1); // utilizamos los metodos

if (isset($_GET['resp'])) {


if (isset($_GET['resp']) and $_GET['resp']==1 or $_GET['resp']==2) {

$banco->listar_banco($_GET['resp']); // utilizamos los metodos

}


if (isset($_GET['resp']) and $_GET['resp']==3) {
$banco->mostrar_banco();
}


if (isset($_GET['resp']) and $_GET['resp']==4) {
    if ($_POST['nombre_banco']!='') {
        $banco->agregar_banco($_POST['nombre_banco']); // utilizamos los metodos
    }

}

if (isset($_GET['resp']) and $_GET['resp']==5) {
    if ($_POST['id_banco']>0) {
        $banco->eliminar_banco($_POST['id_banco']); // utilizamos los metodos
    }

}


if (isset($_GET['resp']) and $_GET['resp']==7) {
$banco->mostrar_banco_json($_POST['id_banco']);

}

if (isset($_GET['resp']) and $_GET['resp']==6) {
    if ($_POST['banco_n']!='') {
$banco->modificar_banco($_POST['id_banco'],$_POST['banco_n']); // utilizamos los metodos
    }


}


}


?>