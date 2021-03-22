<?php 
require('../conexion.php');
include 'credito_empleado.class.php';
class nomina {
    private $credito_empleado;
    private $cod_empleado;
    private $cod_partida;
    private $id_tipo_nomina;
    private $id_banco;
    private $id_unidad_administrativa;
    private $tipo_partida;
    private $monto_nomina;

    public function __construct(){
        $this->credito_empleado = new credito_empleado;

    }

    public function eliminar_partida_variables(){
        $query = pg_query("DELETE FROM nomina WHERE tipo_partida='VARIABLE'");
/*        echo "Eliminar Partidas Variables Exitoso";
*/    }

    public function eliminar_partida_credito_cero(){

        $this->credito_empleado->restar_credito();

        $query= pg_query("SELECT cod_empleado,cod_partida from nomina where tipo_partida='CREDITO'");

        while ($row = pg_fetch_row($query)) {
            $query2=pg_query("SELECT cod_empleado,cod_partida from credito_empleado where cant_cuotas_restantes = 0 and cod_empleado=$row[0] and cod_partida=$row[1]");
            $row2=pg_fetch_row($query2);
            $total = pg_num_rows($query2);
            echo $row2[0];

            if ($total>0) {
                $query3=pg_query("DELETE from nomina where tipo_partida='CREDITO' and cod_empleado=$row2[0] and cod_partida=$row2[1]");
            }

        }
    }


    public function listar_empleado_nomina(){

$query = pg_query("SELECT nm.cod_empleado,nm.cedula, nm.nombres, nm.apellidos,nm.tipo_nomina,nm.nombre_banco,round(nm.total_neto::numeric,2) from nomina_final nm group by nm.cod_empleado,nm.cedula, nm.nombres, nm.apellidos,nm.tipo_nomina,nm.nombre_banco,nm.total_neto");
        
        $total = pg_num_rows($query);

            //guardamos en un array multidimensional todos los datos de la consulta
        $i=0;
        $tabla = "";

        while($row = pg_fetch_row($query))
        {
            //////botones del datatable para crear en el json
            $editar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_editar_partidas_nomina\" onClick=\"editar_partida_nomina_empleado($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Editar Sueldo Base\"><i class=\"fa fa-edit\"></i></button>';
            $ver_nomina='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#ver_nomina_partida_empleado\" onClick=\"ver_partidas_nomina_empleado($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Ver Partidas\"><i class=\"fa fa-eye\"></i></button>';
            $eliminar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" onClick=\"eliminar_nomina_empleado($(this).closest(\'tr\').children(\'td:lt(1)\').text());\" title=\"Eliminar Empleado\"><i class=\"fa fa-ban\"></i></button>';
            $agregar='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_agregar_partidas_nomina\" onClick=\"agregar_partida_nomina_empleado('.$row[1].');\" title=\"Agregar Partida\"><i class=\"fa fa-plus\"></i></button>';
            $eliminar_p='<button type=\"button\" class=\"btn btn-info btn-xs\" style=\"margin:4px\" data-toggle=\"modal\" href=\"#modal_eliminar_partidas_nomina\" onClick=\"eliminar_partida_nomina_empleado('.$row[1].');\" title=\"Eliminar Partida\"><i class=\"fa fa-minus\"></i></button>';

            $tabla.='{"cod_empleado":"'.$row[0].'","cedula":"'.$row[1].'","nombres":"'.$row[2].'","apellidos":"'.$row[3].'","tipo_nomina":"'.$row[4].'","nombre_banco":"'.$row[5].'","total_neto":"'.' Bs. '.$row[6].'","acciones":"'.$ver_nomina.$eliminar.$editar.$agregar.$eliminar_p.'"},';       
            $i++;
        }
        $tabla = substr($tabla,0, strlen($tabla) - 1);

        echo '{"data":['.$tabla.']}';   



    }


    public function buscar_empleado_nomina($cedula){

        $tipo = gettype($cedula);

        if ($tipo=='integer'){
    $query = pg_query("select cod_empleado from l_empleado where cod_empleado=$cedula");

        }elseif ($tipo=='string') {
    $query = pg_query("select cod_empleado from l_empleado where cedula='$cedula'");
        }
        
        $row = pg_fetch_row($query);
        $total = pg_num_rows($query);
        $cod_empleado = $row[0];
        $valores = array($total, $cod_empleado);

        if ($total>0) {
                
            $cod_empleado3=$valores[1];
            $query2 = pg_query("SELECT cod_empleado from nomina where cod_empleado=$cod_empleado3 group by cod_empleado");
            $row2 = pg_fetch_row($query2);
            $total2 = pg_num_rows($query2);
            $cod_empleado2 = $row2[0];
            $valores2 = array($total2, $cod_empleado2);

            if ($total2>0) {
                $resp = array(1,$cod_empleado2);
                return $resp;
            }else {
                
               $resp = array(0,$cod_empleado3);
                return $resp;
            }
  

        }else{

           $resp = array(0,0);
            return $resp;
        }
        
    }  



