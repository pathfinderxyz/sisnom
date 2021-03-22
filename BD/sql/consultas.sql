
--LISTAR_EMPLEADOS
--DROP VIEW l_empleado cascade;
CREATE VIEW l_empleado as
select e.cod_empleado,
e.cedula,e.nombres,e.apellidos,e.fecha_nacimiento,e.fecha_ingreso,
extract(years from age(current_timestamp, e.fecha_nacimiento::timestamp))  as edad,
extract(years from age(current_timestamp, e.fecha_ingreso::timestamp))  as antiguedad,
e.direccion,e.telefonos,count(h.cod_hijo) as cantidad_hijos,
e.id_cargos,c.cargo,e.id_profesion,p.profesion,
e.id_tipo_nomina,t.tipo_nomina,e.id_banco,b.nombre_banco,e.id_unidad_administrativa,u.unidad_administrativa
from empleado e
left join cargo c on c.id_cargos=e.id_cargos
left join profesion p on p.id_profesion=e.id_profesion
left join hijo_empleado h on h.cod_empleado=e.cod_empleado
left join tipo_nomina t on t.id_tipo_nomina=e.id_tipo_nomina
left join banco b on b.id_banco=e.id_banco
left join unidad_administrativa u on u.id_unidad_administrativa=e.id_unidad_administrativa
group by e.cod_empleado,
e.cedula,e.nombres,e.apellidos,e.fecha_nacimiento,e.fecha_ingreso,edad,antiguedad,
e.direccion,e.telefonos,
e.id_cargos,c.cargo,e.id_profesion,p.profesion,e.id_tipo_nomina,t.tipo_nomina,e.id_banco,b.nombre_banco,e.id_unidad_administrativa,u.unidad_administrativa
order by cod_empleado;


select extract(years from age(current_timestamp, '2015-01-01'::timestamp))

--DETALLE NOMINA
--drop view detalle_nomina cascade;
create view detalle_nomina as
select n.cod_empleado,e.cedula,e.nombres,e.apellidos,n.cod_partida,
p.partida,p.tipo,
n.tipo_partida,n.monto_nomina,e.id_tipo_nomina,e.tipo_nomina,e.id_banco,e.nombre_banco,e.id_unidad_administrativa,e.unidad_administrativa
from nomina n
left join l_empleado e on e.cod_empleado=n.cod_empleado
left join partida p on p.cod_partida=n.cod_partida
order by e.id_unidad_administrativa,n.cod_empleado,n.cod_partida;


--ASIGNACIONES
--drop view total_asignaciones cascade;
create view total_asignaciones as
select cod_empleado,cedula,nombres,apellidos,id_tipo_nomina,tipo_nomina,id_banco,nombre_banco,id_unidad_administrativa,unidad_administrativa,sum(monto_nomina) as Total_Asignacion 
from detalle_nomina where tipo='Asignacion'
group by cod_empleado,cedula,nombres,apellidos,id_tipo_nomina,tipo_nomina,id_banco,nombre_banco,id_unidad_administrativa,unidad_administrativa
order by id_unidad_administrativa,cod_empleado;



--DEDUCCIONES
--DROP VIEW total_deducciones cascade;
create view total_deducciones as
select cod_empleado,cedula,nombres,apellidos,id_tipo_nomina,tipo_nomina,id_banco,nombre_banco,id_unidad_administrativa,unidad_administrativa,
sum(monto_nomina) as Total_Deducciones 
from detalle_nomina where tipo='Deduccion' or tipo='Credito'
group by cod_empleado,cedula,nombres,apellidos,id_tipo_nomina,tipo_nomina,id_banco,nombre_banco,id_unidad_administrativa,unidad_administrativa
order by id_unidad_administrativa,cod_empleado;


