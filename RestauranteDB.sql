CREATE DATABASE IF NOT EXISTS das_proyecto_final_db;

USE das_proyecto_final_db;
# TABLA INDEPENDIENTE
CREATE TABLE IF NOT EXISTS mesa(
	mesa_id TINYINT NOT NULL,
    mesa_localizacion ENUM('interior','exterior','Fumadores')NOT NULL,
    mesa_capacidad INT,
    PRIMARY KEY (mesa_id)
);
# TABLA INDEPENDIENTE
CREATE TABLE IF NOT EXISTS menu_comida(
	menuco_id TINYINT NOT NULL AUTO_INCREMENT,
    menuco_nombre VARCHAR(60) NOT NULL,
    menuco_costo DECIMAL(6,2) NOT NULL,
    menuco_categoria ENUM('Ensaladas','Sopa','Carnes', 'Mariscos', 'Desayuno'),
    PRIMARY KEY (menuco_id)
);
# TABLA INDEPENDIENTE
CREATE TABLE IF NOT EXISTS menu_bebida(
	menube_id TINYINT NOT NULL AUTO_INCREMENT,
    menube_nombre VARCHAR(60) NOT NULL,
    menube_costo DECIMAL(6,2) NOT NULL,
    menube_categoria ENUM('REFRESCO','AGUA','ALCOHOL'),
    PRIMARY KEY (menube_id)
);
# TABLA INDEPENDIENTE
CREATE TABLE IF NOT EXISTS mesero(
	mese_id TINYINT NOT NULL AUTO_INCREMENT,
    mese_nombre VARCHAR(40) NOT NULL,
    mese_honorario DECIMAL(8,2) NOT NULL,
    PRIMARY KEY(mese_id)
);
# TABLA DEPENDIENTE
CREATE TABLE IF NOT EXISTS orden(
	ord_id INT NOT NULL AUTO_INCREMENT,
    ord_mesa_id TINYINT NOT NULL,
    ord_mese_id TINYINT NOT NULL,
    ord_fecha DATE,
    ord_pago DECIMAL(8,2),
    ord_factura ENUM('s','n'),
    PRIMARY KEY (ord_id),
    CONSTRAINT fk_orden_mesa
    FOREIGN KEY (ord_mesa_id)
    REFERENCES mesa(mesa_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT fk_orden_mesero_id
    FOREIGN KEY (ord_mese_id)
    REFERENCES mesero(mese_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);
# TABLA DEPENDIENTE
CREATE TABLE IF NOT EXISTS alimentos_orden(
	ali_id INT NOT NULL AUTO_INCREMENT,
	ali_ord_id INT NOT NULL,
	ali_menuco_id TINYINT NOT NULL,
    PRIMARY KEY (ali_id),
     CONSTRAINT fk_ali_ord_id
    FOREIGN KEY (ali_ord_id)
    REFERENCES orden(ord_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT fk_ali_menuco_id
    FOREIGN KEY (ali_menuco_id)
    REFERENCES menu_comida(menuco_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);
# TABLA DEPENDIENTE
CREATE TABLE IF NOT EXISTS bebidas_orden(
	beb_id TINYINT NOT NULL AUTO_INCREMENT,
    beb_ord_id INT NOT NULL,
	beb_menube_id TINYINT NOT NULL,
    PRIMARY KEY (beb_id),
    CONSTRAINT fk_beb_ord_id
    FOREIGN KEY (beb_ord_id)
    REFERENCES orden(ord_id)
		ON DELETE CASCADE /*NO ACTION*/
		ON UPDATE CASCADE,
	CONSTRAINT fk_beb_menube
    FOREIGN KEY (beb_menube_id)
    REFERENCES menu_bebida(menube_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

#INSERANDO DATOS EN LA DB
INSERT INTO mesa (mesa_id, mesa_localizacion, mesa_capacidad)
VALUES  (1, 'interior',5),
		(2, 'exterior',5),
        (3, 'interior',5),
        (4, 'exterior',5),
        (5, 'Fumadores',5);
		
INSERT INTO mesero (mese_nombre, mese_honorario)
VALUES  ('Carlos Santa Maria',1750.00),
		('Enrique Castro',1450.00),
        ('Camila Juarez',1450.00),
        ('Christopher Alexander',1600.00),
        ('Sofia Guevara',1500);
        
INSERT INTO menu_comida (menuco_nombre, menuco_costo, menuco_categoria)
VALUES  ('CALDO LOCO', 35.50, 'Sopa'),
		('CALDO DE FRIJOL', 32.50, 'Sopa'),
        ('CALDILLO DE FILETE', 72.50, 'Carnes'),
        ('ALBÓNDIGAS DE RES', 45.50, 'Carnes'),
        ('PULPO A LA PARRILLA', 94.50, 'Mariscos'),
        ('ATÚN FRESCO ', 35.50, 'Mariscos'),
        ('HUEVOS A LA MEXICANA', 35.50, 'Desayuno'),
        ('PAN DE YEMA CON CHOCOLATE', 27.50, 'Desayuno');
        
INSERT INTO menu_bebida (menube_nombre, menube_costo, menube_categoria)
VALUES  ('LIMONADA', 19.50, 'AGUA'),
		('NARANJADA', 19.50, 'AGUA'),
        ('COCA COLA', 25.50, 'REFRESCO'),
        ('SIDRAL MUNDET', 25.50, 'REFRESCO'),
        ('BUCHANANS RED SEAL', 75.50, 'ALCOHOL'),
        ('DON JULIO REPOSADO', 86.50, 'ALCOHOL'),
        ('TORRES 20', 74.50, 'ALCOHOL'),
        ('BACARDI SOLERA', 95.50, 'ALCOHOL');
        
        
INSERT INTO orden (ord_mesa_id, ord_mese_id, ord_fecha, ord_pago, ord_factura)
VALUES (1,1,'2021-06-01',0.0,'n'),
	   (2,2,'2021-06-01',0.0,'n'),
       (3,3,'2021-06-02',0.0,'n'),
       (4,4,'2021-06-02',0.0,'n'),
       (5,5,'2021-06-03',0.0,'n');
    