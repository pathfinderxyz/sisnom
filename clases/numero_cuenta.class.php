<?php

require('../conexion.php');

class numero_cuenta {

    private $id_banco;
    private $cod_empleado;
    private $numero_cuenta;
    private $cedula;


    public function buscar_numero_cuenta($cedula){

        $query = pg_query("select * from numero_cuenta_v where cedula='$cedula'");
        $row = pg_fetch_row($query);
        $total = pg_num_rows($query);
        $this->id_banco=$row[0];
        $cod_empleado =  $this->cod_empleado=$row[1];
        $this->numero_cuenta=$row[2];
        $this->cedula=$row[3];
        $valores = array($total, $cod_empleado);

        return $valores ;
    }

    public function agregar_numero_cuenta($cod_empleado,$numero_cuenta){
        $busqueda=$this->buscar_numero_cuenta($cod_empleado);
        $numero_cuenta_nuevo = $numero_cuenta;

        if ($busqueda[0]>=1) {

            echo json_encode(array(
                "existe"=> "Ya Existe"
                ));

        }else{

            if ($busqueda[1]==null) {

            $query2= pg_query("select cod_empleado,id_banco from l_empleado where cedula='$cod_empleado' ");
            $row2 = pg_fetch_row($query2);
            $id_banco_nuevo = $row2[1];
            $cod_empleado_nuevo=$row2[0];

            $total2 = pg_num_rows($query2);
                if ($total2>0) {
                        $query = pg_query("INSERT INTO numero_cuenta (id_banco,cod_empleado,numero_cuenta) VALUES ($id_banco_nuevo,$cod_empleado_nuevo,'$numero_cuenta_nuevo')");
                            echo json_encode(array(
                                    "existe"=> "Registrado"
                            ));                
                }else{
                    echo json_encode(array(
                                    "existe"=> "el empleado no existe"
                            )); 
                }

            }
        
        }


    }

    public function modificar_numero_cuenta($cedula,$numero_cuenta){
        $busqueda=$this->buscar_numero_cuenta($cedula);
        $numero_cuenta_nuevo = $numero_cuenta;
        $cod_empleado=$busqueda[1];



        if ($busqueda[0]>=1) {

            if ($numero_cuenta_nuevo !='') {
                $query = pg_query("UPDATE numero_cuenta set numero_cuenta='$numero_cuenta_nuevo' where cod_empleado='$cod_empleado'");

                    echo json_encode(array(
                                    "existe"=> "Actualizacion de Numero de Cuenta"
                            )); 

            }

        }else{


                    echo json_encode(array(
                                    "existe"=> "No existe"
                            )); 


        }
    }

    public function eliminar_numero_cuenta($cod_empleado){
        $busqueda=$this->buscar_numero_cuenta($cod_empleado);

        if ($busqueda[0]>=1) {
            $cod_empleado = $busqueda[1];
            $query = pg_query("DELETE FROM numero_cuenta WHERE cod_empleado=$cod_empleado");

                echo json_encode(array(
                    "existe" => "Eliminado"
                    ));

        }else{

                echo json_encode(array(
                    "existe" => "No existe"
                    ));

        }
    }

    public function listar_numero_cuenta(){

        $query = pg_query("SELECT * FROM numero_cuenta order by id_banco");
        $total = pg_num_rows($query);

        echo '<select id=\'numero_cuenta\'>';
        while ($row = pg_fetch_row($query)) {
            echo '<option value="'.$this->id_banco=$row[0].'">'.$this->cod_empleado=$row[1].'</option>';
        }
        echo'</select>'; 



    }

    public function mostrar_numero_cuenta(){

        $query = pg_query("select * from numero_cuenta n left join l_empleado e on e.cod_empleado=n.cod_empleado");
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json
            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_editar_numero_cuenta\" onClick=\"editar_numero_cuenta($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar\"><i class=\"fa fa-edit\"></i></button>';
            $eliminar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" onClick=\"eliminar_numero_cuenta($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Eliminar\"><i class=\"fa fa-ban\"></i></button>';

            $tabla.='{"cedula":"'.$row[4].'","nombre":"'.$row[5].'","banco":"'.$row[21].'","numero_cuenta":"'.$row[2].'","acciones":"'.$eliminar.$editar.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }

public function mostrar_numero_cuenta_json($cedula){

        //fucnion para el editable del datatable 

        $query = pg_query("SELECT * FROM numero_cuenta_v where cedula = '$cedula'");
        $total = pg_num_rows($query);

           $numero_cuenta_a = array(); //creamos un array

           while($row = pg_fetch_array($query))
           { 
            $id_banco=$row['id_banco'];
            $cod_empleado=$row['cod_empleado'];
            $numero_cuenta=$row['numero_cuenta'];
            $cedula_cuenta=$row['cedula'];
            $nombre_banco=$row['nombre_banco'];
            $nombres=$row['nombres'];



            

            $numero_cuenta_a[] = array(

                'id_banco'=> $id_banco,
                'cod_empleado'=> $cod_empleado,
                'numero_cuenta' => $numero_cuenta,
                'cedula_cuenta' => $cedula_cuenta,
                'nombre_banco' => $nombre_banco,
                'nombres' => $nombres




                );

}
//Creamos el JSON
$json_string = json_encode($numero_cuenta_a);
echo $json_string; 

}



}


$numero_cuenta = new numero_cuenta;

//$numero_cuenta->modificar_numero_cuenta(2,4,'8181831818181818181'); // utilizamos los metodos
//$numero_cuenta->eliminar_numero_cuenta(4); // utilizamos los metodos
//$numero_cuenta->agregar_numero_cuenta(1,4,'4545333333333333333'); // utilizamos los metodos
/*$array = $numero_cuenta->buscar_numero_cuenta('19682712'); // utilizamos los metodos
echo $array[0];*/
//$numero_cuenta->listar_numero_cuenta(); // utilizamos los metodos

if (isset($_GET['resp'])) {

    if ($_GET['resp']==1 and isset($_GET['resp'])) {
        $numero_cuenta->mostrar_numero_cuenta();
    }


    if ($_GET['resp']==2 and isset($_GET['resp'])) {

        if ($_POST['cedula_cuenta']!='' and $_POST['numero_cuenta']!='') {
        $numero_cuenta->agregar_numero_cuenta($_POST['cedula_cuenta'],$_POST['numero_cuenta']); // utilizamos los metodos
    }

}

if ($_GET['resp']==3) {
    if ($_POST['cedula']!='') {
$numero_cuenta->eliminar_numero_cuenta($_POST['cedula']); // utilizamos los metodos
}
}

if (isset($_GET['resp']) and $_GET['resp']==4) {

    $numero_cuenta->mostrar_numero_cuenta_json($_POST['cedula']);
}

if (isset($_GET['resp']) and $_GET['resp']==5) {

if (isset($_POST['numero_cuenta_e']) and $_POST['numero_cuenta_e']!='') {
    $numero_cuenta->modificar_numero_cuenta($_POST['cedula'],$_POST['numero_cuenta_e']); // utilizamos los metodos
}



}




}





?>