--NOMINAL FINAL
--DROP VIEW nomina_final;
create view nomina_final as
select dn.*, ta.total_asignacion,COALESCE (td.total_deducciones,0) as total_deduccion, COALESCE((ta.total_asignacion-td.total_deducciones),ta.total_asignacion) as total_neto from detalle_nomina dn 
left join total_asignaciones ta on dn.cod_empleado=ta.cod_empleado
left join total_deducciones td on td.cod_empleado=dn.cod_empleado;

--VER PARTIDAS DE NOMINA PARA CADA EMPLEADO

SELECT * from nomina_final where cod_empleado=1


--GENERAR NOMINA NORMAL
select * from nomina_final nm where nm.id_tipo_nomina='1' or nm.id_tipo_nomina='2' or 
nm.id_tipo_nomina='3' or nm.id_tipo_nomina='4' or nm.id_tipo_nomina='7'
order by id_tipo_nomina,id_unidad_administrativa,cod_empleado,cedula,cod_partida

-- EL LISTAR EN EL CUADRO
select nm.cod_empleado,nm.cedula, nm.nombres, nm.apellidos,nm.tipo_nomina,nm.nombre_banco,nm.total_neto
from nomina_final nm where nm.id_tipo_nomina='1' or nm.id_tipo_nomina='2' or 
nm.id_tipo_nomina='3' or nm.id_tipo_nomina='4' or nm.id_tipo_nomina='7'
group by nm.cod_empleado,nm.cedula, nm.nombres, nm.apellidos,nm.tipo_nomina,nm.nombre_banco,nm.total_neto

SELECT id_tipo_nomina FROM nomina_final group by id_tipo_nomina

--GENERAR NOMINA DE JUBILADOS Y PENSIONADOS
select njp.* from nomina_final njp where njp.id_tipo_nomina='5' or njp.id_tipo_nomina='6'
order by id_tipo_nomina,id_unidad_administrativa,cod_empleado,cedula,cod_partida

--GENERAR NOMINA
select * from nomina_final nm
order by id_tipo_nomina,id_unidad_administrativa,cod_empleado,cedula,cod_partida



select *
from nomina n
left join l_empleado e on e.cod_empleado=n.cod_empleado
left join partida p on p.cod_partida=n.cod_partida
left join tipo_nomina t on t.id_tipo_nomina=n.id_tipo_nomina
left join banco b on b.id_banco=n.id_banco
left join unidad_administrativa u on u.id_unidad_administrativa=n.id_unidad_administrativa
left join formula_partida f on f.cod_partida=p.cod_partida
order by n.id_unidad_administrativa,n.cod_empleado,n.cod_partida


---------------------INSERTAR BUSCAR ELIMINAR MODIFICAR-----------------------------
--BANCO
INSERT INTO banco (id_banco,nombre_banco)
    VALUES (((SELECT max(id_banco) FROM banco)+1),'Banco del Pueblo');
Buscar
SELECT * FROM banco order by id_banco

Eliminar
DELETE FROM banco WHERE id_banco=8;

Modificar
UPDATE banco set nombre_banco='Banco del Tesoro' where nombre_banco='Banco del Caribe';



--CARGOS
INSERT INTO cargos (cargo)
    VALUES ('Director de Turismo');

Buscar
SELECT * FROM cargos

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM cargos WHERE cargo='Alcalde Bolivariano';

Modificar
UPDATE cargos set cargo='Alcalde' where id_cargos=1;
    


--PERIODICIDAD
INSERT INTO periodicidad (periodicidad,dias)
    VALUES ('Semanal',7);

Buscar
SELECT * FROM periodicidad order by id_periodicidad

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM periodicidad WHERE periodicidad='Semanal';

Modificar
UPDATE periodicidad set periodicidad='Mensual' where id_periodicidad=2;

    

--PERMISOS
INSERT INTO permiso (permiso,dias_min,dias_max)
    VALUES ('ocho',0,0);

Buscar
SELECT * FROM permiso order by id_permiso

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM permiso WHERE permiso='Prueba';

Modificar
UPDATE permiso set permiso='Me Fui' where id_permiso=17;

    

