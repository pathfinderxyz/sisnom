<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, maximum-scale=1">
  <!-- Bootstrap Core CSS -->
  <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- MetisMenu CSS -->
  <link href="bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">
  <!-- DataTables CSS -->
  <link href="bower_components/dataTables/media/css/dataTables.bootstrap.css" rel="stylesheet">
  <!-- Custom CSS -->
  <link href="dist/css/sb-admin-2.css" rel="stylesheet">
  <!-- Custom Fonts -->
  <link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <!-- App CSS -->  
  <link href="app_css/css_app.css" rel="stylesheet"> 
  <!--X-editable-->
  <link href="bower_components/editable/css/bootstrap-editable.css" rel="stylesheet">
  <link href="bower_components/editable/css/select2.css" rel="stylesheet">
  <!-- Perfect Scroll -->  
  <link href="app_css/perfect-scrollbar.css" rel="stylesheet"> 
  <!--   <link href='https://fonts.googleapis.com/css?family=Lobster|Pacifico' rel='stylesheet' type='text/css'>-->  
  <link rel=icon href='img/favicon.ico' type="image/vnd.microsoft.icon">
  <style>

h2 {
    font-size: 20px;
}

h3 {
    font-size: 18px;
}

h4 {
    font-size: 15px;
}
div{
    font-size: 10px;


}

@media print{
    #imprimir{
        display:none !important;
    }
}

  </style>
  <title>Nomina General</title>
</head>
<body>
  <div class="container" id="contenido_nomina">

  <?php 
  include 'conexion.php';
  $cod_empleado = $_GET['cod_empleado'];




  echo '<div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      
      <div class="text-center">
        <h2> <strong>RECIBO DE PAGO</strong></h2>
        <h3> <strong>Fecha de Emision:</strong> 2016-04-2016</h3>

      </div>
    </div>
  </div>';



    $empleado_q = pg_query("SELECT cod_empleado,cedula,nombres,apellidos,nombre_banco,unidad_administrativa from nomina_final where cod_empleado=$cod_empleado group by cod_empleado,cedula,nombres,apellidos,nombre_banco,unidad_administrativa");
    while ($empleado_r = pg_fetch_row($empleado_q)) {

  echo '<div class="row" style="padding-top:15px">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <h4><strong>Banco:</strong> '.$empleado_r[4].' </h4>
    </div>
  </div>';

  echo '<div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <h4><strong>Unidad Administrativa:</strong> '.$empleado_r[5].' </h4>
    </div>
  </div>';

 echo ' <div class="row" style="padding-top: 20px; padding-bottom: 20px">
    <div class="col-md-4 col-sm-4 col-xs-4"><strong>Nombres y Apellidos</strong></div>
    <div class="col-md-2 col-sm-2 col-xs-2"><strong>Cedula</strong></div>
    <div class="col-md-2 col-sm-2 col-xs-2"><strong>Asignacion</strong></div>
    <div class="col-md-2 col-sm-2 col-xs-2"><strong>Deduccion</strong></div>
    <div class="col-md-2 col-sm-2 col-xs-2"><strong>Total Neto</strong></div>
  </div>';

  echo '<div class="row">
    <div class="col-md-4 col-sm-4 col-xs-4">'.$empleado_r[2].' '.$empleado_r[3].'</div>
    <div class="col-md-4 col-sm-4 col-xs-4">'.$empleado_r[1].'</div>

  </div>';



     $partida_q = pg_query("SELECT cod_partida,partida,monto_nomina,tipo from nomina_final where cod_empleado=$cod_empleado");
     while ( $partida_r = pg_fetch_row($partida_q)) {
         echo '<div class="row">
                <div class="col-md-';   echo ($partida_r[3] == 'Asignacion') ? "6 col-sm-6 col-xs-6":"8 col-sm-8 col-xs-8"; echo '"style="margin-left: 30px">'.$partida_r[1].'</div>';

       if ($partida_r[3] == 'Asignacion') {
        echo '<div class="col-md-2 col-sm-2 col-xs-2">'.$partida_r[2].' Bs.</div>
          </div>';

      
      }

      if ($partida_r[3] == 'Deduccion' or $partida_r[3] == 'Credito') {

        echo '<div class="col-md-2 col-sm-2 col-xs-2">'.$partida_r[2].' Bs.</div>
          </div>';
      
      }
      }//fin mientras partida

$t_asignaciones = pg_query("SELECT Total_Asignacion from total_asignaciones where cod_empleado=$cod_empleado group by  Total_Asignacion");
$r_asignaciones = pg_fetch_row($t_asignaciones);

  echo '<div class="row" style="padding-top: 15px">
          <div class="col-md-6 col-sm-6 col-xs-6"><strong>Total Asignacion</strong></div>
          <div class="col-md-2 col-sm-2 col-xs-2">'.$r_asignaciones[0].' Bs.</div>
        </div>';

$t_deduccion = pg_query("SELECT Total_Deducciones from total_deducciones where cod_empleado=$cod_empleado group by  Total_Deducciones");
$r_deduccion = pg_fetch_row($t_deduccion);
if ($r_deduccion[0] !='') {
$deduccion = $r_deduccion[0];
}else{
$deduccion = 0;
}
  echo '<div class="row" style="padding-top: 15px">
          <div class="col-md-8 col-sm-8 col-xs-8" ><strong>Total Deduccion</strong></div>
          <div class="col-md-2 col-sm-2 col-xs-2">'.$deduccion.' Bs.</div>
        </div>';

$t_pago_neto = pg_query("SELECT total_neto from nomina_final where cod_empleado=$cod_empleado group by total_neto");
$r_pago_neto = pg_fetch_row($t_pago_neto);

if ($deduccion == 0) {

   $total_neto_a = $r_asignaciones[0];

}else{

    $total_neto_a=$r_pago_neto[0];

}



  echo '<div class="row" style="padding-top: 15px">
    <div class="col-md-10 col-sm-10 col-xs-10"><strong style="font-size: 14px">Total Neto</strong></div>
    <div class="col-md-2 col-sm-2 col-xs-2"><strong style="font-size: 14px">'.$total_neto_a.' Bs.</strong></div>
  </div>';
      } //fin mientras empleado
