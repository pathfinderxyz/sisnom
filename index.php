<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>SISREV</title>

    <!-- Bootstrap Core CSS -->
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

    </head>

    <body>

        <div class="container">
            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <div class="login-panel panel panel-default">
                        <div class="panel-heading">
                              <div class="row">
                              <div class="col-md-8 col-xs-8" style="margin-top: 12px">
                                  <h4>Sistema de Nomina</h4>
                              </div>
                                      
                              </div>
                        </div>
                        <div class="panel-body">
                            <form role="form" id="form_login">
                                <fieldset>
                                    <div class="form-group">
                                        <input class="form-control" placeholder="Usuario" id="user" name="user" type="text" autofocus>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" placeholder="Password" id="pass" name="pass" type="password" value="">
                                    </div>

                                    <div id="alert" class="alert alert-danger" style="display:none">
                                        <span style="aling=center">Hay Campos Vacios</span>
                                    </div>

                                    <div id="alert2" class="alert alert-danger" style="display:none">
                                        <span style="aling=center">Usuario Invalido</span>
                                    </div>
                                    <!-- Change this to a button or input when using this as a form -->
                                    <button type="button" id="entrar" class="btn btn-lg btn-success btn-block">Ingresar</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
             <footer class="main text-center">
                 <strong>Sisnom 2017 &copy;</strong>Todos los derechos reservados <br> Diseñado por <a href="http://www.gnusistemas.com.ve">Gnusistemas</a>
             </footer>
        </div>

        <!-- jQuery -->
        <script src="bower_components/jquery/dist/jquery.min.js"></script>

        <!-- Bootstrap Core JavaScript -->
        <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

        <!-- Metis Menu Plugin JavaScript -->
        <script src="bower_components/metisMenu/dist/metisMenu.min.js"></script>

        <!-- Custom Theme JavaScript -->
        <script src="dist/js/sb-admin-2.js"></script>
        <script src="app_js/login.js"></script>

    </body>

    </html>