--TIPOS DE NOMINA
INSERT INTO tipo_nomina (tipo_nomina)
    VALUES ('Desempleados');

Buscar
SELECT * FROM tipo_nomina order by id_tipo_nomina

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM tipo_nomina WHERE tipo_nomina='Desempleados';

Modificar
UPDATE tipo_nomina set tipo_nomina='Sin Real' where id_tipo_nomina=9;
    


--UNIDAD ADMINISTRATIVA
INSERT INTO unidad_administrativa (unidad_administrativa)
    VALUES ('Bus Macanao');

Buscar
SELECT * FROM unidad_administrativa order by id_unidad_administrativa

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM unidad_administrativa WHERE unidad_administrativa='Bus Macanao';

Modificar
UPDATE unidad_administrativa set unidad_administrativa='Vagos' where id_unidad_administrativa=19;



--USUARIOS
INSERT INTO usuarios (usuario,passwd,nivel)
    VALUES ('user','admin',2);

Buscar
SELECT * FROM usuarios order by id_usuario

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM usuarios WHERE usuario='user';

Modificar
UPDATE usuarios set usuario='Miguel Angel' where id_usuario=7;   



--PROFESION
INSERT INTO profesion (profesion)
    VALUES ('Analfabeta');

Buscar
SELECT * FROM profesion order by id_profesion

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM profesion WHERE profesion='Analfabeta';

Modificar
UPDATE profesion set profesion='Erudito' where id_profesion=11;   



--PARTIDA
INSERT INTO partida (partida,tipo,id_periodicidad,descripcion)
    VALUES ('Insulto a Miguel Angel','Deduccion',1,'falta de respeto al alcalde');

Buscar
SELECT * FROM partida order by cod_partida

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM partida WHERE cod_partida=37;

Modificar
UPDATE partida set partida='falta de respeto' where cod_partida=37;   
    


--NUMERO DE CUENTA
INSERT INTO  numero_cuenta (id_banco,cod_empleado,numero_cuenta)
    VALUES (1,8,'0103051234567890');

Buscar
SELECT * FROM numero_cuenta order by cod_empleado

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM numero_cuenta WHERE cod_empleado=8;

Modificar
UPDATE numero_cuenta set numero_cuenta='123456778897654' where cod_empleado=8;  



--FORMULA DE LAS PARTIDAS
INSERT INTO  formula_partida (cod_partida,descripcion_partida,descripcion_formula,formula)
    VALUES (37,'se le descuenta el sueldo','todos los insultos de cuenta','cant_insultos/sueldo_base');


Buscar
SELECT * FROM formula_partida order by id_formula

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM formula_partida WHERE descripcion_partida='se le descuenta el sueldo';

Modificar
UPDATE formula_partida set formula='cant_insultos/sueldo_base' where descripcion_partida='se le descuenta el sueldo';  


--HIJO DE LOS EMPLEADOS
INSERT INTO  hijo_empleado (cod_hijo,cod_empleado,nivel_estudio,cedula_fecha_nacimiento,nombres,apellidos)
    VALUES (nextval('hijo_empleado_cod_hijo_seq'::regclass),1,1,'2016-10-28','Mia Urimare','Cortesia Escobar');

Buscar
SELECT * FROM hijo_empleado order by cod_hijo

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM hijo_empleado WHERE nombres='Mia Urimare';

Modificar
UPDATE hijo_empleado set nombres='Matias Agustin' where cod_empleado=1;  



--PERMISOS DE LOS EMPLEADOS
INSERT INTO  permiso_empleado (id_permiso,cod_empleado,fecha_inicio,fecha_final)
    VALUES (17,1,'2016-12-30','2017-10-28');


Buscar
SELECT * FROM permiso_empleado order by id_permiso

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM permiso_empleado WHERE cod_empleado=1;

Modificar
UPDATE permiso_empleado set fecha_final='2018-10-28' where cod_empleado=1;  




