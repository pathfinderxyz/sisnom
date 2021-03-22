<?php

require('../conexion.php');

class empleado {

    private $cod_empleado;
    private $id_cargos;
    private $id_profesion;
    private $cedula;
    private $nombre;
    private $apellido;
    private $fecha_nacimiento;
    private $fecha_ingreso;
    private $direccion;
    private $telefono;



    public function buscar_empleado($cedula){
        $tipo = gettype($cedula);
        if ($tipo=='integer'){
            $query = pg_query("select * from empleado where cod_empleado=$cedula");

        }elseif ($tipo=='string') {
            $query = pg_query("select * from empleado where cedula='$cedula'");
        }
        $row = pg_fetch_row($query);
        $total = pg_num_rows($query);
        $this->cod_empleado=$row[0];
        $this->id_cargos=$row[1];
        $this->id_profesion=$row[2];
        $this->cedula=$row[3];
        $this->nombre=$row[4];
        $this->apellido=$row[5];
        $this->fecha_nacimiento=$row[6];
        $this->fecha_ingreso=$row[7];
        $this->direccion=$row[8];
        $this->telefono=$row[9];

        return $total;
    }

    public function agregar_empleado($cedula,$id_cargos,$id_profesion,$id_tipo_nomina,$id_banco,$id_unidad_administrativa,$nombre,$apellido,$fecha_nacimiento,$fecha_ingreso,$direccion,$telefono){
        $busqueda=$this->buscar_empleado($cedula);
        $cedula_empleado_nuevo = $cedula;
        $id_cargos_nueva = $id_cargos;
        $id_profesion_nueva = $id_profesion;
        $id_tipo_nomina_nueva = $id_tipo_nomina;
        $id_banco_nueva = $id_banco;
        $id_unidad_administrativa_nueva=$id_unidad_administrativa;
        $nombre_nueva = $nombre;
        $apellido_nueva = $apellido;
        $fecha_nacimiento_nueva = $fecha_nacimiento;
        $fecha_ingreso_nueva = $fecha_ingreso;
        $direccion_nueva = $direccion;
        $telefono_nueva = $telefono;




        if ($busqueda>=1) {
            echo json_encode(array(
                "existe"=> "Este Empleado con esta Cedula Ya Existe",
                ));
        }else{
            $query = pg_query("INSERT INTO empleado (cod_empleado,id_cargos,id_profesion,id_tipo_nomina,id_banco,id_unidad_administrativa,cedula,nombres,apellidos,fecha_nacimiento,fecha_ingreso,direccion,telefonos) VALUES (COALESCE(((SELECT max(cod_empleado) from empleado)+1),1),$id_cargos_nueva,$id_profesion_nueva,$id_tipo_nomina_nueva,$id_banco_nueva,$id_unidad_administrativa_nueva,'$cedula_empleado_nuevo','$nombre_nueva','$apellido_nueva','$fecha_nacimiento_nueva','$fecha_ingreso_nueva','$direccion_nueva','$telefono_nueva')");
            echo json_encode(array(
                "existe"=> "Registrado",
                ));            
        }

    }