    function editar_sueldo_empleado_nomina($a,$monto_nomina_nuevo){
        
        $cod_empleado = (int) $a;
        $busqueda=$this->buscar_empleado_nomina($cod_empleado);

        if ($busqueda[0]==0 and $busqueda[1]>0) {
            echo "el empleado en la nomina no existe";
        }elseif ($busqueda[0]==1 and $busqueda[1]>0) {
        $query = pg_query("UPDATE nomina set monto_nomina=$monto_nomina_nuevo where cod_empleado=$cod_empleado and cod_partida=1");
        echo "Actualizado con exito";
        }elseif ($busqueda[0]==0 and $busqueda[1]==0) {
            echo "el empleado no existe";
        }




    } 



    function eliminar_empleado_nomina($a){
        $cod_empleado = (int) $a;
        $busqueda=$this->buscar_empleado_nomina($cod_empleado);

        if ($busqueda[0]==0 and $busqueda[1]>0) {
            echo "el empleado en la nomina no existe";
        }elseif ($busqueda[0]==1 and $busqueda[1]>0) {
        $query = pg_query("DELETE FROM nomina WHERE cod_empleado=$cod_empleado");
        echo "Eliminado con exito";
        }elseif ($busqueda[0]==0 and $busqueda[1]==0) {
            echo "el empleado no existe";
        }

    } 

        public function insertar_partidas_fijas($cod_empleado,$sueldo_base){
                $busqueda=$this->buscar_empleado_nomina($cod_empleado);


            if ($busqueda[0] == 0 and $busqueda[1]>0) {
                $cod_empleado_nuevo = $busqueda[1];
                $inasistencias=0;
                $i=0;
                unset($formulas_fijas);

                    $sbq= pg_query("INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina) VALUES ($cod_empleado_nuevo,1,'FIJA',$sueldo_base)");
                    $query = pg_query('SELECT formula from formula_partida where id_formula=19 or id_formula=20  or id_formula=21 or id_formula=22 or id_formula=33 or id_formula=34  or id_formula=35 or id_formula=36 ORDER BY id_formula');
                
                    while ($row = pg_fetch_row($query)) {
                     
                        $formulas_fijas[$i] = $row[0];
                        $i++;
                    }

                    $IVSS_ASIGNACION = $formulas_fijas[0];
                    $LPH_ASIGNACION = $formulas_fijas[1];
                    $LPF_ASIGNACION = $formulas_fijas[2];
                    $FONDO_JUBILACION_ASIGNACION = $formulas_fijas[3];
                    $IVSS_DEDUCCION = $formulas_fijas[4];
                    $LPH_DEDUCCION = $formulas_fijas[5];
                    $LPF_DEDUCCION = $formulas_fijas[6];
                    $FONDO_JUBILACION_DEDUCCION = $formulas_fijas[7];

                    $IVSS_A = eval('return '.$IVSS_ASIGNACION.';');
                    $LPH_A = eval('return '.$LPH_ASIGNACION.';');
                    $LPF_A = eval('return '.$LPF_ASIGNACION.';');
                    $FONDO_JUBILACION_A = eval('return '.$FONDO_JUBILACION_ASIGNACION.';');
                    $IVSS_D = eval('return '.$IVSS_DEDUCCION.';');
                    $LPH_D = eval('return '.$LPH_DEDUCCION.';');
                    $LPF_D = eval('return '.$LPF_DEDUCCION.';');
                    $FONDO_JUBILACION_D = eval('return '.$FONDO_JUBILACION_DEDUCCION.';');

                    $IVSS_A_Q = pg_query("INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina) VALUES ($cod_empleado_nuevo,2,'FIJA',$IVSS_A)");
                    $LPH_A_Q = pg_query("INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina) VALUES ($cod_empleado_nuevo,3,'FIJA',$LPH_A)");
                    $LPF_A_Q = pg_query("INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina) VALUES ($cod_empleado_nuevo,4,'FIJA',$LPF_A)");
                    $FONDO_JUBILACION_A_Q = pg_query("INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina) VALUES ($cod_empleado_nuevo,5,'FIJA',$FONDO_JUBILACION_A)");
                    $IVSS_D_Q = pg_query("INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina) VALUES ($cod_empleado_nuevo,10,'FIJA',$IVSS_D)");
                    $LPH_D_Q = pg_query("INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina) VALUES ($cod_empleado_nuevo,11,'FIJA',$LPH_D)");
                    $LPF_D_Q = pg_query("INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina) VALUES ($cod_empleado_nuevo,12,'FIJA',$LPF_D)");
                    $FONDO_JUBILACION_D_Q = pg_query("INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina) VALUES ($cod_empleado_nuevo,13,'FIJA',$FONDO_JUBILACION_D)");
                    echo "Registradas";

            
            }

            if ($busqueda[0]>0 and $busqueda[1]>0) {
                echo "1";
            }

            if ($busqueda[0]==0 and $busqueda[1]==0) {
                echo "0";        
            }



        }