--EMPLEADOS
INSERT INTO  empleado (id_cargos,id_profesion,cedula,nombres,apellidos,fecha_nacimiento,fecha_ingreso,direccion,telefonos)
    VALUES (8,6,'19016737','Oriana','Escobar','1989-04-24','2012-12-12','calle doña isabel, porlamar','042461999909');


Buscar
SELECT * FROM empleado order by cod_empleado

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM empleado WHERE cedula='19016737';

Modificar
UPDATE empleado set id_cargos=2 where cedula='19016737';  


--NOMINAS DE LOS EMPLEADOS
INSERT INTO  nomina (cod_empleado,cod_partida,id_tipo_nomina,id_banco,id_unidad_administrativa,tipo_partida,monto_nomina)
    VALUES (13,1,4,4,10,'FIJA',20000);

Buscar
SELECT * FROM nomina order by cod_empleado,cod_partida

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM nomina WHERE cedula='19016737';

Modificar
UPDATE nomina set monto_nomina=25000 where cod_empleado=13;  


PAGOS DE LOS EMPLEADOS
INSERT INTO  pago select n.cod_empleado,n.cod_partida,n.id_tipo_nomina,n.id_banco,n.id_unidad_administrativa,monto_nomina,'2016-01-15' as fecha_pago FROM nomina n

Buscar
SELECT * FROM pago order by fecha_pago,cod_empleado,cod_partida

-- NO SE PUEDE Eliminar A MENOS QUE SEA EN CASCADA
DELETE FROM pago WHERE fecha_pago='2016-01-15';

Modificar
UPDATE pago set fecha_pago='2016-06-15' where fecha_pago='2016-01-15';








--PRIMERO PREGUNTO LOS EMPLEADOS QUE TIENEN CREDITO
COD_EMPLEADO_CREDITO == select cod_empleado from nomina where tipo_partida='CREDITO'

--LUEGO CON UN MIETRAS VOY ELIMINANDO LOS CREDITOS QUE ESTEN EN CERO DE LA NOMINA

select cod_empleado from credito_empleado where cant_cuotas_restantes <=0 and cod_empleado=1
delete from nomina where tipo_partida='CREDITO' and cod_empleado=16

--PARA SABER CUANTO VA EN EL MONTO DE LA NOMINA EN EL CREDITO
SELECT (monto_credito/cant_de_cuotas) as monto_nomina_credito from credito_empleado where cod_empleado=1 and cant_cuotas_restantes>0 and cod_partida=15

--CONSULTA HIJO EMPLEADOS
drop view hijo_empleado_v
create view hijo_empleado_v as
select h.cod_hijo,h.cod_empleado,e.nombres as nombre_padre, e.apellidos as apellido_padre,h.nivel_estudio,p.profesion,h.nombres,h.apellidos,h.cedula_fecha_nacimiento from hijo_empleado h
left join empleado e on e.cod_empleado=h.cod_empleado
left join profesion p on p.id_profesion=h.nivel_estudio

select * from hijo_empleado_v where cod_empleado=1

select * from partida p
left join periodicidad pe on p.id_periodicidad=pe.id_periodicidad

select * from formula_partida fp
left join partida p on fp.cod_partida=p.cod_partida

drop view numero_cuenta_v
create view numero_cuenta_v as
select n.id_banco,n.cod_empleado,n.numero_cuenta, e.cedula,e.nombre_banco,e.nombres 
from numero_cuenta n 
left join l_empleado e on e.cod_empleado=n.cod_empleado

select * from numero_cuenta n 
left join l_empleado e on e.cod_empleado=n.cod_empleado

create view partida_v as 
select p.*,pe.periodicidad from partida p
left join periodicidad pe on p.id_periodicidad=pe.id_periodicidad

create view formula_partida_v as
select f.*,p.partida from formula_partida f
left join partida p on p.cod_partida=f.cod_partida

--Permisos Finalizados
drop view permisos_v cascade

