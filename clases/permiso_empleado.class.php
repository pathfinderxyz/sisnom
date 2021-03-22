<?php

require('../conexion.php');

class permiso_empleado {

    private $id_permiso;
    private $cod_empleado;
    private $fecha_inicio;
    private $fecha_final;

    public function buscar_permiso_empleado($fecha_inicio,$cod_empleado){

                $tipo = gettype($cod_empleado);

        if ($tipo=='integer'){
    $query = pg_query("select * from permiso_tabla where fecha_inicio='$fecha_inicio' and cod_empleado=$cod_empleado");

        }elseif ($tipo=='string') {
    $query = pg_query("select * from permiso_tabla where fecha_inicio='$fecha_inicio' and cedula='$cod_empleado'");

        }

    $row = pg_fetch_row($query);
    $total = pg_num_rows($query);
    $this->id_permiso=$row[0];
    $this->cod_empleado=$row[1];
    $this->fecha_inicio=$row[2];
    $this->fecha_final=$row[3];

        return $total;
    }

    public function agregar_permiso_empleado($cedula,$id_permiso,$fecha_inicio,$fecha_final){
        $busqueda=$this->buscar_permiso_empleado($fecha_inicio,$cedula);
        $id_permiso_nuevo = $id_permiso;
        $cedula_nuevo = $cedula;
        $fecha_inicio_nuevo= $fecha_inicio;
        $fecha_final_nuevo= $fecha_final;
            
            if ($busqueda>=1) {

            echo json_encode(array(
                "existe" => "Este Permiso ya existe"
                )); 

            }else{

            $query2= pg_query("select cod_empleado from l_empleado where cedula='$cedula' ");
            $row2 = pg_fetch_row($query2);
            $cod_empleado_nuevo=$row2[0];

            if ($cod_empleado_nuevo==null) {
                
            echo json_encode(array(
                "existe" => "Empleado no Existe"
                )); 
                
                }else{
                $query = pg_query("INSERT INTO permiso_empleado (id_permiso,cod_empleado,fecha_inicio,fecha_final) VALUES ($id_permiso_nuevo,$cod_empleado_nuevo,'$fecha_inicio_nuevo','$fecha_final_nuevo')");

                        echo json_encode(array(
                            "existe" => "Registrado"
                            )); 

                }



            }


    }

    public function modificar_permiso_empleado($id_permiso,$a,$fecha_inicio,$fecha_final){
            $cod_empleado = (int) $a;

        $busqueda=$this->buscar_permiso_empleado($fecha_inicio,$cod_empleado);
        $id_permiso_nuevo = $id_permiso;
        $actualizacion_fecha_final = $fecha_final;

            
            if ($busqueda>=1) {
                
                    if ($id_permiso_nuevo>0) {
                        $query = pg_query("UPDATE permiso_empleado set id_permiso=$id_permiso_nuevo where cod_empleado=$cod_empleado and fecha_inicio='$fecha_inicio'");
                                    echo json_encode(array(
                                        "existe" => "Permiso Actualizado"
                                        ));
                    }

                    if ($actualizacion_fecha_final !='') {
                        $query = pg_query("UPDATE permiso_empleado set fecha_final='$actualizacion_fecha_final' where cod_empleado=$cod_empleado and fecha_inicio='$fecha_inicio'");

                                    echo json_encode(array(
                                        "existe" => "Feccha Final Actualizado"
                                        ));

                    }


            }else{

                        echo json_encode(array(
                        "existe" => "No Existe"
                        ));

            }
    }

    public function eliminar_permiso_empleado($id_permiso,$a,$fecha_inicio){
                $cod_empleado = (int) $a;

        $busqueda=$this->buscar_permiso_empleado($fecha_inicio,$cod_empleado);            
            if ($busqueda>=1) {
        $query = pg_query("DELETE FROM permiso_empleado WHERE cod_empleado=$cod_empleado and fecha_inicio='$fecha_inicio'");
            echo json_encode(array(
                "existe" => "Permiso Eliminado"
                )); 


            }else{

            echo json_encode(array(
                "existe" => "No Existe"
                )); 


            }
    }