    public function modificar_empleado($cedula,$id_cargos,$id_profesion,$id_tipo_nomina,$id_banco,$id_unidad_administrativa,$nombre,$apellido,$fecha_nacimiento,$fecha_ingreso,$direccion,$telefono){
        $busqueda=$this->buscar_empleado($cedula);
        $actualizacion_id_cargos = $id_cargos;
        $actualizacion_id_profesion = $id_profesion;
        $actualizacion_id_tipo_nomina=$id_tipo_nomina;
        $actualizacion_id_banco=$id_banco;
        $actualizacion_id_unidad_administrativa=$id_unidad_administrativa;
        $actualizacion_nombre = $nombre;
        $actualizacion_apellido = $apellido;
        $actualizacion_fecha_nacimiento = $fecha_nacimiento;
        $actualizacion_fecha_ingreso = $fecha_ingreso;
        $actualizacion_direccion = $direccion;
        $actualizacion_telefono = $telefono;

        if ($busqueda>=1) {

            if ($actualizacion_id_cargos > 0) {
                $query = pg_query("UPDATE empleado set id_cargos='$actualizacion_id_cargos' where cedula='$cedula'");
                echo json_encode(array(
                    "existe"=> "SI",
                    "cargo"=>"Actualizado"
                    ));
            }
            if ($actualizacion_id_profesion > 0) {
                $query = pg_query("UPDATE empleado set id_profesion='$actualizacion_id_profesion' where cedula='$cedula'");

                echo json_encode(array(
                    "existe"=> "SI",
                    "profesion"=>"Actualizado"
                    ));


            }
            if ($actualizacion_id_tipo_nomina > 0) {
                $query = pg_query("UPDATE empleado set id_tipo_nomina='$actualizacion_id_tipo_nomina' where cedula='$cedula'");
                echo json_encode(array(
                    "existe"=> "SI",
                    "tipo_nomina"=>"Actualizado"
                    ));

            }
            if ($actualizacion_id_banco > 0) {
                $query = pg_query("UPDATE empleado set id_banco='$actualizacion_id_banco' where cedula='$cedula'");
                echo json_encode(array(
                    "existe"=> "SI",
                    "banco"=>"Actualizado"
                    ));
            }
            if ($actualizacion_id_unidad_administrativa > 0) {
                $query = pg_query("UPDATE empleado set id_unidad_administrativa='$actualizacion_id_unidad_administrativa' where cedula='$cedula'");

                echo json_encode(array(
                    "existe"=> "SI",
                    "unidad_administrativa"=>"Actualizado"
                    ));


            }
            if ($actualizacion_nombre != '') {
                $query = pg_query("UPDATE empleado set nombres='$actualizacion_nombre' where cedula='$cedula'");

                echo json_encode(array(
                    "existe"=> "SI",
                    "nombre"=>"Actualizado"
                    ));

            }
            if ($actualizacion_apellido != '') {
                $query = pg_query("UPDATE empleado set apellidos='$actualizacion_apellido' where cedula='$cedula'");

                echo json_encode(array(
                    "existe"=> "SI",
                    "apellidos"=>"Actualizado"
                    ));

            }
            if ($actualizacion_fecha_nacimiento != '') {
                $query = pg_query("UPDATE empleado set fecha_nacimiento='$actualizacion_fecha_nacimiento' where cedula='$cedula'");
                echo json_encode(array(
                    "existe"=> "SI",
                    "fecha_n"=>"Actualizado"
                    ));
            }
            if ($actualizacion_fecha_ingreso != '') {
                $query = pg_query("UPDATE empleado set fecha_ingreso='$actualizacion_fecha_ingreso' where cedula='$cedula'");

                echo json_encode(array(
                    "existe"=> "SI",
                    "fecha_i"=>"Actualizado"
                    ));

            }
            if ($actualizacion_direccion != '') {
                $query = pg_query("UPDATE empleado set direccion='$actualizacion_direccion' where cedula='$cedula'");

                echo json_encode(array(
                    "existe"=> "SI",
                    "direccion"=>"Actualizado"
                    ));


            }
            if ($actualizacion_telefono != '') {
                $query = pg_query("UPDATE empleado set telefonos='$actualizacion_telefono' where cedula='$cedula'");
                echo json_encode(array(
                    "existe"=> "SI",
                    "telefono"=>"Actualizado"
                    ));                    
            }

        }else{



            echo json_encode(array(
                "existe"=> "NO")
            );



        }
    }

    public function eliminar_empleado($cod_empleado){
        $c_e = (int) $cod_empleado;
        $busqueda=$this->buscar_empleado($c_e);
        $cedula_empleado_nuevo = $c_e;

        if ($busqueda>=1) {
            $query = pg_query("DELETE FROM empleado WHERE cod_empleado=$c_e");
            echo json_encode(array(
                "existe"=> "Empleado Eliminado"
                ));              
        }else{

            echo json_encode(array(
                "existe"=> "Este Empleado NO Existe"
                ));              
        }
    }