    public function actualizar_formula_fijas($cod_empleado){

                $inasistencias=0;
                $i=0;
                unset($formulas_fijas);

                    $sbq= pg_query("SELECT monto_nomina from nomina where cod_empleado=$cod_empleado and cod_partida=1");
                    $sbq_r=pg_fetch_row($sbq);
                    $sueldo_base=$sbq_r[0];
                    $query = pg_query('SELECT formula from formula_partida where id_formula=19 or id_formula=20  or id_formula=21 or id_formula=22 or id_formula=33 or id_formula=34  or id_formula=35 or id_formula=36 ORDER BY id_formula');
        
                    while ($row = pg_fetch_row($query)) {
                     
                        $formulas_fijas[$i] = $row[0];
                        $i++;
                    }

                    $IVSS_ASIGNACION = $formulas_fijas[0];
                    $LPH_ASIGNACION = $formulas_fijas[1];
                    $LPF_ASIGNACION = $formulas_fijas[2];
                    $FONDO_JUBILACION_ASIGNACION = $formulas_fijas[3];
                    $IVSS_DEDUCCION = $formulas_fijas[4];
                    $LPH_DEDUCCION = $formulas_fijas[5];
                    $LPF_DEDUCCION = $formulas_fijas[6];
                    $FONDO_JUBILACION_DEDUCCION = $formulas_fijas[7];

                    $IVSS_A = eval('return '.$IVSS_ASIGNACION.';');
                    $LPH_A = eval('return '.$LPH_ASIGNACION.';');
                    $LPF_A = eval('return '.$LPF_ASIGNACION.';');
                    $FONDO_JUBILACION_A = eval('return '.$FONDO_JUBILACION_ASIGNACION.';');
                    $IVSS_D = eval('return '.$IVSS_DEDUCCION.';');
                    $LPH_D = eval('return '.$LPH_DEDUCCION.';');
                    $LPF_D = eval('return '.$LPF_DEDUCCION.';');
                    $FONDO_JUBILACION_D = eval('return '.$FONDO_JUBILACION_DEDUCCION.';');

                    $IVSS_A_Q = pg_query("UPDATE nomina set monto_nomina=$IVSS_A where cod_empleado=$cod_empleado and cod_partida=2");
                    $LPH_A_Q = pg_query("UPDATE nomina set monto_nomina=$LPH_A where cod_empleado=$cod_empleado and cod_partida=3");
                    $LPF_A_Q = pg_query("UPDATE nomina set monto_nomina=$LPF_A where cod_empleado=$cod_empleado and cod_partida=4");
                    $FONDO_JUBILACION_A_Q = pg_query("UPDATE nomina set monto_nomina=$FONDO_JUBILACION_A where cod_empleado=$cod_empleado and cod_partida=5");
                    $IVSS_D_Q = pg_query("UPDATE nomina set monto_nomina=$IVSS_D where cod_empleado=$cod_empleado and cod_partida=10");
                    $LPH_D_Q = pg_query("UPDATE nomina set monto_nomina=$LPH_D where cod_empleado=$cod_empleado and cod_partida=11");
                    $LPF_D_Q = pg_query("UPDATE nomina set monto_nomina=$LPF_D where cod_empleado=$cod_empleado and cod_partida=12");
                    $FONDO_JUBILACION_D_Q = pg_query("UPDATE nomina set monto_nomina=$FONDO_JUBILACION_D where cod_empleado=$cod_empleado and cod_partida=13");



    }

