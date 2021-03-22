<?php

require('../conexion.php');

class formula_partida {

    private $id_formula;
    private $cod_partida;
    private $descripcion_partida;
    private $descripcion_formula;
    private $formula;

    public function buscar_formula_partida($formula_partida,$cod_partida){

        $tipo = gettype($formula_partida);

        if ($tipo=='integer'){
            $query = pg_query("select * from formula_partida where id_formula=$formula_partida");
        }elseif ($tipo=='string') {
            $query = pg_query("select * from formula_partida where formula='$formula_partida' and cod_partida=$cod_partida");
        }


        $row = pg_fetch_row($query);
        $total = pg_num_rows($query);
        $this->id_formula=$row[0];
        $this->cod_partida=$row[1];
        $this->descripcion_partida=$row[2];
        $this->descripcion_formula=$row[3];
        $this->formula=$row[4];

        return $total;
    }

    public function agregar_formula_partida($formula_partida,$cod_partida,$descripcion_partida,$descripcion_formula){
        $busqueda=$this->buscar_formula_partida($formula_partida,$cod_partida);
        $nombre_formula_partida_nuevo = $formula_partida;
        $cod_partida_nueva = $cod_partida;
        $descripcion_partida_nueva = $descripcion_partida;
        $descripcion_formula_nueva = $descripcion_formula;

        if ($busqueda>=1) {

            echo json_encode(array(
                "existe"=> "Ya Existe"
                ));

        }else{
            $query = pg_query("INSERT INTO formula_partida (id_formula,cod_partida,descripcion_partida,descripcion_formula,formula) VALUES (COALESCE(((SELECT max(id_formula) from formula_partida)+1),1),$cod_partida_nueva,'$descripcion_partida','$descripcion_formula_nueva','$nombre_formula_partida_nuevo')");

            echo json_encode(array(
                "existe"=> "Registrado"
                ));

        }


    }

    public function modificar_formula_partida($a,$actualizacion,$cod_partida,$descripcion_partida,$descripcion_formula){
        $id_formula = (int) $a;
        $busqueda=$this->buscar_formula_partida($id_formula,$cod_partida);
        $nombre_formula_partida_nuevo = $actualizacion;
        $actualizacion_cod_partida = $cod_partida;
        $actualizacion_descripcion_partida = $descripcion_partida;
        $actualizacion_descripcion_formula = $descripcion_formula;           
        

        if ($busqueda>=1) {

                if ($nombre_formula_partida_nuevo!='') {
                    $query = pg_query("UPDATE formula_partida set formula='$nombre_formula_partida_nuevo' where id_formula=$id_formula");

                echo json_encode(array(
                    "existe"=> "Actualizacion de formula",
                ));

                }
                if ($actualizacion_descripcion_partida != '') {
                        $query = pg_query("UPDATE formula_partida set descripcion_partida='$actualizacion_descripcion_partida' where id_formula=$id_formula");

                echo json_encode(array(
                    "existe"=> "Actualizacion de la descripcion partida",
                ));


                }
                if ($actualizacion_descripcion_formula != '') {
                        $query = pg_query("UPDATE formula_partida set descripcion_formula='$actualizacion_descripcion_formula' where id_formula=$id_formula");


                echo json_encode(array(
                    "existe"=> "Actualizacion de descripcion formula",
                ));

                }
                if ($actualizacion_cod_partida > 0) {
                        $query = pg_query("UPDATE formula_partida set cod_partida='$actualizacion_cod_partida' where id_formula=$id_formula");

                echo json_encode(array(
                    "existe"=> "Actualizacion de partida",
                ));


                }

        }else{


                echo json_encode(array(
                    "existe"=> "No Existe",
                ));


        }
    }

    public function eliminar_formula_partida($formula_partida){
        $c_e = (int) $formula_partida;
        $busqueda=$this->buscar_formula_partida($c_e);
        $nombre_formula_partida_nuevo = $c_e;

        if ($busqueda>=1) {
            $query = pg_query("DELETE FROM formula_partida WHERE id_formula=$c_e");

            echo json_encode(array(
                "existe"=> "Formula Eliminado"
                ));  

        }else{

            echo json_encode(array(
                "existe"=> "No Existe"
                ));    

        }
    }

