-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-kiara.alwaysdata.net
-- Generation Time: Oct 19, 2022 at 01:13 AM
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
CREATE DEFINER=`kiara`@`%` PROCEDURE `get_casas_idC` (IN `U_ID_Cliente` INT, IN `U_Operacion` VARCHAR(20) CHARSET utf8mb4)   SELECT PP.ID_Cliente, PP.ID_Propiedad,P.Calle,P.Numero,P.Colonia,P.Codigo_postal,P.Municipio,P.Estado,Paises.Pais ,TI.tipoInmueble
	   ,P.Niveles,P.Habitaciones,P.Baños,P.Cocina,P.Sala_Comedor,P.Estacionamiento,P.Gas, P.Operacion
FROM Propiedad_propietario PP, Clientes C, Propiedades P, Tipo_inmueble TI,Paises
WHERE PP.ID_Propiedad=P.ID AND PP.ID_Cliente=C.ID AND TI.ID=P.ID_tipoInmueble AND P.ID_pais=Paises.ID AND PP.ID_Cliente=U_ID_Cliente
      AND P.Operacion=U_Operacion$$

CREATE DEFINER=`kiara`@`%` PROCEDURE `get_proceso` (IN `U_ID_Cliente` INT, IN `U_ID_Propiedad` INT, IN `U_TipoCliente` INT(15))   SELECT PV.Numero_etapa, CV.Nombre, PV.Estado, PV.Fecha_StartV, PV.Fecha_EndV, CV.Tiempo_estimado
FROM Proceso_CompraVenta PV, Cronograma_venta CV
WHERE PV.Numero_etapa=CV.Numero AND PV.ID_Cliente=U_ID_Cliente AND PV.ID_Propiedad=U_ID_Propiedad AND PV.tipoCliente=U_TipoCliente$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Asesores`
--

CREATE TABLE `Asesores` (
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

INSERT INTO `Asesores` (`CURP`, `Nombre_asesor`, `Primer_apellido`, `Segundo_apellido`, `Telefono_asesor`, `Email_asesor`) VALUES
('AIVT700616MDFTLR09', 'Maria Teresa', 'Atilano', 'Villanueva', '4426328759', 'tere.kiarainmuebles@gmail.com'),
('BAHV691210MDFZRR10', 'Virginia ', 'Baza', 'Herrera', '4427967322', 'virginia.kiarainmuebles@gmail.com'),
('COCP550116MDFTSL01', 'Maria del Pilar', 'Coto', 'Casal', '4426698027', 'pilar.kiarainmuebles@gmail.com'),
('GUME791116MDFTRS05', 'Maria Esther', 'Gutierrez', 'Martinez', '4426037195', 'esther.kiarainmuebles@gmail.com'),
('MASJ711117HDFRLM01', 'Jaime', 'Martinez', 'Salcedo', '4428789389', 'jaime.kiarainmuebles@gmail.com'),
('YURB771212MDFZGL05', 'Karla', 'Yzunza', 'Rugarcia', '4423217554', 'karla.kiarainmuebles@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Asesor_cliente`
--