        public function actualizar_formula($cod_empleado){
        unset($formulas_fijas);

        $j=0;

        $sbq= pg_query("SELECT monto_nomina from nomina where cod_empleado=$cod_empleado and cod_partida=1");
        $sbq_r=pg_fetch_row($sbq);
        $sueldo_base=$sbq_r[0];

            $inasistencias_q = pg_query("SELECT inasistencias from nomina where cod_empleado=$cod_empleado and cod_partida=14");
            $inasistencias_r = pg_fetch_row($inasistencias_q);
            //////lleno las variables faltants
            $inasistencias=$row2[0];

            $avv = pg_query("SELECT date_part('year', fecha_pago) as anos FROM pago where cod_empleado=$cod_empleado and cod_partida<>18 group by anos");
            $anos_sin_pagar = pg_num_rows($avv);
            $avp = pg_query("SELECT COALESCE (count(anos_pagados),0) from vacaciones_pagados where cod_empleado=$cod_empleado");
            $anos_pagados = pg_fetch_row($avp);
            $anos_vencidos = ($anos_sin_pagar-$anos_pagados[0]);

            $query2 = pg_query("SELECT antiguedad,cantidad_hijos from l_empleado where cod_empleado=$cod_empleado");
            $row2 = pg_fetch_row($query2);
            //////lleno las variables faltants
            $antiguedad=$row2[0];
            $cant_hijos=$row2[1];  
      


        $query = pg_query("select formula,cod_partida from formula_partida where cod_partida in (select cod_partida from nomina where cod_empleado=$cod_empleado)");
        $total = pg_num_rows($query);
        
        while ($row = pg_fetch_row($query)) {
         
            $formula = eval('return '.$row[0].';');
            $actualizar = pg_query("UPDATE nomina set monto_nomina=$formula where cod_empleado=$cod_empleado and cod_partida=$row[1]");
            $j++;
        }




    }

     public function mostrar_nomina_empleado_json($cod_empleado){

        $query = pg_query("SELECT cod_empleado,cedula,nombres,apellidos,cod_partida,partida,tipo,tipo_partida,round(monto_nomina::numeric,2) as monto_nomina,id_tipo_nomina,tipo_nomina,id_banco,nombre_banco,id_unidad_administrativa,unidad_administrativa,round(total_asignacion::numeric,2) as total_asignacion, round(total_deduccion::numeric,2) as total_deduccion,round(total_neto::numeric,2) as total_neto from nomina_final where cod_empleado=$cod_empleado");
        $total = pg_num_rows($query);

           $empleado_nomina_a = array(); //creamos un array

                while($row = pg_fetch_array($query))
                { 
                $cod_empleado=$row['cod_empleado'];
                $cedula=$row['cedula'];
                $nombres=$row['nombres'];
                $apellidos=$row['apellidos'];
                $cod_partida=$row['cod_partida'];
                $partida=$row['partida'];
                $tipo=$row['tipo'];
                $tipo_partida=$row['tipo_partida'];
                $monto_nomina=$row['monto_nomina'];
                $id_tipo_nomina=$row['id_tipo_nomina'];
                $tipo_nomina=$row['tipo_nomina'];
                $id_banco=$row['id_banco'];
                $nombre_banco=$row['nombre_banco'];
                $id_unidad_administrativa=$row['id_unidad_administrativa'];
                $total_asignacion=$row['total_asignacion'];
                $total_deduccion=$row['total_deduccion'];
                $total_neto=$row['total_neto'];

                $empleado_nomina_a[] = array(

                "cod_empleado"=>$cod_empleado,
                "cedula"=>$cedula,
                "nombres"=>$nombres,
                "apellidos"=>$apellidos,
                "cod_partida"=>$cod_partida,
                "partida"=>$partida,
                "tipo"=>$tipo,
                "tipo_partida"=>$tipo_partida,
                "monto_nomina"=>$monto_nomina,
                "id_tipo_nomina"=>$id_tipo_nomina,
                "tipo_nomina"=>$tipo_nomina,
                "id_banco"=>$id_banco,
                "nombre_banco"=>$nombre_banco,
                "id_unidad_administrativa"=>$id_unidad_administrativa,
                "total_asignacion"=>$total_asignacion,
                "total_deduccion"=>$total_deduccion,
                "total_neto"=>$total_neto
                );

                }
                //Creamos el JSON
                $json_string = json_encode($empleado_nomina_a);
                echo $json_string; 

                }

