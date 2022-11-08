-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-kiara.alwaysdata.net
-- Generation Time: Nov 08, 2022 at 03:42 PM
-- Server version: 10.6.7-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kiara_dev`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`kiara`@`%` PROCEDURE `get_asesor` (IN `U_ID_Asesor` VARCHAR(18))   SELECT *
FROM Asesores
WHERE Asesores.CURP = U_ID_Asesor$$

CREATE DEFINER=`kiara`@`%` PROCEDURE `get_asesor_idP` (IN `U_Propiedad` INT)   SELECT A.CURP, A.Nombre_asesor, A.Primer_apellido,A.Segundo_apellido,A.Telefono_asesor,A.Email_asesor
FROM Asesores A, Clientes C, Asesor_cliente AC, Propiedad_propietario PP, Propiedades P
WHERE C.username=AC.ID_Cliente AND AC.ID_Asesor=A.CURP AND PP.ID_Cliente=C.username AND PP.ID_Propiedad=P.ID AND P.ID=U_Propiedad$$

CREATE DEFINER=`kiara`@`%` PROCEDURE `get_casasA_idC` (IN `U_ID_Cliente` VARCHAR(18))   SELECT C.username,PR.ID_Propiedad, TI.tipoInmueble, P.Calle, P.Numero,P.Colonia, P.Codigo_postal, P.Municipio, P.Estado, Paises.Pais ,TI.tipoInmueble
	   ,P.Niveles,P.Habitaciones,P.Baños,P.Cocina,P.Sala_Comedor,P.Estacionamiento,P.Gas
FROM Clientes C, Proceso_renta PR, Propiedades P, Tipo_inmueble TI, Paises
WHERE C.username=PR.ID_Cliente AND P.ID=PR.ID_Propiedad AND P.ID_tipoInmueble=TI.ID AND Paises.ID=P.ID_pais AND PR.tipoCliente='Arrendatario' AND C.username=U_ID_Cliente
GROUP BY C.username$$

CREATE DEFINER=`kiara`@`%` PROCEDURE `get_casasC_idC` (IN `U_ID_Cliente` VARCHAR(18))   SELECT C.username,PCV.ID_Propiedad, TI.tipoInmueble, P.Calle, P.Numero,P.Colonia, P.Codigo_postal, P.Municipio, P.Estado, Paises.Pais ,TI.tipoInmueble
	   ,P.Niveles,P.Habitaciones,P.Baños,P.Cocina,P.Sala_Comedor,P.Estacionamiento,P.Gas
FROM Clientes C, Proceso_CompraVenta PCV, Propiedades P, Tipo_inmueble TI, Paises
WHERE C.username=PCV.ID_Cliente AND P.ID=PCV.ID_Propiedad AND P.ID_tipoInmueble=TI.ID AND Paises.ID=P.ID_pais AND PCV.tipoCliente='Comprador' AND C.username=U_ID_Cliente
GROUP BY C.username$$

CREATE DEFINER=`kiara`@`%` PROCEDURE `get_casasVR_idC` (IN `U_ID_Cliente` VARCHAR(18) CHARSET utf8mb4, IN `U_Operacion` VARCHAR(20) CHARSET utf8mb4)   SELECT PP.ID_Cliente, PP.ID_Propiedad,P.Calle,P.Numero,P.Colonia,P.Codigo_postal,P.Municipio,P.Estado,Paises.Pais ,TI.tipoInmueble
	   ,P.Niveles,P.Habitaciones,P.Baños,P.Cocina,P.Sala_Comedor,P.Estacionamiento,P.Gas, P.Operacion
FROM Propiedad_propietario PP, Clientes C, Propiedades P, Tipo_inmueble TI,Paises
WHERE PP.ID_Propiedad=P.ID AND PP.ID_Cliente=C.username AND TI.ID=P.ID_tipoInmueble AND P.ID_pais=Paises.ID AND PP.ID_Cliente=U_ID_Cliente
      AND P.Operacion=U_Operacion$$

CREATE DEFINER=`kiara`@`%` PROCEDURE `get_cliente` (IN `U_username` VARCHAR(18))   SELECT *
FROM Clientes 
WHERE Clientes.username = U_username$$

CREATE DEFINER=`kiara`@`%` PROCEDURE `get_permisos` (IN `U_ID_Cliente` VARCHAR(18))   SELECT p.Descripcion 
FROM Permisos p,  rol_priv rp, user_rol ur, Roles r 
WHERE ur.id_user = U_ID_Cliente AND ur.id_rol=r.Id AND r.Id=rp.id_rol AND rp.id_priv=p.Id$$

CREATE DEFINER=`kiara`@`%` PROCEDURE `get_procesoCV` (IN `U_ID_Cliente` VARCHAR(18), IN `U_ID_Propiedad` INT)   SELECT PV.Numero_etapa, CV.Nombre, PV.Estado, PV.Fecha_Start, PV.Fecha_End, CV.Tiempo_estimado
FROM Proceso_CompraVenta PV, Cronograma_venta CV
WHERE PV.Numero_etapa=CV.Numero AND PV.ID_Cliente=U_ID_Cliente AND PV.ID_Propiedad=U_ID_Propiedad$$

CREATE DEFINER=`kiara`@`%` PROCEDURE `get_procesoRA` (IN `U_ID_Cliente` VARCHAR(18), IN `U_ID_Propiedad` INT)   SELECT PR.Numero_etapa, CR.Nombre, PR.Estado, PR.Fecha_Start, PR.Fecha_End, CR.Tiempo_estimado
FROM Proceso_renta PR, Cronograma_renta CR
WHERE PR.Numero_etapa=CR.Numero AND PR.ID_Cliente=U_ID_Cliente AND PR.ID_Propiedad=U_ID_Propiedad$$

CREATE DEFINER=`kiara`@`%` PROCEDURE `get_rol` (IN `U_username` VARCHAR(18))   SELECT R.Nombre
FROM Usuario U, user_rol UR, Roles R
WHERE U.username=UR.id_user AND UR.id_rol=R.Id AND U.username = U_username$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Asesores`
--