CREATE TABLE `Asesor_cliente` (
  `ID_Asesor` varchar(18) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `ID_Cliente` int(11) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Asesor_cliente`
--

INSERT INTO `Asesor_cliente` (`ID_Asesor`, `ID_Cliente`, `Fecha`) VALUES
('AIVT700616MDFTLR09', 1, '2022-10-14 23:33:00'),
('AIVT700616MDFTLR09', 2, '2022-10-14 23:33:00'),
('AIVT700616MDFTLR09', 5, '2022-10-14 23:33:00'),
('AIVT700616MDFTLR09', 6, '2022-10-14 23:33:00'),
('BAHV691210MDFZRR10', 3, '2022-10-14 23:32:32'),
('BAHV691210MDFZRR10', 4, '2022-10-14 23:32:32'),
('GUME791116MDFTRS05', 7, '2022-10-14 23:33:14');

-- --------------------------------------------------------

--
-- Table structure for table `Clientes`
--

CREATE TABLE `Clientes` (
  `ID` int(11) NOT NULL,
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

INSERT INTO `Clientes` (`ID`, `Nombres`, `Primer_apellido`, `Segundo_apellido`, `Telefono_cliente`, `Email_cliente`, `Ocupacion`, `Estado_civil`) VALUES
(1, 'Hector Román', 'Calderón', 'Cibrian', '4421815772', 'hrcalderon@live.com.mx', 'empleado', 'n/a'),
(2, 'Hugo Alexis', 'Trujillo', 'Sánchez', '4426582959', 'alexiscryowelding@gmail.com', 'socio', 'n/a'),
(3, 'Rosalía', 'Pérez', 'Bravo', '8184681966', 'rosaliapb@gmail.com', 'empleado', 'n/a'),
(4, 'Jose Antonio', 'García', 'Martínez', '4421528031', 'tono.martinez415@gmail.com', 'empleado', 'n/a'),
(5, 'Marco Antonio', 'Zavala', 'Orlanzzini', '5512293496', 'zavalamarcoa@gmail.com', 'psicologo', 'casado'),
(6, 'Fernando', 'Vera', 'Álvarez', '', '', 'doctor', 'casado'),
(7, 'Silvia Paola', 'Navarro', 'Rojas', '4422728644', 'cocinavistareal@gmail.com', 'ama de casa', 'soltero'),
(8, 'Ruth', 'Solis', 'Velasco', '4426126384', 'a01703206@tec.mx', 'estudiante', 'soltero'),
(9, 'Rodigro', 'Reyes', 'Castro', '4426689472', '', 'estudiante', 'soltero'),
(10, 'Arturo', 'Valencia', 'Acosta', '7721251188', '', 'estudiante', 'soltero'),
(11, 'Genaro', 'Ambia', 'Martinez', '7771792963', '', 'estudiante', 'soltero'),
(22, 'Brandon', 'Flowers', 'Newman', '4426689472', 'brad0976@gmail.com', 'Singer', 'Casado'),
(34, 'Ruth', 'Solis', 'Velasco', '1442612638', 'A01703206@itesm.mx', 'estudiante', 'soltero'),
(35, 'Guillermo Fidel', 'Navarro', 'Vega', '7714206969', 'memotektips@tips.com', 'Full Stack Developer', 'Poli-matrimonio');

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
  `ID_Cliente` int(11) NOT NULL,
  `ID_TipoDoc` int(11) NOT NULL,
  `ID_TipoExp` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Estado` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `URL` varchar(400) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

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
-- Table structure for table `Proceso_CompraVenta`
--

CREATE TABLE `Proceso_CompraVenta` (
  `ID_Cliente` int(11) NOT NULL,
  `Numero_etapa` int(11) NOT NULL,
  `ID_Propiedad` int(11) NOT NULL,
  `tipoCliente` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Estado` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Fecha_StartV` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Fecha_EndV` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Proceso_CompraVenta`
--

INSERT INTO `Proceso_CompraVenta` (`ID_Cliente`, `Numero_etapa`, `ID_Propiedad`, `tipoCliente`, `Estado`, `Fecha_StartV`, `Fecha_EndV`) VALUES
(5, 1, 3, 'Comprador', 'Completado', '2022-09-08 22:00:00', '2022-09-08 22:00:00'),
(5, 2, 3, 'Comprador', 'En proceso', '2022-09-05 22:00:00', '0000-00-00 00:00:00'),
(5, 3, 3, 'Comprador', 'Completado', '2022-09-11 22:00:00', '2022-09-13 22:00:00'),
(5, 4, 3, 'Comprador', 'Completado', '2022-09-14 22:00:00', '2022-09-14 22:00:00'),
(5, 5, 3, 'Comprador', 'Completado', '2022-09-18 22:00:00', '2022-09-18 22:00:00'),
(5, 7, 3, 'Comprador', 'Completado', '2022-09-18 22:00:00', '2022-09-18 22:00:00'),
(5, 8, 3, 'Comprador', 'Completado', '2022-09-25 22:00:00', '2022-09-25 22:00:00'),
(5, 9, 3, 'Comprador', 'En proceso', '2022-09-06 22:00:00', '0000-00-00 00:00:00'),
(5, 10, 3, 'Comprador', 'No iniciado', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 11, 3, 'Comprador', 'No iniciado', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 1, 3, 'Vendedor', 'Completado', '2022-09-08 22:00:00', '2022-09-08 22:00:00'),
(6, 2, 3, 'Vendedor', 'En proceso', '2022-09-05 22:00:00', '0000-00-00 00:00:00'),
(6, 3, 3, 'Vendedor', 'Completado', '2022-09-11 22:00:00', '2022-09-13 22:00:00'),
(6, 4, 3, 'Vendedor', 'Completado', '2022-09-14 22:00:00', '2022-09-14 22:00:00'),
(6, 5, 3, 'Vendedor', 'Completado', '2022-09-18 22:00:00', '2022-09-18 22:00:00'),
(6, 7, 3, 'Vendedor', 'Completado', '2022-09-18 22:00:00', '2022-09-18 22:00:00'),
(6, 8, 3, 'Vendedor', 'Completado', '2022-09-25 22:00:00', '2022-09-25 22:00:00'),
(6, 9, 3, 'Vendedor', 'En proceso', '2022-09-06 22:00:00', '0000-00-00 00:00:00'),
(6, 10, 3, 'Vendedor', 'No iniciado', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 11, 3, 'Vendedor', 'No iniciado', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 1, 4, 'Vendedor', 'Completado', '2022-09-05 22:00:00', '2022-09-05 22:00:00'),
(7, 2, 4, 'Vendedor', 'En proceso', '2022-09-07 22:00:00', '0000-00-00 00:00:00'),
(7, 3, 4, 'Vendedor', 'Completado', '2022-09-07 22:00:00', '2022-09-07 22:00:00'),
(7, 4, 4, 'Vendedor', 'Completado', '2022-09-08 22:00:00', '2022-09-08 22:00:00'),
(7, 5, 4, 'Vendedor', 'Completado', '2022-09-08 22:00:00', '2022-09-08 22:00:00'),
(7, 7, 4, 'Vendedor', 'Completado', '2022-09-26 22:00:00', '2022-09-26 22:00:00'),
(7, 8, 4, 'Vendedor', 'No iniciado', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 9, 4, 'Vendedor', 'No iniciado', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 10, 4, 'Vendedor', 'No iniciado', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 11, 4, 'Vendedor', 'No iniciado', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Proceso_renta`
--

CREATE TABLE `Proceso_renta` (
  `ID_Cliente` int(11) NOT NULL,
  `Numero_etapa` int(11) NOT NULL,
  `ID_Propiedad` int(11) NOT NULL,
  `tipoCliente` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Estado` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Fecha_StartR` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Fecha_EndR` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Proceso_renta`
--

INSERT INTO `Proceso_renta` (`ID_Cliente`, `Numero_etapa`, `ID_Propiedad`, `tipoCliente`, `Estado`, `Fecha_StartR`, `Fecha_EndR`) VALUES
(1, 1, 1, 'Arrendatario', 'Completado', '2022-09-13 22:00:00', '2022-09-13 22:00:00'),
(1, 2, 1, 'Arrendatario', 'Completado', '2022-09-18 22:00:00', '2022-09-18 22:00:00'),
(1, 3, 1, 'Arrendatario', 'Completado', '2022-09-18 22:00:00', '2022-09-18 22:00:00'),
(1, 4, 1, 'Arrendatario', 'Completado', '2022-09-20 22:00:00', '2022-09-20 22:00:00'),
(1, 5, 1, 'Arrendatario', 'Completado', '2022-09-23 22:00:00', '2022-09-25 22:00:00'),
(1, 6, 1, 'Arrendatario', 'Completado', '2022-09-27 22:00:00', '2022-09-27 22:00:00'),
(3, 1, 1, 'Arrendador', 'Completado', '2022-09-13 22:00:00', '2022-09-13 22:00:00'),
(3, 2, 1, 'Arrendador', 'Completado', '2022-09-18 22:00:00', '2022-09-18 22:00:00'),
(3, 3, 1, 'Arrendador', 'Completado', '2022-09-18 22:00:00', '2022-09-18 22:00:00'),
(3, 4, 1, 'Arrendador', 'Completado', '2022-09-20 22:00:00', '2022-09-20 22:00:00'),
(3, 5, 1, 'Arrendador', 'Completado', '2022-09-23 22:00:00', '2022-09-25 22:00:00'),
(3, 6, 1, 'Arrendador', 'Completado', '2022-09-27 22:00:00', '2022-09-27 22:00:00'),
(4, 1, 1, 'Arrendatario', 'Completado', '2022-09-15 22:00:00', '2022-09-15 22:00:00'),
(4, 2, 1, 'Arrendatario', 'Completado', '2022-09-19 22:00:00', '2022-09-21 22:00:00'),
(4, 3, 1, 'Arrendatario', 'Completado', '2022-09-19 22:00:00', '2022-09-22 22:00:00'),
(4, 4, 1, 'Arrendatario', 'Completado', '2022-09-22 22:00:00', '2022-09-22 22:00:00'),
(4, 5, 1, 'Arrendatario', 'Completado', '2022-09-23 22:00:00', '2022-09-25 22:00:00'),
(4, 6, 1, 'Arrendatario', 'Completado', '2022-09-26 22:00:00', '2022-09-26 22:00:00');

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
  `ID_Cliente` int(11) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `Propiedad_propietario`
--

INSERT INTO `Propiedad_propietario` (`ID_Propiedad`, `ID_Cliente`, `Fecha`) VALUES
(1, 3, '2022-09-13 22:00:00'),
(2, 4, '2022-09-15 22:00:00'),
(3, 6, '2022-09-08 22:00:00'),
(4, 7, '2022-09-05 22:00:00'),
(41, 8, '2022-10-17 15:45:04'),
(42, 8, '2022-10-17 15:45:04'),
(43, 8, '2022-10-17 15:45:04');

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
-- Table structure for table `Usuario`
--

CREATE TABLE `Usuario` (
  `username` varchar(8) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Usuario`
--

INSERT INTO `Usuario` (`username`, `password`) VALUES
('admin', '$2a$12$XSO5p6hrIyzFNsrz5L0ZzOxZyF3HAt/n3RbvKgVj1916UBG7LottC');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Asesores`
--
ALTER TABLE `Asesores`
  ADD PRIMARY KEY (`CURP`);

--
-- Indexes for table `Asesor_cliente`
--
ALTER TABLE `Asesor_cliente`
  ADD PRIMARY KEY (`ID_Asesor`,`ID_Cliente`,`Fecha`),
  ADD KEY `ID_Cliente` (`ID_Cliente`);

--
-- Indexes for table `Clientes`
--
ALTER TABLE `Clientes`
  ADD PRIMARY KEY (`ID`);

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
  ADD KEY `ID_Cliente` (`ID_Cliente`),
  ADD KEY `ID_TipoExp` (`ID_TipoExp`),
  ADD KEY `ID_TipoDoc` (`ID_TipoDoc`);

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
-- Indexes for table `Proceso_CompraVenta`
--
ALTER TABLE `Proceso_CompraVenta`
  ADD PRIMARY KEY (`ID_Cliente`,`Numero_etapa`,`ID_Propiedad`,`Fecha_EndV`),
  ADD KEY `Numero_etapa` (`Numero_etapa`),
  ADD KEY `ID_Propiedad` (`ID_Propiedad`);

--
-- Indexes for table `Proceso_renta`
--
ALTER TABLE `Proceso_renta`
  ADD PRIMARY KEY (`ID_Cliente`,`Numero_etapa`,`ID_Propiedad`),
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
-- Indexes for table `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Clientes`
--
ALTER TABLE `Clientes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Paises`
--
ALTER TABLE `Paises`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `Propiedades`
--
ALTER TABLE `Propiedades`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

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
-- Constraints for table `Asesor_cliente`
--
ALTER TABLE `Asesor_cliente`
  ADD CONSTRAINT `Asesor_cliente_ibfk_1` FOREIGN KEY (`ID_Asesor`) REFERENCES `Asesores` (`CURP`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Asesor_cliente_ibfk_2` FOREIGN KEY (`ID_Cliente`) REFERENCES `Clientes` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Expediente_Cliente`
--
ALTER TABLE `Expediente_Cliente`
  ADD CONSTRAINT `Expediente_Cliente_ibfk_1` FOREIGN KEY (`ID_Cliente`) REFERENCES `Clientes` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Expediente_Cliente_ibfk_2` FOREIGN KEY (`ID_TipoExp`) REFERENCES `Tipo_ExpCliente` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Expediente_Cliente_ibfk_3` FOREIGN KEY (`ID_TipoDoc`) REFERENCES `Tipo_docCliente` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `Proceso_CompraVenta_ibfk_1` FOREIGN KEY (`ID_Cliente`) REFERENCES `Clientes` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Proceso_CompraVenta_ibfk_2` FOREIGN KEY (`Numero_etapa`) REFERENCES `Cronograma_venta` (`Numero`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Proceso_CompraVenta_ibfk_3` FOREIGN KEY (`ID_Propiedad`) REFERENCES `Propiedades` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Proceso_renta`
--
ALTER TABLE `Proceso_renta`
  ADD CONSTRAINT `Proceso_renta_ibfk_1` FOREIGN KEY (`Numero_etapa`) REFERENCES `Cronograma_renta` (`Numero`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Proceso_renta_ibfk_2` FOREIGN KEY (`ID_Cliente`) REFERENCES `Clientes` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Proceso_renta_ibfk_3` FOREIGN KEY (`ID_Propiedad`) REFERENCES `Propiedades` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `Propiedad_propietario_ibfk_1` FOREIGN KEY (`ID_Cliente`) REFERENCES `Clientes` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Propiedad_propietario_ibfk_2` FOREIGN KEY (`ID_Propiedad`) REFERENCES `Propiedades` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