create view permiso_v as
select p.id_permiso,pe.permiso,p.cod_empleado,e.cedula,e.nombres,p.fecha_inicio,p.fecha_final
from permiso_empleado p
left join empleado e on p.cod_empleado=e.cod_empleado
left join permiso pe on pe.id_permiso=p.id_permiso

create view permiso_finalizado as
select * from permiso_empleado where fecha_final::DATE>(select NOW()::DATE)

create view permiso_tabla as
select pv.id_permiso,pv.permiso,pv.cod_empleado,pv.cedula,pv.nombres,pv.fecha_inicio,pv.fecha_final, COALESCE(pf.cod_empleado,0) as finalizado
from permiso_v pv
left join permiso_finalizado pf on pv.cod_empleado=pf.cod_empleado and pv.fecha_final=pf.fecha_final and pv.id_permiso=pf.id_permiso and pv.fecha_inicio=pf.fecha_inicio
order by pv.cod_empleado,pv.fecha_inicio

select * from permiso_tabla

--INSERTAR PARTIDAS FIJAS
--SUELDO BASE 
INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina)
    VALUES (2,1,'FIJA',15000);

INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina)
    VALUES (2,2,'FIJA',15000); 

INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina)
    VALUES (2,3,'FIJA',15000); 

INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina)
    VALUES (2,4,'FIJA',15000); 
    
INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina)
    VALUES (2,5,'FIJA',15000); 
    
INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina)
    VALUES (2,10,'FIJA',15000); 
    
INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina)
    VALUES (2,11,'FIJA',15000); 
    
INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina)
    VALUES (2,12,'FIJA',15000); 
    
INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina)
    VALUES (2,13,'FIJA',15000); 

INSERT INTO  nomina (cod_empleado,cod_partida,tipo_partida,monto_nomina)
    VALUES (2,14,'FIJA',15000); 
    


DELETE FROM nomina WHERE cod_empleado=2


SELECT descripcion_partida,cod_partida,formula from formula_partida 
where id_formula=19 or id_formula=20 
or id_formula=21 or id_formula=22 
or id_formula=33 or id_formula=34 
or id_formula=35 or id_formula=36 or 
id_formula=61 ORDER BY id_formula

SELECT monto_nomina from nomina where cod_empleado=2 and cod_partida=1

select p.cod_partida,p.partida,p.tipo,fp.formula from partida p
left join formula_partida fp on fp.cod_partida=p.cod_partida
order by p.cod_partida

create view formula_partida_nomina as 
SELECT f.id_formula,p.cod_partida,f.descripcion_partida,f.descripcion_formula,f.formula,p.tipo from formula_partida f
left join partida p on f.cod_partida=p.cod_partida order by id_formula

drop view guardar_pago
create view guardar_pago as
select n.cod_empleado,n.cod_partida,e.id_tipo_nomina,e.id_banco,e.id_unidad_administrativa,n.monto_nomina,e.cedula,e.nombres,e.apellidos
from nomina n
left join empleado e on e.cod_empleado=n.cod_empleado

create view guardar_pago_especial as
select n.cod_empleado,n.cod_partida,e.id_tipo_nomina,e.id_banco,e.id_unidad_administrativa,n.monto_nomina,e.cedula,e.nombres,e.apellidos
from nomina_especial n
left join empleado e on e.cod_empleado=n.cod_empleado
 
select * from guardar_pago_especial where cod_partida = 9

select * from detalle_pago where periodo_inicio='2016-04-14'

select * from pago order by cod_empleado, cod_partida

INSERT INTO pago select cod_empleado,cod_partida,id_tipo_nomina,id_banco,id_unidad_administrativa,monto_nomina,CURRENT_DATE as 
fecha_pago,cedula,nombres,apellidos from guardar_pago where id_tipo_nomina = 3 or id_tipo_nomina = 4 or id_tipo_nomina = 5

