<?php

require('../conexion.php');

class hijo_empleado {

    private $cod_hijo;
    private $cod_empleado;
    private $nivel_de_estudio;
    private $cedula_fecha_nacimiento;
    private $nombres;
    private $apellidos;


    public function buscar_hijo($cod_hijo){
        $query = pg_query("select * from hijo_empleado where cod_hijo='$cod_hijo'");
        $row = pg_fetch_row($query);
        $total = pg_num_rows($query);
        $this->cod_hijo=$row[0];
        $this->cod_empleado=$row[1];
        $this->nivel_de_estudio=$row[2];
        $this->cedula_fecha_nacimiento=$row[3];
        $this->nombres=$row[4];
        $this->apellidos=$row[5];

        return $total;
    }

    public function agregar_hijo($cod_empleado,$nivel_de_estudio,$cedula_fecha_nacimiento,$nombres,$apellidos){
        $cod_empleado_nueva = $cod_empleado;
        $nivel_de_estudio_nueva = $nivel_de_estudio;
        $cedula_fecha_nacimiento_nueva = $cedula_fecha_nacimiento;
        $nombres_nueva = $nombres;
        $apellidos_nueva = $apellidos;


        $query = pg_query("INSERT INTO hijo_empleado (cod_hijo,cod_empleado,nivel_estudio,cedula_fecha_nacimiento,nombres,apellidos) VALUES (COALESCE(((SELECT max(cod_hijo) from hijo_empleado)+1),1),$cod_empleado_nueva,$nivel_de_estudio_nueva,'$cedula_fecha_nacimiento_nueva','$nombres_nueva','$apellidos_nueva')");
        echo json_encode(array(
            "existe"=> "Registrado"
            ));   

    }

    public function modificar_hijo($cod_hijo,$nivel_de_estudio,$cedula_fecha_nacimiento,$nombres,$apellidos){
        $busqueda=$this->buscar_hijo($cod_hijo);
        $actualizacion_nivel_de_estudio = $nivel_de_estudio;
        $actualizacion_cedula_fecha_nacimiento = $cedula_fecha_nacimiento;
        $actualizacion_nombres = $nombres;
        $actualizacion_apellidos = $apellidos;

        if ($busqueda>=1) {

            if ($actualizacion_nivel_de_estudio>0) {
                $query = pg_query("UPDATE hijo_empleado set nivel_estudio='$actualizacion_nivel_de_estudio' where cod_hijo='$cod_hijo'");
                echo json_encode(array(
                "existe"=> "Actualizacion del Nivel de estudio del Hijo Exitoso"
                ));   
            }

            if ($actualizacion_cedula_fecha_nacimiento!='') {
                $query = pg_query("UPDATE hijo_empleado set cedula_fecha_nacimiento='$actualizacion_cedula_fecha_nacimiento' where cod_hijo='$cod_hijo'");
                echo json_encode(array(
                "existe"=> "Actualizacion Exitoso"
                )); 
            }

            if ($actualizacion_nombres!='') {
                $query = pg_query("UPDATE hijo_empleado set nombres='$actualizacion_nombres' where cod_hijo='$cod_hijo'");
                echo json_encode(array(
                "existe"=> "Actualizacion del Nombre del Hijo Exitoso"
                ));             
            }

            if ($actualizacion_apellidos!='') {
                $query = pg_query("UPDATE hijo_empleado set apellidos='$actualizacion_apellidos' where cod_hijo='$cod_hijo'");
                echo json_encode(array(
                "existe"=> "Actualizacion del Apellido del Hijo Exitoso"
                )); 
            }

        }else{
                echo json_encode(array(
                "existe"=> "No Existe"
                )); 
        }
    }

    public function eliminar_hijo($cod_hijo){
        $busqueda=$this->buscar_hijo($cod_hijo);
        $cod_hijo_nuevo = $cod_hijo;

        if ($busqueda>=1) {
            $query = pg_query("DELETE FROM hijo_empleado WHERE cod_hijo='$cod_hijo'");
            echo json_encode(array(
                "existe"=> "Eliminado"
                ));   
        }else{

            echo json_encode(array(
                "existe"=> "No existe"
                ));  
        }
    }

