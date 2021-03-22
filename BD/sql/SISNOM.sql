DROP TABLE usuario CASCADE;

CREATE TABLE usuario (
id_usuario SERIAL NOT NULL,
usuario VARCHAR (30) NOT NULL,
passwd VARCHAR(255) NOT NULL,
nivel INTEGER NOT NULL,
primary key (id_usuario)
);

select *  from usuario;
COPY usuario FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\usuarios.csv' DELIMITER ';' Header CSV;
--Copy (select * from usuarios) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\usuarios.csv' With CSV DELIMITER ';' Header;



DROP TABLE banco CASCADE;

CREATE TABLE banco (
id_banco SERIAL NOT NULL,
nombre_banco VARCHAR (30) NOT NULL,
primary key (id_banco)
);

select *  from banco;
COPY banco FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\banco.csv' DELIMITER ';' Header CSV;
--Copy (select * from banco) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\banco.csv' With CSV DELIMITER ';' Header;


DROP TABLE tipo_nomina CASCADE;

CREATE TABLE tipo_nomina (
id_tipo_nomina SERIAL NOT NULL,
tipo_nomina VARCHAR (30) NOT NULL,
primary key (id_tipo_nomina)
);

select *  from tipo_nomina;
COPY tipo_nomina FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\tipo_nomina.csv' DELIMITER ';' Header CSV;
--Copy (select * from tipo_nomina) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\tipo_nomina.csv' With CSV DELIMITER ';' Header;


DROP TABLE unidad_administrativa CASCADE;

CREATE TABLE unidad_administrativa (
id_unidad_administrativa SERIAL NOT NULL,
unidad_administrativa VARCHAR (50) NOT NULL,
primary key (id_unidad_administrativa)
);
select *  from unidad_administrativa;
COPY unidad_administrativa FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\unidad_administrativa.csv' DELIMITER ';' Header CSV;
--Copy (select * from unidad_administrativa) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\unidad_administrativa.csv' With CSV DELIMITER ';' Header;


DROP TABLE periodicidad CASCADE;

CREATE TABLE periodicidad (
id_periodicidad SERIAL NOT NULL,
periodicidad VARCHAR (30) NOT NULL,
dias INTEGER NOT NULL,
primary key (id_periodicidad)
);

select *  from periodicidad;
COPY periodicidad FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\periodicidad.csv' DELIMITER ';' Header CSV;
--Copy (select * from periodicidad) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\periodicidad.csv' With CSV DELIMITER ';' Header;



DROP TABLE partida CASCADE;

CREATE TABLE partida (
cod_partida SERIAL NOT NULL,
partida VARCHAR (50) NOT NULL,
tipo VARCHAR (12) NOT NULL,
id_periodicidad INTEGER NOT NULL,
descripcion TEXT,
primary key (cod_partida),
foreign key (id_periodicidad) references periodicidad (id_periodicidad) ON DELETE CASCADE ON UPDATE CASCADE
);

select *  from partida;
COPY partida FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\partida.csv' DELIMITER ';' Header CSV;
--Copy (select * from partida) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\partida.csv' With CSV DELIMITER ';' Header;



DROP TABLE formula_partida CASCADE;

CREATE TABLE formula_partida (
id_formula SERIAL NOT NULL,
cod_partida INTEGER NOT NULL,
descripcion_partida VARCHAR (255),
descripcion_formula VARCHAR (255),
formula VARCHAR(255),
primary key (id_formula),
foreign key (cod_partida) references partida (cod_partida) ON DELETE CASCADE ON UPDATE CASCADE
);

select *  from formula_partida;
COPY formula_partida FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\formula_partida.csv' DELIMITER ';' Header CSV;
--Copy (select * from formula_partida) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\formula_partida.csv' With CSV DELIMITER ';' Header;


DROP TABLE permiso CASCADE;

CREATE TABLE permiso (
id_permiso SERIAL NOT NULL,
permiso VARCHAR (50) NOT NULL,
dias_min int NOT NULL,
dias_max int NOT NULL,
primary key (id_permiso)
);

select *  from permiso;
COPY permiso FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\permiso.csv' DELIMITER ';' Header CSV;
--Copy (select * from permiso) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\permiso.csv' With CSV DELIMITER ';' Header;


DROP TABLE profesion CASCADE;

