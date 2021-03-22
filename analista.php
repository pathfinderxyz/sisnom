<?php
if (!isset($_SESSION)) {
  session_start();
}
if (!$_SESSION['autorizado']) {
  header("Location: login.php");
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="Sistema de Nomina">
  <meta name="Jose Cortesia">
  <title>SISNOM</title>
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
<!--   <link href='https://fonts.googleapis.com/css?family=Lobster|Pacifico' rel='stylesheet' type='text/css'>
-->  
<link rel=icon href='img/favicon.ico' type="image/vnd.microsoft.icon">
</head>
<body onload="setInterval(obtener_fecha,1000);">
  <div id="wrapper">
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
      <div class="logo_cont">
        <img src="img/logo_alcaldia.png" class="img-thumbnail logo_alcadia" alt="logo_alcaldia">
      </div>
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="sr-only">Navegaci&oacute;n</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" style="padding-left: 5px; font-family: 'Lobster', cursive;" href="">Sistema de Nomina</a>
      </div>
      <!-- /.navbar-header -->
      <ul class="nav navbar-top-links navbar-right navbar-nav">
       <li class="fecha_app hidden-xs" id="fecha_app">Lunes, 15 de Junio del 2015</li>
       <li class="hora_app hidden-xs" id="hora_app"> &nbsp;08:09:54 PM</li>
       <!-- /.dropdown -->
       <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
          <i class="fa fa-user fa-fw"></i><span> <?php echo $_SESSION['usuario']; ?> </span><i class="fa fa-caret-down"></i>
        </a>
        <ul class="dropdown-menu dropdown-user">
          <li><a href="salir.php"><i class="fa fa-sign-out fa-fw"></i> Salir</a>
          </li>
        </ul>
        <!-- /.dropdown-user -->
      </li>
      <!-- /.dropdown -->
    </ul>
    <!-- /.navbar-top-links -->
    <div class="navbar-default sidebar" role="navigation">
      <div class="sidebar-nav navbar-collapse">
        <ul class="nav" id="side-menu" >
          <li class="header">
            <div class="bienvenido_box">
              <i class="fa  fa-user"></i>
              <span class="bienvenido">Bienvenido (a): </span>
            </div>
            <div class="usuario_box">
              <span class="bienvenido"><?php echo $_SESSION['usuario']; ?></span>
            </div>
          </li>
          <!--Archivo -->
          <li>
            <a href="#"><i class="fa fa-archive fa-fw"></i> Archivo<span class="fa arrow"></a>
            <ul class="nav nav-second-level">
              <li>
                <a href="#" onclick="administracion()">Administraci&oacuten</a>
              </li>
            </ul>
            <!-- /.nav-second-level -->
          </li>
          <!--Transacciones -->
          <li>
            <a href="#"><i class="fa fa-fax fa-fw"></i> Transacciones<span class="fa arrow"></span></a>
            <ul class="nav nav-second-level">
              <li>
                <a href="#" onclick="listar_nomina();">N&oacutemina</a>
              </li>
              <li>
                <a href="#" onclick="pagos();">Pagos</a>
              </li>
              <li>
                <a href="#" onclick="vacaciones();">Vacaciones</a>
              </li>
              <li>
                <a href="#" onclick="nomina_especial();">Aguinaldos</a>
              </li>
              <li>
                <a href="#" onclick="creditos();">Cr&eacuteditos</a>
              </li>
            </ul>
            <!-- /.nav-second-level -->
          </li>
          <!-- Varios -->
          <li>
            <a href="#"><i class="fa fa-files-o fa-fw"></i> Varios<span class="fa arrow"></span></a>
            <ul class="nav nav-second-level">
              <li>
                <a href="#" onclick="base_datos();">Base de Datos</a>
              </li>
              <li>
                <a data-toggle="modal" href="#modal_calculadora" onclick="calculadora();" >Calculadora</a>
              </li>
            </ul>
            <!-- /.nav-second-level -->
          </li>
        </ul>
      </div>
      <!-- /.sidebar-collapse -->
    </div>
    <!-- /.navbar-static-side -->
  </nav>
  <!-- Page Content -->
  <div id="page-wrapper" align="">
    <div id="inicio" class="container">
      <div class="row">
        <div class="col-md-12">
          <img src="img/logo_alcaldia_.png" alt="logo_alcadia_.png" style="opacity: 0.5; padding-top: 125px" class="img-responsive center-block">
        </div>        
      </div>
    </div>
    <!-- DIV PARA EMPLEADOS -->
    <div id="Empleados"></div>
    <div id="modal_editar"></div>
    <div id="modal_ver"></div>
    <div id="modal_incluir_empleado"></div>
    <div id="modal_hijo"></div>
    <div id="editar_hijo"></div>
    <!-- FIN  DEL DIV PARA EMPLEADOS -->
    <!-- DIV PARA administracion -->
    <div id="administracion"></div>
    <div id="editar_banco"></div>
    <div id="editar_cargo"></div>
    <div id="editar_profesion"></div>
    <div id="editar_unidad_administrativa"></div>
    <div id="editar_tipo_nomina"></div>
    <div id="editar_partida"></div>
    <div id="editar_formula"></div>
    <div id="editar_periodicidad"></div>
    <div id="editar_numero_cuenta"></div>
    <div id="editar_permiso"></div>
    <div id="editar_usuario"></div>
    <!-- DIV PARA permisos -->
    <div id="permisos"></div>
    <div id="modal_permisos_empleado"></div>
    <div id="editar_permiso_empleado"></div>
    <!-- DIV PARA NOMINA -->
    <div id="listar_nomina"></div>
    <div id="ver_nomina_empleado"></div>
    <div id="editar_sueldo_base"></div>
    <div id="agregar_partida_individual"></div>
    <div id="eliminar_partida_individual"></div>
    <!-- DIV PARA PAGO -->
    <div id="listar_pagos"></div>
    <div id="guardar_nomina_periodo"></div>
    <!-- DIV PARA VACACIONES -->
    <div id="vacaciones"></div>
    <div id="ver_vacaciones_vencidas"></div>
    <!-- DIV PARA NOMINA ESPECIAL -->
    <div id="nomina_especial"></div>
    <div id="guardar_nomina_periodo_especial"></div>
    <!-- DIV PARA CREDITOS -->
    <div id="creditos"></div>
    <!-- DIV PARA NOMINA EMPLEADOS -->
    <div id="nomina_empleados"></div>
    <div id="listar_pagos_empleados"></div>
    <!-- DIV PARA NOMINA EMPLEADOS -->
    <div id="nomina_partidas"></div>
    <div id="listar_nomina_partidas"></div>
    <div id="ver_nomina_partidas"></div>
    <!-- FIN  DEL DIV PARA administracion -->
    <div id="base_datos"></div>
    <div id="calculadora"></div>

  </div>
  <!-- /#page-wrapper -->
</div>
<!-- /#wrapper -->
<footer class="main-footer2">
  <div class="hidden-xs">
    <i class="fa fa-copyright"></i><b>Todos lo derechos reservados</b>
  </div>
</footer> 
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
<script src="app_js/pagos.js"></script>
<script src="app_js/vacaciones.js"></script>
<script src="app_js/nomina_especial.js"></script>
<script src="app_js/creditos.js"></script>
<script src="app_js/nomina_empleado.js"></script>
<script src="app_js/nomina_partida.js"></script>
<script src="app_js/calculadora.js"></script>
<script src="app_js/base_datos.js"></script>


</body>
</html>