    public function listar_permiso_empleado(){
            
        $query = pg_query("select * from permiso_tabla");
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {

                if ($row[7]>0) {
                    $var = '<span class=\"label label-warning\">Sin Finalizar</span>';
                }else{
                    $var ='<span class=\"label label-success\">Finalizado</span>';
                }

            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:1px\" data-toggle=\"modal\" href=\"#modal_editar_permiso_empleado\" onClick=\"editar_permiso_empleado('.$row[0].','.$row[2].','.'\''.$row[5].'\''.');\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';
            $eliminar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:1px\" onClick=\"eliminar_permiso_empleado('.$row[0].','.$row[2].','.'\''.$row[5].'\''.');\" title=\"Eliminar\"><i class=\"fa fa-ban\"></i></button>';            

            //////botones del datatable para crear en el json
            
            $tabla.='{"id_permiso":"'.$row[0].'","permiso":"'.$row[1].'","cod_empleado":"'.$row[2].'","cedula":"'.$row[3].'","nombre":"'.$row[4].'","fecha_inicio":"'.$row[5].'","fecha_final":"'.$row[6].'","estado":"'.$var.'","acciones":"'.$editar.$eliminar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';  



    }


   public function mostrar_permiso_empleado_json($cod_empleado,$fecha_inicio){

        //fucnion para el editable del datatable 

        $query = pg_query("select * from permiso_tabla where cod_empleado=$cod_empleado and fecha_inicio='$fecha_inicio'");
        $total = pg_num_rows($query);

           $permiso_empleado_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $id_permiso=$row['id_permiso'];
            $permiso=$row['permiso'];
            $cod_empleado=$row['cod_empleado'];
            $cedula=$row['cedula'];
            $nombres=$row['nombres'];
            $fecha_inicio=$row['fecha_inicio'];
            $fecha_final=$row['fecha_final'];
            $finalizado=$row['finalizado'];

            $permiso_empleado_a[] = array(

                'id_permiso'=> $id_permiso,
                'permiso'=> $permiso,
                'cod_empleado'=> $cod_empleado,
                'cedula'=> $cedula,
                'nombres'=> $nombres,
                'fecha_inicio'=> $fecha_inicio,
                'fecha_final'=> $fecha_final,
                'finalizado'=> $finalizado

                );

            }
//Creamos el JSON
$json_string = json_encode($permiso_empleado_a);
echo $json_string; 

}
 
}


$permiso_empleado = new permiso_empleado;

//$permiso_empleado->modificar_permiso_empleado(1,'2016-01-01',0,0,'',''); // utilizamos los metodos
//$permiso_empleado->eliminar_permiso_empleado(12,1,'2016-01-01'); // utilizamos los metodos
//$permiso_empleado->agregar_permiso_empleado(12,1,'2016-02-01','2016-02-01'); // utilizamos los metodos
//echo $permiso_empleado->buscar_permiso_empleado('2016-02-01',1); // utilizamos los metodos



if (isset($_GET['resp']) and $_GET['resp']==1) {
    $permiso_empleado->listar_permiso_empleado(); // utilizamos los metodos
}

if (isset($_GET['resp']) and $_GET['resp']==2) {

    $permiso_empleado->eliminar_permiso_empleado($_POST['id_partida'],$_POST['cod_empleado'],$_POST['fecha_inicio']); // utilizamos los metodos

}

if (isset($_GET['resp']) and $_GET['resp']==3) {

if (isset($_POST)) {

    $permiso_empleado->agregar_permiso_empleado($_POST['cedula_p'],$_POST['permiso_empleado2'],$_POST['fecha_inicio_p'],$_POST['fecha_final_p']); // utilizamos los metodos


}

}

if (isset($_GET['resp']) and $_GET['resp']==4) {

if (isset($_POST['cod_empleado']) and isset($_POST['fecha_inicio'])) {
$permiso_empleado->mostrar_permiso_empleado_json($_POST['cod_empleado'],$_POST['fecha_inicio']);
}
}

if (isset($_GET['resp']) and $_GET['resp']==5) {

if (isset($_POST['id_permiso']) and $_POST['id_permiso']>0) {
    $permiso_empleado->modificar_permiso_empleado($_POST['id_permiso'],$_POST['cod_empleado'],$_POST['fecha_inicio'],'');
}

if (isset($_POST['fecha_final_n']) and $_POST['fecha_final_n']!='') {
$permiso_empleado->modificar_permiso_empleado(0,$_POST['cod_empleado'],$_POST['fecha_inicio'],$_POST['fecha_final_n']); // utilizamos los metodos
}
}
?>