    public function buscar_partida_nomina($cedula,$cod_partida){

        $query2 = pg_query("SELECT cod_empleado from l_empleado where cedula='$cedula'");
        $row2 = pg_fetch_row($query2);
        $total2= pg_num_rows($query2);
        $cod_empleado = $row2[0];
        $valores = array($total2, $cod_empleado);

        if ($total2 > 0) {
                $query = pg_query("SELECT cod_empleado from nomina where cod_empleado=$cod_empleado and cod_partida=$cod_partida");
                $total = pg_num_rows($query);
                $row = pg_fetch_row($query);
                $cod_empleado2=$row[0];
                $valores2= array($total,$cod_empleado2);

                if ($total>0) {
/*                    echo "Ya existe un empleado con esta partida en la nomina";
*/                    $resp = array(1,$cod_empleado);
                    return $resp;
                }else{

/*                    echo "No existe el empleado en la nomina con esta partida"; 
*/                    $resp = array(0,$cod_empleado);
                    return $resp;

                }


        }elseif ($total2==0) {
/*                echo " El Empleado no existe en la base de datos"; 
*/                $resp = array(0,0);
                return $resp;

        }

    }

    public function incluir_sueldo_base_individual($cedula,$sueldo_base){

            $busqueda2=$this->buscar_partida_nomina($cedula,1);
            
            if ($busqueda2[0]==0  and  $busqueda2[1]>0) {
                
                $cod_empleado_nuevo = $busqueda2[1];
            
            $sbq= pg_query("INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina) VALUES ($cod_empleado_nuevo,1,'FIJA',$sueldo_base)");  
                echo "Ingresado con exito";

            }elseif ($busqueda2[0]==1 and $busqueda2[1]>0) {

                echo "Ya existe el sueldo base en nomina para este empleado";


            }elseif ($busqueda2[0]==0 and $busqueda2[1]==0) {
                echo "no existe el empleado en la base de datos";
            }


    }

    public function agregar_partida_nomina($cod_partida,$val_formula,$tipo_partida,$cedula,$credito,$cantidad_cuotas,$inasistencias,$cant_horas){
        ////////////////calcular los años vencidos de vaciones haciendo una consulta a pagos si se le pago vacaciones
        ///$anos_vencidos

        /////buscar si empleado existe y si esta en la nomina con esa partida
        $busqueda=$this->buscar_partida_nomina($cedula,$cod_partida);

        if ($busqueda[0]==0  and  $busqueda[1]>0) {

            $cod_empleado_nuevo = $busqueda[1];
            ////////////buscar si ya esta insertada el sueldo base///////
            
            $avv = pg_query("SELECT date_part('year', fecha_pago) as anos FROM pago where cod_empleado=$cod_empleado_nuevo and cod_partida<>18 group by anos");
            $anos_sin_pagar = pg_num_rows($avv);
            $avp = pg_query("SELECT COALESCE (count(anos_pagados),0) from vacaciones_pagados where cod_empleado=$cod_empleado_nuevo");
            $anos_pagados = pg_fetch_row($avp);
            $anos_vencidos = ($anos_sin_pagar-$anos_pagados[0]);

            $sbq= pg_query("SELECT monto_nomina from nomina where cod_empleado=$cod_empleado_nuevo and cod_partida=1");  
            $sbq_row=pg_fetch_row($sbq);
            $sueldo_base=$sbq_row[0];
            $i=0;
            $query = pg_query("SELECT antiguedad,cantidad_hijos from l_empleado where cod_empleado=$cod_empleado_nuevo");
            $row = pg_fetch_row($query);
            //////lleno las variables faltants
            $antiguedad=$row[0];
            $cant_hijos=$row[1];

            ////listo las formulas para ese codigo de partida
            $query2 = pg_query("SELECT formula from formula_partida where cod_partida=$cod_partida order by id_formula");

            while ( $row2 = pg_fetch_row($query2) ) {
                $formula[$i] = $row2[0];
                $i++;

            }
            
            $resultado = $formula[$val_formula];
            $R_F = eval('return '.$resultado.';');
            echo "Registrado ".$R_F." Bs";

            $query4= pg_query("INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina) VALUES ($cod_empleado_nuevo,$cod_partida,'$tipo_partida',$R_F)"); 

            //////////si la cantidad de credito es mayor a cero llenar el credito
            if ($cantidad_cuotas>0 and $credito>0) {
 /////para obtener fecha para el credito
    setlocale(LC_ALL,"es_ES");
    date_default_timezone_set('America/Caracas');
    $dia = date('d');
    $mes = date('n');
    $ano = date('Y');
    $date = $ano.'-'.$mes.'-'.$dia;
               $fecha_credito = $date; 
                    
                    $this->credito_empleado->agregar_credito_empleado($cod_partida,$cod_empleado_nuevo,$fecha_credito,$credito,$credito,$cantidad_cuotas,$cantidad_cuotas);
            
                    ////insertar el creditos cuando se este pagando
                    
                    $query4 = pg_query("SELECT * from historial_credito where cod_partida=$cod_partida and cod_empleado=$cod_empleado_nuevo and fecha_credito='$fecha_credito'");
                    $total2 = pg_num_rows($query4);
                    
                    if ($total2==0) {

                    $query3 = pg_query("INSERT INTO historial_credito select cod_partida, cod_empleado, fecha_credito, monto_credito from credito_empleado where cod_partida=$cod_partida and cod_empleado=$cod_empleado_nuevo and fecha_credito='$fecha_credito'" );


                     } 


            }

        }elseif ($busqueda[0]==1 and $busqueda[1]>0) {
            echo "empelado ya existe en la nomina con esta partida";
        }elseif ($busqueda[0]==0 and $busqueda[1]==0) {
            echo "empelado NO existe en la BASE DE DATOS";

        }

    }



