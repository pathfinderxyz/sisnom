function obtener_fecha(){
  $.getJSON( "app_funcion.php", { "hora" : "hora", "fecha" : "fecha" } )
  .done(function( data, textStatus, jqXHR ) {
    $("#hora_app").html(data.hora);
    $("#fecha_app").html(data.fecha);
  }
  )
  .fail(function( jqXHR, textStatus, errorThrown ) {
    $("#hora_app").html("fallo: " +  textStatus);
    $("#fecha_app").html("fallo: " +  textStatus);
  });
}