    public function listar_hijo($cod_empleado){

        $query = pg_query("select * from hijo_empleado_v where cod_empleado=$cod_empleado");
        $total = pg_num_rows($query);

        $i=0;
        $tabla = "";

        while($row = pg_fetch_array($query))
        { 
            //////botones del datatable para crear en el json
            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_editar_hijo\" onClick=\"editar_hijo($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';
            $eliminar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" onClick=\"eliminar_hijo($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Eliminar\"><i class=\"fa fa-ban\"></i></button>';

            $tabla.='{"cod_hijo":"'.$row[0].'","nombres":"'.$row[6].'","apellidos":"'.$row[7].'","cedula_fecha_nacimiento":"'.$row[8].'","profesion":"'.$row[5].'","id_profesion":"'.$row[4].'","acciones":"'.$eliminar.$editar.'"},';       
            $i++;

        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }


    public function mostrar_hijo_json($cod_hijo){

        //fucnion para el editable del datatable 

        $query = pg_query("SELECT * FROM hijo_empleado_v where cod_hijo= $cod_hijo");
        $total = pg_num_rows($query);

           $hijo_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $cod_hijo=$row['cod_hijo'];
            $cod_empleado=$row['cod_empleado'];
            $nombre_padre=$row['nombre_padre'];
            $apellido_padre=$row['apellido_padre'];
            $nivel_estudio=$row['nivel_estudio'];
            $profesion=$row['profesion'];
            $nombres=$row['nombres'];
            $apellidos=$row['apellidos'];
            $cedula_fecha_nacimiento=$row['cedula_fecha_nacimiento'];

            $hijo_a[] = array(

                'cod_hijo'=> $cod_hijo,
                'cod_empleado'=> $cod_empleado,
                'nombre_padre'=> $nombre_padre,
                'apellido_padre'=> $apellido_padre,
                'nivel_estudio'=> $nivel_estudio,
                'profesion' => $profesion,
                'nombres' => $nombres,
                'apellidos' => $apellidos,
                'cedula_fecha_nacimiento' => $cedula_fecha_nacimiento
                );

        }
//Creamos el JSON
        $json_string = json_encode($hijo_a);
        echo $json_string; 

    }


}


$hijo_empleado = new hijo_empleado;

//$hijo_empleado->modificar_hijo(2,3,'19682712','Mia','Cortesia'); // utilizamos los metodos
//$hijo_empleado->eliminar_hijo(2); // utilizamos los metodos
//$hijo_empleado->agregar_hijo(1,1,'2016-10-28','Mia','Cortesia'); // utilizamos los metodos
//echo $hijo_empleado->buscar_hijo(2); // utilizamos los metodos
/*$hijo_empleado->listar_hijo(1); // utilizamos los metodos
*/

if (isset($_GET['resp']) and $_GET['resp']==1) {
    if ($_POST['profesion2']!='' and $_POST['fecha_n_cedula']!='' and $_POST['nombre2']!='' and $_POST['apellidos2']!='' ) {
$hijo_empleado->agregar_hijo($_POST['cod_empleado'],$_POST['profesion2'],$_POST['fecha_n_cedula'],$_POST['nombre2'],$_POST['apellidos2']); // utilizamos los metodos
}
}

if (isset($_GET['cod_empleado'])) {
    if ($_GET['cod_empleado']!='') {
$hijo_empleado->listar_hijo($_GET['cod_empleado']); // utilizamos los metodos
}
}

if (isset($_GET['resp']) and $_GET['resp']==2) {
$hijo_empleado->eliminar_hijo($_POST['codigo_hijo']); // utilizamos los metodos

}

if (isset($_GET['resp']) and $_GET['resp']==3) {
$hijo_empleado->mostrar_hijo_json($_POST['cod_hijo']); // utilizamos los metodos

}

if (isset($_GET['resp']) and $_GET['resp']==4) {


    if (isset($_POST['cod_hijo']) and isset($_POST['apellidos_h'])) {
        $hijo_empleado->modificar_hijo($_POST['cod_hijo'],0,'','',$_POST['apellidos_h']); // utilizamos los metodos
    }

    if (isset($_POST['cod_hijo']) and isset($_POST['nombres_h'])) {
        $hijo_empleado->modificar_hijo($_POST['cod_hijo'],0,'',$_POST['nombres_h'],''); // utilizamos los metodos
    }

    if (isset($_POST['cod_hijo']) and isset($_POST['profesion_h'])) {
        $hijo_empleado->modificar_hijo($_POST['cod_hijo'],$_POST['profesion_h'],'','',''); // utilizamos los metodos
    }

    if (isset($_POST['cod_hijo']) and isset($_POST['cedula_fecha_nacimiento_h'])) {
        $hijo_empleado->modificar_hijo($_POST['cod_hijo'],0,$_POST['cedula_fecha_nacimiento_h'],'',''); // utilizamos los metodos
    }


}