CREATE TABLE profesion (
id_profesion SERIAL NOT NULL,
profesion VARCHAR (50) NOT NULL,
primary key (id_profesion)
);
select *  from profesion;
COPY profesion FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\profesion.csv' DELIMITER ';' Header CSV;
--Copy (select * from profesion) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\profesion.csv' With CSV DELIMITER ';' Header;


DROP TABLE cargo CASCADE;

CREATE TABLE cargo (
id_cargos SERIAL NOT NULL,
cargo VARCHAR (50) NOT NULL,
primary key (id_cargos)
);

select * from cargo;
COPY cargo FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\cargos.csv' DELIMITER ';' Header CSV;
--Copy (select * from cargos) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\cargos.csv' With CSV DELIMITER ';' Header;




DROP TABLE empleado CASCADE;

CREATE TABLE empleado (
cod_empleado SERIAL NOT NULL,
id_cargos INTEGER NOT NULL,
id_profesion INTEGER NOT NULL,
id_tipo_nomina INTEGER NOT NULL,
id_banco INTEGER NOT NULL,
id_unidad_administrativa INTEGER NOT NULL,
cedula VARCHAR (8) UNIQUE NOT NULL,
nombres VARCHAR (60),
apellidos VARCHAR (60),
fecha_nacimiento DATE NOT NULL,
fecha_ingreso DATE NOT NULL,
direccion TEXT,
telefonos TEXT,
primary key (cod_empleado),
foreign key (id_cargos) references cargo (id_cargos) ON DELETE CASCADE ON UPDATE CASCADE,
foreign key (id_profesion) references profesion (id_profesion) ON DELETE CASCADE ON UPDATE CASCADE,
foreign key (id_tipo_nomina) references tipo_nomina (id_tipo_nomina) OON DELETE CASCADE ON UPDATE CASCADE,
foreign key (id_banco) references banco (id_banco) ON DELETE CASCADE ON UPDATE CASCADE,
foreign key (id_unidad_administrativa) references unidad_administrativa (id_unidad_administrativa) ON DELETE CASCADE ON UPDATE CASCADE
);

select * from empleado;
COPY empleado FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\empleado.csv' DELIMITER ';' Header CSV;
--Copy (select * from empleado) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\empleado.csv' With CSV DELIMITER ';' Header;


DROP TABLE hijo_empleado CASCADE;

CREATE TABLE hijo_empleado (
cod_hijo SERIAL NOT NULL,
cod_empleado INTEGER NOT NULL,
nivel_estudio INTEGER NOT NULL,
cedula_fecha_nacimiento VARCHAR (15) NOT NULL,
nombres VARCHAR (60) NOT NULL,
apellidos VARCHAR (60) NOT NULL,
primary key (cod_empleado,cod_hijo),
foreign key (cod_empleado) references empleado (cod_empleado) ON DELETE CASCADE ON UPDATE CASCADE,
foreign key (nivel_estudio) references profesion (id_profesion) ON DELETE CASCADE ON UPDATE CASCADE
);

select * from hijo_empleado;
COPY hijo_empleado FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\hijo_empleado.csv' DELIMITER ';' Header CSV;
--Copy (select * from hijo_empleado) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\hijo_empleado.csv' With CSV DELIMITER ';' Header;



DROP TABLE permiso_empleado CASCADE;

CREATE TABLE permiso_empleado (
id_permiso INTEGER NOT NULL,
cod_empleado INTEGER NOT NULL,
Fecha_Inicio DATE NOT NULL,
Fecha_Final DATE,
primary key (cod_empleado,Fecha_Inicio),
foreign key (id_permiso) references permiso (id_permiso) ON DELETE CASCADE ON UPDATE CASCADE,
foreign key (cod_empleado) references empleado (cod_empleado) ON DELETE CASCADE ON UPDATE CASCADE
 );

select * from permiso_empleado;
COPY permiso_empleado FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\permiso_empleado.csv' DELIMITER ';' Header CSV;
--Copy (select * from permiso_empleado) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\permiso_empleado.csv' With CSV DELIMITER ';' Header;


DROP TABLE numero_cuenta CASCADE;

CREATE TABLE numero_cuenta (
id_banco integer NOT NULL,
cod_empleado INTEGER NOT NULL,
numero_cuenta VARCHAR (100) UNIQUE,
primary key (id_banco,cod_empleado,numero_cuenta),
foreign key (id_banco) references banco (id_banco) ON DELETE CASCADE ON UPDATE CASCADE,
foreign key (cod_empleado) references empleado (cod_empleado) ON DELETE CASCADE ON UPDATE CASCADE
);

