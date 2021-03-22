select cod_partida from nomina where cod_empleado=4

select formula from formula_partida where cod_partida in (select cod_partida from nomina where cod_empleado=4)

UPDATE nomina set monto_nomina= where cod_empleado=4 and cod_partida in (select cod_partida from nomina where cod_empleado=4)


SELECT ne.cedula,n.numero_cuenta,ne.total_neto FROM numero_cuenta n
left join nomina_final ne on ne.cod_empleado=n.cod_empleado
group by ne.cedula,n.numero_cuenta,ne.total_neto

Copy (
SELECT ne.cedula,n.numero_cuenta,ne.total_neto FROM numero_cuenta n
left join nomina_final ne on ne.cod_empleado=n.cod_empleado
group by ne.cedula,n.numero_cuenta,ne.total_neto

) To 'C:\xampp\htdocs\Nomina_Alcaldia\Nomina_Alcaldia\BD\archivos_bancos\nomina\archivo_banco.csv' With CSV DELIMITER ';' Header;

Copy (
SELECT ne.cedula,n.numero_cuenta,ne.monto_nomina,ne.cod_partida FROM numero_cuenta n
left join detalle_nomina_especial ne on ne.cod_empleado=n.cod_empleado
group by ne.cedula,n.numero_cuenta,ne.monto_nomina,ne.cod_partida
) To 'C:/xampp/htdocs/Nomina_Alcaldia/Nomina_Alcaldia/BD/archivos_bancos/nomina_especial/archivo_banco.csv' With CSV DELIMITER ';' Header;

drop view nomina_numero_cuenta
create view nomina_numero_cuenta as 
SELECT ne.cedula,n.numero_cuenta,ne.monto_nomina,ne.cod_partida FROM numero_cuenta n
left join detalle_nomina_especial ne on ne.cod_empleado=n.cod_empleado
group by ne.cedula,n.numero_cuenta,ne.monto_nomina,ne.cod_partida

SELECT * FROM nomina_numero_cuenta where cedula <>'' and cod_partida=9