    public function eliminar_partida_empleado($cedula,$cod_partida){
        $busqueda=$this->buscar_partida_nomina($cedula,$cod_partida);

            if ($cod_partida==1) {
                echo "No puede Eliminar el sueldo base, si desea eliminar el sueldo base, por favor elimine el empleado de la nomina.";
            }else{

                if ($busqueda[0]==0  and  $busqueda[1]>0) {

                    echo "empelado no existe en la nomina con esta partida";

                }elseif ($busqueda[0]==1 and $busqueda[1]>0) {
                    $cod_empleado_nuevo = $busqueda[1];
                    /////////preguntar si el credito ya esta en curso si esta en curso no se puede eliminar
                    $query5 = pg_query("SELECT * from credito_empleado where cant_de_cuotas>cant_cuotas_restantes and cod_empleado=$cod_empleado_nuevo");
                    $total = pg_num_rows($query5);
                    $query2 = pg_query("SELECT tipo from partida where cod_partida=$cod_partida");
                    $row4 = pg_fetch_row($query2);

                    if ($total>0 and $row4[0]=="Credito") {
                            
                            echo "No se puede eliminar un credito en curso";                        
                    }else{

                    $query = pg_query("DELETE FROM nomina where cod_empleado=$cod_empleado_nuevo and cod_partida=$cod_partida");
                    echo "Partida Eliminada con exito";
                        /////////////si es credito lo tengo que eliminar de la tabla credito y el historial
                    if ($row4[0]=="Credito") {
                         /////para obtener fecha para el credito
                        setlocale(LC_ALL,"es_ES");
                        date_default_timezone_set('America/Caracas');
                        $dia = date('d');
                        $mes = date('n');
                        $ano = date('Y');
                        $date = $ano.'-'.$mes.'-'.$dia;
                        $fecha_credito = $date; 
                    
                    $this->credito_empleado->eliminar_credito_empleado($cod_partida,$cod_empleado_nuevo,$fecha_credito);

                    }


                    }




                }elseif ($busqueda[0]==0 and $busqueda[1]==0) {
                    echo "empelado NO existe en la BASE DE DATOS";
                }

            }

}



 public function generar_txt(){


$generar_txt = pg_query("Copy (
SELECT ne.cedula,n.numero_cuenta,ne.total_neto FROM numero_cuenta n
left join nomina_final ne on ne.cod_empleado=n.cod_empleado
group by ne.cedula,n.numero_cuenta,ne.total_neto
) To 'C:/xampp/htdocs/Nomina_Alcaldia/Nomina_Alcaldia/BD/archivos_bancos/nomina/archivo_banco.csv' With CSV DELIMITER ';' Header;");

echo "Emision Exitosa";

}