    public function listar_empleado($resp){

         
        $query = pg_query("SELECT * FROM l_empleado order by cedula");
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json
            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal\" onClick=\"editar($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';
            $ver='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_ver\" onClick=\"ver($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Ver\"><i class=\"fa fa-eye\"></i></button>';
            $eliminar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" onClick=\"eliminar($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Eliminar\"><i class=\"fa fa-ban\"></i></button>';
            $ver_hijo='<button type=\"button\" class=\"btn btn-info btn-xs\" data-toggle=\"modal\" href=\"#modal_ver_hijo\" style=\"margin:4px\" onClick=\"ver_hijo($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Ver Hijos\"><i class=\"fa fa-child\"></i></button>';

            $tabla.='{"cod_empleado":"'.$row[0].'","cedula":"'.$row[1].'","nombres":"'.$row[2].'","apellidos":"'.$row[3].'","fecha_nacimiento":"'.$row[4].'","fecha_ingreso":"'.$row[5].'","acciones":"'.$ver.$eliminar.$editar.$ver_hijo.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';




           



    }

    public function mostrar_empleado_json($cod_empleado){

        //fucnion para el editable del datatable 

        $query = pg_query("SELECT cod_empleado, cedula, nombres, apellidos, fecha_nacimiento, fecha_ingreso, 
           edad, antiguedad, direccion, telefonos, cantidad_hijos, id_cargos, 
           cargo, id_profesion, profesion, id_tipo_nomina, tipo_nomina, 
           id_banco, nombre_banco, id_unidad_administrativa, unidad_administrativa
           FROM l_empleado where cod_empleado= '$cod_empleado' order by cedula");
        $total = pg_num_rows($query);

           $empleado_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $cod_empleado=$row['cod_empleado'];
            $cedula=$row['cedula'];
            $nombres=$row['nombres'];
            $apellidos=$row['apellidos'];
            $fecha_nacimiento=$row['fecha_nacimiento'];
            $fecha_ingreso=$row['fecha_ingreso'];
            $edad=$row['edad'];
            $antiguedad=$row['antiguedad'];
            $direccion=$row['direccion'];
            $telefonos=$row['telefonos'];
            $cantidad_hijos=$row['cantidad_hijos'];
            $id_cargos=$row['id_cargos'];
            $cargo=$row['cargo'];
            $id_profesion=$row['id_profesion'];
            $profesion=$row['profesion'];
            $id_tipo_nomina=$row['id_tipo_nomina'];
            $tipo_nomina=$row['tipo_nomina'];
            $id_banco=$row['id_banco'];
            $nombre_banco=$row['nombre_banco'];
            $id_unidad_administrativa=$row['id_unidad_administrativa'];
            $unidad_administrativa=$row['unidad_administrativa'];

            $empleado_a[] = array(

                'cod_empleado'=> $cod_empleado,
                'cedula'=> $cedula,
                'nombres'=> $nombres,
                'apellidos'=> $apellidos,
                'fecha_nacimiento'=> $fecha_nacimiento,
                'fecha_ingreso' => $fecha_ingreso,
                'edad' => $edad,
                'antiguedad' => $antiguedad,
                'direccion' => $direccion,
                'telefonos' => $telefonos,
                'cantidad_hijos' => $cantidad_hijos,
                'id_cargos' => $id_cargos,
                'cargo' => $cargo,
                'id_profesion' => $id_profesion,
                'profesion' => $profesion,
                'id_tipo_nomina' => $id_tipo_nomina,
                'tipo_nomina' => $tipo_nomina,
                'id_banco' => $id_banco,
                'nombre_banco' => $nombre_banco,
                'id_unidad_administrativa' => $id_unidad_administrativa,
                'unidad_administrativa' => $unidad_administrativa



                );

}
//Creamos el JSON
$json_string = json_encode($empleado_a);
echo $json_string; 

}

}


$empleado = new empleado;