?>

<div class="row" style="padding:50px">
  <div class="col-md-12 text-center">
    <button type="button" id="imprimir" class="btn btn-primary btn-lg btn-block btn-success" onclick="window.print();"><i class="fa fa-print"></i> Imprimir</button>
  </div>
</div>

</div> <!-- FINAL DEL CONTAINER -->

<!-- jQuery -->
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap Core JavaScript -->
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- Metis Menu Plugin JavaScript -->
<script src="bower_components/metisMenu/dist/metisMenu.min.js"></script>
<!-- Custom Theme dataTable -->
<script src="dist/js/sb-admin-2.js"></script>
<!-- DataTables JavaScript -->
<script src="bower_components/datatables/media/js/jquery.dataTables.min.js"></script>
<script src="bower_components/datatables/media/js/dataTables.bootstrap.min.js"></script>
<!--X-editable-->
<script src="bower_components/editable/js/moment.min.js"></script> 
<script src="bower_components/editable/js/bootstrap-editable.js"></script>
<script src="bower_components/editable/js/select2.js"></script>  
<!-- Form Validate-->
<script src="bower_components/form_validate/jquery.validate.js"></script>
<script src="bower_components/form_validate/additional-methods.js"></script>
<!-- Perfect Scroll -->
<script src="app_js/perfect-scrollbar.jquery.min.js"></script>
<!-- App JS -->
<script src="app_js/funcion.js"></script>
<script src="app_js/jquery.uitablefilter.js"></script>
<script src="app_js/empleado.js"></script>
<script src="app_js/administracion.js"></script>
<script src="app_js/permisos.js"></script>
<script src="app_js/nomina.js"></script>
<script src="app_js/jspdf.min.js"></script>
<script src="app_js/html2canvas.min.js"></script>


</body>
</html>