 public function mostrar_nomina_empleado_json_general(){

        $query = pg_query("SELECT * from nomina_final");
        $total = pg_num_rows($query);

           $empleado_nomina_a = array(); //creamos un array

                while($row = pg_fetch_array($query))
                { 
                $cod_empleado=$row['cod_empleado'];
                $cedula=$row['cedula'];
                $nombres=$row['nombres'];
                $apellidos=$row['apellidos'];
                $cod_partida=$row['cod_partida'];
                $partida=$row['partida'];
                $tipo=$row['tipo'];
                $tipo_partida=$row['tipo_partida'];
                $monto_nomina=$row['monto_nomina'];
                $id_tipo_nomina=$row['id_tipo_nomina'];
                $tipo_nomina=$row['tipo_nomina'];
                $id_banco=$row['id_banco'];
                $nombre_banco=$row['nombre_banco'];
                $id_unidad_administrativa=$row['id_unidad_administrativa'];
                $unidad_administrativa=$row['unidad_administrativa'];
                $total_asignacion=$row['total_asignacion'];
                $total_deduccion=$row['total_deduccion'];
                $total_neto=$row['total_neto'];

                $empleado_nomina_a[] = array(

                "cod_empleado"=>$cod_empleado,
                "cedula"=>$cedula,
                "nombres"=>$nombres,
                "apellidos"=>$apellidos,
                "cod_partida"=>$cod_partida,
                "partida"=>$partida,
                "tipo"=>$tipo,
                "tipo_partida"=>$tipo_partida,
                "monto_nomina"=>$monto_nomina,
                "id_tipo_nomina"=>$id_tipo_nomina,
                "tipo_nomina"=>$tipo_nomina,
                "id_banco"=>$id_banco,
                "nombre_banco"=>$nombre_banco,
                "id_unidad_administrativa"=>$id_unidad_administrativa,
                "unidad_administrativa"=>$unidad_administrativa,
                "total_asignacion"=>$total_asignacion,
                "total_deduccion"=>$total_deduccion,
                "total_neto"=>$total_neto
                );

                }
                //Creamos el JSON
                $json_string = json_encode($empleado_nomina_a);
                echo $json_string; 

                }






}





$nomina = new nomina;

/*print_r( $nomina->buscar_partida_nomina('23',1) );
*/

//$nomina->eliminar_partida_variables();
//$nomina->eliminar_partida_credito_cero();
//$nomina->buscar_partida_nomina(14,16);
//$nomina->agregar_partida_nomina(1,7,'VARIABLE',0,'',0,0,0,0);

if (isset($_GET['resp']) and $_GET['resp'] == 1) {
$nomina->listar_empleado_nomina();
}

if (isset($_GET['resp']) and $_GET['resp']==2) {

    if (isset($_POST['cedula_partidas_fijas']) and isset($_POST['sueldo_base_partidas_fijas']) and $_POST['sueldo_base_partidas_fijas'] >0 and $_POST['cedula_partidas_fijas']>0) {

        $nomina->insertar_partidas_fijas($_POST['cedula_partidas_fijas'],$_POST['sueldo_base_partidas_fijas']);        

    }

}

if (isset($_GET['resp']) and $_GET['resp']==3) {
    
    if (isset($_POST['cod_empleado']) and $_POST['cod_empleado']>0) {

        $nomina->actualizar_formula_fijas($_POST['cod_empleado']);
        
/*        $nomina->actualizar_formula($_POST['cod_empleado']);
*/
        $nomina->mostrar_nomina_empleado_json($_POST['cod_empleado']);

    }
}

if (isset($_GET['resp']) and $_GET['resp']==4) {


    if (isset($_POST['sueldo_base_a']) and $_POST['sueldo_base_a'] > 0 and isset($_POST['cedula_a']) and $_POST['cedula_a']>0) {
            $nomina->incluir_sueldo_base_individual($_POST['cedula_a'],$_POST['sueldo_base_a']);
    }

if (isset($_POST['cod_partida_s']) and $_POST['cod_partida_s']>=0 and isset($_POST['val_formula']) and $_POST['val_formula']>=0 and isset($_POST['tipo_partida_s']) and $_POST['tipo_partida_s']!='' and isset($_POST['cedula_n']) and $_POST['cedula_n']!='' and isset($_POST['credito_n']) and $_POST['credito_n']>0 and isset($_POST['cantidad_cuotas_n']) and $_POST['cantidad_cuotas_n']>0 and isset($_POST['inasistencias_n']) and $_POST['inasistencias_n']>=0 and isset($_POST['horasextras_n']) and $_POST['horasextras_n']>=0)  {

    $nomina->agregar_partida_nomina($_POST['cod_partida_s'],$_POST['val_formula'],$_POST['tipo_partida_s'],$_POST['cedula_n'],$_POST['credito_n'],$_POST['cantidad_cuotas_n'],$_POST['inasistencias_n'],$_POST['horasextras_n']);

}

if (isset($_POST['cod_partida_s']) and $_POST['cod_partida_s']>=0 and isset($_POST['val_formula']) and $_POST['val_formula']>=0 and isset($_POST['tipo_partida_s']) and $_POST['tipo_partida_s']!='' and isset($_POST['cedula_n']) and $_POST['cedula_n']!='' and isset($_POST['credito_n']) and $_POST['credito_n']==0 and isset($_POST['cantidad_cuotas_n']) and $_POST['cantidad_cuotas_n']==0 and isset($_POST['inasistencias_n']) and $_POST['inasistencias_n']>=0 and isset($_POST['horasextras_n']) and $_POST['horasextras_n']>=0)  {

    $nomina->agregar_partida_nomina($_POST['cod_partida_s'],$_POST['val_formula'],$_POST['tipo_partida_s'],$_POST['cedula_n'],$_POST['credito_n'],$_POST['cantidad_cuotas_n'],$_POST['inasistencias_n'],$_POST['horasextras_n']);

} 

}