delete from pago where id_tipo_nomina=4 and fecha_pago='2016-04-03'
-------DETALLES PAGOS
drop view detalle_pago cascade
create view detalle_pago as
select n.cod_empleado,n.cedula,n.nombres,n.apellidos,n.cod_partida,
p.partida,p.tipo,
n.monto_pago,tn.id_tipo_nomina,tn.tipo_nomina,b.id_banco,b.nombre_banco,ua.id_unidad_administrativa,ua.unidad_administrativa,
n.fecha_pago,n.periodo_inicio,n.periodo_final
from pago n
left join tipo_nomina tn on tn.id_tipo_nomina=n.id_tipo_nomina
left join banco b on b.id_banco=n.id_banco
left join unidad_administrativa ua on ua.id_unidad_administrativa=n.id_unidad_administrativa
left join partida p on p.cod_partida=n.cod_partida
order by ua.id_unidad_administrativa,n.cod_empleado,n.cod_partida;

select * from pago


--ASIGNACIONES
--drop view total_asignaciones_pago cascade;
create view total_asignaciones_pago as
select cod_empleado,cedula,nombres,apellidos,id_tipo_nomina,tipo_nomina,id_banco,nombre_banco,id_unidad_administrativa,
unidad_administrativa,sum(monto_pago) as Total_Asignacion_pago,fecha_pago,periodo_inicio,periodo_final
from detalle_pago where tipo='Asignacion'
group by cod_empleado,cedula,nombres,apellidos,id_tipo_nomina,
tipo_nomina,id_banco,nombre_banco,id_unidad_administrativa,unidad_administrativa,fecha_pago,periodo_inicio,periodo_final 
order by id_unidad_administrativa,cod_empleado;


select total_asignacion_pago from total_asignaciones_pago where cod_empleado=6 and periodo_inicio='2016-04-14'

--DEDUCCIONES
--DROP VIEW total_deducciones_pago cascade;
create view total_deducciones_pago as
select cod_empleado,cedula,nombres,apellidos,id_tipo_nomina,tipo_nomina,id_banco,nombre_banco,id_unidad_administrativa,unidad_administrativa,
sum(monto_pago) as Total_Deduccion_pago,fecha_pago,periodo_inicio,periodo_final
from detalle_pago where tipo='Deduccion' or tipo='Credito'
group by cod_empleado,cedula,nombres,apellidos,id_tipo_nomina,tipo_nomina,id_banco,nombre_banco,id_unidad_administrativa,unidad_administrativa,fecha_pago,periodo_inicio,periodo_final
order by id_unidad_administrativa,cod_empleado;

select COALESCE(Total_Deduccion_pago,0) as total from total_deducciones_pago where periodo_inicio='2016-04-14'
DELETE FROM nomina_especial where cod_partida=1

--NOMINAL FINAL
--DROP VIEW nomina_final;
create view pago_final as
select dn.*, ta.Total_Asignacion_pago,COALESCE (td.Total_Deduccion_pago,0) as total_deduccion_pago, 
COALESCE((ta.Total_Asignacion_pago-td.Total_Deduccion_pago),ta.Total_Asignacion_pago) as total_neto_pago 
from detalle_pago dn 
left join total_asignaciones_pago ta on dn.cod_empleado=ta.cod_empleado
left join total_deducciones_pago td on td.cod_empleado=dn.cod_empleado;

SELECT total_neto_pago from pago_final where cod_empleado=6
and periodo_inicio='2016-04-14' and periodo_final='2016-04-14' 
and fecha_pago='2016-04-14' and id_tipo_nomina=3
group by total_neto_pago


select id_tipo_nomina,tipo_nomina,fecha_pago,periodo_inicio,periodo_final
from pago_final
group by id_tipo_nomina,tipo_nomina,fecha_pago,periodo_inicio,periodo_final
order by id_tipo_nomina


-----VACACIONES VENCIDAS AÑOS VENCIDOS