    public function listar_formula_partida($cod_partida){

        $query = pg_query("SELECT * from formula_partida_nomina where cod_partida=$cod_partida order by id_formula");
        $total = pg_num_rows($query);

           $formula_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $id_formula=$row['id_formula'];
            $cod_partida=$row['cod_partida'];
            $descripcion_partida_formula=$row['descripcion_partida'];
            $descripcion_formula=$row['descripcion_formula'];
            $formula=$row['formula'];
            $cant_formulas=$total;
            $tipo=$row['tipo'];




            $formula_a[] = array(

                'id_formula'=> $id_formula,
                'cod_partida'=> $cod_partida,
                'descripcion_partida_formula'=> $descripcion_partida_formula,
                'descripcion_formula'=> $descripcion_formula,
                'formula'=> $formula,
                'cant_formulas'=> $cant_formulas,
                'tipo'=> $tipo,



            );

            }
//Creamos el JSON
$json_string = json_encode($formula_a);
echo $json_string; 



    }

    public function mostrar_formula(){

        $query = pg_query("select * from formula_partida fp left join partida p on fp.cod_partida=p.cod_partida");
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json
            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_editar_formula\" onClick=\"editar_formula($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';
/*            $eliminar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" onClick=\"eliminar_formula($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Eliminar\"><i class=\"fa fa-ban\"></i></button>';*/

            $tabla.='{"id_formula":"'.$row[0].'","partida":"'.$row[6].'","descripcion_partida":"'.$row[2].'","descripcion_formula":"'.$row[3].'","formula":"'.$row[4].'","acciones":"'/*.$eliminar*/.$editar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }


public function mostrar_formula_json($id_formula){

        //fucnion para el editable del datatable 

        $query = pg_query("SELECT * FROM formula_partida_v where id_formula= $id_formula");
        $total = pg_num_rows($query);

           $formula_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $id_formula=$row['id_formula'];
            $cod_partida=$row['cod_partida'];
            $descripcion_partida_formula=$row['descripcion_partida'];
            $descripcion_formula=$row['descripcion_formula'];
            $formula=$row['formula'];
            $partida_f=$row['partida'];



            $formula_a[] = array(

                'id_formula'=> $id_formula,
                'cod_partida'=> $cod_partida,
                'descripcion_partida_formula'=> $descripcion_partida_formula,
                'descripcion_formula'=> $descripcion_formula,
                'formula'=> $formula,
                'partida_f'=> $partida_f

            );

            }
//Creamos el JSON
$json_string = json_encode($formula_a);
echo $json_string; 

}




}


$formula_partida = new formula_partida;

//$formula_partida->modificar_formula_partida('sueldo_base/catn_insultos','',0,'',''); // utilizamos los metodos
//$formula_partida->eliminar_formula_partida('cantidad_insult8s/sueldo_base'); // utilizamos los metodos
//$formula_partida->agregar_formula_partida('sueldo_base/catn_insultos',35,'insultos','falta de respeto'); // utilizamos los metodos
//echo $formula_partida->buscar_formula_partida('sueldo_base/catn_insultos'); // utilizamos los metodos
/*$formula_partida->listar_formula_partida(); // utilizamos los metodos
*/
if ($_GET['resp']==1 and isset($_GET['resp'])) {
$formula_partida->mostrar_formula(); // utilizamos los metodos
}

if (isset($_GET['resp']) and $_GET['resp']==2) {

    if ($_POST['partida_formula']!='' and $_POST['descripcion_partida_formula']!='' and $_POST['descripcion_formula'] and  $_POST['formula_partida']) {
$formula_partida->agregar_formula_partida($_POST['formula_partida'],$_POST['partida_formula'], $_POST['descripcion_partida_formula'],$_POST['descripcion_formula']); // utilizamos los metodos

}
}

if (isset($_GET['resp']) and $_GET['resp']==3){

    if ($_POST['id_formula']>0) {
        $formula_partida->eliminar_formula_partida($_POST['id_formula']); // utilizamos los metodos
}
}

if (isset($_GET['resp']) and $_GET['resp']==4) {

$formula_partida->mostrar_formula_json($_POST['id_formula']);

}


if (isset($_GET['resp']) and $_GET['resp']==5) {

if (isset($_POST['formula_e']) and $_POST['formula_e']!='') {
$formula_partida->modificar_formula_partida($_POST['id_formula'],$_POST['formula_e'],0,'',''); // utilizamos los metodos
}


if (isset($_POST['formula_p']) and $_POST['formula_p']>0) {
$formula_partida->modificar_formula_partida($_POST['id_formula'],'',$_POST['formula_p'],'',''); // utilizamos los metodos
}

if (isset($_POST['des']) and $_POST['des']!='') {
$formula_partida->modificar_formula_partida($_POST['id_formula'],'',0,$_POST['des'],''); // utilizamos los metodos
}


if (isset($_POST['des_f']) and $_POST['des_f']!='') {
$formula_partida->modificar_formula_partida($_POST['id_formula'],'',0,'',$_POST['des_f']); // utilizamos los metodos
}

}

if (isset($_GET['resp']) and $_GET['resp']==6) {
    

    if (isset($_POST['cod_partida']) and $_POST['cod_partida'] >0) {
        $formula_partida->listar_formula_partida($_POST['cod_partida']); // utilizamos los metodos
    }
}