//$empleado->modificar_empleado('12123321',0,0,0,0,0,0,'Milagros del Valle','Cortesia Rojas','','','',''); // utilizamos los metodos
//$empleado->eliminar_empleado(1); // utilizamos los metodos
//$empleado->agregar_empleado('12123321',3,4,4,2,10,'Milagros','Cortesia','1954-04-17','1989-01-01','Porlamar','04248809870'); // utilizamos los metodos
//echo $empleado->buscar_empleado('19682712'); // utilizamos los metodos

if (isset($_GET['resp']) and $_GET['resp']==1 or $_GET['resp']==6) {
$empleado->listar_empleado($_GET['resp']); // utilizamos los metodos
}
if (isset($_GET['resp']) and $_GET['resp']==2) {
    $empleado->mostrar_empleado_json($_POST['cod_empleado']);
}

if (isset($_GET['resp']) and $_GET['resp']==3) {

    if (isset($_POST['cedula']) and isset($_POST['cargo'])) {
        $empleado->modificar_empleado($_POST['cedula'],$_POST['cargo'],0,0,0,0,'','','','','',''); // utilizamos los metodos
    }

    if (isset($_POST['cedula']) and isset($_POST['profesion'])) {
        $empleado->modificar_empleado($_POST['cedula'],0,$_POST['profesion'],0,0,0,0,'','','','','',''); // utilizamos los metodos
    }

    if (isset($_POST['cedula']) and isset($_POST['tipo_nomina'])) {
        $empleado->modificar_empleado($_POST['cedula'],0,0,$_POST['tipo_nomina'],0,0,'','','','','',''); // utilizamos los metodos
    }

    if (isset($_POST['cedula']) and isset($_POST['banco'])) {
        $empleado->modificar_empleado($_POST['cedula'],0,0,0,$_POST['banco'],0,'','','','','',''); // utilizamos los metodos
    }

    if (isset($_POST['cedula']) and isset($_POST['unidad_administrativa'])) {
        $empleado->modificar_empleado($_POST['cedula'],0,0,0,0,$_POST['unidad_administrativa'],'','','','','',''); // utilizamos los metodos
    }

    if (isset($_POST['cedula']) and isset($_POST['nombre'])) {
        $empleado->modificar_empleado($_POST['cedula'],0,0,0,0,0,$_POST['nombre'],'','','','',''); // utilizamos los metodos
    }

    if (isset($_POST['cedula']) and isset($_POST['apellidos'])) {
        $empleado->modificar_empleado($_POST['cedula'],0,0,0,0,0,'',$_POST['apellidos'],'','','',''); // utilizamos los metodos
    }

    if (isset($_POST['cedula']) and isset($_POST['fecha_n'])) {
        $empleado->modificar_empleado($_POST['cedula'],0,0,0,0,0,'','',$_POST['fecha_n'],'','',''); // utilizamos los metodos
    }

    if (isset($_POST['cedula']) and isset($_POST['fecha_i'])) {
        $empleado->modificar_empleado($_POST['cedula'],0,0,0,0,0,'','','',$_POST['fecha_i'],'',''); // utilizamos los metodos
    }

    if (isset($_POST['cedula']) and isset($_POST['direccion'])) {
        $empleado->modificar_empleado($_POST['cedula'],0,0,0,0,0,'','','','',$_POST['direccion'],''); // utilizamos los metodos
    }

    if (isset($_POST['cedula']) and isset($_POST['telefono'])) {
        $empleado->modificar_empleado($_POST['cedula'],0,0,0,0,0,'','','','','',$_POST['telefono']); // utilizamos los metodos
    }

}

if (isset($_GET['resp']) and $_GET['resp']==4) {
    $empleado->eliminar_empleado($_POST['cod_empleado']);
}

if (isset($_GET['resp']) and $_GET['resp']==5) {
    if (isset($_POST)) {
        $empleado->agregar_empleado($_POST['cedula1'],$_POST['cargo1'],$_POST['profesion1'],$_POST['tipo_nomina1'],$_POST['banco1'],$_POST['unidad_administrativa1'],$_POST['nombre1'],$_POST['apellidos1'],$_POST['fecha_n1'],$_POST['fecha_ingreso1'],$_POST['direccion1'],$_POST['telefono1']); // utilizamos los metodos
    }
}