--CANTIDAD DE AÑOS PAGADOS
drop view vacaciones_pagados
create view vacaciones_pagados as
SELECT cod_empleado,cod_partida,date_part('year', periodo_inicio) as anos_pagados
FROM pago where cod_partida=7  or cod_partida=17
group by anos_pagados,cod_empleado,cod_partida
 -----CONTAR AÑOS PAGADOS PARA RESTAR A LOS AÑOS VENCIDOS
 ---PARA LA FORMULA
SELECT COALESCE (count(anos_pagados),0) from vacaciones_pagados where cod_empleado=5


----- PERSONAS CON TODOS LOS AÑÑOS PAGADOS
CREATE VIEW todas_vacaciones_pagadas as
SELECT cod_empleado,cod_partida,date_part('year', periodo_inicio) as anos_pagados
FROM pago where cod_partida=18
group by anos_pagados,cod_empleado,cod_partida

SELECT COALESCE (count(anos_pagados),0) from todas_vacaciones_pagadas where cod_empleado=5


---AÑOS SIN PAGAR
drop view anos_vencidos
create view anos_vencidos as
select p.cod_empleado,p.cedula,p.nombres,p.apellidos, date_part('year', p.periodo_inicio) as anos from pago p where cod_partida<>18
group by p.cod_empleado,p.cedula,p.nombres,p.apellidos,anos
order by cod_empleado,anos

drop view pago_vacaciones cascade
create view pago_vacaciones as
select cod_partida,cod_empleado,cod_partida as tipo_vacaciones from pago where cod_partida=18 or cod_partida=17 or cod_partida=7

select p.cod_empleado,p.cedula,p.nombres,p.apellidos, count(anos) anos_v, COALESCE (pv.cod_partida,0)as pagado,COALESCE (pv.tipo_vacaciones,0) as tipo_vacaciones
from anos_vencidos p
left join pago_vacaciones pv on pv.cod_empleado=p.cod_empleado
group by pv.tipo_vacaciones,p.cod_empleado,p.cedula,p.nombres,p.apellidos,pagado

select p.cod_empleado,p.cedula,p.nombres,p.apellidos,p.cod_partida, date_part('year', p.fecha_pago) as anos_pago
from pago p 
where cod_partida=18 or cod_partida=17 or cod_partida=7
group by p.cod_empleado,p.cedula,p.nombres,p.apellidos,anos_pago,p.cod_partida order by cod_empleado,anos_pago,p.cod_partida

SELECT p.cod_empleado,p.cedula,p.nombres,p.apellidos, count(anos) anos_v, COALESCE (cod_partida,0)as pagado 
from anos_vencidos p 
left join pago_vacaciones pv on pv.cod_empleado=p.cod_empleado 
group by p.cod_empleado,p.cedula,p.nombres,p.apellidos,pv.cod_partida

-----------NOMINA ESPECIAL
--DETALLE NOMINA ESPECIAL
--drop view detalle_nomina_especial cascade;
create view detalle_nomina_especial as
select n.cod_empleado,e.cedula,e.nombres,e.apellidos,n.cod_partida,
p.partida,p.tipo,
n.tipo_partida,n.monto_nomina,e.id_tipo_nomina,e.tipo_nomina,e.id_banco,e.nombre_banco,e.id_unidad_administrativa,e.unidad_administrativa
from nomina_especial n
left join l_empleado e on e.cod_empleado=n.cod_empleado
left join partida p on p.cod_partida=n.cod_partida
order by e.id_unidad_administrativa,n.cod_empleado,n.cod_partida;

SELECT nm.cod_empleado,nm.cedula, nm.nombres, nm.apellidos,nm.tipo_nomina,nm.nombre_banco,nm.monto_nomina
from detalle_nomina_especial nm where cod_partida=9
group by nm.cod_empleado,nm.cedula, nm.nombres, nm.apellidos,nm.tipo_nomina,nm.nombre_banco,nm.monto_nomina



