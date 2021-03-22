<?php

require('../conexion.php');

class usuario {

    private $id_usuario;
    private $usuario;
    private $passwd;
    private $nivel;

    public function buscar_usuario($usuario){

        $tipo = gettype($usuario);

        if ($tipo=='integer'){
    $query = pg_query("select * from usuario where id_usuario=$usuario");

        }elseif ($tipo=='string') {
    $query = pg_query("select * from usuario where usuario='$usuario'");
        }


    $row = pg_fetch_row($query);
    $total = pg_num_rows($query);
    $this->id_usuario=$row[0];
    $this->usuario=$row[1];
    $this->passwd=$row[2];
    $this->nivel=$row[3];

        return $total;
    }

    public function agregar_usuario($usuario,$passwd,$nivel){
        $busqueda=$this->buscar_usuario($usuario);
        $nombre_usuario_nuevo = $usuario;
        $passwd_nuevo= $passwd;
        $nivel_nuevo= $nivel;
            
            if ($busqueda>=1) {

                echo json_encode(array(
                    "existe"=> "Ya Existe"
                    ));

            }else{
                $query = pg_query("INSERT INTO usuario (id_usuario,usuario,passwd,nivel) VALUES (COALESCE(((SELECT max(id_usuario) from usuario)+1),1),'$nombre_usuario_nuevo','$passwd_nuevo',$nivel_nuevo)");

                echo json_encode(array(
                    "existe"=> "Registrado"
                    ));

            }


    }

    public function modificar_usuario($a,$passwd,$nivel){
        $id_usuario = (int) $a;

        $busqueda=$this->buscar_usuario($id_usuario);
        $actualizacion_passwd = $passwd;
        $actualizacion_nivel = $nivel;
            
            if ($busqueda>=1) {
                
                    if ($actualizacion_passwd != '') {
                        $query = pg_query("UPDATE usuario set passwd='$actualizacion_passwd' where id_usuario=$id_usuario");
                        
                        echo json_encode(array(
                            "existe"=> "Actualizacion de contraseña"
                            ));

                    }
                    if ($actualizacion_nivel>0) {
                        $query = pg_query("UPDATE usuario set nivel='$actualizacion_nivel' where id_usuario=$id_usuario");

                echo json_encode(array(
                    "existe"=> "Actualizacion de Nivel"
                    ));

                    }


            }else{


                echo json_encode(array(
                    "existe"=> "No Existe"
                    ));

            }
    }

    public function eliminar_usuario($usuario){

        $c_e = (int) $usuario;
        $busqueda=$this->buscar_usuario($c_e);
        $nombre_usuario_nuevo = $c_e;
            
            if ($busqueda>=1) {
                $query = pg_query("DELETE FROM usuario WHERE id_usuario=$c_e");

            echo json_encode(array(
                "existe"=> "Usuario Eliminado"
                ));  

            }else{

            echo json_encode(array(
                "existe"=> "NO Existe"
                ));  

            }
    }

    public function listar_usuario(){
            
        $query = pg_query("SELECT * FROM usuario order by nivel");
        $total = pg_num_rows($query);

            echo '<select id=\'usuario\'>';
            while ($row = pg_fetch_row($query)) {
                echo '<option value="'.$this->id_usuario=$row[0].'">'.$this->usuario=$row[1].'</option>';
            }
            echo'</select>'; 



    }

public function mostrar_usuario(){

        $query = pg_query("select * from usuario");
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json
            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_editar_usuario\" onClick=\"editar_usuario($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';
            $eliminar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" onClick=\"eliminar_usuario($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Eliminar\"><i class=\"fa fa-ban\"></i></button>';

            $tabla.='{"id_usuario":"'.$row[0].'","usuario":"'.$row[1].'","passwd":"'.$row[2].'","nivel":"'.$row[3].'","acciones":"'.$eliminar.$editar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }



    public function mostrar_usuario_json($id_usuario){

        //fucnion para el editable del datatable 

        $query = pg_query("SELECT * FROM usuario where id_usuario = $id_usuario");
        $total = pg_num_rows($query);

           $usuario_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $id_usuario=$row['id_usuario'];
            $usuario=$row['usuario'];
            $passwd=$row['passwd'];
            $nivel=$row['nivel'];


            

            $usuario_a[] = array(

                'id_usuario'=> $id_usuario,
                'usuario'=> $usuario,
                'passwd' => $passwd,
                'nivel' => $nivel

                );

}
//Creamos el JSON
$json_string = json_encode($usuario_a);
echo $json_string; 

}

}


$usuario = new usuario;

//$usuario->modificar_usuario('Alcalde','Alcalde','',0); // utilizamos los metodos
//$usuario->eliminar_usuario('Alcalde'); // utilizamos los metodos
//$usuario->agregar_usuario('admin','admin',1); // utilizamos los metodos
//echo $usuario->buscar_usuario('Alcalde'); // utilizamos los metodos
//$usuario->listar_usuario(); // utilizamos los metodos

if (isset($_GET['resp'])) {

if (isset($_GET['resp']) and $_GET['resp']==1) {
$usuario->mostrar_usuario();
}
}

if ($_GET['resp']==2 and isset($_GET['resp'])) {

if ($_POST['nombre_usuario']!='' and $_POST['passwd']!='' and $_POST['tipo_cuenta']!='' ) {
$usuario->agregar_usuario($_POST['nombre_usuario'],$_POST['passwd'],$_POST['tipo_cuenta']); // utilizamos los metodos

}
}

if ($_GET['resp']==3 and isset($_GET['resp'])) {


    $usuario->eliminar_usuario($_POST['codigo']); // utilizamos los metodos

}

if ($_GET['resp']==4 and isset($_GET['resp'])) {


    $usuario->mostrar_usuario_json($_POST['id_usuario']); // utilizamos los metodos

}

if ($_GET['resp']==5 and isset($_GET['resp'])) {



if ($_POST['tipo_e']>0 and isset($_POST['tipo_e'])) {

$usuario->modificar_usuario($_POST['id_usuario'],'',$_POST['tipo_e']); // utilizamos los metodos

}

}

if ($_GET['resp']==82 and isset($_GET['resp'])) {
if ($_POST['passwd_e']!='' and isset($_POST['passwd_e'])) {
$usuario->modificar_usuario($_POST['id_usuario'],$_POST['passwd_e'],0); // utilizamos los metodos
}
}




?>