select * from numero_cuenta;
COPY numero_cuenta FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\numero_cuenta.csv' DELIMITER ';' Header CSV;
--Copy (select * from numero_cuenta) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\numero_cuenta.csv' With CSV DELIMITER ';' Header;


DROP TABLE credito_empleado CASCADE;

CREATE TABLE credito_empleado (
cod_partida INTEGER NOT NULL,
cod_empleado INTEGER NOT NULL,
fecha_credito DATE NOT NULL,
monto_credito FLOAT NOT NULL,
monto_actual FLOAT,
cant_de_cuotas INTEGER NOT NULL,
cant_cuotas_restantes INTEGER,
primary key (cod_partida,cod_empleado,fecha_credito),
foreign key (cod_partida) references partida (cod_partida) ON DELETE CASCADE ON UPDATE CASCADE,
foreign key (cod_empleado) references empleado (cod_empleado) ON DELETE CASCADE ON UPDATE CASCADE
);

select * from credito_empleado;
COPY credito_empleado FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\credito_empleado.csv' Header DELIMITER ';' CSV;
--Copy (select * from credito_empleado) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\credito_empleado.csv' With CSV DELIMITER ';' Header;


DROP TABLE nomina CASCADE;

CREATE TABLE nomina (
cod_empleado INTEGER NOT NULL,
cod_partida  INTEGER NOT NULL,
tipo_partida VARCHAR (10) NOT NULL,
monto_nomina FLOAT NOT NULL,
primary key (cod_empleado,cod_partida),
foreign key (cod_partida) references partida (cod_partida) ON DELETE CASCADE ON UPDATE CASCADE,
foreign key (cod_empleado) references empleado (cod_empleado) ON DELETE CASCADE ON UPDATE CASCADE
);

select * from nomina;
COPY nomina FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\nomina.csv' DELIMITER ';' CSV Header;
--Copy (select * from nomina) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\nomina.csv' With CSV DELIMITER ';' Header;


DROP TABLE nomina_especial CASCADE;

CREATE TABLE nomina_especial (
cod_empleado INTEGER NOT NULL,
cod_partida  INTEGER NOT NULL,
tipo_partida VARCHAR (10) NOT NULL,
monto_nomina FLOAT NOT NULL,
primary key (cod_empleado,cod_partida),
foreign key (cod_partida) references partida (cod_partida) ON DELETE CASCADE ON UPDATE CASCADE,
foreign key (cod_empleado) references empleado (cod_empleado) ON DELETE CASCADE ON UPDATE CASCADE
);

select * from nomina_especial;
COPY nomina_especial FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\nomina_especial.csv' DELIMITER ';' CSV Header;
--Copy (select * from nomina_especial) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\nomina_especial.csv' With CSV DELIMITER ';' Header;

DROP TABLE pago CASCADE;

CREATE TABLE pago (
cod_empleado INTEGER NOT NULL,
cod_partida INTEGER NOT NULL,
id_tipo_nomina INTEGER NOT NULL,
id_banco INTEGER NOT NULL,
id_unidad_administrativa INTEGER NOT NULL,
monto_pago FLOAT NOT NULL,
fecha_pago DATE NOT NULL,
primary key (cod_empleado,cod_partida,id_tipo_nomina,id_banco,id_unidad_administrativa,fecha_pago)
 );

select * from pago;
COPY pago FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\pago.csv' DELIMITER ';' CSV Header;
--Copy (select * from pago) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\pago.csv' With CSV DELIMITER ';' Header;


DROP TABLE historial_credito CASCADE;

CREATE TABLE historial_credito (
cod_partida INTEGER NOT NULL,
cod_empleado INTEGER NOT NULL,
fecha_credito date NOT NULL,
monto_credito float NOT NULL,
primary key (cod_empleado,cod_partida,fecha_credito),
foreign key (cod_empleado) references empleado (cod_empleado) ON DELETE CASCADE ON UPDATE CASCADE
 );

select * from pago;
COPY pago FROM 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\pago.csv' DELIMITER ';' CSV Header;
--Copy (select * from pago) To 'C:\xampp\htdocs\workspace\PHP_HTML\Nomina_Alcaldia\BD\csv\pago.csv' With CSV DELIMITER ';' Header;