CREATE TABLE `Asesores` (
  `username` varchar(18) CHARACTER SET utf8mb4 NOT NULL,
  `CURP` varchar(18) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Nombre_asesor` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Primer_apellido` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Segundo_apellido` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Telefono_asesor` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Email_asesor` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Asesores`
--

INSERT INTO `Asesores` (`username`, `CURP`, `Nombre_asesor`, `Primer_apellido`, `Segundo_apellido`, `Telefono_asesor`, `Email_asesor`) VALUES
('AIVT700616MDFTLR09', 'AIVT700616MDFTLR09', 'Maria Teresa', 'Atilano', 'Villanueva', '4426328759', 'tere.kiarainmuebles@gmail.com'),
('BAHV691210MDFZRR10', 'BAHV691210MDFZRR10', 'Virginia ', 'Baza', 'Herrera', '4427967322', 'virginia.kiarainmuebles@gmail.com'),
('COCP550116MDFTSL01', 'COCP550116MDFTSL01', 'Maria del Pilar', 'Coto', 'Casal', '4426698027', 'pilar.kiarainmuebles@gmail.com'),
('GUME791116MDFTRS05', 'GUME791116MDFTRS05', 'Maria Esther', 'Gutierrez', 'Martinez', '4426037195', 'esther.kiarainmuebles@gmail.com'),
('MASJ711117HDFRLM01', 'MASJ711117HDFRLM01', 'Jaime', 'Martinez', 'Salcedo', '4428789389', 'jaime.kiarainmuebles@gmail.com'),
('YURB771212MDFZGL05', 'YURB771212MDFZGL05', 'Karla', 'Yzunza', 'Rugarcia', '4423217554', 'karla.kiarainmuebles@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Asesor_cliente`
--

CREATE TABLE `Asesor_cliente` (
  `ID_Asesor` varchar(18) CHARACTER SET utf8mb4 NOT NULL,
  `ID_Cliente` varchar(18) CHARACTER SET utf8mb4 NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Asesor_cliente`
--

INSERT INTO `Asesor_cliente` (`ID_Asesor`, `ID_Cliente`, `Fecha`) VALUES
('AIVT700616MDFTLR09', 'c01', '2022-10-18 23:56:27'),
('AIVT700616MDFTLR09', 'c02', '2022-10-18 23:56:27'),
('AIVT700616MDFTLR09', 'c05', '2022-10-18 23:56:27'),
('AIVT700616MDFTLR09', 'c06', '2022-10-18 23:56:27'),
('BAHV691210MDFZRR10', 'c03', '2022-10-18 23:56:27'),
('BAHV691210MDFZRR10', 'c04', '2022-10-18 23:56:27'),
('GUME791116MDFTRS05', 'c07', '2022-10-18 23:56:27');

-- --------------------------------------------------------

--
-- Table structure for table `Clientes`
--

CREATE TABLE `Clientes` (
  `username` varchar(18) CHARACTER SET utf8mb4 NOT NULL,
  `Nombres` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Primer_apellido` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Segundo_apellido` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Telefono_cliente` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Email_cliente` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Ocupacion` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Estado_civil` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Clientes`
--

INSERT INTO `Clientes` (`username`, `Nombres`, `Primer_apellido`, `Segundo_apellido`, `Telefono_cliente`, `Email_cliente`, `Ocupacion`, `Estado_civil`) VALUES
('c01', 'Hector Román', 'Calderón', 'Cibrian', '4421815772', 'hrcalderon@live.com.mx', 'empleado', 'n/a'),
('c02', 'Hugo Alexis', 'Trujillo', 'Sánchez', '4426582959', 'alexiscryowelding@gmail.com', 'socio', 'n/a'),
('c03', 'Rosalía', 'Pérez', 'Bravo', '8184681966', 'rosaliapb@gmail.com', 'empleado', 'n/a'),
('c04', 'Jose Antonio', 'García', 'Martínez', '4421528031', 'tono.martinez415@gmail.com', 'empleado', 'n/a'),
('c05', 'Marco Antonio', 'Zavala', 'Orlanzzini', '5512293496', 'zavalamarcoa@gmail.com', 'psicologo', 'casado'),
('c06', 'Fernando', 'Vera', 'Álvarez', '', '', 'doctor', 'casado'),
('c07', 'Silvia Paola', 'Navarro', 'Rojas', '4422728644', 'cocinavistareal@gmail.com', 'ama de casa', 'soltero'),
('c08', 'Ruth', 'Solis', 'Velasco', '4426126384', 'a01703206@tec.mx', 'estudiante', 'soltero'),
('c09', 'Rodigro', 'Reyes', 'Castro', '4426689472', '', 'estudiante', 'soltero'),
('c10', 'Arturo', 'Valencia', 'Acosta', '7721251188', '', 'estudiante', 'soltero'),
('c11', 'Genaro', 'Ambia', 'Martinez', '7771792963', '', 'estudiante', 'soltero'),
('c12', 'Brandon', 'Flowers', 'Newman', '4426689472', 'brad0976@gmail.com', 'Singer', 'Casado'),
('c13', 'Guillermo Fidel', 'Navarro', 'Vega', '7714206969', 'memotektips@tips.com', 'Full Stack Developer', 'Poli-matrimonio'),
('c16', 'Edith', 'Ramirez', 'Hernadez', '4421275142', 'ejemplo@outlook.com', 'ama de casa', 'casada'),
('c18', 'Elena', 'Anillo', 'Solis', '1442612638', 'A01703206@itesm.mx', 'empelado', 'soltero'),
('c19', 'Juana', 'Ramirez', 'Hernadez', '4421275142', 'ejemplo@outlook.com', 'empleado', 'soltero'),
('c21', 'Elmer', 'Homero', 'Martinez', '4421275142', 'rutituti1@hotmail.com', 'estudiante', 'soltero'),
('c22', 'Jorge', 'Nitales', 'Martinez', '1442612638', 'ejemplo@outlook.com', 'empleado', 'soltero'),
('c24', 'Fulano', 'lala', 'Martinez', '4421275142', 'rutituti1@hotmail.com', 'empelado', 'soltero'),
('c25', 'Elena', 'Nito', 'Martinez', '1442612638', 'ejemplo@outlook.com', 'empleado', 'soltero'),
('rcortese', 'Ricardo', 'Cortes', 'Espinoza', '44', 'rcortese@gmail.com', 'Profesor', 'casado');

-- --------------------------------------------------------

--
-- Table structure for table `Cronograma_renta`
--

CREATE TABLE `Cronograma_renta` (
  `Numero` int(11) NOT NULL,
  `Nombre` varchar(60) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Tiempo_estimado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Cronograma_renta`
--

INSERT INTO `Cronograma_renta` (`Numero`, `Nombre`, `Tiempo_estimado`) VALUES
(1, 'Recepcion de apartado', 1),
(2, 'Recepcion de documentacion', 4),
(3, 'Inicio de tramite de poliza juridica', 4),
(4, 'Resultado de investigacion de poliza juridica', 5),
(5, 'Revision de contrato', 4),
(6, 'Firma de contrato', 5);

-- --------------------------------------------------------

--
-- Table structure for table `Cronograma_venta`
--

CREATE TABLE `Cronograma_venta` (
  `Numero` int(11) NOT NULL,
  `Nombre` varchar(60) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Tiempo_estimado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Cronograma_venta`
--

INSERT INTO `Cronograma_venta` (`Numero`, `Nombre`, `Tiempo_estimado`) VALUES
(1, 'Recepcion de apartado', 1),
(2, 'Recepcion de documentacion', 5),
(3, 'Elaboracion de contrato de compraventa', 5),
(4, 'Aprobacion de las partes del borrador de contrato', 4),
(5, 'Firma de contrato de compraventa', 5),
(6, 'Realizacion de avaluo comercial', 4),
(7, 'Realizacion de avaluo hacendario', 4),
(8, 'Avaluo terminado y entregado', 4),
(9, 'Revision de documentacion por parte de notaria', 10),
(10, 'Elaboracion de proyecto de escritura', 10),
(11, 'Firma de escritura de compraventa', 10);

-- --------------------------------------------------------

--
-- Table structure for table `Expediente_Cliente`
--

CREATE TABLE `Expediente_Cliente` (
  `ID` int(11) NOT NULL,
  `ID_Cliente` varchar(18) CHARACTER SET utf8mb4 NOT NULL,
  `ID_TipoDoc` int(11) NOT NULL,
  `ID_TipoExp` int(11) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Estado` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `URL` varchar(400) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Expediente_Cliente`
--

INSERT INTO `Expediente_Cliente` (`ID`, `ID_Cliente`, `ID_TipoDoc`, `ID_TipoExp`, `Fecha`, `Estado`, `URL`) VALUES
(1, 'c08', 1, 1, '0000-00-00 00:00:00', 'yo', ''),
(10, 'c08', 1, 1, '2022-11-02 01:50:36', 'En revision', '3650blur.png'),
(11, 'c08', 1, 1, '2022-11-02 01:56:47', 'En revision', '4656lenna.png'),
(12, 'c08', 1, 1, '2022-11-02 01:58:16', 'En revision', '155811.png'),
(13, 'c08', 1, 1, '2022-11-02 01:59:17', 'En revision', '1659lenna.png'),
(14, 'c08', 1, 1, '2022-11-02 02:06:01', 'En revision', '06lenna.png'),
(15, 'c08', 1, 1, '2022-11-02 02:09:24', 'En revision', '239lenna.png'),
(16, 'c08', 1, 1, '2022-11-02 16:28:11', 'En revision', '1028lenna.png'),
(17, 'c08', 1, 1, '2022-11-02 16:56:14', 'En revision', '1456lenna.png'),
(18, 'c08', 1, 1, '2022-11-02 16:57:28', 'En revision', '2857lenna.png'),
(19, 'c08', 1, 1, '2022-11-02 16:58:57', 'En revision', '5758lenna.png'),
(20, 'c08', 1, 1, '2022-11-02 17:00:04', 'En revision', '4011.png'),
(21, 'c08', 1, 1, '2022-11-02 17:02:13', 'En revision', '132lenna.png'),
(22, 'c08', 1, 1, '2022-11-02 17:03:34', 'En revision', '34311.png'),
(23, 'c08', 1, 1, '2022-11-02 17:04:56', 'En revision', '554blur.png');

-- --------------------------------------------------------

--
-- Table structure for table `Expediente_Propiedad`
--

CREATE TABLE `Expediente_Propiedad` (
  `ID` int(11) NOT NULL,
  `ID_Propiedad` int(11) NOT NULL,
  `ID_TipoDoc` int(11) NOT NULL,
  `ID_TipoExp` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Estado` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `URL` varchar(400) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Op_comercial`
--

CREATE TABLE `Op_comercial` (
  `ID_Propiedad` int(11) NOT NULL,
  `Niveles` int(11) NOT NULL,
  `Baños` int(11) NOT NULL,
  `Habitaciones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Op_comercial`
--

INSERT INTO `Op_comercial` (`ID_Propiedad`, `Niveles`, `Baños`, `Habitaciones`) VALUES
(2, 1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Op_Residencial`
--

CREATE TABLE `Op_Residencial` (
  `ID_Propiedad` int(11) NOT NULL,
  `Niveles` int(11) NOT NULL,
  `Recamaras` int(11) NOT NULL,
  `Cocina` tinyint(1) NOT NULL,
  `Sala_Comedor` tinyint(1) NOT NULL,
  `Baños` float NOT NULL,
  `Cajon_estacionamiento` int(11) NOT NULL,
  `Gas` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Op_Residencial`
--

INSERT INTO `Op_Residencial` (`ID_Propiedad`, `Niveles`, `Recamaras`, `Cocina`, `Sala_Comedor`, `Baños`, `Cajon_estacionamiento`, `Gas`) VALUES
(1, 2, 3, 1, 1, 2.5, 1, 'estacionario'),
(3, 2, 3, 1, 1, 2.5, 2, 'estacionario');

-- --------------------------------------------------------

--
-- Table structure for table `Op_terreno`
--

CREATE TABLE `Op_terreno` (
  `ID_Propiedad` int(11) NOT NULL,
  `Servicio_Agua` tinyint(1) NOT NULL,
  `Servicio_Luz` tinyint(1) NOT NULL,
  `Servicio_Drenaje` tinyint(1) NOT NULL,
  `Tipo_desnivel` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Forma_terreno` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Medidas_frente` int(11) NOT NULL,
  `Medidas_fondo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Op_terreno`
--

INSERT INTO `Op_terreno` (`ID_Propiedad`, `Servicio_Agua`, `Servicio_Luz`, `Servicio_Drenaje`, `Tipo_desnivel`, `Forma_terreno`, `Medidas_frente`, `Medidas_fondo`) VALUES
(4, 1, 1, 1, 'Plano', 'Regular', 10, 28);

-- --------------------------------------------------------

--
-- Table structure for table `Paises`
--

CREATE TABLE `Paises` (
  `ID` int(11) NOT NULL,
  `Pais` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Paises`
--

INSERT INTO `Paises` (`ID`, `Pais`) VALUES
(1, 'Afganistán'),
(2, 'África del Sur'),
(3, 'Albania'),
(4, 'Alemania'),
(5, 'Andorra'),
(6, 'Angola'),
(7, 'Arabia Saudita'),
(8, 'Argelia'),
(9, 'Argentina'),
(10, 'Armenia'),
(11, 'Australia'),
(12, 'Austria'),
(13, 'Azerbaiyán'),
(14, 'Bahréin'),
(15, 'Bangladesh'),
(16, 'Bélgica'),
(17, 'Belice'),
(18, 'Benín'),
(19, 'Bielorrusia'),
(20, 'Birmania'),
(21, 'Bolivia'),
(22, 'Bosnia-Herzegovina'),
(23, 'Botsuana'),
(24, 'Brasil'),
(25, 'Brunei'),
(26, 'Bulgaria'),
(27, 'Burkina Faso'),
(28, 'Burundi'),
(29, 'Bután'),
(30, 'Cabo Verde'),
(31, 'Camboya'),
(32, 'Camerún'),
(33, 'Canadá'),
(34, 'Catar'),
(35, 'Chad'),
(36, 'Chile'),
(37, 'China'),
(38, 'Chipre'),
(39, 'Colombia'),
(40, 'Comoras'),
(41, 'Congo Brazzaville'),
(42, 'Corea del Norte'),
(43, 'Corea del Sur'),
(44, 'Costa de Marfil'),
(45, 'Costa Rica'),
(46, 'Croacia'),
(47, 'Cuba'),
(48, 'Dinamarca'),
(49, 'Ecuador'),
(50, 'Egipto'),
(51, 'El Salvador'),
(52, 'Emiratos Árabes Unidos'),
(53, 'Eritrea'),
(54, 'Eslovaquia'),
(55, 'Eslovenia'),
(56, 'España'),
(57, 'Estados Unidos'),
(58, 'Estonia'),
(59, 'Eswatini (Suazilandia)'),
(60, 'Etiopía'),
(61, 'Filipinas'),
(62, 'Finlandia'),
(63, 'Fiyi'),
(64, 'Francia'),
(65, 'Gabón'),
(66, 'Gambia'),
(67, 'Georgia'),
(68, 'Ghana'),
(69, 'Gran Bretaña'),
(70, 'Grecia'),
(71, 'Guatemala'),
(72, 'Guinea'),
(73, 'Guinea Bissau'),
(74, 'Guinea Ecuatorial'),
(75, 'Guyana'),
(76, 'Haití'),
(77, 'Honduras'),
(78, 'Hong Kong'),
(79, 'Hungría'),
(80, 'India'),
(81, 'Indonesia'),
(82, 'Irak'),
(83, 'Irán'),
(84, 'Irlanda'),
(85, 'Islandia'),
(86, 'Israel'),
(87, 'Italia'),
(88, 'Jamaica'),
(89, 'Japón'),
(90, 'Jordania'),
(91, 'Kazajistán'),
(92, 'Kenia'),
(93, 'Kirguistán'),
(94, 'Kosovo'),
(95, 'Kuwait'),
(96, 'Laos'),
(97, 'Lesoto'),
(98, 'Letonia'),
(99, 'Líbano'),
(100, 'Liberia'),
(101, 'Libia'),
(102, 'Liechtenstein'),
(103, 'Lituania'),
(104, 'Luxemburgo'),
(105, 'Macedonia del Norte'),
(106, 'Madagascar'),
(107, 'Malasia'),
(108, 'Malaui'),
(109, 'Maldivas'),
(110, 'Malí'),
(111, 'Malta'),
(112, 'Marruecos / Sahara Occidental'),
(113, 'Mauricio'),
(114, 'Mauritania'),
(115, 'México'),
(116, 'Moldavia'),
(117, 'Mongolia'),
(118, 'Montenegro'),
(119, 'Mozambique'),
(120, 'Namibia'),
(121, 'Nepal'),
(122, 'Nicaragua'),
(123, 'Níger'),
(124, 'Nigeria'),
(125, 'Norte de Chipre'),
(126, 'Noruega'),
(127, 'Nueva Zelanda'),
(128, 'OECO'),
(129, 'Omán'),
(130, 'Países Bajos'),
(131, 'Pakistán'),
(132, 'Palestina'),
(133, 'Panamá'),
(134, 'Papúa Nueva Guinea'),
(135, 'Paraguay'),
(136, 'Perú'),
(137, 'Polonia'),
(138, 'Portugal'),
(139, 'RDC'),
(140, 'República Centroafricana'),
(141, 'República Checa'),
(142, 'República Dominicana'),
(143, 'Ruanda'),
(144, 'Rumanía'),
(145, 'Rusia'),
(146, 'Samoa'),
(147, 'Senegal'),
(148, 'Serbia'),
(149, 'Seychelles'),
(150, 'Sierra Leona'),
(151, 'Singapur'),
(152, 'Siria'),
(153, 'Somalia'),
(154, 'Sri Lanka'),
(155, 'Sudán'),
(156, 'Sudán del Sur'),
(157, 'Suecia'),
(158, 'Suiza'),
(159, 'Surinam'),
(160, 'Tailandia'),
(161, 'Taiwán'),
(162, 'Tanzania'),
(163, 'Tayikistán'),
(164, 'Timor Oriental'),
(165, 'Togo'),
(166, 'Tonga'),
(167, 'Trinidad y Tobago'),
(168, 'Túnez'),
(169, 'Turkmenistán'),
(170, 'Turquía'),
(171, 'Ucrania'),
(172, 'Uganda'),
(173, 'Uruguay'),
(174, 'Uzbekistán'),
(175, 'Venezuela'),
(176, 'Vietnam'),
(177, 'Yemen'),
(178, 'Yibuti'),
(179, 'Zambia'),
(180, 'Zimbabue');

-- --------------------------------------------------------

--
-- Table structure for table `Permisos`
--

CREATE TABLE `Permisos` (
  `Id` int(11) NOT NULL,
  `Descripcion` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Permisos`
--

INSERT INTO `Permisos` (`Id`, `Descripcion`, `created_at`) VALUES
(1, 'registrar_cliente', '2022-11-07 17:38:53'),
(2, 'eliminar_usuario', '2022-11-07 17:38:53'),
(3, 'actualizar_usuario', '2022-11-07 17:38:53'),
(4, 'actualizar_roles', '2022-11-07 17:38:53'),
(5, 'actualizar_cronograma', '2022-11-07 17:38:53'),
(6, 'registrar_proceso', '2022-11-07 17:38:53'),
(7, 'registrar_asesor', '2022-11-07 17:38:53'),
(8, 'registrar_admin', '2022-11-07 17:38:53'),
(9, 'consultar_exp', '2022-11-07 17:42:00'),
(10, 'registrar_exp', '2022-11-07 17:42:00'),
(11, 'consultar_clientes', '2022-11-07 17:44:04'),
(12, 'consultar_cronograma', '2022-11-07 17:54:09'),
(13, 'consultar_propiedades', '2022-11-07 17:54:09');

-- --------------------------------------------------------

--
-- Table structure for table `Proceso_CompraVenta`
--

CREATE TABLE `Proceso_CompraVenta` (
  `ID_Cliente` varchar(18) CHARACTER SET utf8mb4 NOT NULL,
  `Numero_etapa` int(11) NOT NULL,
  `ID_Propiedad` int(11) NOT NULL,
  `tipoCliente` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Estado` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Fecha_Start` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Fecha_End` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Proceso_CompraVenta`
--

INSERT INTO `Proceso_CompraVenta` (`ID_Cliente`, `Numero_etapa`, `ID_Propiedad`, `tipoCliente`, `Estado`, `Fecha_Start`, `Fecha_End`) VALUES
('c05', 1, 3, 'Comprador', 'Completado', '2022-10-19 00:42:47', '2022-09-08 22:00:00'),
('c05', 2, 3, 'Comprador', 'En proceso', '2022-10-19 00:42:47', '0000-00-00 00:00:00'),
('c05', 3, 3, 'Comprador', 'Completado', '2022-10-19 00:42:47', '2022-09-13 22:00:00'),
('c05', 4, 3, 'Comprador', 'Completado', '2022-10-19 00:42:47', '2022-09-14 22:00:00'),
('c05', 5, 3, 'Comprador', 'Completado', '2022-10-19 00:42:47', '2022-09-18 22:00:00'),
('c05', 6, 3, 'Comprador', 'Completado', '2022-11-02 01:48:28', '2022-11-01 18:48:10'),
('c05', 7, 3, 'Comprador', 'Completado', '2022-10-19 00:42:47', '2022-09-18 22:00:00'),
('c05', 8, 3, 'Comprador', 'Completado', '2022-10-19 00:42:47', '2022-09-25 22:00:00'),
('c05', 9, 3, 'Comprador', 'En proceso', '2022-10-19 00:42:47', '0000-00-00 00:00:00'),
('c05', 10, 3, 'Comprador', 'No iniciado', '2022-10-19 00:42:47', '0000-00-00 00:00:00'),
('c05', 11, 3, 'Comprador', 'No iniciado', '2022-10-19 00:42:47', '0000-00-00 00:00:00'),
('c06', 1, 3, 'Vendedor', 'Completado', '2022-10-19 00:42:47', '2022-09-08 22:00:00'),
('c06', 2, 3, 'Vendedor', 'En proceso', '2022-10-19 00:42:47', '0000-00-00 00:00:00'),
('c06', 3, 3, 'Vendedor', 'Completado', '2022-10-19 00:42:47', '2022-09-13 22:00:00'),
('c06', 4, 3, 'Vendedor', 'Completado', '2022-10-19 00:42:47', '2022-09-14 22:00:00'),
('c06', 5, 3, 'Vendedor', 'Completado', '2022-10-19 00:42:47', '2022-09-18 22:00:00'),
('c06', 7, 3, 'Vendedor', 'Completado', '2022-10-19 00:42:47', '2022-09-18 22:00:00'),
('c06', 8, 3, 'Vendedor', 'Completado', '2022-10-19 00:42:47', '2022-09-25 22:00:00'),
('c06', 9, 3, 'Vendedor', 'En proceso', '2022-10-19 00:42:47', '0000-00-00 00:00:00'),
('c06', 10, 3, 'Vendedor', 'No iniciado', '2022-10-19 00:42:47', '0000-00-00 00:00:00'),
('c06', 11, 3, 'Vendedor', 'No iniciado', '2022-10-19 00:42:47', '0000-00-00 00:00:00'),
('c07', 1, 4, 'Vendedor', 'Completado', '2022-10-19 00:42:47', '2022-09-05 22:00:00'),
('c07', 2, 4, 'Vendedor', 'En proceso', '2022-10-19 00:42:47', '0000-00-00 00:00:00'),
('c07', 3, 4, 'Vendedor', 'Completado', '2022-10-19 00:42:47', '2022-09-07 22:00:00'),
('c07', 4, 4, 'Vendedor', 'Completado', '2022-10-19 00:42:47', '2022-09-08 22:00:00'),
('c07', 5, 4, 'Vendedor', 'Completado', '2022-10-19 00:42:47', '2022-09-08 22:00:00'),
('c07', 7, 4, 'Vendedor', 'Completado', '2022-10-19 00:43:16', '2022-09-26 22:00:00'),
('c07', 8, 4, 'Vendedor', 'No iniciado', '2022-10-19 00:43:16', '0000-00-00 00:00:00'),
('c07', 9, 4, 'Vendedor', 'No iniciado', '2022-10-19 00:43:16', '0000-00-00 00:00:00'),
('c07', 10, 4, 'Vendedor', 'No iniciado', '2022-10-19 00:43:16', '0000-00-00 00:00:00'),
('c07', 11, 4, 'Vendedor', 'No iniciado', '2022-10-19 00:43:16', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Proceso_renta`
--

CREATE TABLE `Proceso_renta` (
  `ID_Cliente` varchar(18) CHARACTER SET utf8mb4 NOT NULL,
  `Numero_etapa` int(11) NOT NULL,
  `ID_Propiedad` int(11) NOT NULL,
  `tipoCliente` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Estado` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Fecha_Start` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Fecha_End` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Proceso_renta`
--

INSERT INTO `Proceso_renta` (`ID_Cliente`, `Numero_etapa`, `ID_Propiedad`, `tipoCliente`, `Estado`, `Fecha_Start`, `Fecha_End`) VALUES
('c01', 1, 1, 'Arrendatario', 'Completado', '2022-10-19 00:45:43', '2022-09-13 22:00:00'),
('c01', 2, 1, 'Arrendatario', 'Completado', '2022-10-19 00:45:43', '2022-09-18 22:00:00'),
('c01', 3, 1, 'Arrendatario', 'Completado', '2022-10-19 00:45:43', '2022-09-18 22:00:00'),
('c01', 4, 1, 'Arrendatario', 'Completado', '2022-10-19 00:45:43', '2022-09-20 22:00:00'),
('c01', 5, 1, 'Arrendatario', 'Completado', '2022-10-19 00:45:43', '2022-09-25 22:00:00'),
('c01', 6, 1, 'Arrendatario', 'Completado', '2022-10-19 00:45:43', '2022-09-27 22:00:00'),
('c03', 1, 1, 'Arrendador', 'Completado', '2022-10-19 00:45:43', '2022-09-13 22:00:00'),
('c03', 2, 1, 'Arrendador', 'Completado', '2022-10-19 00:45:43', '2022-09-18 22:00:00'),
('c03', 3, 1, 'Arrendador', 'Completado', '2022-10-19 00:45:43', '2022-09-18 22:00:00'),
('c03', 4, 1, 'Arrendador', 'Completado', '2022-10-19 00:45:43', '2022-09-20 22:00:00'),
('c03', 5, 1, 'Arrendador', 'Completado', '2022-10-19 00:45:43', '2022-09-25 22:00:00'),
('c03', 6, 1, 'Arrendador', 'Completado', '2022-10-19 00:45:43', '2022-09-27 22:00:00'),
('c04', 1, 1, 'Arrendatario', 'Completado', '2022-10-19 00:45:43', '2022-09-15 22:00:00'),
('c04', 2, 1, 'Arrendatario', 'Completado', '2022-10-19 00:45:43', '2022-09-21 22:00:00'),
('c04', 3, 1, 'Arrendatario', 'Completado', '2022-10-19 00:45:43', '2022-09-22 22:00:00'),
('c04', 4, 1, 'Arrendatario', 'Completado', '2022-10-19 00:45:43', '2022-09-22 22:00:00'),
('c04', 5, 1, 'Arrendatario', 'Completado', '2022-10-19 00:45:43', '2022-09-25 22:00:00'),
('c04', 6, 1, 'Arrendatario', 'Completado', '2022-10-19 00:45:43', '2022-09-26 22:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Propiedades`
--

CREATE TABLE `Propiedades` (
  `ID` int(11) NOT NULL,
  `ID_tipoInmueble` int(11) NOT NULL,
  `Calle` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Numero` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Colonia` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Codigo_postal` int(11) NOT NULL,
  `Municipio` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Estado` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `ID_pais` int(11) NOT NULL,
  `Longitud` float NOT NULL,
  `Latitud` float NOT NULL,
  `Operacion` varchar(20) CHARACTER SET utf8mb4 NOT NULL,
  `Terreno` float NOT NULL,
  `Privada_calle` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Precio` float NOT NULL,
  `Uso_suelo` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Construccion` float NOT NULL,
  `Descripcion` varchar(400) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Imagen` varchar(400) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Niveles` int(11) NOT NULL,
  `Habitaciones` int(11) NOT NULL,
  `Baños` float NOT NULL,
  `Sala_Comedor` tinyint(1) NOT NULL,
  `Cocina` tinyint(1) NOT NULL,
  `Estacionamiento` int(11) NOT NULL,
  `Gas` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Servicio_Agua` tinyint(1) NOT NULL,
  `Servicio_Luz` tinyint(1) NOT NULL,
  `Servicio_Drenaje` tinyint(1) NOT NULL,
  `Tipo_desnivel` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Forma_terreno` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Medidas_frente` float NOT NULL,
  `Medidas_fondo` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Propiedades`
--

INSERT INTO `Propiedades` (`ID`, `ID_tipoInmueble`, `Calle`, `Numero`, `Colonia`, `Codigo_postal`, `Municipio`, `Estado`, `ID_pais`, `Longitud`, `Latitud`, `Operacion`, `Terreno`, `Privada_calle`, `Precio`, `Uso_suelo`, `Construccion`, `Descripcion`, `Imagen`, `Niveles`, `Habitaciones`, `Baños`, `Sala_Comedor`, `Cocina`, `Estacionamiento`, `Gas`, `Servicio_Agua`, `Servicio_Luz`, `Servicio_Drenaje`, `Tipo_desnivel`, `Forma_terreno`, `Medidas_frente`, `Medidas_fondo`) VALUES
(1, 1, 'Sendero del Silencio', '39', 'Milenio III', 76060, 'Queretaro', 'Queretaro', 115, 0, 0, 'Renta', 144, 'Calle', 13900, 'habitacional', 167, 'Frente a area verde', '', 2, 3, 2.5, 1, 1, 1, 'estacionario', 0, 0, 0, '', '', 0, 0),
(2, 5, 'Torneros', '102', 'Peñuelas', 76148, 'Queretaro', 'Queretaro', 115, 0, 0, 'Renta', 120, 'Calle', 12000, 'comercial', 120, '', '', 1, 2, 1, 0, 0, 0, '', 0, 0, 0, '', '', 0, 0),
(3, 1, 'Callejon de Los Mendoza', '13', 'Hacienda San Gabriel', 76904, 'Corregidora', 'Queretaro', 115, 0, 0, 'Venta', 161, 'Privada', 2470000, 'habitacional', 178, '', '', 2, 3, 2.5, 1, 1, 2, 'estacionario', 0, 0, 0, '', '', 0, 0),
(4, 3, 'Datil', '39', 'Real del Bosque', 76922, 'Corregidora', 'Queretaro', 115, 0, 0, 'Venta', 223, 'Privada', 1475000, 'habitacional', 0, '', '', 0, 0, 0, 0, 0, 0, '', 1, 1, 1, 'Plano', 'Regular', 10, 28),
(41, 1, 'Sendero de las Misiones', '27', 'Milenio III', 76060, 'Queretaro', 'Queretaro', 115, 0, 0, 'Renta', 300, 'Calle', 1000, 'Habitacional', 200, '', '', 2, 3, 2.5, 1, 1, 3, 'estacionario', 0, 0, 0, '', '', 0, 0),
(42, 2, 'Florencio Rosas', '4 Int 101', 'Cimatario', 76030, 'Queretaro', 'Queretaro', 115, 0, 0, 'Renta', 300, 'Calle', 1000, 'Habitacional', 200, '', '', 1, 2, 1, 1, 1, 1, 'estacionario', 0, 0, 0, '', '', 0, 0),
(43, 1, 'Marques de Jelves', '115', 'Lomas del Marques', 76010, 'Queretaro', 'Queretaro', 115, 0, 0, 'Renta', 300, 'Calle', 1000, 'Habitacional', 200, '', '', 1, 2, 1, 1, 1, 2, 'estacionario', 0, 0, 0, '', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Propiedad_propietario`
--

CREATE TABLE `Propiedad_propietario` (
  `ID_Propiedad` int(11) NOT NULL,
  `ID_Cliente` varchar(18) CHARACTER SET utf8mb4 NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Propiedad_propietario`
--

INSERT INTO `Propiedad_propietario` (`ID_Propiedad`, `ID_Cliente`, `Fecha`) VALUES
(1, 'c03', '2022-10-19 00:38:10'),
(2, 'c04', '2022-10-19 00:38:10'),
(3, 'c06', '2022-10-19 00:38:10'),
(4, 'c07', '2022-10-19 00:38:10'),
(41, 'c08', '2022-10-19 00:38:10'),
(42, 'c08', '2022-10-19 00:38:10'),
(43, 'c08', '2022-10-19 00:38:10');

-- --------------------------------------------------------

--
-- Table structure for table `Restriccion_TED_cliente`
--

CREATE TABLE `Restriccion_TED_cliente` (
  `ID_tipoExpC` int(11) NOT NULL,
  `ID_tipoDocC` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Restriccion_TED_cliente`
--

INSERT INTO `Restriccion_TED_cliente` (`ID_tipoExpC`, `ID_tipoDocC`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 6),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 6),
(5, 2),
(5, 3),
(5, 8),
(5, 11),
(6, 2),
(6, 3),
(6, 11),
(7, 2),
(7, 3),
(7, 7);

-- --------------------------------------------------------

--
-- Table structure for table `Restriccion_TED_propiedad`
--

CREATE TABLE `Restriccion_TED_propiedad` (
  `ID_tipoExpP` int(11) NOT NULL,
  `ID_tipoDocP` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Restriccion_TED_propiedad`
--

INSERT INTO `Restriccion_TED_propiedad` (`ID_tipoExpP`, `ID_tipoDocP`) VALUES
(1, 1),
(1, 2),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Roles`
--

INSERT INTO `Roles` (`Id`, `Nombre`, `created_at`) VALUES
(1, 'Asesor', '2022-11-07 17:24:47'),
(2, 'Admin', '2022-11-07 17:24:47'),
(3, 'Cliente', '2022-11-07 17:24:47');

-- --------------------------------------------------------

--
-- Table structure for table `rol_priv`
--

CREATE TABLE `rol_priv` (
  `id_rol` int(11) NOT NULL,
  `id_priv` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rol_priv`
--

INSERT INTO `rol_priv` (`id_rol`, `id_priv`, `created_at`) VALUES
(1, 3, '2022-11-07 17:53:37'),
(1, 5, '2022-11-07 17:53:37'),
(1, 6, '2022-11-07 17:53:37'),
(1, 9, '2022-11-07 17:53:37'),
(1, 10, '2022-11-07 17:53:37'),
(1, 11, '2022-11-07 17:53:37'),
(3, 12, '2022-11-07 17:58:27'),
(3, 13, '2022-11-07 17:58:27');

-- --------------------------------------------------------

--
-- Table structure for table `Tipo_docCliente`
--

CREATE TABLE `Tipo_docCliente` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Tipo_docCliente`
--

INSERT INTO `Tipo_docCliente` (`ID`, `Nombre`) VALUES
(1, 'CURP'),
(2, 'Identificacion oficial'),
(3, 'Comprobante de domicilio'),
(4, 'Acta de nacimiento'),
(5, 'Acta de matrimonio'),
(6, 'Constancia de situacion fiscal'),
(7, 'Estado de cuenta bancario'),
(8, 'Solicitud de arrendamiento'),
(9, 'Recibo de nomina'),
(10, 'Pago de anticipo de poliza juridica'),
(11, 'Comprobante de ingresos');

-- --------------------------------------------------------

--
-- Table structure for table `Tipo_docPropiedad`
--

CREATE TABLE `Tipo_docPropiedad` (
  `ID` int(11) NOT NULL,
  `tipoDocPropiedad` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Tipo_docPropiedad`
--

INSERT INTO `Tipo_docPropiedad` (`ID`, `tipoDocPropiedad`) VALUES
(1, 'Constancia de inscripcion al registro publico de escrituras'),
(2, 'Escrituras'),
(3, 'Predial'),
(4, 'Recibo de Luz'),
(5, 'Recibo de Agua'),
(6, 'Recibo de gas'),
(7, 'CFDI'),
(8, 'Terminacion de obra'),
(9, 'Constancia de numero oficial'),
(10, 'Planos arquitectonicos'),
(11, 'Carta de no adeudo de mantenimiento y cuotas especiales'),
(12, 'Documento cancelacion de hipoteca');

-- --------------------------------------------------------

--
-- Table structure for table `Tipo_ExpCliente`
--

CREATE TABLE `Tipo_ExpCliente` (
  `ID` int(11) NOT NULL,
  `tipoExpCliente` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Tipo_ExpCliente`
--

INSERT INTO `Tipo_ExpCliente` (`ID`, `tipoExpCliente`) VALUES
(1, 'Vendedor'),
(2, 'Copropietario vendedor'),
(3, 'Comprador'),
(4, 'Copropietario comprador'),
(5, 'Arrendatario'),
(6, 'Obligado solidario'),
(7, 'Arrendador');

-- --------------------------------------------------------

--
-- Table structure for table `Tipo_ExpPropiedad`
--

CREATE TABLE `Tipo_ExpPropiedad` (
  `ID` int(11) NOT NULL,
  `tipoExpPropiedad` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Tipo_ExpPropiedad`
--

INSERT INTO `Tipo_ExpPropiedad` (`ID`, `tipoExpPropiedad`) VALUES
(1, 'Venta'),
(2, 'Renta');

-- --------------------------------------------------------

--
-- Table structure for table `Tipo_inmueble`
--

CREATE TABLE `Tipo_inmueble` (
  `ID` int(11) NOT NULL,
  `tipoInmueble` varchar(40) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Tipo_inmueble`
--

INSERT INTO `Tipo_inmueble` (`ID`, `tipoInmueble`) VALUES
(1, 'Casa'),
(2, 'Departamento'),
(3, 'Terreno'),
(4, 'Loft'),
(5, 'Bodega'),
(6, 'Rancho'),
(7, 'Cuarto'),
(8, 'Penthouse'),
(9, 'Edificio'),
(10, 'Consultorio'),
(11, 'Local');

-- --------------------------------------------------------

--
-- Table structure for table `user_rol`
--

CREATE TABLE `user_rol` (
  `id_user` varchar(18) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_rol`
--

INSERT INTO `user_rol` (`id_user`, `id_rol`, `created_at`) VALUES
('AIVT700616MDFTLR09', 1, '2022-11-07 17:51:32'),
('BAHV691210MDFZRR10', 1, '2022-11-07 17:51:32'),
('BAHV691210MDFZRR10', 2, '2022-11-07 17:51:32'),
('c01', 3, '2022-11-07 17:51:32'),
('c02', 3, '2022-11-07 17:51:32'),
('c03', 3, '2022-11-07 17:51:32'),
('c04', 3, '2022-11-07 17:51:32'),
('c05', 3, '2022-11-07 17:51:32'),
('c06', 3, '2022-11-07 17:51:32'),
('c07', 3, '2022-11-07 17:51:32'),
('c08', 3, '2022-11-07 17:51:32'),
('COCP550116MDFTSL01', 1, '2022-11-07 17:51:32'),
('GUME791116MDFTRS05', 1, '2022-11-07 17:51:32'),
('MASJ711117HDFRLM01', 1, '2022-11-07 17:51:32');

-- --------------------------------------------------------

--
-- Table structure for table `Usuario`
--

CREATE TABLE `Usuario` (
  `username` varchar(18) NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `Primer_apellido` varchar(50) NOT NULL,
  `Segundo_apellido` varchar(50) NOT NULL,
  `Telefono` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Usuario`
--

INSERT INTO `Usuario` (`username`, `password`, `Nombres`, `Primer_apellido`, `Segundo_apellido`, `Telefono`, `email`) VALUES
('AIVT700616MDFTLR09', '$2a$12$AuUZ5GOvcayx9ygPcLlPdO4DWdXVHALa9br/GEL41KxibHEmjsMnm', 'Maria Teresa', 'Atilano', 'Villanueva', '4426328759', 'tere.kiarainmuebles@gmail.com'),
('BAHV691210MDFZRR10', '$2a$12$fb3aBuwrZe0wtywLNy9kTOJe3k/UzK3e4mK3LgYeoTbp.QEBl3AT.', 'Virginia', 'Baza', 'Herrera', '4427967322', 'virginia.kiarainmuebles@gmail.com'),
('c01', '$2a$12$iuIb.GEeD3VhtZPH9ECs8u8YwirkpoabI3dUUJ0oW1GBH11.bkpE6', 'Hector Román', 'Calderón', 'Cibrian', '4421815772', 'hrcalderon@live.com.mx'),
('c02', '$2a$12$4eHzEuJK901aKsFVgnyIueX9i3icEi727kJBWBKBeJPoEpe/4eEoG', 'Hugo Alexis', 'Trujillo', 'Sánchez', '44226582959', 'alexiscryowelding@gmail.com'),
('c03', '$2a$12$GihSOU78/TLssi3N9Cc9BuKtd/Bml.kLcDNpKVC0kcNNSGLRQsfEq', 'Rosalía ', 'Pérez', 'Bravo', '8184681966', 'rosaliapb@gmail.com'),
('c04', '$2a$12$wttVi1AhMDEhHjiSfuT/xept0zZykzFcGXfAIU6F52ThB58jDUw2K', 'Jose Antonio', 'García', 'Martínez', '4421528031', 'tono.martinez415@gmail.com'),
('c05', '$2a$12$C6Wr855QaJaTfpMbvfDpc.nfjEirzSOyc4.lJy.zWyxJ6mfgrUkpG', 'Marco Antonio', 'Zavala', 'Orlanzzini', '5512293496', 'zavalamarcoa@gmail.com'),
('c06', '$2a$12$RcvIf4SX2/btrtP8nZSyoeZ32Yl8oOug1OyiPCUjuiJCDfrPeKMMi', 'Fernando', 'Vera', 'Álvarez', '', ''),
('c07', '$2a$12$kQmWqCyG68ZLpEkb20Lq8uLf2KdtsWpAkemNlupcciphU8Jwtm48C', 'Silvia Paola', 'Navarro', 'Rojas', '4422728644', 'cocinavistareal@gmail.com'),
('c08', '$2a$12$X177FEhq.E3QDISJlHKQ1OwhmrnpCar04nPRSa96VFgGcVwckFzuy', 'Ruth', 'Solis', 'Velasco', '4426126384', 'a01703206@tec.mx'),
('c09', '$2a$12$ViRVYmLPWnOCwBCLdPYwEO6pYof6K5ZHU9yGRdRmNvPcqqTVXTg4.', '', '', '', '', ''),
('c10', '$2a$12$r89r6BW4LdeCT1X5Bl7Amufz.Qr3x5S8AurrQSU06cW91ZwiHtZq6', '', '', '', '', ''),
('c11', '$2a$12$2pl4khR7CY9udkW6hVfMF.cMzrbHbrlzN7MEN3XGxiXZUWWkJ/W0G', '', '', '', '', ''),
('c12', '$2a$12$bxaOz0Y8yVGXapXNznoCmep6tTC6IJ7tjk9zJO5VM/tBQp4Wqsd2K', '', '', '', '', ''),
('c13', '$2a$12$FwGPmtMEmmJXjYZ2tkllJ.vQc01G.GIlbBY65ZWMztsHlN4/4u1f6', '', '', '', '', ''),
('c14', '$2a$12$XKPM5lsYtKjIU1t0mxaGLuUylVJFJG70beKLDqeY/i2wNjUxbwSKu', '', '', '', '', ''),
('c15', '$2a$12$6Q0zbB230jdT9atZedh75u3KelCLJBnuNxeXOQTszpXsTAhKAgVi2', '', '', '', '', ''),
('c16', '$2a$12$0tamqdqKRqSIwVcmxuiXBO7AhFP19KJkQ1P5M3WwxjKd7kTCbYyau', '', '', '', '', ''),
('c18', '$2a$12$b7lOPIShPPdPzcXHpLy8cOxRXJtZDI1CKTCmbBkfMdFJWop7kQIB2', '', '', '', '', ''),
('c19', '$2a$12$6Vg0A9xj05BWck4pCORHBOuvIw/syQD4cvzaYnB8SYhAh1uGiN6Ti', '', '', '', '', ''),
('c21', '$2a$12$g1OeTHaWUKTQfvXP.i160.YGHOA8YM1mjNTHsVLnxK0KsefYI2YTu', '', '', '', '', ''),
('c22', '$2a$12$94zTEHtuKuZKy0ZpnQVAL.BzUcWu8zpIhnauCPLlW1NkzudA0Oo.u', '', '', '', '', ''),
('c24', '$2a$12$KQ8gadUoXRQh4rIzZHnpZOSzIbvKcbyjjqJw/KnTcHwyB5./ubOdC', '', '', '', '', ''),
('c25', '$2a$12$7OiX71HPpCdt2RtxaaZCl.djQbsl1iB6R4Xe0.3P.8PWW1aa5a28y', '', '', '', '', ''),
('COCP550116MDFTSL01', '$2a$12$dLuWSJEfwR7DalgVTdLSYuWxn4N09v.AH30dihgLxHG7JwNp7edZO', 'Maria del Pilar', 'Coto', 'Casal', '4426698027', 'pilar.kiarainmuebles@gmail.com'),
('GUME791116MDFTRS05', '$2a$12$GT0NAb.mKHB2Z4MSkFSpuerVtMcgS4N3.MA.mdYJx0de7kqctRKOm', '', '', '', '', ''),
('MASJ711117HDFRLM01', '$2a$12$peXrFbdn6EdHMTtHmq7FeufIvvngVnWmlGSi0qg46707rRiFgHIyK', '', '', '', '', ''),
('rcortese', '$2a$12$aImBTp9GpHZhStF0d4xqc.zBwIJyb3i09QkqzWqeFhdO1OfzESrOK', '', '', '', '', ''),
('YURB771212MDFZGL05', '$2a$12$s2NMNHJRP6.GK5bb5p/qUe/HoPwlj/1yxhkMHmQhLfj.D8AxS6LcG', '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Asesores`
--
ALTER TABLE `Asesores`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `Asesor_cliente`
--
ALTER TABLE `Asesor_cliente`
  ADD PRIMARY KEY (`ID_Asesor`,`ID_Cliente`),
  ADD KEY `ID_Cliente` (`ID_Cliente`);

--
-- Indexes for table `Clientes`
--
ALTER TABLE `Clientes`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `Cronograma_renta`
--
ALTER TABLE `Cronograma_renta`
  ADD PRIMARY KEY (`Numero`);

--
-- Indexes for table `Cronograma_venta`
--
ALTER TABLE `Cronograma_venta`
  ADD PRIMARY KEY (`Numero`);

--
-- Indexes for table `Expediente_Cliente`
--
ALTER TABLE `Expediente_Cliente`
  ADD PRIMARY KEY (`ID`,`ID_Cliente`,`ID_TipoDoc`,`ID_TipoExp`,`Fecha`),
  ADD KEY `ID_TipoExp` (`ID_TipoExp`),
  ADD KEY `ID_TipoDoc` (`ID_TipoDoc`),
  ADD KEY `ID_Cliente` (`ID_Cliente`);

--
-- Indexes for table `Expediente_Propiedad`
--
ALTER TABLE `Expediente_Propiedad`
  ADD PRIMARY KEY (`ID`,`ID_Propiedad`,`ID_TipoDoc`,`ID_TipoExp`,`Fecha`),
  ADD KEY `ID_Propiedad` (`ID_Propiedad`),
  ADD KEY `ID_TipoExp` (`ID_TipoExp`),
  ADD KEY `ID_TipoDoc` (`ID_TipoDoc`);

--
-- Indexes for table `Op_comercial`
--
ALTER TABLE `Op_comercial`
  ADD PRIMARY KEY (`ID_Propiedad`);

--
-- Indexes for table `Op_Residencial`
--
ALTER TABLE `Op_Residencial`
  ADD PRIMARY KEY (`ID_Propiedad`);

--
-- Indexes for table `Op_terreno`
--
ALTER TABLE `Op_terreno`
  ADD PRIMARY KEY (`ID_Propiedad`);

--
-- Indexes for table `Paises`
--
ALTER TABLE `Paises`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Permisos`
--
ALTER TABLE `Permisos`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Proceso_CompraVenta`
--
ALTER TABLE `Proceso_CompraVenta`
  ADD PRIMARY KEY (`ID_Cliente`,`Numero_etapa`,`ID_Propiedad`,`Fecha_End`),
  ADD KEY `Numero_etapa` (`Numero_etapa`),
  ADD KEY `ID_Propiedad` (`ID_Propiedad`);

--
-- Indexes for table `Proceso_renta`
--
ALTER TABLE `Proceso_renta`
  ADD PRIMARY KEY (`ID_Cliente`,`Numero_etapa`,`ID_Propiedad`,`Fecha_End`),
  ADD KEY `Numero_etapa` (`Numero_etapa`),
  ADD KEY `ID_Propiedad` (`ID_Propiedad`);

--
-- Indexes for table `Propiedades`
--
ALTER TABLE `Propiedades`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_tipoInmueble` (`ID_tipoInmueble`),
  ADD KEY `ID_pais` (`ID_pais`);

--
-- Indexes for table `Propiedad_propietario`
--
ALTER TABLE `Propiedad_propietario`
  ADD PRIMARY KEY (`ID_Propiedad`,`ID_Cliente`,`Fecha`),
  ADD KEY `ID_Cliente` (`ID_Cliente`);

--
-- Indexes for table `Restriccion_TED_cliente`
--
ALTER TABLE `Restriccion_TED_cliente`
  ADD PRIMARY KEY (`ID_tipoExpC`,`ID_tipoDocC`),
  ADD KEY `ID_tipoDocC` (`ID_tipoDocC`);

--
-- Indexes for table `Restriccion_TED_propiedad`
--
ALTER TABLE `Restriccion_TED_propiedad`
  ADD PRIMARY KEY (`ID_tipoExpP`,`ID_tipoDocP`),
  ADD KEY `ID_tipoDocP` (`ID_tipoDocP`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `rol_priv`
--
ALTER TABLE `rol_priv`
  ADD PRIMARY KEY (`id_rol`,`id_priv`,`created_at`),
  ADD KEY `id_priv` (`id_priv`);

--
-- Indexes for table `Tipo_docCliente`
--
ALTER TABLE `Tipo_docCliente`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Tipo_docPropiedad`
--
ALTER TABLE `Tipo_docPropiedad`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Tipo_ExpCliente`
--
ALTER TABLE `Tipo_ExpCliente`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Tipo_ExpPropiedad`
--
ALTER TABLE `Tipo_ExpPropiedad`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Tipo_inmueble`
--
ALTER TABLE `Tipo_inmueble`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user_rol`
--
ALTER TABLE `user_rol`
  ADD PRIMARY KEY (`id_user`,`id_rol`,`created_at`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indexes for table `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cronograma_renta`
--
ALTER TABLE `Cronograma_renta`
  MODIFY `Numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Cronograma_venta`
--
ALTER TABLE `Cronograma_venta`
  MODIFY `Numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Expediente_Cliente`
--
ALTER TABLE `Expediente_Cliente`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `Paises`
--
ALTER TABLE `Paises`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `Permisos`
--
ALTER TABLE `Permisos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `Propiedades`
--
ALTER TABLE `Propiedades`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Tipo_docCliente`
--
ALTER TABLE `Tipo_docCliente`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Tipo_docPropiedad`
--
ALTER TABLE `Tipo_docPropiedad`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Tipo_ExpCliente`
--
ALTER TABLE `Tipo_ExpCliente`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Tipo_ExpPropiedad`
--
ALTER TABLE `Tipo_ExpPropiedad`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Tipo_inmueble`
--
ALTER TABLE `Tipo_inmueble`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Asesores`
--
ALTER TABLE `Asesores`
  ADD CONSTRAINT `Asesores_ibfk_1` FOREIGN KEY (`username`) REFERENCES `Usuario` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Asesor_cliente`
--
ALTER TABLE `Asesor_cliente`
  ADD CONSTRAINT `Asesor_cliente_ibfk_1` FOREIGN KEY (`ID_Asesor`) REFERENCES `Asesores` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Asesor_cliente_ibfk_2` FOREIGN KEY (`ID_Cliente`) REFERENCES `Clientes` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Clientes`
--
ALTER TABLE `Clientes`
  ADD CONSTRAINT `Clientes_ibfk_1` FOREIGN KEY (`username`) REFERENCES `Usuario` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Expediente_Cliente`
--
ALTER TABLE `Expediente_Cliente`
  ADD CONSTRAINT `Expediente_Cliente_ibfk_2` FOREIGN KEY (`ID_TipoExp`) REFERENCES `Tipo_ExpCliente` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Expediente_Cliente_ibfk_3` FOREIGN KEY (`ID_TipoDoc`) REFERENCES `Tipo_docCliente` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Expediente_Cliente_ibfk_4` FOREIGN KEY (`ID_Cliente`) REFERENCES `Clientes` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Expediente_Propiedad`
--
ALTER TABLE `Expediente_Propiedad`
  ADD CONSTRAINT `Expediente_Propiedad_ibfk_1` FOREIGN KEY (`ID_Propiedad`) REFERENCES `Propiedades` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Expediente_Propiedad_ibfk_2` FOREIGN KEY (`ID_TipoExp`) REFERENCES `Tipo_ExpPropiedad` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Expediente_Propiedad_ibfk_3` FOREIGN KEY (`ID_TipoDoc`) REFERENCES `Tipo_docPropiedad` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Proceso_CompraVenta`
--
ALTER TABLE `Proceso_CompraVenta`
  ADD CONSTRAINT `Proceso_CompraVenta_ibfk_2` FOREIGN KEY (`Numero_etapa`) REFERENCES `Cronograma_venta` (`Numero`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Proceso_CompraVenta_ibfk_3` FOREIGN KEY (`ID_Propiedad`) REFERENCES `Propiedades` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Proceso_CompraVenta_ibfk_4` FOREIGN KEY (`ID_Cliente`) REFERENCES `Clientes` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Proceso_renta`
--
ALTER TABLE `Proceso_renta`
  ADD CONSTRAINT `Proceso_renta_ibfk_1` FOREIGN KEY (`Numero_etapa`) REFERENCES `Cronograma_renta` (`Numero`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Proceso_renta_ibfk_3` FOREIGN KEY (`ID_Propiedad`) REFERENCES `Propiedades` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Proceso_renta_ibfk_4` FOREIGN KEY (`ID_Cliente`) REFERENCES `Clientes` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Propiedades`
--
ALTER TABLE `Propiedades`
  ADD CONSTRAINT `Propiedades_ibfk_1` FOREIGN KEY (`ID_tipoInmueble`) REFERENCES `Tipo_inmueble` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Propiedades_ibfk_3` FOREIGN KEY (`ID_pais`) REFERENCES `Paises` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Propiedad_propietario`
--
ALTER TABLE `Propiedad_propietario`
  ADD CONSTRAINT `Propiedad_propietario_ibfk_2` FOREIGN KEY (`ID_Propiedad`) REFERENCES `Propiedades` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Propiedad_propietario_ibfk_3` FOREIGN KEY (`ID_Cliente`) REFERENCES `Clientes` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Restriccion_TED_cliente`
--
ALTER TABLE `Restriccion_TED_cliente`
  ADD CONSTRAINT `Restriccion_TED_cliente_ibfk_1` FOREIGN KEY (`ID_tipoDocC`) REFERENCES `Tipo_docCliente` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Restriccion_TED_cliente_ibfk_2` FOREIGN KEY (`ID_tipoExpC`) REFERENCES `Tipo_ExpCliente` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Restriccion_TED_propiedad`
--
ALTER TABLE `Restriccion_TED_propiedad`
  ADD CONSTRAINT `Restriccion_TED_propiedad_ibfk_1` FOREIGN KEY (`ID_tipoDocP`) REFERENCES `Tipo_docPropiedad` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Restriccion_TED_propiedad_ibfk_2` FOREIGN KEY (`ID_tipoExpP`) REFERENCES `Tipo_ExpPropiedad` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rol_priv`
--
ALTER TABLE `rol_priv`
  ADD CONSTRAINT `rol_priv_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `Roles` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rol_priv_ibfk_2` FOREIGN KEY (`id_priv`) REFERENCES `Permisos` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_rol`
--
ALTER TABLE `user_rol`
  ADD CONSTRAINT `user_rol_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `Usuario` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_rol_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `Roles` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