----INSERTAR TIPO DE NOMINA EN NOMINA ESPECIAL
DELETE FROM nomina_especial
select * from nomina_especial
insert into nomina_especial select cod_empleado,cod_partida,tipo_partida,monto_nomina from nomina_final where id_tipo_nomina=7 and cod_partida=1

select cod_empleado from nomina_especial where cod_empleado not in (SELECT cod_empleado FROM nomina_especial where cod_partida=9)
SELECT cod_empleado FROM nomina_especial where cod_partida=9


-----ELIMINAR EMPLEADO TIPO DE NOMINA ESPECIAL

DELETE FROM nomina_especial where cod_empleado=2

SELECT id_tipo_nomina FROM detalle_nomina_especial group by id_tipo_nomina

select monto_nomina from nomina where tipo_partida='CREDITO' and cod_empleado=5
select monto_actual from credito_empleado
select (8000/4)*4 as operacion
UPDATE credito_empleado set monto_actual=((monto_credito/cant_de_cuotas)*cant_cuotas_restantes)

select c.cod_partida,p.partida,c.cod_empleado,e.nombres,e.apellidos,c.fecha_credito,c.monto_credito,c.monto_actual,c.cant_de_cuotas,cant_cuotas_restantes
from credito_empleado c
left join empleado e on c.cod_empleado=e.cod_empleado
left join partida p on p.cod_partida=c.cod_partida

select cod_empleado,cedula,nombres,apellidos,fecha_pago,periodo_inicio,periodo_final from detalle_pago where cedula='19682712'
group by cod_empleado,cedula,nombres,apellidos,fecha_pago,periodo_inicio,periodo_final
order by periodo_final

delete from nomina_especial where cod_partida=1
-------CUADRO PARA LOS PAGOS DE LAS PARTIDAS

SELECT cod_partida, partida, count(cod_empleado) as total_integrantes, sum(monto_pago) as total_pagado,fecha_pago,periodo_inicio,periodo_final 
FROM detalle_pago 
WHERE cod_partida=1
group by cod_partida, partida, fecha_pago,periodo_inicio,periodo_final

----------CUADRO PARA CUANDO ES PARTIDA
drop view credito_historial
create view credito_historial as
select h.cod_partida,pa.partida,count(h.cod_empleado) as total_integrantes, sum(h.monto_credito) as total_pagado, h.fecha_credito
from historial_credito h
left join partida pa on pa.cod_partida=h.cod_partida
group by h.cod_partida,pa.partida, h.fecha_credito

select * from credito_historial where cod_partida=

select cod_partida,partida,count(cod_empleado) as integrantes, sum(monto_pago) as total_pago, id_tipo_nomina, tipo_nomina, id_banco, nombre_banco,periodo_inicio,periodo_final
from detalle_pago where cod_partida=1 and fecha_pago='2016-04-05' and periodo_inicio='2016-04-01' and periodo_final='2016-04-15' 
and id_tipo_nomina=3 and id_banco=3
group by cod_partida,partida, id_tipo_nomina, tipo_nomina, id_banco, nombre_banco,periodo_inicio,periodo_final

---- LISTAR TIPOS DISPONIBLES
select id_tipo_nomina, tipo_nomina
from detalle_pago where cod_partida=1 and fecha_pago='2016-04-05' and periodo_inicio='2016-04-01' and periodo_final='2016-04-15' 
group by id_tipo_nomina, tipo_nomina

------LISTAR BANCOS DISPONIBLES
select id_banco, nombre_banco
from detalle_pago where cod_partida=1 and fecha_pago='2016-04-05' and periodo_inicio='2016-04-01' and periodo_final='2016-04-15' 
group by id_banco, nombre_banco


select * from pago_final where periodo_inicio='2016-04-14' 
and periodo_final='2016-04-14' and fecha_pago='2016-04-14' and cod_empleado=6

Copy (select * from usuario) To 'C:/xampp/htdocs/Nomina_Alcaldia/BD/csv/usuarios.csv' With CSV DELIMITER ';' Header;