if (isset($_GET['resp']) and $_GET['resp']==5) {
    if (isset($_POST['cod_empleado']) and $_POST['cod_empleado']>0) {
    $nomina->eliminar_empleado_nomina($_POST['cod_empleado']);
    }
}


if (isset($_GET['resp']) and $_GET['resp']==6) {

    if (isset($_POST['cod_empleado']) and $_POST['cod_empleado']>0 and isset($_POST['sueldo_base']) and $_POST['sueldo_base']>0) {
        $nomina->editar_sueldo_empleado_nomina($_POST['cod_empleado'],$_POST['sueldo_base']);
    }
}



if (isset($_GET['resp']) and $_GET['resp']==7) {


if (isset($_POST['cod_partida_s2']) and $_POST['cod_partida_s2']>=0 and isset($_POST['val_formula2']) and $_POST['val_formula2']>=0 and isset($_POST['tipo_partida_s2']) and $_POST['tipo_partida_s2']!='' and isset($_POST['cedula_n2']) and $_POST['cedula_n2']!='' and isset($_POST['credito_n2']) and $_POST['credito_n2']>0 and isset($_POST['cantidad_cuotas_n2']) and $_POST['cantidad_cuotas_n2']>0 and isset($_POST['inasistencias_n2']) and $_POST['inasistencias_n2']>=0 and isset($_POST['horasextras_n2']) and $_POST['horasextras_n2']>=0)  {

    $nomina->agregar_partida_nomina($_POST['cod_partida_s2'],$_POST['val_formula2'],$_POST['tipo_partida_s2'],$_POST['cedula_n2'],$_POST['credito_n2'],$_POST['cantidad_cuotas_n2'],$_POST['inasistencias_n2'],$_POST['horasextras_n2']);

}

if (isset($_POST['cod_partida_s2']) and $_POST['cod_partida_s2']>=0 and isset($_POST['val_formula2']) and $_POST['val_formula2']>=0 and isset($_POST['tipo_partida_s2']) and $_POST['tipo_partida_s2']!='' and isset($_POST['cedula_n2']) and $_POST['cedula_n2']!='' and isset($_POST['credito_n2']) and $_POST['credito_n2']==0 and isset($_POST['cantidad_cuotas_n2']) and $_POST['cantidad_cuotas_n2']==0 and isset($_POST['inasistencias_n2']) and $_POST['inasistencias_n2']>=0 and isset($_POST['horasextras_n2']) and $_POST['horasextras_n2']>=0)  {

    $nomina->agregar_partida_nomina($_POST['cod_partida_s2'],$_POST['val_formula2'],$_POST['tipo_partida_s2'],$_POST['cedula_n2'],$_POST['credito_n2'],$_POST['cantidad_cuotas_n2'],$_POST['inasistencias_n2'],$_POST['horasextras_n2']);

} 

}

if (isset($_GET['resp']) and $_GET['resp']==8) {

if (isset($_POST['cedula_e']) and $_POST['cedula_e']!='' and $_POST['cod_partida_e']>0 and isset($_POST['cod_partida_e'])) {
$nomina->eliminar_partida_empleado($_POST['cedula_e'],$_POST['cod_partida_e']);
}


}


if (isset($_GET['resp']) and $_GET['resp']==9) {

$nomina->mostrar_nomina_empleado_json_general();

}

if (isset($_GET['resp']) and $_GET['resp']==232) {

$nomina->generar_txt();

}

/* $nomina->agregar_partida_nomina(15,0,'CREDITO','19016737',3000,5,0);
*/

/*$nomina->eliminar_empleado_nomina(4);
*/

/*$nomina->editar_sueldo_empleado_nomina(2,15000)
*/

?>